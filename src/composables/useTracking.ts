interface TrackEvent {
  event: string
  properties?: Record<string, string | number | boolean>
  timestamp: number
}

const TRACK_ENDPOINT = 'https://api.lurus.cn/v1/track'
const FLUSH_INTERVAL_MS = 2000
const FLUSH_THRESHOLD = 10

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
    const blob = new Blob(
      [JSON.stringify({ events: batch })],
      { type: 'application/json' }
    )
    // sendBeacon returns false if queuing failed — graceful fail
    navigator.sendBeacon(TRACK_ENDPOINT, blob)
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
 */
export function track(event: string, properties?: Record<string, string | number | boolean>) {
  queue.push({
    event,
    properties,
    timestamp: Date.now()
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
