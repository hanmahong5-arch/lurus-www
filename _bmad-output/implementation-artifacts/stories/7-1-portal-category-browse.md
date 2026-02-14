# Story 7.1: Portal Category Browse

Status: done

## Story

As a visitor,
I want to browse portal links organized by 6 categories,
So that I can quickly find the tools or resources I need.

## Acceptance Criteria

1. **Section structure**: Portal section uses `<section id="portal" aria-label="知识门户">` with cream-100 background and decorative elements.
2. **6 category cards**: Display 6 category cards (Academic, Finance, AI Tech, Engineering, Medical, Legal) using sketchy-border style containers with category color left-border accents.
3. **Category headers**: Each card shows a color dot, Chinese name, and English name.
4. **Link display**: Each category shows its 8 links as `portal-link-btn` styled buttons with category-specific color classes.
5. **External links**: All links open in new tab with `target="_blank" rel="noopener noreferrer"`.
6. **Expand/collapse**: Categories initially show a preview of 4 representative links. An "Explore All 48 Links" toggle reveals all links across all categories.
7. **Section header**: Display section title and subtitle conveying "one-stop access to professional resources across 6 domains".
8. **CTA bar**: Section bottom includes CTABar component with "Need API access? [Get API Key]" messaging.
9. **Responsive grid**: Desktop 3x2 grid, tablet 2x3 grid, mobile single-column stack.
10. **Scroll reveal**: Use `reveal-fade-up` and `reveal-stagger` CSS classes for entry animations.
11. **Tracking**: Portal link clicks tracked via `useTracking` composable with `portal_click` event including link name and category.
12. **Data source**: All portal data read from `src/data/portalLinks.ts` (existing 48 links), no hardcoding.
13. **Tests**: Component tests cover section structure, category count, link rendering, expand/collapse, external link attributes, aria-label, and tracking.

## Tasks / Subtasks

- [x] Task 1: Write component tests (RED phase)
  - [x] 1.1 Create `src/components/Portal/__tests__/PortalLinks.test.ts`
  - [x] 1.2 Test: section has `id="portal"` and `aria-label`
  - [x] 1.3 Test: renders 6 category cards
  - [x] 1.4 Test: each category card has color dot, Chinese name, English name
  - [x] 1.5 Test: portal links render with correct href, target, rel attributes
  - [x] 1.6 Test: expand toggle shows all links when clicked
  - [x] 1.7 Test: CTABar renders at section bottom
  - [x] 1.8 Test: tracking function called on link click
  - [x] 1.9 Test: section header contains expected text
  - [x] 1.10 Test: reveal-stagger class present on grid

- [x] Task 2: Refactor PortalLinks component (GREEN phase)
  - [x] 2.1 Add expand/collapse state with `ref<boolean>` for showing all links vs preview
  - [x] 2.2 Compute displayed links per category (4 in collapsed, all 8 in expanded)
  - [x] 2.3 Add "Explore All 48 Links" / "Collapse" toggle button
  - [x] 2.4 Add `aria-label` to section element
  - [x] 2.5 Add `data-testid` attributes for test hooks
  - [x] 2.6 Ensure reveal-fade-up on section header and reveal-stagger on grid
  - [x] 2.7 Ensure category color dot, Chinese name, English name in category headers

- [x] Task 3: Verify and refactor (REFACTOR phase)
  - [x] 3.1 Run tests and verify all pass (21/21 pass)
  - [x] 3.2 Full suite regression check (476 pass, 4 skipped, 0 failures)
  - [x] 3.3 Code review checklist passed

## Dev Notes

### Architecture Constraints

- **Data centralization** (ADR-006): Portal data from `src/data/portalLinks.ts`, component only renders
- **Zero hardcoding**: Category names, URLs, colors all from data file; magic numbers extracted as named constants
- **Design system tokens**: cream/ink/ochre + portal category colors, no Tailwind default palette
- **CSS-first** (Key Principle #2): hover effects use pure CSS portal-link-btn styles
- **Scoped style**: `<style scoped>` must `@reference "../../styles/main.css"`

### File Manifest

| File | Operation | Description |
|------|-----------|-------------|
| `src/components/Portal/__tests__/PortalLinks.test.ts` | New | 21 component tests |
| `src/components/Portal/PortalLinks.vue` | Modify | Add expand/collapse, a11y, reveal classes |
