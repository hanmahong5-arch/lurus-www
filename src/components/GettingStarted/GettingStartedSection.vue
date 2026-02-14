<script setup lang="ts">
import { gettingStartedItems } from '../../data/gettingStarted'
</script>

<template>
  <section aria-label="快速开始" class="py-fib-7 bg-cream-50">
    <div class="getting-started-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Section Header -->
      <div class="mb-fib-6 reveal-fade-up">
        <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-3 font-semibold">
          开始使用 Lurus
        </h2>
        <p class="text-phi-base text-ink-500 max-w-xl mx-auto">
          三个核心入口，快速上手平台能力
        </p>
      </div>

      <!-- Quick Access Buttons -->
      <div class="getting-started-grid reveal-fade-up">
        <a
          v-for="item in gettingStartedItems"
          :key="item.id"
          :href="item.href"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          :aria-label="item.ariaLabel"
          data-testid="getting-started-item"
          class="getting-started-card group"
        >
          <!-- Icon -->
          <div class="getting-started-icon-wrapper">
            <svg
              class="getting-started-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                :d="item.iconPath"
              />
            </svg>
          </div>

          <!-- Label -->
          <h3 class="getting-started-label">
            {{ item.label }}
          </h3>

          <!-- Description -->
          <p class="getting-started-desc">
            {{ item.description }}
          </p>

          <!-- External link indicator -->
          <svg
            v-if="item.external"
            class="getting-started-external-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference '../../styles/main.css';

/* Grid layout for 3 items, centered with fib-4 gap */
.getting-started-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-fib-4);
  max-width: 56rem;
  margin: 0 auto;
}

/* Tablet: 3 columns */
@media (min-width: 640px) {
  .getting-started-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Card style - hand-drawn aesthetic */
.getting-started-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-fib-5);
  background-color: var(--color-cream-50);
  border: 2px solid var(--color-ink-100);
  border-radius: 4px 15px 8px 12px / 12px 8px 15px 4px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.getting-started-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-ink-100);
}

.getting-started-card:active {
  transform: scale(0.97);
  transition-duration: 0.15s;
}

.getting-started-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-cream-50), 0 0 0 4px var(--color-ochre);
}

/* Icon wrapper */
.getting-started-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: var(--spacing-fib-3);
  border-radius: 50%;
  background-color: var(--color-cream-200);
  color: var(--color-ochre);
}

.getting-started-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Label */
.getting-started-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-ink-900);
  margin-bottom: var(--spacing-fib-2);
}

/* Description */
.getting-started-desc {
  font-size: 0.875rem;
  color: var(--color-ink-500);
  margin: 0;
  line-height: 1.5;
}

/* External link icon (top-right corner) */
.getting-started-external-icon {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 0.875rem;
  height: 0.875rem;
  color: var(--color-ink-300);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.getting-started-card:hover .getting-started-external-icon {
  opacity: 1;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .getting-started-card {
    transition: none;
  }

  .getting-started-card:hover,
  .getting-started-card:active {
    transform: none;
  }

  .getting-started-external-icon {
    opacity: 1;
    transition: none;
  }
}
</style>
