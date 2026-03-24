import React, { useEffect, useState } from 'react';
import { useMmsEnquiry } from '../../hooks/mms/useMmsEnquiry';

type LocationKind = 'state' | 'city';

const normalize = (value: string) => value.trim().toLowerCase();

const getCityFromAddress = (address: Record<string, string>) =>
  address.city || address.town || address.village || address.municipality || address.county || '';

async function fetchLocationSuggestions(query: string, kind: LocationKind): Promise<string[]> {
  const searchTerm = query.trim();
  if (searchTerm.length < 2) return [];

  try {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('limit', '10');
    url.searchParams.set('accept-language', 'en');
    url.searchParams.set('featuretype', kind === 'state' ? 'state' : 'city');
    url.searchParams.set('q', searchTerm);

    const response = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) return [];

    const data: Array<{ address?: Record<string, string> }> = await response.json();

    const suggestions = data
      .map((item) => {
        const address = item.address || {};
        if (kind === 'state') {
          return address.state || address.region || address.state_district || '';
        }
        return getCityFromAddress(address);
      })
      .filter(Boolean);

    const unique = Array.from(new Map(suggestions.map((s) => [normalize(s), s])).values());
    return unique.slice(0, 8);
  } catch {
    return [];
  }
}

export default function MMSEnquirePopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [stateLoading, setStateLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [stateTouched, setStateTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [qualification, setQualification] = useState('');
  const [program, setProgram] = useState('');
  const [course, setCourse] = useState('');
  const [enquiryText, setEnquiryText] = useState('');
  const [consent, setConsent] = useState(false);
  const { submit, submitting, success, error } = useMmsEnquiry();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (stateName.trim().length < 2) {
        setStateSuggestions([]);
        setStateLoading(false);
        return;
      }

      setStateLoading(true);
      const suggestions = await fetchLocationSuggestions(stateName, 'state');
      setStateSuggestions(suggestions);
      setStateLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [stateName]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const cityQuery = city.trim();
      if (cityQuery.length < 2) {
        setCitySuggestions([]);
        setCityLoading(false);
        return;
      }

      setCityLoading(true);
      const combinedQuery = stateName.trim() ? `${cityQuery}, ${stateName.trim()}` : cityQuery;
      const suggestions = await fetchLocationSuggestions(combinedQuery, 'city');
      setCitySuggestions(suggestions);
      setCityLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [city, stateName]);

  const hasStateMatch = stateSuggestions.some((item) => normalize(item) === normalize(stateName));
  const hasCityMatch = citySuggestions.some((item) => normalize(item) === normalize(city));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const stateNeedsConfirmation = stateName.trim().length > 0 && !hasStateMatch;
    const cityNeedsConfirmation = city.trim().length > 0 && !hasCityMatch;

    if (stateNeedsConfirmation || cityNeedsConfirmation) {
      const proceed = window.confirm(
        'We could not confidently verify one or more location entries from suggestions. If your location is correct, you may continue. Do you want to submit with the entered location?'
      );

      if (!proceed) return;
    }

    const composedMessage = [
      `Program: ${program}`,
      `Course: ${course}`,
      `Highest Qualification: ${qualification}`,
      `State: ${stateName}`,
      `City: ${city}`,
      `Enquiry: ${enquiryText}`,
    ].join(' | ');

    const ok = await submit({
      name,
      email,
      phone,
      message: composedMessage,
      course,
    });

    if (ok) {
      setName('');
      setEmail('');
      setPhone('');
      setStateName('');
      setCity('');
      setStateSuggestions([]);
      setCitySuggestions([]);
      setStateTouched(false);
      setCityTouched(false);
      setQualification('');
      setProgram('');
      setCourse('');
      setEnquiryText('');
      setConsent(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="hidden md:flex fixed right-0 top-[44%] z-[55] -translate-y-1/2 flex-col items-center justify-center gap-1 px-2 py-4 shadow-2xl transition-all duration-200 hover:brightness-110 active:scale-95"
        style={{
          background: 'linear-gradient(180deg, #0b2e5a 0%, #0d4888 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(253,184,19,0.6)',
          borderRight: 'none',
          boxShadow: '0 12px 36px rgba(13,72,136,0.45), inset 0 1px 0 rgba(253,184,19,0.25)',
          writingMode: 'vertical-rl',
        }}
        onClick={() => setOpen(true)}
      >
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-gold"
          style={{ transform: 'rotate(180deg)' }}
        >
          Enquire Now
        </span>
      </button>

      <button
        type="button"
        className="fixed bottom-6 right-4 z-50 rounded-full border border-brand-gold/60 bg-brand-navy px-4 py-2 text-sm font-bold text-brand-gold shadow-lg md:hidden"
        onClick={() => setOpen(true)}
      >
        Enquire Now
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/70 p-2 pt-5 backdrop-blur-sm sm:items-center sm:p-4 sm:pt-4">
          <div className="max-h-[94vh] w-full max-w-[760px] overflow-y-auto rounded-2xl border border-brand-gold/45 bg-gradient-to-br from-[#071d39] via-[#0b2f58] to-[#0d4888] p-4 shadow-[0_26px_80px_-30px_rgba(0,0,0,0.9)] sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <h3 className="text-4xl font-display font-bold leading-none text-brand-gold sm:text-5xl">Enquire Now</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/60 bg-brand-navy text-xl font-bold leading-none text-brand-gold transition hover:bg-[#14406f]"
                aria-label="Close enquiry form"
              >
                x
              </button>
            </div>

            <form className="space-y-4 rounded-xl border border-brand-gold/30 bg-white/95 p-4 sm:p-5" onSubmit={onSubmit}>
              <p className="text-xs font-medium text-slate-600">Fields marked with <span className="text-rose-600">*</span> are mandatory.</p>

              <label className="block">
                <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">Student Name <span className="text-rose-600">*</span></span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name as per academic records"
                  className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">Student Email Address <span className="text-rose-600">*</span></span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com"
                  className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">Student Phone Number <span className="text-rose-600">*</span></span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  minLength={10}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">State <span className="text-rose-600">*</span></span>
                  <input
                    required
                    list="mms-state-suggestions"
                    value={stateName}
                    onChange={(e) => {
                      setStateName(e.target.value);
                      if (!stateTouched) setStateTouched(true);
                    }}
                    onBlur={() => setStateTouched(true)}
                    placeholder="Enter your state"
                    className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                  />
                  <datalist id="mms-state-suggestions">
                    {stateSuggestions.map((item) => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
                  {(stateLoading || (stateName.trim().length >= 2 && stateSuggestions.length === 0)) && (
                    <p className="mt-1 text-xs text-slate-500">
                      {stateLoading
                        ? 'Checking state suggestions...'
                        : 'No close state suggestions found. If your entry is correct, you can continue.'}
                    </p>
                  )}
                  {stateTouched && stateName.trim().length >= 2 && !stateLoading && !hasStateMatch && (
                    <p className="mt-1 text-xs text-amber-700">
                      Please verify the state spelling. If it is correct, you may proceed.
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">City <span className="text-rose-600">*</span></span>
                  <input
                    required
                    list="mms-city-suggestions"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (!cityTouched) setCityTouched(true);
                    }}
                    onBlur={() => setCityTouched(true)}
                    placeholder="Enter your city"
                    className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                  />
                  <datalist id="mms-city-suggestions">
                    {citySuggestions.map((item) => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
                  {(cityLoading || (city.trim().length >= 2 && citySuggestions.length === 0)) && (
                    <p className="mt-1 text-xs text-slate-500">
                      {cityLoading
                        ? 'Checking city suggestions...'
                        : 'No close city suggestions found. If your entry is correct, you can continue.'}
                    </p>
                  )}
                  {cityTouched && city.trim().length >= 2 && !cityLoading && !hasCityMatch && (
                    <p className="mt-1 text-xs text-amber-700">
                      Please verify the city spelling. If it is correct, you may proceed.
                    </p>
                  )}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">Program <span className="text-rose-600">*</span></span>
                  <select
                    required
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                  >
                    <option value="" className="text-slate-400">Select program</option>
                    <option value="Master of Management Studies (MMS)">Master of Management Studies (MMS)</option>
                    <option value="MBA Equivalent Program">MBA Equivalent Program</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">Preferred Course <span className="text-rose-600">*</span></span>
                  <select
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                  >
                    <option value="" className="text-slate-400">Select course</option>
                    <option value="MMS (MBA)">MMS (MBA)</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">Highest Qualification <span className="text-rose-600">*</span></span>
                <input
                  required
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="Example: B.Com, BBA, B.E., B.Sc."
                  className="w-full rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-base font-semibold text-brand-navy sm:text-lg">Enquiry Details <span className="text-rose-600">*</span></span>
                <textarea
                  required
                  rows={4}
                  minLength={15}
                  value={enquiryText}
                  onChange={(e) => setEnquiryText(e.target.value)}
                  placeholder="Please share your query clearly. Example: I would like details about eligibility criteria, admission process, fee structure, scholarship support, and class schedule for MMS (MBA)."
                  className="w-full resize-y rounded-lg border border-brand-blue/25 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
                />
              </label>

              <label className="flex items-start gap-3 rounded-lg border border-brand-blue/15 bg-white px-3 py-3">
                <input
                  required
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-brand-blue/30 text-brand-blue focus:ring-brand-gold/40"
                />
                <span className="text-sm text-slate-700">
                  I agree to be contacted by the VCET MMS admissions team via phone or email regarding this enquiry. <span className="text-rose-600">*</span>
                </span>
              </label>

              {success && <p className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}
              {error && <p className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg border border-[#c99316] bg-gradient-to-r from-[#f1c550] to-[#dca321] px-8 py-3 text-lg font-bold text-[#0a2c57] shadow-[0_10px_22px_-14px_rgba(220,163,33,0.9)] transition hover:brightness-105 disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
