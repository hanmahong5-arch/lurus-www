/**
 * Type definitions index
 * Re-exports all types for convenient importing
 */

// Navigation types
export type { NavItem, NavDropdownItem, CtaLinks } from './navigation'

// Product types
export type { Product, ProductStats, ProductIconPaths } from './products'

// Common types
export type {
  AriaProps,
  Stat,
  TrustBadge,
  ExternalRedirectConfig,
  ChatConfig,
} from './common'

// Chat types (existing)
export type {
  MessageStatus,
  MessageRole,
  ChatMessage,
  ChatApiResponse,
  QuickPrompt,
  ModelOption,
  ChatState,
} from './chat'

export { TimeoutError, NetworkError } from './chat'
