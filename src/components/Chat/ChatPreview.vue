<script setup lang="ts">
/**
 * ChatPreview - Hero right-side Chat preview card.
 * Shows brand identity, quick prompts preview, and a CTA to open the full Chat panel.
 * Renders an unavailable state when Chat backend is unreachable.
 * Hidden on mobile (< 768px) - users access Chat via ChatFloatingTrigger instead.
 */

import type { QuickPrompt } from '../../types/chat'

/** Maximum number of quick prompts displayed in the preview */
const MAX_PREVIEW_PROMPTS = 3

/** Default aria label for the preview container */
const DEFAULT_ARIA_LABEL = 'AI Chat 预览'

interface Props {
  ariaLabel?: string
  quickPrompts: QuickPrompt[]
  isAvailable: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'open-chat': []
  'select-prompt': [prompt: string]
}>()

/** Get the subset of prompts to display (capped at MAX_PREVIEW_PROMPTS) */
const displayedPrompts = () => props.quickPrompts.slice(0, MAX_PREVIEW_PROMPTS)

const handleOpenChat = () => {
  if (!props.isAvailable) return
  emit('open-chat')
}

const handlePromptClick = (prompt: string) => {
  emit('select-prompt', prompt)
}

const handleActionKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleOpenChat()
  }
}
</script>

<template>
  <div
    class="chat-preview card-sketchy"
    :class="{ 'is-unavailable': !props.isAvailable }"
    role="region"
    :aria-label="props.ariaLabel ?? DEFAULT_ARIA_LABEL"
  >
    <!-- Brand Header -->
    <div class="preview-header">
      <div class="brand-icon">
        <span class="brand-letter" aria-hidden="true">L</span>
      </div>
      <div class="brand-info">
        <h3 class="brand-title">Lurus AI</h3>
        <p class="brand-subtitle">
          {{ props.isAvailable ? '智能对话助手' : 'AI 对话即将开放' }}
        </p>
      </div>
      <div
        class="status-dot"
        :class="props.isAvailable ? 'is-online' : 'is-offline'"
        :aria-label="props.isAvailable ? '在线' : '离线'"
      ></div>
    </div>

    <!-- Quick Prompts Preview -->
    <div class="prompts-section" v-if="displayedPrompts().length > 0">
      <p class="prompts-label">试试这些问题</p>
      <div class="prompts-grid">
        <button
          v-for="p in displayedPrompts()"
          :key="p.label"
          class="prompt-preview-btn"
          :aria-label="`选择提示: ${p.label}`"
          :disabled="!props.isAvailable"
          @click="handlePromptClick(p.prompt)"
        >
          <span class="prompt-icon" aria-hidden="true">{{ p.icon }}</span>
          <span class="prompt-label">{{ p.label }}</span>
        </button>
      </div>
    </div>

    <!-- Unavailable State Description -->
    <div v-if="!props.isAvailable" class="unavailable-desc">
      <p class="unavailable-text">
        AI 智能助手正在准备中，即将为您提供实时对话服务
      </p>
    </div>

    <!-- Action Button -->
    <div class="action-section">
      <button
        class="action-btn"
        :class="{ 'is-available': props.isAvailable }"
        :disabled="!props.isAvailable"
        :aria-label="props.isAvailable ? '开始 AI 对话' : 'AI 对话即将开放'"
        @click="handleOpenChat"
        @keydown="handleActionKeydown"
      >
        <!-- Chat icon -->
        <svg
          class="action-icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ props.isAvailable ? '开始对话' : '即将开放' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

/* Preview card container */
.chat-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: var(--color-cream-50);
  min-height: 280px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.chat-preview:hover {
  box-shadow: 5px 5px 0 var(--color-ink-100);
  transform: translate(-2px, -2px);
}

/* Brand header */
.preview-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--color-ochre);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid color-mix(in srgb, var(--color-ochre), #000 10%);
  flex-shrink: 0;
}

.brand-letter {
  color: var(--color-cream-50);
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 22px;
  line-height: 1;
}

.brand-info {
  flex: 1;
  min-width: 0;
}

.brand-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink-900);
  line-height: 1.2;
}

.brand-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-ink-300);
  line-height: 1.3;
}

/* Status indicator dot */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.is-online {
  background-color: #22c55e;
  box-shadow: 0 0 4px rgba(34, 197, 94, 0.4);
}

.status-dot.is-offline {
  background-color: var(--color-ink-300);
}

/* Quick prompts section */
.prompts-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.prompts-label {
  margin: 0;
  font-size: 12px;
  color: var(--color-ink-300);
  font-weight: 500;
}

.prompts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.prompt-preview-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  font-size: 12px;
  background: var(--color-cream-100);
  border: 1.5px solid var(--color-ink-100);
  border-radius: 4px 10px 6px 8px / 8px 6px 10px 4px;
  color: var(--color-ink-700);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.prompt-preview-btn:not(:disabled):hover {
  background: var(--color-cream-200);
  border-color: var(--color-ink-300);
  transform: translateY(-1px);
}

.prompt-preview-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-ochre);
}

.prompt-preview-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prompt-icon {
  font-size: 13px;
  line-height: 1;
}

.prompt-label {
  font-weight: 500;
}

/* Unavailable state */
.unavailable-desc {
  padding: 12px;
  background: var(--color-cream-100);
  border-radius: 8px;
}

.unavailable-text {
  margin: 0;
  font-size: 13px;
  color: var(--color-ink-500);
  line-height: 1.5;
}

/* Unavailable modifier on container */
.chat-preview.is-unavailable {
  opacity: 0.85;
}

/* Action button */
.action-section {
  margin-top: auto;
}

.action-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid var(--color-ink-300);
  border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px;
  background-color: var(--color-cream-100);
  color: var(--color-ink-700);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.is-available {
  background-color: var(--color-ochre);
  border-color: color-mix(in srgb, var(--color-ochre), #000 10%);
  color: var(--color-cream-50);
}

.action-btn.is-available:hover {
  transform: scale(1.02);
  box-shadow: 3px 3px 0 var(--color-ink-100);
}

.action-btn.is-available:active {
  transform: scale(0.98);
  transition-duration: 0.1s;
}

.action-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-ochre), 0 0 0 5px var(--color-cream-50);
}

.action-btn:disabled {
  cursor: not-allowed;
}

.action-btn:disabled:not(.is-available) {
  opacity: 0.6;
}

.action-icon {
  width: 18px;
  height: 18px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .chat-preview {
    transition: none;
  }

  .chat-preview:hover {
    transform: none;
  }

  .prompt-preview-btn {
    transition: none;
  }

  .prompt-preview-btn:hover {
    transform: none;
  }

  .action-btn {
    transition: none;
  }

  .action-btn.is-available:hover {
    transform: none;
  }

  .action-btn.is-available:active {
    transform: none;
  }
}
</style>
