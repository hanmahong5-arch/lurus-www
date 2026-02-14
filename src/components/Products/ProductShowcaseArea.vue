<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProductShowcase } from '../../types/products'
import CodeShowcase from '../TechDemo/CodeShowcase.vue'

const props = defineProps<{
  showcase?: ProductShowcase
}>()

/**
 * Track whether the screenshot image failed to load.
 * When true, the component switches to code fallback.
 */
const imageError = ref(false)

/**
 * Determine whether to show screenshot image.
 * Only true when type is 'screenshot', src is non-empty, and no load error.
 */
const hasScreenshot = computed(() => {
  if (!props.showcase || props.showcase.type !== 'screenshot') return false
  return (props.showcase.screenshotSrc?.length ?? 0) > 0 && !imageError.value
})

/**
 * Determine whether to show code block.
 * True for type='code', or type='screenshot' when falling back.
 */
const showCode = computed(() => {
  if (!props.showcase) return false
  if (props.showcase.type === 'code') return true
  if (props.showcase.type === 'screenshot' && !hasScreenshot.value) return true
  return false
})

/**
 * Determine whether to show feature highlights list.
 */
const showFeatures = computed(() => {
  if (!props.showcase) return false
  return props.showcase.type === 'features'
})

/**
 * Handle image load error by switching to fallback mode.
 */
function handleImageError() {
  imageError.value = true
}
</script>

<template>
  <div
    v-if="showcase"
    data-testid="showcase-area"
    class="showcase-area mb-fib-3"
  >
    <!-- Screenshot mode -->
    <div
      v-if="hasScreenshot"
      class="screenshot-container"
    >
      <img
        :src="showcase.screenshotSrc"
        :alt="showcase.screenshotAlt || ''"
        loading="lazy"
        class="screenshot-image"
        @error="handleImageError"
      />
    </div>

    <!-- Code mode (primary or fallback from screenshot) -->
    <div
      v-else-if="showCode && showcase.fallbackCode"
      class="code-container"
    >
      <CodeShowcase
        :code="showcase.fallbackCode"
        :language="showcase.fallbackLanguage || 'bash'"
        :ariaLabel="showcase.fallbackAriaLabel || 'Code example'"
      />
    </div>

    <!-- Features list mode -->
    <ul
      v-else-if="showFeatures && showcase.fallbackFeatures?.length"
      class="features-list"
    >
      <li
        v-for="feature in showcase.fallbackFeatures"
        :key="feature"
        data-testid="showcase-feature"
        class="feature-item"
      >
        <svg
          class="feature-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span class="feature-text">{{ feature }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.showcase-area {
  border-radius: 4px 10px 6px 8px / 8px 6px 10px 4px;
  overflow: hidden;
}

.screenshot-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-cream-200);
  border-radius: inherit;
}

.screenshot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.code-container {
  border-radius: inherit;
  overflow: hidden;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 13px;
  background-color: var(--color-cream-200);
  border: 1px solid var(--color-ink-100);
  border-radius: inherit;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.feature-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-ochre);
}

.feature-text {
  font-size: 0.8125rem;
  color: var(--color-ink-700);
  line-height: 1.4;
}
</style>
