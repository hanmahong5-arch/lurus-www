# Story 8-1: Event Tracking Infrastructure

## Story

As a product manager,
I want to track key user behavior events via lightweight beacons,
So that I can analyze user conversion funnels and optimize the experience.

## Status

Ready for Dev

## Context

- Epic 8: Analytics & Measurement
- FRs: FR43, FR44, FR45
- NFRs: NFR-S5
- Existing: `useTracking` composable in `src/composables/useTracking.ts` with sendBeacon batch + flush logic

## Acceptance Criteria

### AC1: useTracking composable validated
- **Given** useTracking composable (exists)
- **When** inspecting functionality
- **Then** supports sendBeacon API for event dispatch
- **And** event dispatch does not block user interaction

### AC2: Event payload structure
- **Given** event data
- **When** sent
- **Then** includes: eventName, timestamp, page URL
- **And** does not include personally identifiable information

### AC3: Graceful failure
- **Given** sendBeacon fails
- **When** dispatch error occurs
- **Then** fails silently, no impact on user experience
- **And** no error messages displayed

### AC4: Tracking endpoint configuration
- **Given** tracking endpoint
- **When** checking configuration
- **Then** sends to configured API URL (from VITE_API_URL)
- **And** endpoint path is `/v1/track`

### AC5: Analytics feature flag
- **Given** VITE_ANALYTICS_ENABLED env var
- **When** set to false
- **Then** track() becomes a no-op, no network requests
- **When** set to true
- **Then** events are batched and sent normally

### AC6: Page URL in event payload
- **Given** any tracked event
- **When** the event is queued
- **Then** the current page URL (window.location.href) is automatically included

## Technical Notes

- Enhance existing `useTracking.ts` — do not create a parallel tracker
- Add `pageUrl` field to TrackEvent interface
- Read endpoint from VITE_API_URL env var instead of hardcoded URL
- Guard all tracking behind VITE_ANALYTICS_ENABLED flag
- Export TrackEvent type for downstream consumers (Story 8-2)
- Maintain existing batch/flush architecture (queue + threshold + timer + visibilitychange/beforeunload)
- All tests in `src/composables/__tests__/useTracking.test.ts`

## Dev Checklist

- [ ] Write tests for useTracking (RED)
- [ ] Enhance useTracking composable (GREEN)
- [ ] Add tracking type to src/types/
- [ ] Export from src/types/index.ts
- [ ] Run vitest, all pass
- [ ] Run vue-tsc --noEmit, no new errors
- [ ] Code review checklist pass
