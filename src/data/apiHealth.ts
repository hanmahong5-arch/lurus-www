/**
 * API Health Check Data
 * Centralized configuration for API health detection and status banner (S5.5)
 * Follows ADR-006 data centralization and ADR-010 three-state degradation
 */

import type { ApiHealthConfig, ApiStatusBannerConfig } from '../types/apiHealth'

/**
 * Health check endpoint configuration.
 * Uses /v1/models (no auth required) with HEAD request for minimal overhead.
 */
export const apiHealthConfig: ApiHealthConfig = {
  healthEndpoint: `${import.meta.env.VITE_API_URL || '/api'}/v1/models`,
  timeoutMs: 5000,
  maxRetries: 1,
}

/**
 * Status banner display text and accessibility labels.
 */
export const apiStatusBannerConfig: ApiStatusBannerConfig = {
  unavailableMessage: '服务维护中，以下为示例数据',
  ariaLabel: 'API 服务状态提示',
}
