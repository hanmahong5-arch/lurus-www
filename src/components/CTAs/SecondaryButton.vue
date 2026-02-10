<script setup lang="ts">
interface SecondaryButtonProps {
  text: string
  href: string
  target?: string
  ariaLabel: string
}

const props = withDefaults(defineProps<SecondaryButtonProps>(), {
  target: '_self'
})
</script>

<template>
  <a
    :href="props.href"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-label="props.ariaLabel"
    class="secondary-button"
  >
    {{ props.text }}
  </a>
</template>

<style scoped>
@reference '../../styles/main.css';

.secondary-button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-fib-3) var(--spacing-fib-5);

  /* Typography */
  font-weight: 500;
  color: var(--color-ochre);
  text-decoration: none;

  /* Secondary color scheme: transparent background with border */
  background-color: transparent;
  border: 2px solid var(--color-ochre);

  /* Hand-drawn border radius (sketchy aesthetic) */
  border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px;

  /* Subtle transition for hover effect */
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  cursor: pointer;
}

/* Hover state - subtle background lightening */
.secondary-button:hover {
  background-color: color-mix(in srgb, var(--color-ochre) 10%, transparent);
  border-color: color-mix(in srgb, var(--color-ochre), #000 8%);
}

/* Focus state - accessibility ring */
.secondary-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-cream-50), 0 0 0 4px var(--color-ochre);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .secondary-button {
    transition: none;
  }
}
</style>
