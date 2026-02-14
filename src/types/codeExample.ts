/**
 * Code example type definitions
 * Used by CodeExampleShowcase component and data files
 */

export interface CodeExample {
  /** Unique identifier for the example */
  id: string
  /** Display label for the tab */
  label: string
  /** Programming language for syntax highlighting */
  language: string
  /** The code content to display */
  code: string
  /** Whether to show the "需 API Key" auth tag */
  showAuthTag: boolean
  /** Accessible label describing the code content */
  ariaLabel: string
}
