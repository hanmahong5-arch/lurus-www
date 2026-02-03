<script setup lang="ts">
/**
 * AI Chat Sidebar - Main container component
 * Handles sidebar visibility and layout, delegates logic to composables
 */

import { ref } from 'vue'
import { useAIChat } from '../../composables/useAIChat'
import { useTracking } from '../../composables/useTracking'

// Child components
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'
import ChatQuickPrompts from './ChatQuickPrompts.vue'
import NetworkStatusBanner from './NetworkStatusBanner.vue'

// Sidebar state
const isOpen = ref(false)
const isMobile = ref(false)

// Chat logic from composable
const {
  messages,
  selectedModel,
  isLoading,
  isTyping,
  inputMessage,
  isOnline,
  canSend,
  hasMessages,
  models,
  quickPrompts,
  sendMessage,
  retryMessage,
  deleteMessage,
  clearChat,
  applyPrompt
} = useAIChat()

// Check if mobile on mount and resize
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

// Initialize mobile check
if (typeof window !== 'undefined') {
  checkMobile()
  window.addEventListener('resize', checkMobile)
}

const { track } = useTracking()

// Toggle sidebar
const toggleSidebar = () => {
  if (!isOpen.value) {
    track('chat_open')
  }
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
}

// Handle send
const handleSend = () => {
  sendMessage()
}

// Handle quick prompt selection
const handlePromptSelect = (prompt: string) => {
  applyPrompt(prompt)
}

// Handle model change
const handleModelChange = (model: string) => {
  selectedModel.value = model
}

// Handle message retry
const handleRetry = (id: string) => {
  retryMessage(id)
}

// Handle message delete
const handleDelete = (id: string) => {
  deleteMessage(id)
}

// Handle clear chat
const handleClear = () => {
  clearChat()
}

// Accessibility: close on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeSidebar()
  }
}

// Add keyboard listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<template>
  <!-- Toggle Button (always visible) -->
  <button
    @click="toggleSidebar"
    class="toggle-btn"
    :class="{ 'is-open': isOpen }"
    :aria-label="isOpen ? '关闭AI助手' : '打开AI助手'"
    :aria-expanded="isOpen"
    aria-controls="ai-chat-sidebar"
  >
    <!-- Chat icon when closed -->
    <svg v-if="!isOpen" class="toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <!-- Close icon when open -->
    <svg v-else class="toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </button>

  <!-- Sidebar Panel -->
  <aside
    id="ai-chat-sidebar"
    class="chat-sidebar"
    :class="{
      'is-open': isOpen,
      'is-mobile': isMobile
    }"
    role="complementary"
    aria-label="AI 聊天助手"
  >
    <!-- Network status banner -->
    <NetworkStatusBanner :is-online="isOnline" />

    <!-- Header -->
    <ChatHeader
      :selected-model="selectedModel"
      :models="models"
      :has-messages="hasMessages"
      @update:selected-model="handleModelChange"
      @clear="handleClear"
      @close="closeSidebar"
    />

    <!-- Quick prompts -->
    <ChatQuickPrompts
      :prompts="quickPrompts"
      @select="handlePromptSelect"
    />

    <!-- Messages area -->
    <ChatMessages
      :messages="messages"
      :is-typing="isTyping"
      @retry="handleRetry"
      @delete="handleDelete"
    />

    <!-- Input area -->
    <ChatInput
      v-model="inputMessage"
      :disabled="isLoading || !isOnline"
      placeholder="输入您的问题..."
      :max-length="2000"
      @send="handleSend"
    />

    <!-- Footer -->
    <div class="chat-footer">
      <p class="footer-text">
        Powered by Lurus API
      </p>
    </div>
  </aside>

  <!-- Overlay (mobile) -->
  <Transition name="fade">
    <div
      v-if="isOpen && isMobile"
      @click="closeSidebar"
      class="overlay"
      aria-hidden="true"
    ></div>
  </Transition>
</template>

<style scoped>
@reference "../../styles/main.css";

/* Toggle button */
.toggle-btn {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-ochre);
  color: var(--color-cream-50);
  border: none;
  border-radius: 12px 0 0 12px;
  cursor: pointer;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-btn:hover {
  background: #b8921f;
  width: 52px;
}

.toggle-btn:focus-visible {
  outline: none;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(201, 162, 39, 0.4);
}

.toggle-btn.is-open {
  right: 400px;
}

@media (max-width: 640px) {
  .toggle-btn.is-open {
    right: 100%;
    transform: translateY(-50%) translateX(48px);
  }
}

.toggle-icon {
  width: 24px;
  height: 24px;
}

/* Sidebar panel */
.chat-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 400px;
  background: var(--color-cream-50);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 40;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-sidebar.is-open {
  transform: translateX(0);
}

/* Mobile full-width */
@media (max-width: 640px) {
  .chat-sidebar {
    width: 100%;
  }
}

/* Footer */
.chat-footer {
  padding: 8px 16px;
  text-align: center;
  border-top: 1px solid var(--color-ink-100);
  background: var(--color-cream-100);
}

.footer-text {
  margin: 0;
  font-size: 11px;
  color: var(--color-ink-300);
}

/* Overlay for mobile */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 36, 22, 0.2);
  z-index: 30;
  backdrop-filter: blur(2px);
}

/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
