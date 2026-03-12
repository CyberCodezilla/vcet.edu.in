$t = $env:TEMP

[System.IO.File]::WriteAllText("$t\l1.md", @"
## Summary
``App.tsx`` contains the comment ``// commit test`` on line 1. Debug/test comments should not exist in production code.

## File
``App.tsx`` — line 1

## Fix
Delete the comment line.
"@)

[System.IO.File]::WriteAllText("$t\l2.md", @"
## Summary
``tailwind.config.js`` still exists in the repository root but is now a dead file — Tailwind CSS v4 reads all configuration from ``index.css @theme``. The file has a ``LEGACY`` banner comment but remains in the repo, confusing contributors.

## File
``tailwind.config.js``

## Fix
Delete the file (or move it to an ``archive/`` folder if history is needed). Update ``.gitignore`` or the README so contributors know v4 config lives in ``index.css``.
"@)

[System.IO.File]::WriteAllText("$t\l3.md", @"
## Summary
The Gallery component fetches images from Unsplash (an external CDN) rather than serving assets from the project's own ``public/Images/gallery/`` folder. This creates an external dependency for gallery content and images may change or disappear without notice.

## File
``components/Gallery.tsx``

## Fix
Replace Unsplash URLs with paths pointing to ``/Images/gallery/`` (already present in the repo under ``public/Images/gallery/``), or use the ``useGallery`` hook once it is connected to the backend.
"@)

[System.IO.File]::WriteAllText("$t\l4.md", @"
## Summary
Multiple footer links use ``href="#"`` as a placeholder, which scrolls the page to the top when clicked. These dead-links create a broken UX for visitors trying to navigate (e.g. Privacy Policy, Terms, sitemap links).

## File
``components/Footer.tsx``

## Fix
Either wire them to real destination URLs/routes or remove the links entirely until content is available. Do not leave ``href="#"`` in production.
"@)

[System.IO.File]::WriteAllText("$t\l5.md", @"
## Summary
No page sets a unique ``<title>`` tag. Every route shows the browser tab title as the default Vite/React placeholder. This hurts SEO and makes it impossible for users to tell tabs apart via bookmarks or history.

## Fix
Use ``react-helmet-async`` (or the native ``document.title`` API) to set a descriptive ``<title>`` on each page component. For example:

```tsx
import { Helmet } from 'react-helmet-async';

// Inside the component:
<Helmet><title>Admissions | VCET</title></Helmet>
```
"@)

[System.IO.File]::WriteAllText("$t\l6.md", @"
## Summary
``<img>`` elements in static sections (Gallery, Recruiters, Testimonials) do not carry ``loading="lazy"``. On the home page this forces the browser to download all images immediately, increasing Time-to-Interactive on slower connections.

## Fix
Add ``loading="lazy"`` to every ``<img>`` tag that is below the fold:
```tsx
<img src={url} alt={alt} loading="lazy" />
```
"@)

[System.IO.File]::WriteAllText("$t\l7.md", @"
## Summary
The design system defines ``--font-display`` in ``index.css @theme``, but some components apply ``font-serif`` (a Tailwind built-in) instead of ``font-display``. This causes visual inconsistency in headings across pages.

## Affected Files
- ``components/Hero.tsx``
- ``pages/about/AboutVCET.tsx``
- Several department pages

## Fix
Replace ``font-serif`` with ``font-display`` wherever a display/heading font is intended. The ``font-display`` utility maps to the custom font stack defined in ``@theme``.
"@)

[System.IO.File]::WriteAllText("$t\l8.md", @"
## Summary
In ``App.tsx`` the lazy import for the Patents page points to ``Parents.tsx`` (typo):

```tsx
const Patents = lazy(() => import('./pages/research/Parents'));
//                                                   ^^^^^^^ should be Patents
```

This will cause a runtime chunk-load error whenever the Patents route is visited.

## File
``App.tsx``

## Fix
```tsx
const Patents = lazy(() => import('./pages/research/Patents'));
```
"@)

[System.IO.File]::WriteAllText("$t\l9.md", @"
## Summary
``vite.config.ts`` sets ``server.host: '0.0.0.0'``, which binds the dev server to all network interfaces. On a shared network (office, campus Wi-Fi) this exposes the dev server to every device on the LAN without any authentication.

## File
``vite.config.ts``

## Fix
Remove ``host: '0.0.0.0'`` (or change it to ``host: 'localhost'``) for the default dev config. If LAN access is genuinely needed, document it and ensure it is never committed to the main branch.
"@)

Write-Host "All 9 Low issue files written"
