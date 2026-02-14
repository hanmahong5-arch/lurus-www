<script setup lang="ts">
import PrimaryButton from './PrimaryButton.vue'
import SecondaryButton from './SecondaryButton.vue'

interface CTAConfig {
  text: string        // button text
  href: string        // button link URL
  ariaLabel: string   // required for a11y
}

interface CTABarProps {
  message: string                    // 中间提示文案 (e.g., "想了解更多？")
  primaryCta: CTAConfig              // 主 CTA 按钮配置
  secondaryCta?: CTAConfig           // 次级 CTA 按钮配置 (可选)
}

const props = defineProps<CTABarProps>()
</script>

<template>
  <div class="cta-bar">
    <div class="cta-bar-content">
      <!-- Message text -->
      <p class="cta-bar-message">
        {{ props.message }}
      </p>

      <!-- CTA Buttons -->
      <div class="cta-bar-buttons">
        <PrimaryButton
          :text="props.primaryCta.text"
          :href="props.primaryCta.href"
          :ariaLabel="props.primaryCta.ariaLabel"
          target="_blank"
          trackLocation="cta_bar"
        />
        <SecondaryButton
          v-if="props.secondaryCta"
          :text="props.secondaryCta.text"
          :href="props.secondaryCta.href"
          :ariaLabel="props.secondaryCta.ariaLabel"
          target="_blank"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference '../../styles/main.css';

.cta-bar {
  /* Background and spacing */
  background-color: var(--color-cream-100);
  padding: var(--spacing-fib-5) 1rem;
}

.cta-bar-content {
  /* Container constraints */
  max-width: 64rem; /* max-w-4xl */
  margin: 0 auto;
  padding: 0 1rem;

  /* Layout - responsive */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-fib-4);
}

/* Desktop layout */
@media (min-width: 640px) {
  .cta-bar-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .cta-bar {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .cta-bar {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Message styling */
.cta-bar-message {
  /* Typography */
  font-size: 1.125rem; /* text-phi-lg */
  font-weight: 500;
  color: var(--color-ink-700);
  margin: 0;
  text-align: center;
}

@media (min-width: 640px) {
  .cta-bar-message {
    text-align: left;
  }
}

/* Button group */
.cta-bar-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-fib-3);
  justify-content: center;
}

/* Small button size override using :deep() */
.cta-bar-buttons :deep(.primary-button),
.cta-bar-buttons :deep(.secondary-button) {
  padding: var(--spacing-fib-2) var(--spacing-fib-4);  /* 8px 21px - smaller than default */
  font-size: 0.9rem;
}
</style>
