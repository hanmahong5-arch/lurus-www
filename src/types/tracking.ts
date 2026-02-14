/**
 * Event tracking type definitions
 * Used by useTracking composable for analytics beacon events
 */

/**
 * Represents a tracked user interaction event.
 * Sent via sendBeacon API in batched payloads.
 */
export interface TrackEvent {
  /** Event name identifier (e.g. 'cta_click', 'chat_open', 'portal_link_click') */
  event: string
  /** Optional metadata about the event context */
  properties?: Record<string, string | number | boolean>
  /** Unix timestamp in milliseconds when the event was queued */
  timestamp: number
  /** Page URL where the event occurred */
  pageUrl: string
}

/**
 * Payload structure sent to the tracking endpoint.
 * Events are batched into a single request.
 */
export interface TrackPayload {
  events: TrackEvent[]
}
