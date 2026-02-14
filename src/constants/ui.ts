/**
 * UI Constants
 * Centralized UI-related constants for consistent behavior across components
 */

/**
 * Chat input maximum character length
 */
export const MAX_INPUT_LENGTH = 2000

/**
 * Chat textarea maximum height in pixels
 */
export const MAX_TEXTAREA_HEIGHT = 150

/**
 * Mobile breakpoint width in pixels (matches Tailwind's sm: breakpoint)
 */
export const MOBILE_BREAKPOINT = 640

/**
 * Duration for copy feedback message display (milliseconds)
 */
export const COPY_FEEDBACK_DURATION_MS = 2000

/**
 * Default debounce interval for user input (milliseconds)
 */
export const DEBOUNCE_INTERVAL_MS = 300

/**
 * CSS selector for all focusable elements (used by focus trap)
 */
export const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
