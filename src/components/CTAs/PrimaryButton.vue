<script setup lang="ts">
import { ref } from 'vue'

interface PrimaryButtonProps {
  text: string
  href: string
  target?: string
  ariaLabel: string
}

const props = withDefaults(defineProps<PrimaryButtonProps>(), {
  target: '_self'
})

// Debounce: prevent rapid successive clicks
const lastClickTime = ref<number>(0)
const DEBOUNCE_MS = 300

const handleClick = (event: MouseEvent) => {
  const now = Date.now()
  if (now - lastClickTime.value < DEBOUNCE_MS) {
    event.preventDefault()
    return
  }
  lastClickTime.value = now
  // Let the default link behavior proceed
}
</script>

<template>
  <a
    :href="props.href"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-label="props.ariaLabel"
    class="primary-button"
    @click="handleClick"
  >
    {{ props.text }}
  </a>
</template>

<style scoped>
@reference '../../styles/main.css';

.primary-button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-fib-3) var(--spacing-fib-5);

  /* Typography */
  font-weight: 600;
  color: var(--color-cream-50);
  text-decoration: none;

  /* Primary color scheme */
  background-color: var(--color-ochre);

  /* Hand-drawn border radius */
  border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px;

  /* Transitions for hover-breathe and click-elastic */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.2s ease;

  cursor: pointer;
}

/* Hover state - breathe effect (subtle scale) */
.primary-button:hover {
  transform: scale(1.05);
  background-color: color-mix(in srgb, var(--color-ochre), #000 8%);
  box-shadow: 0 4px 12px rgba(201, 162, 39, 0.3);
}

/* Active state - elastic feedback */
.primary-button:active {
  transform: scale(0.95);
  transition-duration: 0.15s;
}

/* Focus state - accessibility ring */
.primary-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-cream-50), 0 0 0 4px var(--color-ochre);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .primary-button {
    transition: none;
  }

  .primary-button:hover,
  .primary-button:active {
    transform: none;
  }
}
</style>
