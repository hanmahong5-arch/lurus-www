# Story 7.2: Portal Link Interaction

Status: done

## Story

As a visitor,
I want to click portal links and access external resources with clear visual feedback,
So that I can quickly reach the tools I need while understanding where each link leads.

## Acceptance Criteria

1. **External links**: All portal links open in a new tab (`target="_blank"`) with `rel="noopener noreferrer"` (NFR-S4).
2. **Hover feedback**: Links display visual hover feedback (translateY lift + box-shadow via portal-link-btn CSS class).
3. **Description tooltip**: Each link shows a `title` attribute tooltip with its description (from `portalLinks.ts` `desc` field).
4. **Data source**: All link data read from `src/data/portalLinks.ts` (ADR-006), no hardcoding.
5. **Accessibility - link text**: Each link has clear, descriptive text (the link `name` from data).
6. **Accessibility - new tab hint**: Links opening in new tabs have an aria-accessible visual indicator (external link icon with `aria-hidden="true"`).
7. **Tracking**: Portal link clicks tracked via `useTracking` composable with `portal_click` event including `link` name and `category` id (FR45).
8. **Link icon**: Each portal link button includes an external-link SVG icon that appears on hover (opacity transition), with `aria-hidden="true"`.
9. **Tests**: Component tests cover link href correctness, target/rel attributes, hover state class, title tooltip, tracking on click, external icon presence and aria-hidden, and data source verification.

## Tasks / Subtasks

- [x] Task 1: Write component tests (RED phase)
  - [x]1.1 Create `src/components/Portal/__tests__/PortalLinkInteraction.test.ts`
  - [x]1.2 Test: each link has correct href matching portalLinks data
  - [x]1.3 Test: each link has target="_blank"
  - [x]1.4 Test: each link has rel="noopener noreferrer"
  - [x]1.5 Test: each link has a title attribute with description text
  - [x]1.6 Test: each link contains an external link SVG icon with aria-hidden="true"
  - [x]1.7 Test: link click triggers tracking with correct event name and properties
  - [x]1.8 Test: links use data from portalLinks.ts (verify first link matches data)
  - [x]1.9 Test: link text matches the name field from data

- [x] Task 2: Verify existing implementation covers story requirements (GREEN phase)
  - [x]2.1 Verify PortalLinks.vue already implements all required attributes
  - [x]2.2 Add any missing functionality if needed

- [x] Task 3: Run tests and verify (REFACTOR phase)
  - [x]3.1 Run tests and verify all pass
  - [x]3.2 Full suite regression check
  - [x]3.3 Code review checklist

## Dev Notes

### Architecture Constraints

- **Data centralization** (ADR-006): Link data from `src/data/portalLinks.ts`, component only renders
- **Zero hardcoding**: URLs, names, descriptions all from data file
- **Design system tokens**: cream/ink/ochre + portal category colors, no Tailwind default palette
- **CSS-first** (Key Principle #2): hover effects use pure CSS portal-link-btn styles defined in main.css
- **Scoped style**: `<style scoped>` must `@reference "../../styles/main.css"`
- **Security**: All external links must have `rel="noopener noreferrer"` (NFR-S4)

### File Manifest

| File | Operation | Description |
|------|-----------|-------------|
| `src/components/Portal/__tests__/PortalLinkInteraction.test.ts` | New | Interaction-focused component tests |
| `src/components/Portal/PortalLinks.vue` | Verify | Confirm existing implementation meets all AC |

### FRs/NFRs Covered

- FR25: Portal link click to external resources
- NFR-S4: External links rel="noopener noreferrer"
- FR45: Portal link click tracking
