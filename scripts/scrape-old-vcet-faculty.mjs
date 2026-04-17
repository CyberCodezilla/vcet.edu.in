#!/usr/bin/env node

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SITEMAP_URL = "https://old.vcet.edu.in/page-sitemap.xml";
const OUTPUT_DIR = path.resolve(process.cwd(), "report");
const OUTPUT_JSON = path.join(OUTPUT_DIR, "old-site-faculty-scrape.json");
const OUTPUT_CSV = path.join(OUTPUT_DIR, "old-site-faculty-scrape.csv");

const DEPARTMENT_MAP = {
  "computer-engineering": "Computer Engineering",
  "information-technology": "Information Technology",
  "mechanical-engineering": "Mechanical Engineering",
  "electronics-and-telecommunication-engineering": "Electronics and Telecommunication Engineering",
  "civil-engineering-2": "Civil Engineering",
  "first-year-engineering": "First Year Engineering",
  "computer-science-and-engineering-data-science": "Computer Science and Engineering (Data Science)",
  "instrumentation-engineering": "Instrumentation Engineering",
  "artificial-intelligence-and-data-science": "Artificial Intelligence and Data Science",
  "electronics-engineering-vlsi-design-and-technology": "Electronics Engineering (VLSI Design and Technology)",
  "mms": "MMS",
};

const DEPARTMENT_SLUGS = Object.keys(DEPARTMENT_MAP);
const PERSON_TOKEN_RE = /(^|[-_/])(dr|mr|mrs|ms|prof)([-_/]|$)/i;
const FACULTY_KEYWORD_RE = /(assistant professor|associate professor|professor|head of department|hod|lecturer|faculty|dean)/i;

function decodeHtmlEntities(input) {
  return input
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => {
      const value = Number.parseInt(code, 10);
      return Number.isFinite(value) ? String.fromCharCode(value) : "";
    });
}

function stripTags(input) {
  return decodeHtmlEntities(input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function titleCaseFromSlug(slug) {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function detectDepartment(urlPath) {
  const normalized = urlPath.toLowerCase();
  for (const slug of DEPARTMENT_SLUGS) {
    if (normalized.includes(`/${slug}/`) || normalized.endsWith(`/${slug}`)) {
      return DEPARTMENT_MAP[slug];
    }
  }

  if (normalized.includes("_computer-engineering")) return DEPARTMENT_MAP["computer-engineering"];
  if (normalized.includes("_information-technology")) return DEPARTMENT_MAP["information-technology"];
  if (normalized.includes("_extc") || normalized.includes("telecommunication")) return DEPARTMENT_MAP["electronics-and-telecommunication-engineering"];
  if (normalized.includes("civil-hod")) return DEPARTMENT_MAP["civil-engineering-2"];

  return "Unknown";
}

function canonicalizeDepartment(rawDepartment, urlPath) {
  const fallback = detectDepartment(urlPath);
  if (!rawDepartment) return fallback;

  const normalized = rawDepartment
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const aliases = {
    "computer engineering": "Computer Engineering",
    "computer science and engineering data science": "Computer Science and Engineering (Data Science)",
    "computer science engineering data science": "Computer Science and Engineering (Data Science)",
    "information technology": "Information Technology",
    "mechanical engineering": "Mechanical Engineering",
    "electronics and telecommunication engineering": "Electronics and Telecommunication Engineering",
    "electronics and telecommunication engineerig": "Electronics and Telecommunication Engineering",
    "civil engineering": "Civil Engineering",
    "first year engineering": "First Year Engineering",
    "instrumentation engineering": "Instrumentation Engineering",
    "artificial intelligence and data science": "Artificial Intelligence and Data Science",
    "masters of management studies": "MMS",
    "master of management studies": "MMS",
    "mms": "MMS",
  };

  return aliases[normalized] || fallback;
}

function isPotentialFacultyUrl(urlString) {
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch {
    return false;
  }

  if (parsed.hostname !== "old.vcet.edu.in") return false;

  const pathname = parsed.pathname.toLowerCase().replace(/\/+$/, "");
  if (!pathname || pathname === "") return false;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return false;

  if (pathname.startsWith("/mms/faculty/") && segments.length >= 3) return true;

  if (PERSON_TOKEN_RE.test(pathname)) {
    const hasDepartment = DEPARTMENT_SLUGS.some((slug) => pathname.includes(`/${slug}/`));
    if (hasDepartment || pathname.includes("_computer-engineering") || pathname.includes("_information-technology") || pathname.includes("_extc") || pathname.includes("civil-hod") || pathname.startsWith("/mms/")) {
      return true;
    }
  }

  for (const slug of DEPARTMENT_SLUGS) {
    if (pathname.includes(`/${slug}/`)) {
      const after = pathname.split(`/${slug}/`)[1] || "";
      if (after && after.length > 2) return true;
    }
  }

  return false;
}

function extractLocsFromSitemap(xmlText) {
  const matches = [...xmlText.matchAll(/<loc>(.*?)<\/loc>/gi)];
  return [...new Set(matches.map((m) => m[1].trim()))];
}

function extractImageUrls(html, pageUrl) {
  const images = [];
  const srcMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  for (const match of srcMatches) {
    const src = match[1].trim();
    try {
      const absolute = new URL(src, pageUrl).toString();
      if (!/logo|icon|favicon|header|footer/i.test(absolute)) {
        images.push(absolute);
      }
    } catch {
      // ignore malformed image URL
    }
  }
  return [...new Set(images)];
}

function extractLines(html) {
  const blockToNewline = html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\s*\/\s*(p|h1|h2|h3|h4|h5|h6|li|tr|div|section|article)\s*>/gi, "\n");

  const text = decodeHtmlEntities(blockToNewline.replace(/<[^>]+>/g, " "));
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0);
}

function normalizeKey(rawKey) {
  return rawKey
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9 ]+/g, "")
    .trim();
}

function uniqueNonEmpty(values) {
  return [...new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))];
}

function cleanLinkLikeValue(value, pageUrl) {
  let text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  
  text = text.replace(/^([a-z]+)\s*:\s*\/\//i, "$1://");
  
  // Repair malformed values like "https://https//example.com".
  text = text.replace(/^https?:\/\/https\/{1,2}/i, "https://");
  text = text.replace(/^https?:\/\/http\/{1,2}/i, "http://");
  text = text.replace(/^https?:\/\/https\/\/(.+)$/i, "https://$1");
  text = text.replace(/^https?:\/\/http\/\/(.+)$/i, "http://$1");

  if (/^\/\/https?:\/\//i.test(text)) {
    text = text.slice(2);
  }

  if (/^\/\//.test(text)) {
    text = `https:${text}`;
  }

  if (/^www\./i.test(text)) {
    text = `https://${text}`;
  }

  if (/^https?:\/\//i.test(text)) {
    try {
      return new URL(text).toString();
    } catch {
      return text;
    }
  }

  try {
    return new URL(text, pageUrl).toString();
  } catch {
    return text;
  }
}

function isUsefulLink(link, pageUrl) {
  if (!link || !/^https?:\/\//i.test(link)) {
    return false;
  }

  try {
    const target = new URL(link);
    const page = new URL(pageUrl);

    // Ignore hash-only/self links such as "#content" and same-page anchors.
    if (target.origin === page.origin && target.pathname === page.pathname) {
      return false;
    }

    // Ignore old-site internal links; keep external profile links only.
    if (target.hostname === page.hostname) {
      return false;
    }

    // Guard against malformed remnants that parse to fake hostnames.
    if (/^(http|https)$/i.test(target.hostname)) {
      return false;
    }

    if (!target.hostname || /localhost/i.test(target.hostname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
function extractLooseKeyValueRows(lines) {
  const rows = {};

  for (const line of lines) {
    if (!line.includes(":")) {
      continue;
    }

    const splitIndex = line.indexOf(":");
    const keyRaw = line.slice(0, splitIndex);
    const valueRaw = line.slice(splitIndex + 1);

    const key = normalizeKey(keyRaw);
    const value = valueRaw.replace(/\s+/g, " ").trim();
    if (!key || !value || value.length > 400) {
      continue;
    }

    if (!rows[key]) {
      rows[key] = value;
    }
  }

  return rows;
}

function extractAnchorSignals(html, pageUrl) {
  const signals = [];
  const anchorRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = anchorRegex.exec(html)) !== null) {
    const href = cleanLinkLikeValue(match[1], pageUrl);
    const anchorText = stripTags(match[2]);
    const before = stripTags(html.slice(Math.max(0, match.index - 180), match.index));
    const after = stripTags(html.slice(match.index + match[0].length, match.index + match[0].length + 120));
    const context = `${before} ${anchorText} ${after}`.replace(/\s+/g, " ").trim();

    if (!href) {
      continue;
    }

    signals.push({
      href,
      anchorText,
      context,
    });
  }

  return signals;
}

function buildProfileExtras(kvRows, looseKvRows, anchorSignals, flatText, pageUrl) {
  const mergedKvRows = { ...looseKvRows, ...kvRows };

  const websiteCandidates = [];
  const youtubeCandidates = [];
  const resourceEntries = [];
  const membershipEntries = [];
  const roleEntries = [];
  const awardEntries = [];

  for (const [key, rawValue] of Object.entries(mergedKvRows)) {
    const normalizedKey = normalizeKey(key);
    const value = String(rawValue ?? "").replace(/\s+/g, " ").trim();
    const linkValue = cleanLinkLikeValue(value, pageUrl);

    if ((/youtube/.test(normalizedKey) || /youtube\.com|youtu\.be/i.test(linkValue)) && isUsefulLink(linkValue, pageUrl)) {
      youtubeCandidates.push(linkValue);
    }

    if (/(website|scopus|scholar|vidwan|ict link|linkedin)/.test(normalizedKey) && isUsefulLink(linkValue, pageUrl)) {
      websiteCandidates.push(linkValue);
    }

    if (/(resource|e resources|e resources|classroom)/.test(normalizedKey)) {
      if (isUsefulLink(linkValue, pageUrl)) {
        resourceEntries.push(linkValue);
      } else if (value && !/^#/.test(value)) {
        resourceEntries.push(value);
      }
    }

    if (/member/.test(normalizedKey)) {
      membershipEntries.push(value);
    }

    if (/award|honou?r|achievement/.test(normalizedKey)) {
      awardEntries.push(value);
    }

    if (/role|responsibil/.test(normalizedKey)) {
      roleEntries.push(value);
    }
  }

  for (const signal of anchorSignals) {
    const context = normalizeKey(`${signal.anchorText} ${signal.context}`);
    const href = signal.href;

    if (!href || !isUsefulLink(href, pageUrl)) {
      continue;
    }

    if (/youtube/.test(context) || /youtube\.com|youtu\.be/i.test(href)) {
      youtubeCandidates.push(href);
      continue;
    }

    if (/(website|scopus|scholar|vidwan|ict|linkedin)/.test(context)) {
      websiteCandidates.push(href);
      continue;
    }

    if (/(resource|e resource|classroom)/.test(context)) {
      resourceEntries.push(href);
      continue;
    }

    if (/^https?:\/\//i.test(href)) {
      websiteCandidates.push(href);
    }
  }

  const classroomMatches = [...flatText.matchAll(/google\s+classroom\s+code\s*[:\-]?\s*([a-z0-9]{4,})/gi)];
  for (const match of classroomMatches) {
    const code = String(match[1] ?? "").trim();
    if (code) {
      resourceEntries.push(`Google classroom code: ${code}`);
    }
  }

  const website = uniqueNonEmpty(websiteCandidates)[0] || "";
  const youtube = uniqueNonEmpty(youtubeCandidates)[0] || "";
  const resources = uniqueNonEmpty(resourceEntries).join(" | ");
  const memberships = uniqueNonEmpty(membershipEntries).join(" | ");
  const roles = uniqueNonEmpty(roleEntries).join(" | ");
  const awards = uniqueNonEmpty(awardEntries).join(" | ");

  return {
    onlineLinks: {
      website,
      youtube,
      resources,
    },
    memberships,
    roles,
    awards,
    keyValues: Object.entries(mergedKvRows).map(([key, value]) => ({
      key,
      value: String(value ?? "").replace(/\s+/g, " ").trim(),
    })),
  };
}

function extractKeyValueRows(html) {
  const rows = {};
  const rowMatches = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];

  for (const rowMatch of rowMatches) {
    const cells = [...rowMatch[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)]
      .map((cell) => stripTags(cell[1]))
      .map((cell) => cell.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    if (cells.length < 2) continue;
    const key = normalizeKey(cells[0]);
    const value = cells[1].trim();
    if (!key || !value) continue;
    rows[key] = value;
  }

  return rows;
}

function findFirst(regex, text, group = 1) {
  const match = text.match(regex);
  return match ? match[group].trim() : "";
}

function extractProfileData(html, urlString) {
  const lines = extractLines(html);
  const flatText = lines.join(" | ");
  const kvRows = extractKeyValueRows(html);
  const looseKvRows = extractLooseKeyValueRows(lines);
  const anchorSignals = extractAnchorSignals(html, urlString);
  const extras = buildProfileExtras(kvRows, looseKvRows, anchorSignals, flatText, urlString);

  const h1 = stripTags(findFirst(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html));
  const title = stripTags(findFirst(/<title[^>]*>([\s\S]*?)<\/title>/i, html));

  let name = h1;
  if (!name || /vidyavardhini|vcet|faculty/i.test(name)) {
    const fromTitle = title.split("|")[0].trim();
    if (fromTitle && !/vidyavardhini|vcet/i.test(fromTitle)) {
      name = fromTitle;
    }
  }

  if (!name) {
    const pathPart = new URL(urlString).pathname.split("/").filter(Boolean).pop() || "";
    name = titleCaseFromSlug(pathPart);
  }

  const designation =
    kvRows["designation"] ||
    findFirst(/(assistant professor|associate professor|professor|head of department|hod|lecturer|dean[^|]*)/i, flatText, 1) ||
    "";

  const qualification =
    kvRows["qualifications"] ||
    kvRows["qualifications with classgrade"] ||
    kvRows["qualification"] ||
    "";

  const experience =
    kvRows["total experience in years"] ||
    kvRows["experience"] ||
    "";

  const email =
    kvRows["email address"] ||
    kvRows["email"] ||
    findFirst(/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i, flatText, 1) ||
    "";

  const phone =
    kvRows["contact no"] ||
    kvRows["mobile no"] ||
    "";

  const imageCandidates = extractImageUrls(html, urlString);
  const profileImage = imageCandidates.find((url) => /wp-content\/uploads/i.test(url)) || imageCandidates[0] || "";

  const urlPath = new URL(urlString).pathname;
  const department = canonicalizeDepartment(kvRows["department"] || "", urlPath);

  const hasPersonName = /^(dr|mr|mrs|ms|prof)\.?\s+/i.test(name) || PERSON_TOKEN_RE.test(urlPath);
  const hasFacultyTableSignal = Boolean(
    kvRows["designation"] ||
      kvRows["email address"] ||
      kvRows["qualifications"] ||
      kvRows["qualifications with classgrade"] ||
      kvRows["total experience in years"] ||
      looseKvRows["designation"] ||
      looseKvRows["email"] ||
      looseKvRows["qualifications"] ||
      looseKvRows["qualification"] ||
      extras.onlineLinks.website ||
      extras.onlineLinks.youtube
  );

  if (!hasPersonName || !hasFacultyTableSignal) {
    return null;
  }

  return {
    name,
    designation,
    qualification,
    experience,
    email,
    phone,
    department,
    profileUrl: urlString,
    profileImage,
    hasFacultyKeyword: FACULTY_KEYWORD_RE.test(flatText),
    extras,
  };
}

function toCsv(records) {
  const headers = [
    "name",
    "designation",
    "qualification",
    "experience",
    "email",
    "phone",
    "department",
    "profileUrl",
    "profileImage",
  ];

  const escapeCell = (value) => {
    const str = String(value ?? "");
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = records.map((record) => headers.map((h) => escapeCell(record[h])).join(","));
  return `${headers.join(",")}\n${rows.join("\n")}\n`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "VCET-Faculty-Scraper/1.0",
      Accept: "text/html,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.text();
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  });

  await Promise.all(workers);
  return results;
}

async function main() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const sitemapXml = await fetchText(SITEMAP_URL);
  const allUrls = extractLocsFromSitemap(sitemapXml);
  const facultyUrls = allUrls.filter(isPotentialFacultyUrl);

  console.log(`Total sitemap URLs: ${allUrls.length}`);
  console.log(`Potential faculty URLs: ${facultyUrls.length}`);

  const scrapeResults = await mapWithConcurrency(facultyUrls, 8, async (url) => {
    try {
      const html = await fetchText(url);
      const profile = extractProfileData(html, url);
      if (!profile) {
        return {
          ok: false,
          skipped: true,
          error: "Not a standalone faculty profile page",
          url,
        };
      }
      return { ok: true, profile };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        url,
      };
    }
  });

  const successful = scrapeResults.filter((item) => item.ok).map((item) => item.profile);
  const failed = scrapeResults.filter((item) => !item.ok).map((item) => ({ url: item.url, error: item.error, skipped: Boolean(item.skipped) }));

  const normalized = successful
    .map((record) => ({
      ...record,
      name: record.name.replace(/\s+/g, " ").trim(),
      designation: record.designation.replace(/\s+/g, " ").trim(),
      qualification: record.qualification.replace(/\s+/g, " ").trim(),
      experience: record.experience.replace(/\s+/g, " ").trim(),
    }))
    .sort((a, b) => {
      if (a.department !== b.department) return a.department.localeCompare(b.department);
      return a.name.localeCompare(b.name);
    });

  await mkdir(OUTPUT_DIR, { recursive: true });

  const payload = {
    source: {
      sitemap: SITEMAP_URL,
      generatedAt: new Date().toISOString(),
      totalSitemapUrls: allUrls.length,
      potentialFacultyUrls: facultyUrls.length,
      successfulProfiles: normalized.length,
      failedProfiles: failed.length,
    },
    profiles: normalized,
    failed,
  };

  await writeFile(OUTPUT_JSON, JSON.stringify(payload, null, 2), "utf8");
  await writeFile(OUTPUT_CSV, toCsv(normalized), "utf8");

  const byDepartment = normalized.reduce((acc, profile) => {
    const key = profile.department || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  console.log("Scrape complete.");
  console.log(`JSON: ${OUTPUT_JSON}`);
  console.log(`CSV : ${OUTPUT_CSV}`);
  console.log("Department counts:");
  for (const [department, count] of Object.entries(byDepartment).sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`- ${department}: ${count}`);
  }

  if (failed.length > 0) {
    console.log(`Failed pages: ${failed.length}`);
  }
}

main().catch((error) => {
  console.error("Scrape failed:", error);
  process.exitCode = 1;
});
