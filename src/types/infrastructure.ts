/**
 * Infrastructure highlight type definitions
 * Used by InfrastructureHighlights component and data files
 */

export interface InfrastructureHighlight {
  id: string
  icon: string
  title: string
  description: string
}

export type InfrastructureHighlightIconPaths = Record<string, string>
