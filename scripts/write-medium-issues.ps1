$t = $env:TEMP

[System.IO.File]::WriteAllText("$t\m1.md", @"
## Summary
``SectionHeader`` renders ``title`` inside both its own ``<h2>`` and a child ``<SectionTitle>`` component, causing every section heading to appear twice in the DOM — once visible, once hidden (or both visible on some screen sizes).

## File
``components/SectionHeader.tsx``

## Steps to Reproduce
1. Open any page that uses ``<SectionHeader title="Our Departments" />``
2. Inspect the DOM — the title string appears in two sibling elements

## Expected
Title appears exactly once.

## Fix
Remove the duplicate render slot — either use only the ``<SectionTitle>`` child or render the raw ``title`` prop directly; do not do both.
"@)

[System.IO.File]::WriteAllText("$t\m2.md", @"
## Summary
Multiple components use array indices as React ``key`` props when mapping over dynamic lists. This can cause silent state bugs, mis-ordered animations, and accessibility issues when items are reordered or removed.

## Affected Files
- ``components/Recruiters.tsx`` — ``key={index}`` on recruiter cards
- ``components/Testimonials.tsx`` — ``key={index}`` on testimonial cards
- ``components/Gallery.tsx`` — ``key={index}`` on image tiles
- ``components/Achievements.tsx`` — ``key={index}`` on achievement rows

## Fix
Use a stable unique field from each item (e.g. ``item.id``, ``item.slug``, or ``item.name``) as the key instead of the array index.
"@)

[System.IO.File]::WriteAllText("$t\m3.md", @"
## Summary
Both ``App.tsx`` and several individual page components call ``<ScrollToTop />`` (or invoke the equivalent ``useEffect``). On navigation the scroll-to-top fires twice, producing a jarring double-scroll on slow connections.

## Affected Files
- ``App.tsx`` — mounts ``<ScrollToTop />`` globally
- ``pages/departments/DeptComputerEngg.tsx`` (and sibling dept pages) — each mounts its own ``<ScrollToTop />``

## Fix
Keep exactly one ``<ScrollToTop />`` at the router root in ``App.tsx`` and remove all per-page instances.
"@)

[System.IO.File]::WriteAllText("$t\m4.md", @"
## Summary
Footer links use raw ``<a href="/">`` anchor tags instead of React Router ``<Link to="/">``. On click the browser performs a full-page reload, losing all in-memory state and resetting the SPA.

## File
``components/Footer.tsx``

## Fix
Replace every ``<a href="...">`` that points to an internal route with ``<Link to="...">`` from ``react-router-dom``.
"@)

[System.IO.File]::WriteAllText("$t\m5.md", @"
## Summary
``tsconfig.json`` does not enable ``"strict": true``. Without strict mode, TypeScript silently allows ``any`` types, missing null checks, and implicit ``any`` parameters — the very issues that caused the stale-closure bug (H-5) and silent data-loss (H-7).

## File
``tsconfig.json``

## Fix
Add to ``compilerOptions``:
```json
"strict": true
```
Then address the type errors that surface.
"@)

[System.IO.File]::WriteAllText("$t\m6.md", @"
## Summary
Several admin pages render placeholder UI that is visible to site visitors: grey skeleton boxes with "Lorem ipsum" text, tables populated with dummy rows, and "Coming soon" banners on publicly accessible routes.

## Affected Areas
- ``admin/pages/Dashboard.tsx`` — stat cards with hardcoded zeros
- ``admin/pages/Placements.tsx`` — table with example rows
- ``components/ExploreUs.tsx`` — "Coming soon" overlay still present

## Fix
Either replace placeholder content with real API-connected data, or gate the section behind a feature flag so it is not visible to site visitors.
"@)

[System.IO.File]::WriteAllText("$t\m7.md", @"
## Summary
The Admissions page CTA buttons ("Download Brochure", "Apply Now") have ``href="#"`` and no ``onClick`` handler. Clicking them scrolls the page to the top rather than triggering any action, creating a confusing UX dead end for prospective students.

## File
``components/Admissions.tsx`` and ``pages/admissions/``

## Fix
Wire buttons to an actual PDF download URL or the enquiry form. If not yet ready, disable the button and add a tooltip explaining availability.
"@)

[System.IO.File]::WriteAllText("$t\m8.md", @"
## Summary
Colour values are hardcoded as hex strings in JSX ``style`` props and inline Tailwind ``[#xxxxxx]`` arbitrary classes scattered across components, bypassing the design token system defined in ``index.css @theme``.

## Examples
- ``components/Hero.tsx``: ``style={{ background: '#1a1a2e' }}``
- ``components/DepartmentPage.tsx``: ``className="text-[#2563eb]"``
- ``pages/about/``: multiple ``bg-[#f5f5f5]`` instances

## Fix
Replace every hardcoded hex with the appropriate ``brand-*`` token from ``@theme`` (e.g. ``text-brand-blue``, ``bg-brand-light``).
"@)

[System.IO.File]::WriteAllText("$t\m9.md", @"
## Summary
The recruiter / placement-partner logo array is defined three separate times — once in ``components/Recruiters.tsx``, once in ``services/placementPartners.ts`` (as a stub), and once inlined in ``pages/placements/``. Any update must be made in three places and they are already out of sync.

## Fix
Define the recruiter data (or fetch it from the API) in exactly one place — ``services/placementPartners.ts`` — and import it wherever needed.
"@)

[System.IO.File]::WriteAllText("$t\m10.md", @"
## Summary
``DepartmentPage`` creates a new ``IntersectionObserver`` instance inside a ``useEffect`` that re-runs every time the active tab changes. Observers accumulate in memory and each fires its callback, causing animated stat counters to restart on every tab switch.

## File
``components/DepartmentPage.tsx``

## Fix
Add a cleanup function (``observer.disconnect()``) and a stable dependency array so the observer is only created once, not on every tab change.
"@)

[System.IO.File]::WriteAllText("$t\m11.md", @"
## Summary
Icon-only social media links in the footer and header have no ``aria-label`` attribute. Screen readers announce them as unlabelled interactive elements, making the site inaccessible for keyboard and assistive-technology users.

## Affected Files
- ``components/Footer.tsx`` — Facebook, Instagram, LinkedIn, YouTube icon links
- ``components/Header.tsx`` — social icons in mobile nav

## Fix
```tsx
<a href="..." aria-label="Follow us on Instagram" ...>
  <InstagramIcon />
</a>
```
"@)

[System.IO.File]::WriteAllText("$t\m12.md", @"
## Summary
The ``TopBanner`` ticker text is a hardcoded string literal in the component rather than being driven by the ``newsTicker`` API/hook that already exists (``useNewsTicker.ts``, ``services/newsTicker.ts``). The admin panel's News Ticker management screen therefore has no visible effect on the banner.

## File
``components/TopBanner.tsx``

## Fix
Replace the hardcoded string with the result of ``useNewsTicker()`` and render each ticker item dynamically.
"@)

Write-Host "All 12 medium issue files written successfully"
