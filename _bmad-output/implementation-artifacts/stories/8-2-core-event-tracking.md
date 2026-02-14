# Story 8-2: Core Event Tracking

## Story

As a product manager,
I want to track 3 core user interaction events (CTA click, Chat open, Portal link click),
So that I can measure key conversion metrics and optimize the user experience.

## Status

Done

## Context

- Epic 8: Analytics & Measurement (final story)
- FRs: FR43, FR44, FR45
- Depends on: Story 8-1 (useTracking composable with sendBeacon batching)
- This is the last story for the entire lurus-www project

## Acceptance Criteria

### AC1: CTA click tracking
- **Given** primary CTA button ("Get API Key")
- **When** visitor clicks
- **Then** triggers `cta_click` event
- **And** event includes `button_location` property (hero / final / cta_bar)

### AC2: Chat open tracking
- **Given** Chat floating button or ChatPreview "Start Chat" button
- **When** visitor clicks to open Chat
- **Then** triggers `chat_open` event
- **And** event includes `source` property when available

### AC3: Portal link click tracking
- **Given** any portal link
- **When** visitor clicks
- **Then** triggers `portal_link_click` event
- **And** event includes `link_category` and `link_name` properties

### AC4: Implementation integration
- **Given** event triggers
- **When** checking implementation
- **Then** corresponding components call useTracking in click handlers

### AC5: Verification
- **Given** tracking coverage
- **When** validating
- **Then** all 3 events can be observed in DevTools Network panel as sendBeacon requests

## Technical Notes

- Add `cta_click` tracking to `PrimaryButton.vue` with a `location` prop for button_location
- Chat open tracking already partially implemented in `App.vue` and `PortalChatPreview.vue`
- Normalize portal link event name to `portal_link_click` in `PortalLinks.vue` (currently `portal_click`)
- Ensure `PortalLinks.vue` passes `link_category` and `link_name` fields per spec
- All tracking calls go through `useTracking` composable (Story 8-1)
- Tests in component __tests__ directories

## Dev Checklist

- [ ] Write tests for cta_click tracking in PrimaryButton (RED)
- [ ] Write tests for chat_open tracking verification (RED)
- [ ] Write tests for portal_link_click tracking in PortalLinks (RED)
- [ ] Add tracking to PrimaryButton.vue with location prop (GREEN)
- [ ] Normalize portal event name to portal_link_click (GREEN)
- [ ] Verify chat_open tracking in App.vue and PortalChatPreview (GREEN)
- [ ] Run vitest, all pass
- [ ] Run vue-tsc --noEmit, no new errors
- [ ] Code review checklist pass
