<script setup lang="ts">
import { defineAsyncComponent, ref, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Layout/Navbar.vue'
import Footer from './components/Layout/Footer.vue'
import { useChatFeature } from './composables/useChatFeature'
import { useTracking } from './composables/useTracking'

const { isChatEnabled } = useChatFeature()
const { track } = useTracking()

// Chat panel open/close state managed at App level (shared by Trigger + Sidebar + Preview)
const isChatOpen = ref(false)
const chatTriggerRef = ref<InstanceType<typeof ChatFloatingTrigger> | null>(null)

const handleChatToggle = () => {
  if (!isChatOpen.value) {
    track('chat_open')
  }
  isChatOpen.value = !isChatOpen.value
}

const handleChatClose = () => {
  isChatOpen.value = false
  // Restore focus to trigger button after sidebar closes (a11y)
  nextTick(() => {
    const triggerEl = chatTriggerRef.value?.$el as HTMLElement | undefined
    triggerEl?.focus()
  })
}

/**
 * Listen for custom event from ChatPreview (in Home.vue) to open the Chat panel.
 * This bridges the communication gap between Home.vue child component and App.vue.
 */
const handleOpenChatEvent = () => {
  if (!isChatOpen.value) {
    isChatOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('lurus:open-chat', handleOpenChatEvent)
})

onUnmounted(() => {
  window.removeEventListener('lurus:open-chat', handleOpenChatEvent)
})

// Lazy-load Chat components only when feature is enabled (ADR-001, ADR-013)
const AIChatSidebar = defineAsyncComponent(
  () => import('./components/Chat/AIChatSidebar.vue')
)

const ChatFloatingTrigger = defineAsyncComponent(
  () => import('./components/Chat/ChatFloatingTrigger.vue')
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-dark">
    <!-- Skip Link for accessibility -->
    <a
      href="#main-content"
      class="skip-link"
    >
      跳至主内容
    </a>

    <Navbar />
    <main id="main-content" class="flex-1" tabindex="-1">
      <RouterView />
    </main>
    <Footer />

    <!-- AI Chat: conditional load via env flag (ADR-001) -->
    <template v-if="isChatEnabled">
      <ChatFloatingTrigger
        ref="chatTriggerRef"
        :is-open="isChatOpen"
        @toggle="handleChatToggle"
      />
      <AIChatSidebar
        :is-open="isChatOpen"
        @close="handleChatClose"
        @toggle="handleChatToggle"
      />
    </template>
  </div>
</template>
