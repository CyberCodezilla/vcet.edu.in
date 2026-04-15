import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { enquiriesApi } from '../../api/enquiries';
import type { Enquiry } from '../../types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type StatusFilter = 'all' | 'read' | 'unread';

type ParsedMmsMessage = {
  program: string;
  preferredCourse: string;
  highestQualification: string;
  stateFromMessage: string;
  cityFromMessage: string;
  enquiryText: string;
};

type ExportRow = {
  Name: string;
  Email: string;
  Phone: string;
  Program: string;
  Course: string;
  HighestQualification: string;
  State: string;
  City: string;
  Enquiry: string;
  Consent: string;
  Status: string;
  ReceivedOn: string;
};

const EMPTY_PARSED_MESSAGE: ParsedMmsMessage = {
  program: '',
  preferredCourse: '',
  highestQualification: '',
  stateFromMessage: '',
  cityFromMessage: '',
  enquiryText: '',
};

const formatDate = (iso: string | null) => {
  if (!iso) return '-';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const parseMmsMessage = (message?: string | null): ParsedMmsMessage => {
  if (!message) return EMPTY_PARSED_MESSAGE;

  const parsed: ParsedMmsMessage = { ...EMPTY_PARSED_MESSAGE };
  const segments = message
    .split('|')
    .map((segment) => segment.trim())
    .filter(Boolean);

  for (const segment of segments) {
    const [rawKey, ...rawValueParts] = segment.split(':');
    if (!rawKey || rawValueParts.length === 0) continue;

    const key = rawKey.trim().toLowerCase();
    const value = rawValueParts.join(':').trim();

    if (key === 'program') parsed.program = value;
    else if (key === 'course') parsed.preferredCourse = value;
    else if (key === 'highest qualification') parsed.highestQualification = value;
    else if (key === 'state') parsed.stateFromMessage = value;
    else if (key === 'city') parsed.cityFromMessage = value;
    else if (key === 'enquiry') parsed.enquiryText = value;
  }

  return parsed;
};

const normalizeForSearch = (value: string | null | undefined) => (value ?? '').toLowerCase();

const MMSEnquiriesList: React.FC = () => {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    enquiriesApi
      .list(page, { segment: 'mms' })
      .then((response) => {
        setItems(response.data);
        setLastPage(response.meta?.last_page ?? 1);
        setTotal(response.meta?.total ?? response.data.length);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const filteredItems = useMemo(
    () =>
      items
        .filter((item) => {
          const parsed = parseMmsMessage(item.message);
          const search = searchTerm.trim().toLowerCase();
          if (!search) return true;

          return (
            normalizeForSearch(item.name).includes(search)
            || normalizeForSearch(item.email).includes(search)
            || normalizeForSearch(item.phone).includes(search)
            || normalizeForSearch(item.course).includes(search)
            || normalizeForSearch(item.department).includes(search)
            || normalizeForSearch(item.state).includes(search)
            || normalizeForSearch(item.city).includes(search)
            || normalizeForSearch(parsed.program).includes(search)
            || normalizeForSearch(parsed.preferredCourse).includes(search)
            || normalizeForSearch(parsed.highestQualification).includes(search)
            || normalizeForSearch(parsed.enquiryText).includes(search)
          );
        })
        .filter((item) => {
          if (statusFilter === 'all') return true;
          if (statusFilter === 'read') return item.is_read;
          return !item.is_read;
        }),
    [items, searchTerm, statusFilter],
  );

  const buildExportRows = useCallback((rows: Enquiry[]): ExportRow[] => {
    return rows.map((item) => {
      const parsed = parseMmsMessage(item.message);
      return {
        Name: item.name,
        Email: item.email,
        Phone: item.phone ?? '-',
        Program: parsed.program || item.department,
        Course: parsed.preferredCourse || item.course,
        HighestQualification: parsed.highestQualification || item.specialization || '-',
        State: parsed.stateFromMessage || item.state || '-',
        City: parsed.cityFromMessage || item.city || '-',
        Enquiry: parsed.enquiryText || item.message || '-',
        Consent: item.consent ? 'Yes' : 'No',
        Status: item.is_read ? 'Read' : 'Unread',
        ReceivedOn: formatDate(item.created_at),
      };
    });
  }, []);

  const fetchAllMmsRows = useCallback(async (): Promise<Enquiry[]> => {
    const merged: Enquiry[] = [];
    let currentPage = 1;
    let finalPage = 1;

    do {
      const response = await enquiriesApi.list(currentPage, { segment: 'mms' });
      merged.push(...response.data);
      finalPage = response.meta?.last_page ?? 1;
      currentPage += 1;
    } while (currentPage <= finalPage);

    return merged;
  }, []);

  const exportExcel = async () => {
    setExporting(true);
    try {
      const rows = await fetchAllMmsRows();
      if (!rows.length) {
        window.alert('No MMS enquiry data available to export.');
        return;
      }

      const exportRows = buildExportRows(rows);
      const worksheet = XLSX.utils.json_to_sheet(exportRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'MMS Enquiries');
      XLSX.writeFile(workbook, `mms-enquiries-${new Date().toISOString().slice(0, 10)}.xlsx`);
    } finally {
      setExporting(false);
    }
  };

  const exportPdf = async () => {
    setExporting(true);
    try {
      const rows = await fetchAllMmsRows();
      if (!rows.length) {
        window.alert('No MMS enquiry data available to export.');
        return;
      }

      const exportRows = buildExportRows(rows);
      const doc = new jsPDF({ orientation: 'landscape' });
      doc.setFontSize(14);
      doc.text('MMS Enquiries', 14, 12);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 18);

      autoTable(doc, {
        startY: 24,
        head: [[
          'Name',
          'Email',
          'Phone',
          'Program',
          'Course',
          'Qualification',
          'State',
          'City',
          'Enquiry',
          'Consent',
          'Status',
          'Received On',
        ]],
        body: exportRows.map((row) => [
          row.Name,
          row.Email,
          row.Phone,
          row.Program,
          row.Course,
          row.HighestQualification,
          row.State,
          row.City,
          row.Enquiry,
          row.Consent,
          row.Status,
          row.ReceivedOn,
        ]),
        styles: {
          fontSize: 7,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [30, 41, 59],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        columnStyles: {
          8: { cellWidth: 70 },
        },
      });

      doc.save(`mms-enquiries-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  const handleToggleReadStatus = async (item: Enquiry) => {
    setUpdatingStatusId(item.id);
    try {
      await enquiriesApi.updateReadStatus(item.id, !item.is_read);
      setItems((prev) => prev.map((current) => (
        current.id === item.id ? { ...current, is_read: !current.is_read } : current
      )));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update enquiry status.';
      window.alert(message);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDelete = async (item: Enquiry) => {
    const confirmed = window.confirm(`Delete enquiry from ${item.name}? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(item.id);
    try {
      await enquiriesApi.remove(item.id);
      setItems((prev) => prev.filter((current) => current.id !== item.id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete enquiry.';
      window.alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link to="/admin" className="transition-colors hover:text-[#1e293b]">Dashboard</Link>
            <span>/</span>
            <Link to="/admin/pages/mms" className="transition-colors hover:text-[#1e293b]">MMS</Link>
            <span>/</span>
            <span className="text-slate-900">Enquiries</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            MMS <span className="text-[#1e293b]">Enquiries</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Showing enquiries submitted through the MMS Enquire button.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportExcel}
            disabled={exporting}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {exporting ? 'Preparing...' : 'Download Excel'}
          </button>
          <button
            type="button"
            onClick={exportPdf}
            disabled={exporting}
            className="rounded-xl bg-[#1e293b] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
          >
            {exporting ? 'Preparing...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            id="mms-enquiries-search"
            name="mms-enquiries-search"
            aria-label="mms enquiries search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by student, email, program, course, city or enquiry text..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#1e293b] sm:max-w-xl"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`rounded-lg px-3 py-2 text-xs font-bold uppercase ${statusFilter === 'all' ? 'bg-[#1e293b] text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('unread')}
              className={`rounded-lg px-3 py-2 text-xs font-bold uppercase ${statusFilter === 'unread' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Unread
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('read')}
              className={`rounded-lg px-3 py-2 text-xs font-bold uppercase ${statusFilter === 'read' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Read
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Total MMS enquiries: {total}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#1e293b]" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base font-bold text-slate-900">No MMS enquiries found</p>
            <p className="mt-1 text-sm text-slate-500">Try changing search keywords or filters.</p>
          </div>
        ) : (
          <div className="space-y-4 p-4 sm:p-6">
            {filteredItems.map((item) => {
              const parsed = parseMmsMessage(item.message);
              return (
                <article key={item.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-lg font-bold text-slate-900">{item.name}</h2>
                      <div className="text-sm text-slate-600">
                        <p>{item.email}</p>
                        <p>{item.phone ?? '-'}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">{parsed.program || item.department}</span>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">{parsed.preferredCourse || item.course}</span>
                        <span className={`rounded-full px-2.5 py-1 ${item.is_read ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {item.is_read ? 'Read' : 'Unread'}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:min-w-[380px]">
                      <p><span className="font-semibold">Qualification:</span> {parsed.highestQualification || item.specialization || '-'}</p>
                      <p><span className="font-semibold">Consent:</span> {item.consent ? 'Yes' : 'No'}</p>
                      <p><span className="font-semibold">State:</span> {parsed.stateFromMessage || item.state || '-'}</p>
                      <p><span className="font-semibold">City:</span> {parsed.cityFromMessage || item.city || '-'}</p>
                      <p className="sm:col-span-2"><span className="font-semibold">Received:</span> {formatDate(item.created_at)}</p>
                      <div className="sm:col-span-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleReadStatus(item)}
                            disabled={updatingStatusId === item.id}
                            className={`rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-60 ${item.is_read ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 hover:bg-emerald-100'}`}
                          >
                            {updatingStatusId === item.id
                              ? 'Updating...'
                              : item.is_read
                                ? 'Mark as Unread'
                                : 'Mark as Read'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={deletingId === item.id}
                            className="rounded-xl bg-rose-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-rose-700 ring-1 ring-rose-100 transition-all hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === item.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">Enquiry Details</p>
                    <p className="whitespace-pre-wrap text-sm text-slate-700">{parsed.enquiryText || item.message || 'No message provided.'}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {lastPage > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm sm:px-6">
            <span className="font-semibold text-slate-600">Page {page} of {lastPage}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(lastPage, prev + 1))}
                disabled={page === lastPage}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MMSEnquiriesList;
