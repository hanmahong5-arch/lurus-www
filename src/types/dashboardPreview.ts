/**
 * Dashboard preview type definitions
 * Used by DashboardPreview component and data files
 */

export interface DashboardPreviewConfig {
  /** Path to dashboard screenshot image (empty string = no asset, trigger fallback) */
  screenshotSrc: string
  /** Descriptive alt text for the screenshot image */
  screenshotAlt: string
  /** Fallback code content when screenshot is unavailable */
  fallbackCode: string
  /** Language for fallback code syntax highlighting */
  fallbackLanguage: string
  /** ARIA label for fallback CodeShowcase */
  fallbackAriaLabel: string
  /** Section title above the preview */
  title: string
  /** Caption text below the preview */
  caption: string
}
