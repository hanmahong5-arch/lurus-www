/**
 * API Health Check type definitions
 * Used by useApiHealth composable and ApiStatusBanner component
 */

/**
 * Three-state health status following ADR-010 degradation pattern:
 * loading -> ready | unavailable
 */
export type ApiHealthStatus = 'loading' | 'ready' | 'unavailable'

/**
 * Configuration for API health check
 */
export interface ApiHealthConfig {
  /** Endpoint to check (lightweight, no auth required) */
  healthEndpoint: string
  /** Request timeout in milliseconds */
  timeoutMs: number
  /** Maximum retry attempts on failure */
  maxRetries: number
}

/**
 * Status banner display configuration
 */
export interface ApiStatusBannerConfig {
  /** Message shown when API is unavailable */
  unavailableMessage: string
  /** Accessible label for the banner */
  ariaLabel: string
}
