/**
 * API Health Check composable
 * Detects API availability using lightweight HEAD request.
 * Follows ADR-010 three-state degradation: loading -> ready | unavailable
 */

import { ref } from 'vue'
import type { ApiHealthStatus } from '../types/apiHealth'
import { apiHealthConfig } from '../data/apiHealth'

/**
 * Perform a single health check with timeout via AbortController.
 * Returns true if the endpoint responds with ok status, false otherwise.
 */
async function checkEndpoint(url: string, timeoutMs: number): Promise<boolean> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store',
    })
    return response.ok
  } catch {
    return false
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Perform health check with retry support.
 * Attempts up to (1 + maxRetries) times before declaring unavailable.
 */
async function checkWithRetry(
  url: string,
  timeoutMs: number,
  maxRetries: number,
): Promise<boolean> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const reachable = await checkEndpoint(url, timeoutMs)
    if (reachable) return true
  }
  return false
}

// Module-level shared state (singleton across all callers)
const status = ref<ApiHealthStatus>('loading')
let checkStarted = false

/**
 * Composable that checks API health on first invocation.
 * Exposes a reactive `status` ref: 'loading' | 'ready' | 'unavailable'.
 *
 * The check runs once on page load (no polling).
 * Multiple calls return the same shared state.
 */
export function useApiHealth() {
  if (!checkStarted) {
    checkStarted = true
    checkWithRetry(
      apiHealthConfig.healthEndpoint,
      apiHealthConfig.timeoutMs,
      apiHealthConfig.maxRetries,
    ).then((reachable) => {
      status.value = reachable ? 'ready' : 'unavailable'
    })
  }

  return { status }
}
