/**
 * Type definitions index
 * Re-exports all types for convenient importing
 */

// Navigation types
export type { NavItem, NavDropdownItem } from './navigation'

// Product types
export type { Product, ProductStats, ProductIconPaths } from './products'

// Platform types
export type { PlatformCapability, PlatformCapabilityIconPaths } from './platform'

// Infrastructure types
export type { InfrastructureHighlight, InfrastructureHighlightIconPaths } from './infrastructure'

// Code example types
export type { CodeExample } from './codeExample'

// Dashboard preview types
export type { DashboardPreviewConfig } from './dashboardPreview'

// API health types
export type { ApiHealthStatus, ApiHealthConfig, ApiStatusBannerConfig } from './apiHealth'

// Getting started types
export type { GettingStartedItem } from './gettingStarted'

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
  DemoMessage,
} from './chat'

export { TimeoutError, NetworkError } from './chat'

// Tracking types
export type { TrackEvent, TrackPayload } from './tracking'
