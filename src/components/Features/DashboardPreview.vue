<script setup lang="ts">
import { ref, computed } from 'vue'
import CodeShowcase from '../TechDemo/CodeShowcase.vue'
import { dashboardPreviewConfig } from '@/data/dashboardPreview'

/**
 * Track whether the screenshot image failed to load.
 * When true (or when screenshotSrc is empty), the component renders
 * a CodeShowcase fallback instead.
 */
const imageError = ref(false)

const hasScreenshot = computed(() => {
  return dashboardPreviewConfig.screenshotSrc.length > 0 && !imageError.value
})

/**
 * Handle image load error — switch to fallback mode.
 */
function handleImageError() {
  imageError.value = true
}
</script>

<template>
  <div class="dashboard-preview mt-fib-5 reveal-fade-up">
    <h3 class="flex items-center gap-fib-2 text-phi-xl font-semibold text-ink-900 mb-fib-4">
      <svg
        class="w-5 h-5 text-ochre shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
      {{ dashboardPreviewConfig.title }}
    </h3>

    <figure class="preview-figure card-sketchy">
      <!-- Screenshot mode -->
      <div
        v-if="hasScreenshot"
        class="preview-container"
      >
        <img
          :src="dashboardPreviewConfig.screenshotSrc"
          :alt="dashboardPreviewConfig.screenshotAlt"
          loading="lazy"
          class="preview-image"
          @error="handleImageError"
        />
      </div>

      <!-- Fallback mode: CodeShowcase -->
      <div
        v-else
        class="fallback-container"
      >
        <CodeShowcase
          :code="dashboardPreviewConfig.fallbackCode"
          :language="dashboardPreviewConfig.fallbackLanguage"
          :aria-label="dashboardPreviewConfig.fallbackAriaLabel"
        />
      </div>

      <figcaption class="preview-caption">
        {{ dashboardPreviewConfig.caption }}
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.preview-figure {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.preview-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-cream-200);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.fallback-container {
  min-height: 200px;
}

.preview-caption {
  padding: 13px 16px;
  font-size: 0.875rem;
  color: var(--color-ink-500);
  text-align: center;
  border-top: 1px solid var(--color-ink-100);
}
</style>
