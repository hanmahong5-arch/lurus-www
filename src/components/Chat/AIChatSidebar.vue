<script setup lang="ts">
/**
 * AI Chat Sidebar - Main container component
 * Handles sidebar layout, delegates logic to composables.
 * Open/close state is managed by parent (App.vue) via props/emits.
 * Toggle button has been extracted to ChatFloatingTrigger component.
 */

import { ref, onMounted, onUnmounted } from 'vue'
import { useAIChat } from '../../composables/useAIChat'
import { MOBILE_BREAKPOINT, MAX_INPUT_LENGTH } from '../../constants/ui'

// Child components
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'
import ChatQuickPrompts from './ChatQuickPrompts.vue'
import NetworkStatusBanner from './NetworkStatusBanner.vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  toggle: []
}>()

const isMobile = ref(false)

// Chat logic from composable
const {
  messages,
  selectedModel,
  isLoading,
  isTyping,
  inputMessage,
  isOnline,
  canSend: _canSend,
  hasMessages,
  models,
  quickPrompts,
  sendMessage,
  retryMessage,
  deleteMessage,
  clearChat,
} = useAIChat()

// Check if mobile on mount and resize
const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  }
}

const closeSidebar = () => {
  emit('close')
}

// Handle send
const handleSend = () => {
  sendMessage()
}

// Handle quick prompt selection — auto-send the prompt as a message (FR31)
const handlePromptSelect = (prompt: string) => {
  sendMessage(prompt)
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
  if (e.key === 'Escape' && props.isOpen) {
    closeSidebar()
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <!-- Sidebar Panel -->
  <aside
    id="ai-chat-sidebar"
    class="chat-sidebar"
    :class="{
      'is-open': props.isOpen,
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

    <!-- Quick prompts: show only when no message history (FR31) -->
    <ChatQuickPrompts
      v-if="!hasMessages"
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
      :max-length="MAX_INPUT_LENGTH"
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
      v-if="props.isOpen && isMobile"
      @click="closeSidebar"
      class="overlay"
      aria-hidden="true"
    ></div>
  </Transition>
</template>

<style scoped>
@reference "../../styles/main.css";

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
