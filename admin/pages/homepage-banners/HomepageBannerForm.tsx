import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { homepageBannersApi } from '../../api/homepageBanners';
import type { HomepageBannerPayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_TITLE_LENGTH = 60;
const MAX_IMAGE_SIZE_MB = 3;

const HomepageBannerForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<HomepageBannerPayload>({
    title: '',
    description: '',
    sort_order: 1,
    is_active: true,
    is_fixed: false,
  });
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    homepageBannersApi
      .get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const item = r.data;
        setForm({
          title: item.title,
          description: item.description,
          sort_order: item.sort_order,
          is_active: item.is_active,
          is_fixed: item.is_fixed,
        });
        setExistingImageUrl(item.image_url);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const previewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return existingImageUrl;
  }, [existingImageUrl, imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl && imageFile) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setImageFile(null);
      return;
    }
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_IMAGE_SIZE_MB) {
      setError(`Image size must be ${MAX_IMAGE_SIZE_MB}MB or less.`);
      return;
    }
    setError('');
    setImageFile(file);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    const description = (form.description ?? '').trim();
    if (!description) {
      setError('Description is required.');
      return;
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      setError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`);
      return;
    }

    if (!isEdit && !imageFile) {
      setError('Please upload a banner image.');
      return;
    }

    const fallbackTitle = description.slice(0, MAX_TITLE_LENGTH);

    const payload: HomepageBannerPayload = {
      ...form,
      title: (form.title ?? '').trim() || fallbackTitle,
      description,
      sort_order: Number(form.sort_order ?? 1),
      is_active: form.is_active !== false,
      is_fixed: form.is_fixed === true,
      ...(imageFile ? { image: imageFile } : {}),
    };

    setSaving(true);
    try {
      if (isEdit) await homepageBannersApi.update(Number(id), payload);
      else await homepageBannersApi.create(payload);
      navigate('/admin/homepage-banners');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Banner...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <PageEditorHeader
        title={isEdit ? 'Edit Homepage Banner' : 'Add Homepage Banner'}
        description="Only image and description are required. The first two default banners can be edited here."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/homepage-banners')}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Description</label>
              <textarea id="homepagebannerform-textarea-1" aria-label="homepagebannerform textarea field"
                name="description"
                value={form.description ?? ''}
                onChange={handleChange}
                rows={4}
                maxLength={MAX_DESCRIPTION_LENGTH}
                placeholder="Describe this banner in one short line"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-5 py-4 text-sm font-semibold transition-all outline-none resize-none"
                required
              />
              <p className="text-[11px] text-slate-400 font-semibold">
                {(form.description ?? '').length}/{MAX_DESCRIPTION_LENGTH} characters
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Sort Order</label>
                <input id="homepagebannerform-1" aria-label="homepagebannerform field"
                  type="number"
                  min={1}
                  name="sort_order"
                  value={form.sort_order ?? 1}
                  onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                />
              </div>
              <label className="flex items-end pb-2 gap-3 cursor-pointer">
                <input id="homepagebannerform-2" aria-label="homepagebannerform field"
                  type="checkbox"
                  checked={form.is_active !== false}
                  onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                  className="mt-1 h-4 w-4"
                />
                <span className="text-sm font-semibold text-slate-600">Active</span>
              </label>
            </div>

            <input
              type="hidden"
              name="title"
              value={form.title ?? ''}
              readOnly
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3">Banner Image</p>
            <label className="relative block cursor-pointer">
              <input id="homepagebannerform-3" name="homepagebannerform-3" aria-label="homepagebannerform field"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Banner preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-slate-400">
                    <p className="text-sm font-semibold">Upload banner image</p>
                    <p className="text-xs mt-1">Max file size: {MAX_IMAGE_SIZE_MB}MB</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white space-y-4">
            <h3 className="font-bold text-lg">Limits</h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>Description max length: {MAX_DESCRIPTION_LENGTH} characters</li>
              <li>Image max file size: {MAX_IMAGE_SIZE_MB}MB</li>
              <li>First two default banners can be edited but not deleted</li>
            </ul>
            {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomepageBannerForm;

