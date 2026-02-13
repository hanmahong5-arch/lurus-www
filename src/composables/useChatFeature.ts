/**
 * Chat feature flag composable
 * Controls whether the AI Chat feature is enabled based on environment variable.
 * When disabled, Chat components are not loaded or rendered (tree-shaking friendly).
 */

import { computed } from 'vue'

/**
 * Parse the VITE_CHAT_ENABLED environment variable into a boolean.
 * Only the string 'true' (case-insensitive) is treated as enabled.
 */
const parseChatEnabled = (value: string | undefined): boolean => {
  if (!value) return false
  return value.trim().toLowerCase() === 'true'
}

/**
 * Provides reactive Chat feature flag state.
 * Used by App.vue for conditional rendering and by other components
 * that need to check Chat availability.
 */
export const useChatFeature = () => {
  const isChatEnabled = computed(() =>
    parseChatEnabled(import.meta.env.VITE_CHAT_ENABLED)
  )

  return {
    isChatEnabled,
  }
}
