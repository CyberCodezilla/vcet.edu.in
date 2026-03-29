import React from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Instagram,
  PlayCircle,
} from 'lucide-react';
import SectionHeader from '../../components/SectionHeader';

type LinkIcon = 'default' | 'file' | 'instagram' | 'video';

export interface IntroLink {
  label: string;
  href: string;
  icon?: LinkIcon;
}

export interface IntroChip {
  label: string;
  href?: string;
}

export interface EventItem {
  title: string;
  description: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  placeholder?: boolean;
  placeholderLabel?: string;
}

export interface ResourceItem {
  title: string;
  href: string;
  description?: string;
  icon?: LinkIcon;
}

interface IntroSectionProps {
  id?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  chips: IntroChip[];
  links?: IntroLink[];
  aside?: React.ReactNode;
  imageFit?: 'cover' | 'contain';
  hideImage?: boolean;
  imagePlaceholderLabel?: string;
}

interface ContentSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  backgroundClassName?: string;
  align?: 'left' | 'center';
  children: React.ReactNode;
}

interface BulletListProps {
  items: string[];
}

interface EventGridProps {
  items: EventItem[];
}

interface GalleryGridProps {
  items: GalleryItem[];
}

interface ResourceGridProps {
  items: ResourceItem[];
}

interface ProfileHighlightProps {
  title: string;
  image: string;
  imageAlt: string;
  heading: string;
  lines: string[];
  actions?: IntroLink[];
  hideImage?: boolean;
  imagePlaceholderLabel?: string;
}

interface DataTableProps {
  columns: string[];
  rows: string[][];
}

const iconMap = {
  default: ExternalLink,
  file: FileText,
  instagram: Instagram,
  video: PlayCircle,
} satisfies Record<LinkIcon, React.ComponentType<{ className?: string }>>;

const renderMultiline = (value: string) => {
  const parts = value
    .split('\n')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return <span>{value}</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      {parts.map((part) => (
        <span key={part}>{part}</span>
      ))}
    </div>
  );
};

const ImagePlaceholder: React.FC<{ label: string; className?: string }> = ({ label, className }) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_42%),linear-gradient(135deg,#0f2746_0%,#143866_52%,#1f4f88_100%)] ${className ?? ''}`}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center text-white">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
          <ImageIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
            Image Holder
          </p>
          <p className="mt-2 text-sm text-white/85">{label}</p>
        </div>
      </div>
    </div>
  );
};

export const IntroSection: React.FC<IntroSectionProps> = ({
  id,
  title,
  description,
  image,
  imageAlt,
  chips,
  links,
  aside,
  imageFit = 'cover',
  hideImage = false,
  imagePlaceholderLabel,
}) => {
  return (
    <section id={id} className="py-8 md:py-16 lg:py-24 bg-white scroll-mt-32 md:scroll-mt-40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
          <div className="reveal">
            <div className="relative overflow-hidden rounded-[28px] border border-brand-blue/10 shadow-[0_24px_60px_-32px_rgba(5,43,104,0.35)] bg-brand-light">
              {hideImage ? (
                <ImagePlaceholder
                  label={imagePlaceholderLabel ?? imageAlt}
                  className="aspect-[4/3]"
                />
              ) : (
                <img
                  src={image}
                  alt={imageAlt}
                  className={`h-full w-full aspect-[4/3] ${
                    imageFit === 'contain'
                      ? 'object-contain bg-white p-4 sm:p-6'
                      : 'object-cover'
                  }`}
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    chip.href ? (
                      <a
                        key={`${chip.label}-${chip.href}`}
                        href={chip.href}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur transition-colors duration-300 hover:bg-white/20 hover:text-white"
                      >
                        {chip.label}
                      </a>
                    ) : (
                      <span
                        key={chip.label}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur"
                      >
                        {chip.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: '0.08s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Student life@vcet
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-5">
              {title}
            </h2>
            {description && (
              <p className="text-slate-500 leading-relaxed text-base md:text-lg">{description}</p>
            )}

            {links && links.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {links.map((link) => {
                  const Icon = iconMap[link.icon ?? 'default'];

                  return (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl border border-brand-blue/10 bg-brand-light px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm group-hover:text-brand-gold transition-colors duration-300">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="text-sm font-semibold text-brand-navy">{link.label}</span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-brand-gold transition-colors duration-300" />
                      </div>
                    </a>
                  );
                })}
              </div>
            )}

            {aside && <div className="mt-8">{aside}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  title,
  subtitle,
  backgroundClassName = 'bg-brand-light',
  align = 'center',
  children,
}) => {
  const isDark =
    backgroundClassName.includes('brand-dark') || backgroundClassName.includes('brand-blue');

  return (
    <section id={id} className={`py-8 md:py-16 lg:py-24 scroll-mt-32 md:scroll-mt-40 ${backgroundClassName}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal">
            <SectionHeader
              title={title}
              subtitle={subtitle}
              align={align}
              theme={isDark ? 'dark' : 'light'}
            />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export const BulletList: React.FC<BulletListProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((item, index) => (
        <div
          key={item}
          className="reveal rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm"
          style={{ transitionDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-sm font-bold text-brand-gold">
              {index + 1}
            </span>
            <p className="text-slate-600 leading-relaxed">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EventGrid: React.FC<EventGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="reveal rounded-2xl border border-brand-blue/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          style={{ transitionDelay: `${index * 0.06}s` }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-blue">
              <PlayCircle className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-display font-bold text-brand-navy">{item.title}</h3>
          </div>
          <p className="text-slate-500 leading-relaxed">{item.description}</p>
        </article>
      ))}
    </div>
  );
};

export const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item, index) =>
        item.placeholder ? (
          <div
            key={`${item.src}-${item.alt}`}
            className="reveal overflow-hidden rounded-2xl border border-brand-blue/10 bg-white shadow-sm"
            style={{ transitionDelay: `${index * 0.04}s` }}
          >
            <ImagePlaceholder
              label={item.placeholderLabel ?? item.alt}
              className="aspect-[4/3]"
            />
          </div>
        ) : (
          <a
            key={item.src}
            href={item.src}
            target="_blank"
            rel="noreferrer"
            className="reveal group relative block overflow-hidden rounded-2xl border border-brand-blue/10 bg-white shadow-sm"
            style={{ transitionDelay: `${index * 0.04}s` }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ImageIcon className="h-4 w-4" />
                <span>{item.alt}</span>
              </div>
            </div>
          </a>
        )
      )}
    </div>
  );
};

export const ResourceGrid: React.FC<ResourceGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon ?? 'file'];

        return (
          <a
            key={`${item.title}-${item.href}`}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="reveal group rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-lg"
            style={{ transitionDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand-blue transition-colors duration-300 group-hover:text-brand-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                )}
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-brand-gold" />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export const ProfileHighlight: React.FC<ProfileHighlightProps> = ({
  title,
  image,
  imageAlt,
  heading,
  lines,
  actions,
  hideImage = false,
  imagePlaceholderLabel,
}) => {
  return (
    <div className="reveal overflow-hidden rounded-[28px] border border-brand-blue/10 bg-white shadow-[0_20px_50px_-30px_rgba(5,43,104,0.35)]">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <div className="bg-brand-light">
          {hideImage ? (
            <ImagePlaceholder
              label={imagePlaceholderLabel ?? imageAlt}
              className="aspect-[4/3] md:aspect-auto"
            />
          ) : (
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover aspect-[4/3] md:aspect-auto"
              loading="lazy"
            />
          )}
        </div>
        <div className="p-7 md:p-9">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold mb-3">
            {title}
          </p>
          <h3 className="text-2xl font-display font-bold text-brand-navy">{heading}</h3>
          <div className="mt-4 space-y-2">
            {lines.map((line) => (
              <p key={line} className="text-slate-500 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
          {actions && actions.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((action) => {
                const Icon = iconMap[action.icon ?? 'default'];

                return (
                  <a
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 px-4 py-2 text-sm font-semibold text-brand-blue transition-colors duration-300 hover:border-brand-gold/40 hover:text-brand-gold"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{action.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  return (
    <div className="reveal overflow-hidden rounded-[24px] border border-brand-blue/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-brand-navy">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-brand-gold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rowIndex) => (
              <tr
                key={`${row.join('-')}-${rowIndex}`}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-brand-light/40'}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="px-5 py-4 align-top text-sm leading-relaxed text-slate-600"
                  >
                    {renderMultiline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
