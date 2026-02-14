# Story 7-5: Getting Started Quick Access

## Story

As a visitor,
I want to navigate to core entry points from a dedicated section,
So that I can quickly start using Lurus.

## Status: done

## Epic: 7 - Portal & Quick Access (Wave 2)

## FRs: FR28

## Acceptance Criteria

### AC1: Section Structure
**Given** the Getting Started section renders
**When** displayed
**Then** it shows the title "Getting Started" / "开始使用 Lurus"
**And** 3 icon link buttons:
- API Documentation (-> docs.lurus.cn)
- Portal Links (-> #portal)
- GuShen Quantitative (-> gushen.lurus.cn)

### AC2: External Links
**Given** external link buttons (API Docs, GuShen)
**When** the visitor clicks
**Then** the link opens in a new tab
**And** the link has `rel="noopener noreferrer"`

### AC3: Internal Anchor Link
**Given** internal anchor button (#portal)
**When** the visitor clicks
**Then** the page smoothly scrolls to the Portal section

### AC4: Layout
**Given** the button layout
**When** rendered
**Then** buttons are centered
**And** spacing is fib-4

### AC5: Accessibility
**Given** each link button
**When** rendered
**Then** each has an appropriate `aria-label`
**And** can be reached via keyboard Tab navigation
**And** has a visible focus ring

### AC6: Scroll Reveal Animation
**Given** the Getting Started section
**When** the user scrolls to it
**Then** elements animate in with `reveal-fade-up`
**And** respects `prefers-reduced-motion: reduce`

## Technical Notes

- Data: Getting started items should be centralized in `src/data/gettingStarted.ts` per ADR-006
- Component: `src/components/GettingStarted/GettingStartedSection.vue`
- The component uses existing design tokens: cream/ink/ochre, card-sketchy, border-sketchy
- Uses `<style scoped>` with `@reference` pattern
- Section placed between PortalLinks and ProductShowcase in Home.vue page order (S6 in PRD structure)
- Internal anchor link (#portal) uses native smooth scrolling (html scroll-behavior: smooth)

## Dev Tasks

1. Create data file `src/data/gettingStarted.ts` with typed item definitions
2. Create type interface in `src/types/gettingStarted.ts`
3. Write tests for data file
4. Write tests for GettingStartedSection component
5. Implement GettingStartedSection component
6. Integrate into Home.vue between Portal and Products sections
7. Run vitest and typecheck
