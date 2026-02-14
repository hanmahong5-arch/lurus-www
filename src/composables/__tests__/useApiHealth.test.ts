/**
 * Unit tests for useApiHealth composable
 * Verifies ADR-010 three-state degradation: loading -> ready | unavailable
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useApiHealth', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetModules()
  })

  /**
   * Helper to dynamically import the composable fresh for each test,
   * avoiding module-level singleton state pollution.
   */
  async function importFresh() {
    const mod = await import('../useApiHealth')
    return mod.useApiHealth
  }

  describe('initial state', () => {
    it('should start with loading status', async () => {
      // Prevent the check from resolving during this test
      mockFetch.mockReturnValue(new Promise(() => {}))
      const useApiHealth = await importFresh()
      const { status } = useApiHealth()
      expect(status.value).toBe('loading')
    })
  })

  describe('API reachable', () => {
    it('should transition to ready when API responds successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      const useApiHealth = await importFresh()
      const { status } = useApiHealth()

      // Allow the async check to complete
      await vi.runAllTimersAsync()
      await nextTick()

      expect(status.value).toBe('ready')
    })

    it('should accept any 2xx/3xx status as ready', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      })

      const useApiHealth = await importFresh()
      const { status } = useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(status.value).toBe('ready')
    })
  })

  describe('API unreachable', () => {
    it('should transition to unavailable when fetch throws network error', async () => {
      // First attempt fails
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
      // Retry also fails
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))

      const useApiHealth = await importFresh()
      const { status } = useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(status.value).toBe('unavailable')
    })

    it('should transition to unavailable when API returns server error', async () => {
      // First attempt returns 500
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 })
      // Retry also returns 500
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 })

      const useApiHealth = await importFresh()
      const { status } = useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(status.value).toBe('unavailable')
    })
  })

  describe('timeout handling', () => {
    it('should transition to unavailable when request times out', async () => {
      // Simulate a request that never resolves (will be aborted)
      mockFetch.mockImplementation(() => {
        return new Promise((_, reject) => {
          // Simulate abort after timeout
          setTimeout(() => {
            const abortError = new DOMException('The operation was aborted', 'AbortError')
            reject(abortError)
          }, 6000)
        })
      })

      const useApiHealth = await importFresh()
      const { status } = useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(status.value).toBe('unavailable')
    })
  })

  describe('retry mechanism', () => {
    it('should retry once and succeed on second attempt', async () => {
      // First attempt fails
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
      // Retry succeeds
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 })

      const useApiHealth = await importFresh()
      const { status } = useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(status.value).toBe('ready')
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it('should not retry more than maxRetries times', async () => {
      // All attempts fail
      mockFetch.mockRejectedValue(new TypeError('Failed to fetch'))

      const useApiHealth = await importFresh()
      const { status } = useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(status.value).toBe('unavailable')
      // 1 initial + 1 retry = 2 total calls
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('fetch call parameters', () => {
    it('should use HEAD method for lightweight check', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 })

      const useApiHealth = await importFresh()
      useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'HEAD',
        })
      )
    })

    it('should include AbortSignal for timeout', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 })

      const useApiHealth = await importFresh()
      useApiHealth()

      await vi.runAllTimersAsync()
      await nextTick()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      )
    })
  })
})
