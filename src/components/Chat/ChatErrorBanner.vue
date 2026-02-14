<script setup lang="ts">
/**
 * ChatErrorBanner - Persistent error banner for Chat sidebar
 * Displayed when all API retry attempts are exhausted.
 * Provides a friendly message and a link to documentation as an alternative.
 */

defineProps<{
  docsUrl: string
}>()
</script>

<template>
  <div class="error-banner" role="alert" aria-live="assertive">
    <div class="error-content">
      <svg class="warning-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="error-text">
        <p class="error-message">AI 对话暂时不可用，请稍后再试</p>
        <a
          :href="docsUrl"
          class="docs-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="查看文档获取帮助"
        >
          <svg class="link-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          查看文档
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.error-banner {
  padding: 12px 16px;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  border-bottom: 1px solid #fcd34d;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-content {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.warning-icon {
  width: 20px;
  height: 20px;
  color: #d97706;
  flex-shrink: 0;
  margin-top: 1px;
}

.error-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.error-message {
  margin: 0;
  font-size: 13px;
  color: #92400e;
  line-height: 1.4;
}

.docs-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #b45309;
  text-decoration: none;
  transition: color 0.2s ease;
}

.docs-link:hover {
  color: #92400e;
  text-decoration: underline;
}

.docs-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-ochre);
  border-radius: 2px;
}

.link-icon {
  width: 14px;
  height: 14px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .error-banner {
    animation: none;
  }
}
</style>
