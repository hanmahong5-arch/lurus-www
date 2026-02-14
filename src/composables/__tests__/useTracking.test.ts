import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Module-level mocks must be set up before imports
vi.stubGlobal('navigator', {
  sendBeacon: vi.fn(() => true),
})

// Re-import for each test to reset module state
let trackModule: typeof import('../useTracking')

/**
 * Helper to dynamically import the tracking module with fresh state.
 * Env vars must be set before calling this.
 */
async function importFreshModule(analyticsEnabled = 'true', apiUrl = 'https://api.test.local') {
  vi.stubEnv('VITE_API_URL', apiUrl)
  vi.stubEnv('VITE_ANALYTICS_ENABLED', analyticsEnabled)

  // Clear cached module so each test gets fresh queue/timer state
  vi.resetModules()

  trackModule = await import('../useTracking')
}

describe('useTracking', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('navigator', {
      sendBeacon: vi.fn(() => true),
    })
    vi.stubGlobal('location', {
      href: 'https://lurus.cn/test-page',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  describe('track()', () => {
    it('should queue events with eventName, timestamp, and pageUrl', async () => {
      await importFreshModule()
      const { track, _testGetQueue } = trackModule

      track('cta_click', { button_location: 'hero' })

      const queue = _testGetQueue()
      expect(queue).toHaveLength(1)
      expect(queue[0]).toMatchObject({
        event: 'cta_click',
        properties: { button_location: 'hero' },
        pageUrl: 'https://lurus.cn/test-page',
      })
      expect(queue[0].timestamp).toBeTypeOf('number')
    })

    it('should include pageUrl automatically from window.location.href', async () => {
      await importFreshModule()
      const { track, _testGetQueue } = trackModule

      track('portal_link_click')

      const queue = _testGetQueue()
      expect(queue[0].pageUrl).toBe('https://lurus.cn/test-page')
    })

    it('should accept optional properties', async () => {
      await importFreshModule()
      const { track, _testGetQueue } = trackModule

      track('chat_open')

      const queue = _testGetQueue()
      expect(queue[0].event).toBe('chat_open')
      expect(queue[0].properties).toBeUndefined()
    })

    it('should not include personally identifiable information', async () => {
      await importFreshModule()
      const { track, _testGetQueue } = trackModule

      track('cta_click', { button_location: 'hero' })

      const queue = _testGetQueue()
      const event = queue[0]
      // Verify no PII fields
      expect(event).not.toHaveProperty('userId')
      expect(event).not.toHaveProperty('email')
      expect(event).not.toHaveProperty('ip')
      expect(event).not.toHaveProperty('userAgent')
    })
  })

  describe('batching and flushing', () => {
    it('should flush events via sendBeacon after timer expires', async () => {
      await importFreshModule()
      const { track } = trackModule

      track('cta_click')

      // Advance past flush interval (2000ms)
      vi.advanceTimersByTime(2500)

      expect(navigator.sendBeacon).toHaveBeenCalledTimes(1)
      const [url, blob] = (navigator.sendBeacon as ReturnType<typeof vi.fn>).mock.calls[0]
      expect(url).toBe('https://api.test.local/v1/track')
      expect(blob).toBeInstanceOf(Blob)
    })

    it('should flush immediately when queue reaches threshold', async () => {
      await importFreshModule()
      const { track } = trackModule
      const THRESHOLD = 10

      for (let i = 0; i < THRESHOLD; i++) {
        track(`event_${i}`)
      }

      expect(navigator.sendBeacon).toHaveBeenCalledTimes(1)
    })

    it('should send correct JSON payload structure', async () => {
      await importFreshModule()
      const { track } = trackModule

      track('cta_click', { button_location: 'hero' })
      vi.advanceTimersByTime(2500)

      const [, blob] = (navigator.sendBeacon as ReturnType<typeof vi.fn>).mock.calls[0]
      const text = await (blob as Blob).text()
      const payload = JSON.parse(text)

      expect(payload).toHaveProperty('events')
      expect(payload.events).toBeInstanceOf(Array)
      expect(payload.events).toHaveLength(1)
      expect(payload.events[0]).toMatchObject({
        event: 'cta_click',
        properties: { button_location: 'hero' },
        pageUrl: 'https://lurus.cn/test-page',
      })
    })

    it('should clear queue after flush', async () => {
      await importFreshModule()
      const { track, _testGetQueue } = trackModule

      track('cta_click')
      vi.advanceTimersByTime(2500)

      expect(_testGetQueue()).toHaveLength(0)
    })
  })

  describe('endpoint configuration', () => {
    it('should use VITE_API_URL env var for endpoint', async () => {
      await importFreshModule('true', 'https://custom-api.example.com')
      const { track } = trackModule

      track('test_event')
      vi.advanceTimersByTime(2500)

      const [url] = (navigator.sendBeacon as ReturnType<typeof vi.fn>).mock.calls[0]
      expect(url).toBe('https://custom-api.example.com/v1/track')
    })
  })

  describe('analytics feature flag', () => {
    it('should be a no-op when VITE_ANALYTICS_ENABLED is false', async () => {
      await importFreshModule('false')
      const { track, _testGetQueue } = trackModule

      track('cta_click', { button_location: 'hero' })

      expect(_testGetQueue()).toHaveLength(0)
      vi.advanceTimersByTime(2500)
      expect(navigator.sendBeacon).not.toHaveBeenCalled()
    })

    it('should track events when VITE_ANALYTICS_ENABLED is true', async () => {
      await importFreshModule('true')
      const { track, _testGetQueue } = trackModule

      track('cta_click')

      expect(_testGetQueue()).toHaveLength(1)
    })
  })

  describe('graceful failure', () => {
    it('should not throw when sendBeacon fails', async () => {
      vi.stubGlobal('navigator', {
        sendBeacon: vi.fn(() => false),
      })
      await importFreshModule()
      const { track } = trackModule

      track('cta_click')

      expect(() => vi.advanceTimersByTime(2500)).not.toThrow()
    })

    it('should not throw when sendBeacon throws', async () => {
      vi.stubGlobal('navigator', {
        sendBeacon: vi.fn(() => { throw new Error('Network error') }),
      })
      await importFreshModule()
      const { track } = trackModule

      track('cta_click')

      expect(() => vi.advanceTimersByTime(2500)).not.toThrow()
    })

    it('should not throw when navigator.sendBeacon is unavailable', async () => {
      vi.stubGlobal('navigator', {})
      await importFreshModule()
      const { track } = trackModule

      expect(() => {
        track('cta_click')
        vi.advanceTimersByTime(2500)
      }).not.toThrow()
    })
  })

  describe('useTracking composable', () => {
    it('should return track function', async () => {
      await importFreshModule()
      const { useTracking } = trackModule

      const result = useTracking()

      expect(result).toHaveProperty('track')
      expect(result.track).toBeTypeOf('function')
    })
  })
})
