/**
 * Getting Started section type definitions
 * Used by the GettingStartedSection component and data file
 */

/**
 * A quick-access entry point for the Getting Started section.
 * Each item represents a link to a core resource (docs, portal, product).
 */
export interface GettingStartedItem {
  /** Unique identifier for the item */
  id: string
  /** Display label for the button */
  label: string
  /** URL or anchor link (e.g., "https://docs.lurus.cn" or "#portal") */
  href: string
  /** Whether the link opens in a new tab (external links) */
  external: boolean
  /** Accessibility label for screen readers */
  ariaLabel: string
  /** SVG icon path (d attribute for a 24x24 viewBox) */
  iconPath: string
  /** Brief description shown below the label */
  description: string
}
