<script setup lang="ts">
import type { Product } from '../../types/products'
import { productIconPaths } from '../../data/products'
import ProductShowcaseArea from './ProductShowcaseArea.vue'

const props = defineProps<{
  product: Product
}>()

/**
 * Resolve SVG icon path from product icon key.
 * Falls back to API icon if no match found.
 */
const iconPath = productIconPaths[props.product.icon] || productIconPaths.api

/** Maximum number of feature tags to display before showing overflow count */
const MAX_VISIBLE_FEATURES = 2

const visibleFeatures = props.product.features.slice(0, MAX_VISIBLE_FEATURES)
const overflowCount = props.product.features.length - MAX_VISIBLE_FEATURES

const isExternalUrl = props.product.url !== '#'
</script>

<template>
  <a
    :href="product.url"
    :target="isExternalUrl ? '_blank' : undefined"
    :rel="isExternalUrl ? 'noopener noreferrer' : undefined"
    class="group"
    data-testid="product-card"
  >
    <div class="card-sketchy p-6 h-full flex flex-col" :class="`card-${product.id}`">
      <!-- Icon + Stats row -->
      <div class="flex items-start justify-between mb-fib-3">
        <div
          data-testid="product-icon"
          class="w-14 h-14 rounded-xl flex items-center justify-center border-sketchy"
          :style="{ backgroundColor: product.bgColor }"
        >
          <svg
            class="w-7 h-7 text-cream-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              :d="iconPath"
            />
          </svg>
        </div>
        <div class="text-right">
          <div class="text-xl font-bold" :style="{ color: product.bgColor }">
            {{ product.stats.value }}
          </div>
          <div class="text-xs text-ink-300">{{ product.stats.label }}</div>
        </div>
      </div>

      <!-- Showcase area (screenshot / code / features) -->
      <ProductShowcaseArea :showcase="product.showcase" />

      <!-- Title -->
      <h3 class="text-phi-xl text-ink-900 group-hover:text-gradient-ochre transition-colors mb-1 font-semibold">
        {{ product.name }}
      </h3>

      <!-- Tagline -->
      <p class="text-sm text-ink-500 mb-fib-3">{{ product.tagline }}</p>

      <!-- Use case highlight -->
      <p class="text-ink-700 text-sm font-medium mb-fib-3 px-3 py-2 bg-cream-200 border-sketchy-light inline-block">
        {{ product.useCase }}
      </p>

      <!-- Description -->
      <p class="text-ink-500 text-sm flex-1 mb-fib-3">
        {{ product.description }}
      </p>

      <!-- Feature tags -->
      <div class="flex flex-wrap gap-2 mt-auto">
        <span
          v-for="feature in visibleFeatures"
          :key="feature"
          data-testid="feature-tag"
          class="px-3 py-1 text-xs bg-cream-200 text-ink-700 border-sketchy-light"
        >
          {{ feature }}
        </span>
        <span
          v-if="overflowCount > 0"
          class="px-3 py-1 text-xs text-ink-300"
        >
          +{{ overflowCount }}
        </span>
      </div>

      <!-- CTA button -->
      <div class="mt-4 flex items-center gap-2 text-ink-500 group-hover:text-ochre transition-colors">
        <span class="text-sm font-medium">了解更多</span>
        <svg
          data-testid="cta-arrow"
          class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </a>
</template>

<style scoped>
@reference "../../styles/main.css";

/* Webmail card uses deaigc color token */
.card-webmail {
  border-color: var(--color-product-deaigc);
}
</style>
