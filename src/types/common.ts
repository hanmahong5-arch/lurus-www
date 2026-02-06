/**
 * Common shared type definitions
 * Used across multiple components and data files
 */

/**
 * Accessibility props for interactive components
 * ADR-012: All interactive components must include ariaLabel
 */
export interface AriaProps {
  ariaLabel: string
  ariaDescribedBy?: string
  ariaExpanded?: boolean
  ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
}

/**
 * Statistics display item
 */
export interface Stat {
  value: string
  label: string
  color: string
}

/**
 * Trust badge item
 */
export interface TrustBadge {
  icon: string
  label: string
  iconColor?: string
}

/**
 * External redirect configuration
 */
export interface ExternalRedirectConfig {
  redirects: Record<string, string>
  prefixes: readonly string[]
}

/**
 * Chat configuration constants
 */
export interface ChatConfig {
  debounceMs: number
  maxRetries: number
  timeoutMs: number
}
