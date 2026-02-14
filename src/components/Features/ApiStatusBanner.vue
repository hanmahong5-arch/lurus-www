<script setup lang="ts">
import type { ApiHealthStatus } from '@/types/apiHealth'
import { apiStatusBannerConfig } from '@/data/apiHealth'

defineProps<{
  status: ApiHealthStatus
}>()
</script>

<template>
  <div
    v-if="status === 'unavailable'"
    role="status"
    aria-live="polite"
    :aria-label="apiStatusBannerConfig.ariaLabel"
    class="api-status-banner bg-cream-200 border border-ink-200 text-ink-500 rounded-lg px-4 py-3 flex items-center gap-3"
  >
    <!-- Info icon (neutral, not warning/error) -->
    <svg
      class="w-5 h-5 text-ink-400 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span class="text-sm">
      {{ apiStatusBannerConfig.unavailableMessage }}
    </span>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.api-status-banner {
  transition: opacity 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .api-status-banner {
    transition: none;
  }
}
</style>
