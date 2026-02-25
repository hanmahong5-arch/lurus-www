<script setup lang="ts">
/**
 * PortalChatPreview - Chat preview card displayed alongside the Portal section.
 * Shows brand identity, quick prompts, and a CTA to open the full Chat panel.
 * Dispatches lurus:open-chat custom event to trigger AIChatSidebar via App.vue.
 */

import { ref } from 'vue'
import { useTracking } from '../../composables/useTracking'
import { quickPrompts } from '../../data/chatModels'
import { parseDropData, buildAnalysisPrompt, hasPortalData } from '../../utils/portalDrag'

/** Maximum number of quick prompts displayed in the preview */
const MAX_PREVIEW_PROMPTS = 3

const { track } = useTracking()

/** Subset of prompts to display (capped at MAX_PREVIEW_PROMPTS) */
const displayedPrompts = quickPrompts.slice(0, MAX_PREVIEW_PROMPTS)

/**
 * Open the Chat panel by dispatching a custom event.
 * App.vue listens for 'lurus:open-chat' to toggle the sidebar.
 */
const handleOpenChat = () => {
  track('chat_open', { source: 'portal_preview' })
  window.dispatchEvent(new CustomEvent('lurus:open-chat'))
}

/**
 * Open the Chat panel with a pre-filled prompt.
 */
const handlePromptClick = (prompt: string) => {
  track('chat_open', { source: 'portal_preview_prompt' })
  window.dispatchEvent(new CustomEvent('lurus:open-chat', { detail: { prompt } }))
}

const handleActionKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleOpenChat()
  }
}

// Drag-and-drop handlers
const isDragOver = ref(false)
let dragLeaveTimer: ReturnType<typeof setTimeout> | null = null

const handleDragOver = (e: DragEvent) => {
  if (!hasPortalData(e)) return
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
}

const handleDragEnter = (e: DragEvent) => {
  if (!hasPortalData(e)) return
  if (dragLeaveTimer) {
    clearTimeout(dragLeaveTimer)
    dragLeaveTimer = null
  }
  isDragOver.value = true
}

const handleDragLeave = () => {
  dragLeaveTimer = setTimeout(() => {
    isDragOver.value = false
  }, 50)
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  const data = parseDropData(e)
  if (data) {
    const prompt = buildAnalysisPrompt(data)
    track('chat_open', { source: 'portal_preview_drop' })
    window.dispatchEvent(new CustomEvent('lurus:open-chat', { detail: { prompt } }))
  }
}
</script>

<template>
  <div
    class="portal-chat-preview card-sketchy"
    :class="{ 'is-drag-over': isDragOver }"
    role="region"
    aria-label="AI Chat 门户预览"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Drop zone hint -->
    <Transition name="fade">
      <div v-if="isDragOver" class="drop-hint" aria-hidden="true">
        <svg class="drop-hint-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4v16m-8-8h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span>放下链接开始分析</span>
      </div>
    </Transition>

    <!-- Brand Header -->
    <div class="preview-header">
      <div class="brand-icon">
        <span class="brand-letter" aria-hidden="true">L</span>
      </div>
      <div class="brand-info">
        <h3 class="brand-title">Lurus AI</h3>
        <p class="brand-subtitle">智能对话助手</p>
      </div>
      <div
        class="status-dot is-online"
        aria-label="在线"
      ></div>
    </div>

    <!-- Quick Prompts Preview -->
    <div class="prompts-section" v-if="displayedPrompts.length > 0">
      <p class="prompts-label">试试这些问题</p>
      <div class="prompts-grid">
        <button
          v-for="p in displayedPrompts"
          :key="p.label"
          class="prompt-preview-btn"
          :aria-label="`选择提示: ${p.label}`"
          @click="handlePromptClick(p.prompt)"
        >
          <span class="prompt-icon" aria-hidden="true">{{ p.icon }}</span>
          <span class="prompt-label">{{ p.label }}</span>
        </button>
      </div>
    </div>

    <!-- Action Button -->
    <div class="action-section">
      <button
        class="action-btn is-available"
        aria-label="开始 AI 对话"
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
        <span>开始对话</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

/* Preview card container */
.portal-chat-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: var(--color-cream-50);
  min-height: 280px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
}

.portal-chat-preview.is-drag-over {
  border-color: var(--color-ochre);
  box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.3);
}

/* Drop hint overlay */
.drop-hint {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(201, 162, 39, 0.08);
  border-radius: inherit;
  pointer-events: none;
}

.drop-hint-icon {
  width: 32px;
  height: 32px;
  color: var(--color-ochre);
}

.drop-hint span {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ochre);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.portal-chat-preview:hover {
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

.prompt-preview-btn:hover {
  background: var(--color-cream-200);
  border-color: var(--color-ink-300);
  transform: translateY(-1px);
}

.prompt-preview-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-ochre);
}

.prompt-icon {
  font-size: 13px;
  line-height: 1;
}

.prompt-label {
  font-weight: 500;
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
  border: 2px solid color-mix(in srgb, var(--color-ochre), #000 10%);
  border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px;
  background-color: var(--color-ochre);
  color: var(--color-cream-50);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.02);
  box-shadow: 3px 3px 0 var(--color-ink-100);
}

.action-btn:active {
  transform: scale(0.98);
  transition-duration: 0.1s;
}

.action-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-ochre), 0 0 0 5px var(--color-cream-50);
}

.action-icon {
  width: 18px;
  height: 18px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .portal-chat-preview {
    transition: none;
  }

  .portal-chat-preview:hover {
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

  .action-btn:hover {
    transform: none;
  }

  .action-btn:active {
    transform: none;
  }
}
</style>
