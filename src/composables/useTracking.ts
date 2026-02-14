import type { TrackEvent } from '@/types/tracking'

const TRACK_PATH = '/v1/track'
const FLUSH_INTERVAL_MS = 2000
const FLUSH_THRESHOLD = 10

/**
 * Resolve the tracking endpoint URL from environment configuration.
 * Falls back to empty string if env var is not set.
 */
function getTrackEndpoint(): string {
  const baseUrl = import.meta.env.VITE_API_URL || ''
  return `${baseUrl}${TRACK_PATH}`
}

/**
 * Check whether analytics tracking is enabled via environment flag.
 */
function isAnalyticsEnabled(): boolean {
  return import.meta.env.VITE_ANALYTICS_ENABLED === 'true'
}

let queue: TrackEvent[] = []
let flushTimer: ReturnType<typeof setTimeout> | null = null

function flush() {
  if (queue.length === 0) return

  const batch = [...queue]
  queue = []

  if (flushTimer) {
    clearTimeout(flushTimer)
    flushTimer = null
  }

  try {
    if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') {
      return
    }
    const blob = new Blob(
      [JSON.stringify({ events: batch })],
      { type: 'application/json' }
    )
    // sendBeacon returns false if queuing failed — graceful fail
    navigator.sendBeacon(getTrackEndpoint(), blob)
  } catch {
    // Graceful fail: endpoint may not exist yet
  }
}

function scheduleFlush() {
  if (flushTimer) return
  flushTimer = setTimeout(flush, FLUSH_INTERVAL_MS)
}

// Flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flush()
    }
  })
  window.addEventListener('beforeunload', flush)
}

/**
 * Track a user interaction event.
 * Events are batched and sent via sendBeacon.
 * No-op when VITE_ANALYTICS_ENABLED is not 'true'.
 */
export function track(event: string, properties?: Record<string, string | number | boolean>) {
  if (!isAnalyticsEnabled()) return

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  queue.push({
    event,
    properties,
    timestamp: Date.now(),
    pageUrl,
  })

  if (queue.length >= FLUSH_THRESHOLD) {
    flush()
  } else {
    scheduleFlush()
  }
}

/**
 * Composable that returns the track function.
 */
export function useTracking() {
  return { track }
}

/**
 * Test-only helper to inspect the internal queue.
 * Exported for unit tests — do not use in production code.
 */
export function _testGetQueue(): readonly TrackEvent[] {
  return queue
}
