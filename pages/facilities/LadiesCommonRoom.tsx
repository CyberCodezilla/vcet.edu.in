import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getFacilitiesSection } from '../../services/facilities';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const amenities = [
  {
    title: 'Dressing Corner',
    description: 'A dedicated space for students to freshen up comfortably during the day.',
  },
  {
    title: 'Toiletries',
    description: 'Basic hygiene essentials are made available for convenience and well-being.',
  },
  {
    title: 'Large Mirror',
    description: 'A full-size mirror is provided as part of the refreshment and dressing area.',
  },
  {
    title: 'Comfortable Seating Space',
    description: 'Well-arranged seating supports relaxation, interaction, and short breaks.',
  },
];

const focusAreas = [
  'Comfortable and supervised environment',
  'Daily-use amenities for convenience',
  'Space for recreation and peer interaction',
  'Supportive atmosphere for well-being',
];

const readingKnowledgeText =
  'Girl students can spend productive time in the common room reading books, newspapers, and other informative materials. The space encourages both relaxation and knowledge sharing among students.';

const recreationPanels = [
  {
    title: 'Reading and Knowledge Sharing',
    description: readingKnowledgeText,
  },
  {
    title: 'Indoor Activities',
    description:
      'Students can also play indoor games such as table tennis and carrom, which help promote recreation and social interaction.',
  },
];

const LadiesCommonRoom: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    getFacilitiesSection<any>('ladies-common-room')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const general = useMemo(() => {
    const source = apiData?.general ?? {};
    return {
      title: String(source?.title ?? '').trim() || 'Overview',
      description:
        String(source?.description ?? '').trim() ||
        'A dedicated Ladies Common Room is available for girl students and lady faculty members in the institute. The room provides a comfortable and safe environment for relaxation, recreation, and informal discussions.',
      imageUrl: resolveUploadedAssetUrl(source?.imageUrl ?? null),
    };
  }, [apiData]);

  const activityPanels = useMemo(() => {
    const rows = Array.isArray(apiData?.activities)
      ? apiData.activities
          .map((item: any) => ({
            title: String(item?.name ?? '').trim(),
            description: String(item?.description ?? '').trim(),
            imageUrl: resolveUploadedAssetUrl(item?.imageUrl ?? null),
          }))
          .filter((item: any) => item.title.length > 0 && item.description.length > 0)
      : [];
    return rows.length > 0 ? rows : recreationPanels;
  }, [apiData]);

  const comfortItems = useMemo(() => {
    const rows = Array.isArray(apiData?.activities)
      ? apiData.activities
          .map((item: any) => ({
            title: String(item?.name ?? '').trim(),
            description: String(item?.description ?? '').trim(),
            imageUrl: resolveUploadedAssetUrl(item?.imageUrl ?? null),
          }))
          .filter((item: any) => item.title.length > 0 && item.description.length > 0)
      : [];
    return rows.length > 0 ? rows.slice(0, 4) : amenities;
  }, [apiData]);

  return (
    <PageLayout>
      <style>
        {`
          .ladies-common-room-page h1,
          .ladies-common-room-page h2,
          .ladies-common-room-page h3,
          .ladies-common-room-page h4,
          .ladies-common-room-page h5,
          .ladies-common-room-page h6 {
            font-family: Baskerville, "Times New Roman", serif !important;
          }

          .ladies-common-room-page {
            --lcr-blue: #2f3a46;
            --lcr-gold: #fdb813;
            --lcr-text: #333333;
            --lcr-soft: #f5f7fa;
            --lcr-card: #ffffff;
            --lcr-card-soft: #f4f1eb;
            --lcr-white: #ffffff;
            background: var(--lcr-soft);
          }

          .ladies-common-room-page p,
          .ladies-common-room-page li,
          .ladies-common-room-page .keyfocus-text,
          .ladies-common-room-page .support-point,
          .ladies-common-room-page .recreation-text,
          .ladies-common-room-page span,
          .ladies-common-room-page button,
          .ladies-common-room-page div {
            font-family: "Merriweather", Georgia, serif !important;
          }

          .ladies-common-room-page .lcr-dark-section {
            background: linear-gradient(180deg, #3a4450 0%, #2f3a46 100%);
          }

          .ladies-common-room-page .lcr-light-section {
            background: var(--lcr-soft);
          }

          .ladies-common-room-page .lcr-dark-section .title-accent,
          .ladies-common-room-page .lcr-dark-section .text-brand-navy,
          .ladies-common-room-page .lcr-dark-section .text-brand-blue,
          .ladies-common-room-page .lcr-dark-section h2,
          .ladies-common-room-page .lcr-dark-section h3,
          .ladies-common-room-page .lcr-dark-section h4,
          .ladies-common-room-page .lcr-dark-section p,
          .ladies-common-room-page .lcr-dark-section .content-prose,
          .ladies-common-room-page .lcr-dark-section .focus-item span {
            color: var(--lcr-text) !important;
          }

          .ladies-common-room-page .section-wrap {
            position: relative;
          }

          .ladies-common-room-page .section-wrap::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 88px;
            height: 2px;
            background: linear-gradient(90deg, var(--lcr-gold), rgba(253, 184, 19, 0));
          }

          .ladies-common-room-page .section-wrap.no-line::before {
            display: none;
          }

          .ladies-common-room-page .title-accent {
            position: relative;
            display: inline-block;
            padding-bottom: 10px;
          }

          .ladies-common-room-page .title-accent::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 72px;
            height: 3px;
            background: linear-gradient(90deg, var(--lcr-gold), rgba(253, 184, 19, 0.35));
          }

          .ladies-common-room-page .pro-label {
            display: inline-flex;
            align-items: center;
            width: fit-content;
            border-left: 4px solid var(--lcr-gold);
            background: rgba(255, 255, 255, 0.12);
            color: var(--lcr-text);
            padding: 4px 10px;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .ladies-common-room-page .intro-heading-stack {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 16px;
          }

          .ladies-common-room-page .intro-heading-stack .pro-label,
          .ladies-common-room-page .intro-heading-stack .title-accent {
            margin-bottom: 0;
          }

          .ladies-common-room-page .highlight-chip {
            display: inline-flex;
            align-items: center;
            padding: 5px 10px;
            border: 1px solid rgba(26, 75, 124, 0.2);
            background: #ffffff;
            color: #1f3f66;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.02em;
          }

          .ladies-common-room-page .overview-shell {
            border: 1px solid rgba(26, 75, 124, 0.12);
            background: var(--lcr-card);
          }

          .ladies-common-room-page .overview-main {
            background: linear-gradient(145deg, #ffffff 0%, #fbf8f2 100%);
            border: 1px solid rgba(47, 58, 70, 0.18);
            box-shadow: 0 14px 26px -20px rgba(11, 31, 56, 0.35);
            color: #333333;
            border-radius: 0 !important;
          }

          .ladies-common-room-page .overview-main .pro-label {
            background: #fff3cf;
            color: #2f3a46;
          }

          .ladies-common-room-page .overview-main .title-accent {
            color: #2f3a46 !important;
          }

          .ladies-common-room-page .overview-main p,
          .ladies-common-room-page .overview-main .content-prose {
            color: #333333 !important;
            max-width: none;
          }

          .ladies-common-room-page .overview-side {
            background: linear-gradient(145deg, #faf8f4 0%, #f1eee8 100%);
            border: 1px solid rgba(47, 58, 70, 0.18);
            box-shadow: 0 12px 22px -18px rgba(11, 31, 56, 0.3);
            color: #333333;
            border-radius: 0 !important;
          }

          .ladies-common-room-page .overview-side .pro-label {
            background: #fff3cf;
            color: #2f3a46;
            border-left-color: var(--lcr-gold);
          }

          .ladies-common-room-page .overview-side .focus-item {
            border-bottom: 1px solid rgba(47, 58, 70, 0.14);
          }

          .ladies-common-room-page .overview-side .focus-item span {
            color: #33445a !important;
          }

          .ladies-common-room-page .keyfocus-list {
            display: grid;
            gap: 10px;
            width: 100%;
            flex: 1;
            grid-auto-rows: minmax(0, 1fr);
          }

          .ladies-common-room-page .keyfocus-split {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
            align-items: start;
          }

          .ladies-common-room-page .keyfocus-column {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            height: 100%;
            width: 100%;
          }

          .ladies-common-room-page .keyfocus-label-tight {
            width: fit-content;
            padding: 3px 8px;
            margin-bottom: 8px;
          }

          @media (min-width: 768px) {
            .ladies-common-room-page .keyfocus-split {
              grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
              gap: 16px;
            }
          }

          .ladies-common-room-page .keyfocus-item {
            display: grid;
            grid-template-columns: 22px 1fr;
            gap: 10px;
            align-items: center;
            border: 1px solid rgba(26, 61, 109, 0.28);
            background: #f8fbff;
            padding: 10px 12px;
            position: relative;
            transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
            min-height: 0;
            border-radius: 8px;
            clip-path: none;
          }

          .ladies-common-room-page .keyfocus-item:last-child {
            padding-bottom: 10px;
          }

          .ladies-common-room-page .keyfocus-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 3px;
            height: 100%;
            background: linear-gradient(180deg, rgba(26, 61, 109, 0.75), rgba(26, 61, 109, 0.35));
            border-radius: 8px 0 0 8px;
          }

          .ladies-common-room-page .keyfocus-item:hover {
            transform: translateY(-1px);
            border-color: rgba(26, 61, 109, 0.42);
            box-shadow: 0 10px 16px -14px rgba(11, 31, 56, 0.28);
          }

          .ladies-common-room-page .keyfocus-index {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(26, 61, 109, 0.7);
            background: #ffffff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 2px;
            border-radius: 9999px;
            position: relative;
            box-sizing: border-box;
            z-index: 1;
          }

          .ladies-common-room-page .keyfocus-index::after {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 9999px;
            background: rgba(26, 61, 109, 0.9);
          }

          .ladies-common-room-page .keyfocus-text {
            color: #1f3550;
            line-height: 1.6;
            font-weight: 500;
          }

          .ladies-common-room-page .focus-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 11px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .ladies-common-room-page .focus-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .ladies-common-room-page .focus-index {
            width: 22px;
            height: 22px;
            border: 1px solid rgba(253, 184, 19, 0.8);
            background: var(--lcr-gold);
            color: #1a3d6d;
            font-size: 12px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .ladies-common-room-page .focus-list-item {
            border-bottom: 1px dashed rgba(26, 75, 124, 0.18);
            padding: 10px 0;
            color: var(--lcr-text);
            font-size: 14px;
            line-height: 1.55;
            padding-left: 10px;
            border-left: 2px solid rgba(26, 75, 124, 0.1);
          }

          .ladies-common-room-page .focus-list-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .ladies-common-room-page .panel-soft {
            background: var(--lcr-card-soft);
          }

          .ladies-common-room-page .pro-card {
            border-radius: 14px;
            transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease, background-color 240ms ease;
            border: 1px solid rgba(47, 58, 70, 0.14);
            background: var(--lcr-card);
            box-shadow: 0 10px 22px -16px rgba(17, 24, 39, 0.24);
            color: #333333;
          }

          .ladies-common-room-page .other-tab {
            background: #fffdf9;
            border: 1px solid rgba(47, 58, 70, 0.12);
            box-shadow: 0 6px 12px -14px rgba(11, 31, 56, 0.25);
            color: #333333;
          }

          .ladies-common-room-page .lcr-dark-section .other-tab {
            background: #f9f6f1;
          }

          .ladies-common-room-page .other-tab .pro-label {
            background: #fff3cf;
            color: #2f3a46;
            border-left-color: var(--lcr-gold);
          }

          .ladies-common-room-page .other-tab h2,
          .ladies-common-room-page .other-tab h3,
          .ladies-common-room-page .other-tab h4,
          .ladies-common-room-page .other-tab p,
          .ladies-common-room-page .other-tab .content-prose,
          .ladies-common-room-page .other-tab .text-brand-navy {
            color: #333333 !important;
          }

          .ladies-common-room-page .other-tab .title-accent {
            color: #2f3a46 !important;
          }

          .ladies-common-room-page .other-tab .focus-item {
            border-bottom: 1px solid rgba(47, 58, 70, 0.14);
          }

          .ladies-common-room-page .core-space-tab {
            border-radius: 0;
            clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);
          }

          .ladies-common-room-page .pro-card-soft-blue {
            background: linear-gradient(180deg, #214b82 0%, #1d416f 100%);
          }

          .ladies-common-room-page .pro-card-soft-gold {
            background: linear-gradient(180deg, #ffffff 0%, #fffde8 100%);
          }

          .ladies-common-room-page .pro-card:hover {
            transform: translateY(-2px);
            border-color: rgba(47, 58, 70, 0.35);
            box-shadow: 0 16px 28px -20px rgba(17, 24, 39, 0.3);
          }

          .ladies-common-room-page .other-tab:hover {
            border-color: rgba(47, 58, 70, 0.35);
            box-shadow: 0 14px 24px -18px rgba(11, 31, 56, 0.4);
          }

          .ladies-common-room-page .recreation-shell {
            background: linear-gradient(180deg, #f4f8ff 0%, #eef4ff 100%);
          }

          .ladies-common-room-page .recreation-card {
            background: transparent;
            border: none;
            border-left: 3px solid rgba(26, 61, 109, 0.35);
            border-bottom: 1px dashed rgba(26, 61, 109, 0.28);
            color: #333333;
            box-shadow: none;
            border-radius: 0;
            transition: transform 220ms ease, border-color 220ms ease, background-color 220ms ease;
            animation: recreationTabReveal 520ms ease both;
            position: relative;
            overflow: hidden;
          }

          .ladies-common-room-page .recreation-card:nth-child(2) {
            animation-delay: 120ms;
          }

          .ladies-common-room-page .recreation-card .recreation-title {
            color: #2f3a46;
          }

          .ladies-common-room-page .recreation-card .recreation-text {
            color: #333333;
          }

          .ladies-common-room-page .recreation-card:hover {
            transform: translateX(3px);
            border-left-color: rgba(253, 184, 19, 0.9);
            background: rgba(255, 255, 255, 0.78);
            box-shadow: none;
          }

          .ladies-common-room-page .recreation-card::after {
            content: "";
            position: absolute;
            top: 0;
            left: -110%;
            width: 60%;
            height: 100%;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
            transition: left 340ms ease;
            pointer-events: none;
          }

          .ladies-common-room-page .recreation-card:hover::after {
            left: 110%;
          }

          .ladies-common-room-page .recreation-card-active {
            background: #fff9ec;
            border-left-color: #fdb813;
            border-bottom-color: rgba(253, 184, 19, 0.55);
            box-shadow: none;
          }

          .ladies-common-room-page .amenities-classic {
            background: #1a3d6d;
          }

          .ladies-common-room-page .amenities-classic .pro-label {
            background: rgba(255, 255, 255, 0.12);
            color: #ffffff;
            border-left-color: var(--lcr-gold);
          }

          .ladies-common-room-page .amenities-classic .title-accent,
          .ladies-common-room-page .amenities-classic .text-brand-navy,
          .ladies-common-room-page .amenities-classic .content-prose,
          .ladies-common-room-page .amenities-classic p,
          .ladies-common-room-page .amenities-classic h3,
          .ladies-common-room-page .amenities-classic h4 {
            color: #ffffff !important;
          }

          .ladies-common-room-page .amenities-classic .amenity-tab p {
            color: #eaf3ff !important;
          }

          .ladies-common-room-page .amenities-classic .amenity-tail {
            background: rgba(253, 184, 19, 0.85) !important;
          }

          .ladies-common-room-page .support-section {
            background: var(--lcr-soft);
          }

          .ladies-common-room-page .support-card {
            background: #ffffff;
            border: 1px solid rgba(47, 58, 70, 0.2);
            box-shadow: 0 14px 24px -20px rgba(17, 24, 39, 0.32);
            position: relative;
            overflow: hidden;
          }

          .ladies-common-room-page .cleanliness-tab-shape {
            border-radius: 0;
            clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px));
          }

          .ladies-common-room-page .cleanliness-tab-shape::after {
            border-left-color: rgba(255, 255, 255, 0.95);
          }

          .ladies-common-room-page .cleanliness-tab-shape .pro-label {
            background: #ffffff;
            color: #2f3a46;
            border-left-color: rgba(255, 255, 255, 0.95);
          }

          .ladies-common-room-page .cleanliness-tab-shape .support-point::before {
            background: rgba(255, 255, 255, 0.95);
          }

          .ladies-common-room-page .health-support-shape {
            border-radius: 0;
            clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          }

          .ladies-common-room-page .support-card::after {
            content: "";
            position: absolute;
            inset: 0;
            border-left: 4px solid var(--lcr-gold);
            pointer-events: none;
          }

          .ladies-common-room-page .support-card .pro-label {
            background: #fff3cf;
            color: #2f3a46;
          }

          .ladies-common-room-page .support-card .title-accent {
            color: #2f3a46 !important;
          }

          .ladies-common-room-page .support-card p {
            color: #333333 !important;
          }

          .ladies-common-room-page .support-point {
            background: transparent;
            padding: 4px 0;
            color: #333333;
            margin-left: 18px;
            white-space: nowrap;
          }

          .ladies-common-room-page .cleanliness-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
            align-items: stretch;
          }

          .ladies-common-room-page .cleanliness-main {
            background: transparent;
            border: none;
            padding: 0;
          }

          .ladies-common-room-page .cleanliness-side {
            background: transparent;
            border: none;
            padding: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
          }

          .ladies-common-room-page .gold-top {
            border-top: 3px solid var(--lcr-gold);
          }

          .ladies-common-room-page .intro-panel {
            background: var(--lcr-card);
            border: 1px solid rgba(253, 184, 19, 0.25);
          }

          .ladies-common-room-page .intro-hero-tab {
            border-radius: 14px 0 14px 0;
            overflow: hidden;
          }

          .ladies-common-room-page .amenity-tab-shape {
            border-radius: 12px 0 12px 0;
            overflow: hidden;
          }

          .ladies-common-room-page .amenity-index-shape {
            border-radius: 10px 0 10px 0;
          }

          .ladies-common-room-page .amenity-tab {
            position: relative;
          }

          .ladies-common-room-page .amenity-tab::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, rgba(253, 184, 19, 1), rgba(253, 184, 19, 0.2));
            transform: scaleX(0.25);
            transform-origin: left;
            transition: transform 260ms ease;
          }

          .ladies-common-room-page .amenity-tab:hover {
            transform: translateY(-1px);
            box-shadow: 0 14px 24px -20px rgba(0, 0, 0, 0.85);
          }

          .ladies-common-room-page .amenity-tab:hover::before {
            transform: scaleX(1);
          }

          .ladies-common-room-page .filled-section {
            background-image: none;
          }

          .ladies-common-room-page .content-prose {
            max-width: 68ch;
            line-height: 1.85;
            font-size: 1.04rem;
          }

          .ladies-common-room-page .keyfocus-text,
          .ladies-common-room-page .recreation-text,
          .ladies-common-room-page .support-point {
            font-size: 1.04rem;
          }

          @media (min-width: 768px) {
            .ladies-common-room-page .content-prose,
            .ladies-common-room-page .keyfocus-text,
            .ladies-common-room-page .recreation-text,
            .ladies-common-room-page .support-point {
              font-size: 1.08rem;
            }
          }

          .ladies-common-room-page .recreation-tab {
            border: 1px solid rgba(253, 184, 19, 0.3);
            background: var(--lcr-card);
          }

          .ladies-common-room-page .recreation-tab-active {
            background: var(--lcr-card-soft);
            border-color: var(--lcr-gold);
            box-shadow: inset 0 0 0 1px rgba(253, 184, 19, 0.25);
          }

          .ladies-common-room-page .recreation-tab-title {
            display: inline-block;
            padding: 4px 10px;
            background: rgba(253, 184, 19, 0.16);
            color: #333333;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 10px;
          }

          .ladies-common-room-page .amenities-grid .pro-card {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .ladies-common-room-page .amenity-tail {
            margin-top: auto;
          }

          .ladies-common-room-page .mini-title {
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #d9e6f7;
            font-weight: 700;
            margin-bottom: 8px;
          }

          .ladies-common-room-page .lcr-light-section p,
          .ladies-common-room-page .lcr-light-section .content-prose,
          .ladies-common-room-page .lcr-light-section .focus-item span {
            color: var(--lcr-text) !important;
          }

          .ladies-common-room-page .pro-enter {
            animation: ladiesSectionEnter 520ms ease both;
          }

          @keyframes ladiesSectionEnter {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes recreationTabReveal {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div className="ladies-common-room-page">
      <PageBanner
        title="Ladies Common Room"
        breadcrumbs={[
          { label: 'Ladies Common Room' },
        ]}
      />

      <section className="pt-10 pb-6 md:pt-12 md:pb-7 lcr-dark-section filled-section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto section-wrap no-line reveal pro-enter">
            <div className="space-y-4">
              <div className="pro-card overview-main overview-shell intro-hero-tab p-5 md:p-6 gold-top">
                <div className="intro-heading-stack">
                  <div className="pro-label">Introduction</div>
                  <h2 className="title-accent text-2xl md:text-3xl font-bold text-brand-navy">
                    {general.title}
                  </h2>
                </div>
                <p
                  className="text-[#333333] leading-relaxed text-base content-prose mb-3"
                  style={{ fontFamily: '"Merriweather", Georgia, serif' }}
                >
                  {general.description}
                </p>
                <p
                  className="text-[#333333] leading-relaxed text-base content-prose"
                  style={{ fontFamily: '"Merriweather", Georgia, serif' }}
                >
                  The space is planned to support privacy, well-being, and meaningful interaction,
                  while ensuring a calm atmosphere during the academic day.
                </p>
              </div>

              <div className="pro-card overview-side panel-soft p-5 gold-top overview-shell">
                <div className="keyfocus-split">
                  <div>
                    <div className="aspect-[16/10] border border-[#fdb813]/50 bg-white/10 rounded-lg overflow-hidden">
                      <img
                        src={general.imageUrl ?? '/images/Facilities/Ladies Common Room/Ladies Common Room/Ladies Common Room/WhatsApp-Image-2021-12-07-at-3.07.24-PM-300x206.jpeg'}
                        alt="Ladies Common Room"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="keyfocus-column" style={{ fontFamily: '"Merriweather", Georgia, serif' }}>
                    <div className="pro-label keyfocus-label-tight">Key Focus Areas</div>
                    <div className="keyfocus-list">
                      {focusAreas.map((item) => (
                        <div key={item} className="keyfocus-item">
                          <span className="keyfocus-index" aria-hidden="true" />
                          <span className="keyfocus-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-10 md:pt-7 md:pb-12 lcr-light-section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto section-wrap no-line reveal pro-enter">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              <div className="lg:col-span-3 pro-card other-tab core-space-tab p-6 md:p-8 gold-top">
                <div className="intro-heading-stack">
                  <div className="pro-label">Core Space</div>
                  <h3
                    className="title-accent text-2xl md:text-3xl font-bold text-brand-navy"
                    style={{ fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' }}
                  >
                    Seating and Facilities
                  </h3>
                </div>
                <p
                  className="text-[#333333] leading-relaxed content-prose"
                  style={{ fontFamily: '"Merriweather", Georgia, serif' }}
                >
                  A Ladies Common Room with a comfortable seating arrangement is provided for all girl
                  students and lady faculty members of the college. The space is designed to offer a
                  calm and supportive environment where students can relax and interact with their
                  peers.
                </p>
              </div>

              <div className="lg:col-span-2 pro-card other-tab core-space-tab p-6 panel-soft gold-top">
                <div className="pro-label">Environment</div>
                <p
                  className="text-[#333333] leading-relaxed"
                  style={{ fontFamily: '"Merriweather", Georgia, serif' }}
                >
                  The room is arranged to support short breaks, informal interaction, and a calm
                  atmosphere throughout the day.
                </p>
                <div className="mt-4 h-px w-full bg-brand-gold/30" />
                <p
                  className="mt-4 text-sm text-[#4b5f78]"
                  style={{ fontFamily: '"Merriweather", Georgia, serif' }}
                >
                  Designed for comfort, functionality, and dignity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 lcr-dark-section amenities-classic">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto section-wrap no-line mb-8 reveal pro-enter">
            <div className="intro-heading-stack">
              <div className="pro-label">Student Comfort</div>
              <h3
                className="title-accent text-2xl md:text-3xl font-bold text-brand-navy"
                style={{ fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' }}
              >
                Additional Amenities
              </h3>
            </div>
            <p
              className="text-[#333333] leading-relaxed max-w-4xl content-prose"
              style={{ fontFamily: '"Merriweather", Georgia, serif' }}
            >
              The additional room is equipped with a dressing corner, toiletries, and a large
              mirror, allowing students to refresh themselves conveniently during the day.
            </p>
          </div>

          <div className="amenities-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
            {comfortItems.map((amenity, idx) => (
              <div
                key={amenity.title}
                className="group pro-card pro-card-soft-blue amenity-tab amenity-tab-shape p-4"
                style={{ transitionDelay: `${0.03 * idx}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 min-w-8 amenity-index-shape border border-[#fdb813]/70 bg-[#fdb813] flex items-center justify-center text-xs font-semibold text-[#1a3d6d]">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="h-px w-full bg-[#fdb813]/45" />
                </div>
                <h4
                  className="text-lg font-bold text-brand-navy mb-2"
                  style={{ fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' }}
                >
                  {amenity.title}
                </h4>
                <p
                  className="text-sm text-[#333333] leading-relaxed"
                  style={{ fontFamily: '"Merriweather", Georgia, serif' }}
                >
                  {amenity.description}
                </p>
                <div className="amenity-tail mt-4 h-1 w-10 bg-brand-blue/45" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 recreation-shell">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto section-wrap no-line reveal pro-enter">
            <div className="intro-heading-stack mb-7">
              <div className="pro-label">Recreation</div>
              <h3
                className="title-accent text-2xl md:text-3xl font-bold text-brand-navy"
                style={{ fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' }}
              >
                Recreation and Learning Activities
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {activityPanels.map((panel) => {
                return (
                  <div
                    key={panel.title}
                    className="pro-card recreation-card w-full p-6 text-left transition-all duration-300"
                  >
                    <div
                      className="recreation-title text-[13px] font-bold uppercase tracking-[0.08em] mb-2"
                    >
                      {panel.title}
                    </div>
                    <p
                      className="recreation-text text-[16px] leading-[1.8] content-prose"
                      style={{
                        fontFamily: '"Merriweather", Georgia, serif',
                      }}
                    >
                      {panel.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-6 md:pt-12 md:pb-7 lcr-light-section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto section-wrap no-line reveal pro-enter">
            <div className="pro-card other-tab support-card cleanliness-tab-shape p-6 md:p-7">
              <div className="intro-heading-stack">
                <div className="pro-label">Hygiene Standards</div>
                <h3 className="title-accent text-2xl md:text-3xl text-brand-navy font-bold">
                  Cleanliness and Maintenance
                </h3>
              </div>
              <div className="cleanliness-layout mt-2">
                <div className="cleanliness-main">
                  <p
                    className="text-[#333333] leading-relaxed"
                    style={{ fontFamily: '"Merriweather", Georgia, serif' }}
                  >
                    The Ladies Common Room is maintained clean and hygienic under proper supervision.
                    The space is regularly monitored to ensure that students have a comfortable and
                    safe environment.
                  </p>
                </div>
                <ul className="cleanliness-side list-disc">
                  <li className="support-point text-sm" style={{ fontFamily: '"Merriweather", Georgia, serif' }}>
                    Regular hygiene checks
                  </li>
                  <li className="support-point text-sm" style={{ fontFamily: '"Merriweather", Georgia, serif' }}>
                    Supervised upkeep standards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-10 md:pt-7 md:pb-12 support-section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto section-wrap no-line reveal pro-enter">
            <div className="pro-card support-card health-support-shape p-6 md:p-8 gold-top">
              <div className="intro-heading-stack">
                <div className="pro-label">Student Support</div>
                <h3
                  className="title-accent text-2xl md:text-3xl font-bold text-brand-navy"
                  style={{ fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' }}
                >
                  Health and Support Facilities
                </h3>
              </div>
              <p
                className="text-[#333333] leading-relaxed"
                style={{ fontFamily: '"Merriweather", Georgia, serif' }}
              >
                The common room is also used for relaxation, informal discussions, and
                communication among students. In case of emergency health issues, basic medical aid
                and support are available for girl students.
              </p>
            </div>
          </div>
        </div>
      </section>

      </div>
    </PageLayout>
  );
};

export default LadiesCommonRoom;
