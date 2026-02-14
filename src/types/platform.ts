/**
 * Platform capability type definitions
 * Used by PlatformCapabilities component and data files
 */

export interface PlatformCapability {
  id: string
  icon: string
  title: string
  description: string
}

export type PlatformCapabilityIconPaths = Record<string, string>
