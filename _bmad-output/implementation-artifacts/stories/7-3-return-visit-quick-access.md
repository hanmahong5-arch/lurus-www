# Story 7.3: Return Visit Quick Access

Status: done

## Story

As a return visitor,
I want to reach the portal section within 3 seconds by navigating to lurus.cn#portal via bookmark,
So that I can quickly access my frequently used tools every day without scrolling through marketing content.

## Acceptance Criteria

1. **Fast anchor arrival**: When a return visitor navigates to `lurus.cn#portal`, the page scrolls to the portal section within 3 seconds and the section is fully visible in the viewport.
2. **Skip scroll-triggered animations (FR27)**: When the URL contains a hash (e.g., `#portal`), `useScrollReveal` skips all scroll-triggered reveal animations — all `.reveal-*` elements are immediately set to visible without animation delays.
3. **Anchor-direct mode detection**: `useScrollReveal` detects hash navigation via `window.location.hash` and marks it as anchor-direct mode, making all reveal elements visible instantly.
4. **Router hash scrolling**: Vue Router's `scrollBehavior` handles hash-based navigation with `behavior: 'smooth'` to smoothly scroll to the target anchor element.
5. **Portal section has id="portal"**: The `PortalLinks` component renders a `<section id="portal">` element that serves as the scroll target.
6. **Performance regression guard**: Adding Wave 2 sections does not degrade `#portal` anchor jump speed — the 3-second target remains achievable.
7. **Tests**: Unit tests verify that `useScrollReveal` immediately applies `is-visible` to all reveal elements when `window.location.hash` is set, and that elements are properly observed when no hash is present.

## Tasks / Subtasks

- [x] Task 1: Write tests for anchor-direct mode in useScrollReveal (RED phase)
  - [x]1.1 Create `src/composables/__tests__/useScrollReveal.test.ts`
  - [x]1.2 Test: all reveal elements get `is-visible` immediately when `window.location.hash` is set
  - [x]1.3 Test: IntersectionObserver is NOT created when hash is present
  - [x]1.4 Test: IntersectionObserver IS created when no hash is present
  - [x]1.5 Test: reduced-motion preference also skips animation (existing behavior)
  - [x]1.6 Test: observer is disconnected on unmount

- [x] Task 2: Verify existing implementation (GREEN phase)
  - [x]2.1 Confirm `useScrollReveal` already handles `window.location.hash` (skip animations)
  - [x]2.2 Confirm `PortalLinks.vue` has `id="portal"` on the section element
  - [x]2.3 Confirm Vue Router `scrollBehavior` handles hash navigation with smooth scroll
  - [x]2.4 Add any missing functionality if needed

- [x] Task 3: Run tests and verify (REFACTOR phase)
  - [x]3.1 Run `npx vitest run` and verify all pass
  - [x]3.2 Run `npx vue-tsc --noEmit` for type checking
  - [x]3.3 Code review checklist verification

## Dev Notes

### Architecture Constraints

- **Composable pattern**: `useScrollReveal` handles anchor detection — no changes needed to individual components
- **Data centralization** (ADR-006): Portal data from `src/data/portalLinks.ts`
- **Performance**: Hash detection is O(1) check at mount time, zero runtime overhead
- **Design tokens**: cream/ink/ochre palette, no Tailwind default palette
- **Scoped style**: `<style scoped>` with `@reference` pattern
- **Reduced motion**: `prefers-reduced-motion: reduce` already supported

### File Manifest

| File | Operation | Description |
|------|-----------|-------------|
| `src/composables/__tests__/useScrollReveal.test.ts` | New | Tests for anchor-direct mode and animation skip |
| `src/composables/useScrollReveal.ts` | Verify | Confirm existing hash detection logic meets AC |
| `src/components/Portal/PortalLinks.vue` | Verify | Confirm id="portal" attribute exists |
| `src/router/index.ts` | Verify | Confirm scrollBehavior hash handling |

### FRs/NFRs Covered

- FR26: Return visitor reaches portal section within 3 seconds via bookmark/URL
- FR27: System skips scroll-triggered animations on anchor-direct navigation
