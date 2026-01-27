<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'

// Sidebar state
const isOpen = ref(false)
const isLoading = ref(false)
const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

// Chat messages
interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

const messages = ref<Message[]>([])

// Predefined prompts
const quickPrompts = [
  { icon: '📚', label: '论文总结', prompt: '请帮我总结这篇论文的核心观点、方法论和结论：' },
  { icon: '💹', label: '金融分析', prompt: '请分析以下金融数据的市场影响和投资建议：' },
  { icon: '💻', label: '技术解读', prompt: '请解释以下技术概念，并提供代码示例：' },
  { icon: '🏥', label: '医学科普', prompt: '请用通俗语言解释以下医学知识：' },
  { icon: '⚖️', label: '法律咨询', prompt: '请查询相关法条并解释其实际应用：' },
]

// Selected model
const selectedModel = ref('deepseek-chat')
const models = [
  { id: 'deepseek-chat', name: 'DeepSeek' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet' },
]

// Toggle sidebar
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// Apply quick prompt
const applyPrompt = (prompt: string) => {
  inputMessage.value = prompt
}

// Scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Send message
const sendMessage = async () => {
  const content = inputMessage.value.trim()
  if (!content || isLoading.value) return

  // Add user message
  messages.value.push({
    role: 'user',
    content,
    timestamp: new Date()
  })
  inputMessage.value = ''
  scrollToBottom()

  // Call API
  isLoading.value = true
  try {
    const response = await fetch('https://api.lurus.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-gushenAIQuantTradingPlatform2026'
      },
      body: JSON.stringify({
        model: selectedModel.value,
        messages: messages.value.map(m => ({
          role: m.role,
          content: m.content
        })),
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content || 'No response'

    messages.value.push({
      role: 'assistant',
      content: assistantMessage,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Chat error:', error)
    messages.value.push({
      role: 'assistant',
      content: '抱歉，请求失败。请稍后重试或检查网络连接。',
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

// Clear chat
const clearChat = () => {
  messages.value = []
}

// Handle Enter key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <!-- Toggle Button (always visible) -->
  <button
    @click="toggleSidebar"
    class="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-ochre text-cream-50 p-3 rounded-l-lg shadow-lg hover:bg-ochre/90 transition-all"
    :class="{ 'translate-x-0': !isOpen, '-translate-x-[380px]': isOpen }"
  >
    <svg v-if="!isOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Sidebar Panel -->
  <aside
    class="fixed right-0 top-0 h-full w-[380px] bg-cream-50 shadow-2xl z-40 transform transition-transform duration-300 flex flex-col"
    :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
  >
    <!-- Header -->
    <div class="p-4 border-b border-ink-100 bg-cream-100">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-hand text-xl text-ink-900 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-ochre flex items-center justify-center">
            <svg class="w-4 h-4 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </span>
          AI 助手
        </h2>
        <button @click="clearChat" class="text-ink-300 hover:text-ink-500 p-1" title="清空对话">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <!-- Model Selector -->
      <select
        v-model="selectedModel"
        class="w-full px-3 py-2 text-sm border-sketchy-light bg-cream-50 text-ink-700 focus:outline-none focus:ring-2 focus:ring-ochre/50"
      >
        <option v-for="model in models" :key="model.id" :value="model.id">
          {{ model.name }}
        </option>
      </select>
    </div>

    <!-- Quick Prompts -->
    <div class="p-3 border-b border-ink-100 bg-cream-50/50">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="p in quickPrompts"
          :key="p.label"
          @click="applyPrompt(p.prompt)"
          class="px-2 py-1 text-xs border-sketchy-light bg-cream-100 hover:bg-cream-200 text-ink-700 transition-colors flex items-center gap-1"
        >
          <span>{{ p.icon }}</span>
          <span>{{ p.label }}</span>
        </button>
      </div>
    </div>

    <!-- Messages Area -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 space-y-4"
    >
      <!-- Empty State -->
      <div v-if="messages.length === 0" class="h-full flex flex-col items-center justify-center text-ink-300">
        <svg class="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-sm">选择模板或直接输入问题</p>
        <p class="text-xs mt-1">支持学术、金融、技术等多领域</p>
      </div>

      <!-- Message List -->
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[85%] p-3 text-sm whitespace-pre-wrap"
          :class="msg.role === 'user'
            ? 'bg-ochre text-cream-50 rounded-l-lg rounded-tr-lg'
            : 'bg-cream-100 text-ink-900 border border-ink-100 rounded-r-lg rounded-tl-lg'"
        >
          {{ msg.content }}
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-cream-100 text-ink-500 p-3 rounded-r-lg rounded-tl-lg border border-ink-100">
          <div class="flex items-center gap-2">
            <div class="flex space-x-1">
              <span class="w-2 h-2 bg-ink-300 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-ink-300 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-ink-300 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
            <span class="text-xs">思考中...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t border-ink-100 bg-cream-100">
      <div class="flex gap-2">
        <textarea
          v-model="inputMessage"
          @keydown="handleKeydown"
          placeholder="输入您的问题..."
          rows="2"
          class="flex-1 px-3 py-2 text-sm border-sketchy bg-cream-50 text-ink-900 placeholder-ink-300 resize-none focus:outline-none focus:ring-2 focus:ring-ochre/50"
        ></textarea>
        <button
          @click="sendMessage"
          :disabled="isLoading || !inputMessage.trim()"
          class="px-4 bg-ochre text-cream-50 rounded-lg hover:bg-ochre/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <p class="text-xs text-ink-300 mt-2 text-center">
        Powered by Lurus API · Enter 发送
      </p>
    </div>
  </aside>

  <!-- Overlay (mobile) -->
  <div
    v-if="isOpen"
    @click="toggleSidebar"
    class="fixed inset-0 bg-ink-900/20 z-30 md:hidden"
  ></div>
</template>

<style scoped>
@reference "../../styles/main.css";
</style>
