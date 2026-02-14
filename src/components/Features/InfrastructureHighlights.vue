<script setup lang="ts">
import {
  infrastructureHighlights,
  infrastructureHighlightIcons,
} from '@/data/infrastructureHighlights'

/**
 * Retrieve SVG path for a given icon key.
 * Falls back to the 'cloud' icon if key is not found.
 */
function getIconPath(iconKey: string): string {
  return infrastructureHighlightIcons[iconKey] || infrastructureHighlightIcons.cloud
}
</script>

<template>
  <div class="infrastructure-highlights mt-fib-5 mb-fib-4 reveal-fade-up" aria-label="基础设施亮点" role="region">
    <h3 class="text-phi-xl font-semibold text-ink-900 mb-fib-4 text-center">
      基础设施
    </h3>

    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-fib-4 list-none p-0 m-0">
      <li
        v-for="highlight in infrastructureHighlights"
        :key="highlight.id"
        class="highlight-item"
      >
        <!-- Icon -->
        <div class="icon-container w-10 h-10 rounded-lg bg-ochre/10 border border-ink-100 flex items-center justify-center shrink-0">
          <svg
            class="w-6 h-6 text-ochre"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              :d="getIconPath(highlight.icon)"
            />
          </svg>
        </div>

        <!-- Content -->
        <div>
          <h4 class="text-ink-900 font-semibold text-sm leading-snug">
            {{ highlight.title }}
          </h4>
          <p class="text-ink-500 text-sm leading-relaxed mt-1">
            {{ highlight.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 13px; /* fib-3 */
}
</style>
