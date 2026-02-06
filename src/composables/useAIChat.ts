/**
 * AI Chat core logic composable
 * Handles message sending with debounce, mutex lock, optimistic updates, and retry
 */

import { ref, computed } from 'vue'
import type { ChatMessage } from '../types/chat'
import { useChatPersist } from './useChatPersist'
import { useChatApi, getErrorCode } from './useChatApi'
import { useNetworkStatus } from './useNetworkStatus'
import { chatModels, quickPrompts, chatConfig } from '../data/chatModels'

// Debounce settings from centralized config
const DEBOUNCE_MS = chatConfig.debounceMs

export const useAIChat = () => {
  // Composables
  const { messages, selectedModel, clear: clearPersist } = useChatPersist()
  const { sendWithRetry } = useChatApi()
  const { isOnline } = useNetworkStatus()

  // Local state
  const isLoading = ref(false)
  const isTyping = ref(false)
  const inputMessage = ref('')

  // Mutex lock and debounce state
  let sendingPromise: Promise<void> | null = null
  let lastSendTime = 0

  // Computed
  const canSend = computed(() => {
    return inputMessage.value.trim().length > 0 && !isLoading.value && isOnline.value
  })

  const hasMessages = computed(() => messages.value.length > 0)

  /**
   * Generate unique message ID
   */
  const generateId = (): string => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Find and update a message by ID
   */
  const updateMessage = (id: string, updates: Partial<ChatMessage>) => {
    const index = messages.value.findIndex(m => m.id === id)
    if (index !== -1) {
      messages.value[index] = { ...messages.value[index], ...updates }
    }
  }

  /**
   * Add assistant message from API response
   */
  const addAssistantMessage = (content: string) => {
    messages.value.push({
      id: generateId(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      status: 'sent'
    })
  }

  /**
   * Send message with debounce and mutex lock
   */
  const sendMessage = async (content?: string) => {
    const messageContent = (content || inputMessage.value).trim()
    if (!messageContent) return

    // Debounce check
    const now = Date.now()
    if (now - lastSendTime < DEBOUNCE_MS) return

    // Mutex lock check
    if (sendingPromise) return

    lastSendTime = now
    inputMessage.value = ''

    // Create optimistic user message
    const tempId = generateId()
    messages.value.push({
      id: tempId,
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
      status: 'sending',
      isOptimistic: true,
      retryCount: 0
    })

    sendingPromise = (async () => {
      isLoading.value = true
      isTyping.value = true

      try {
        // Prepare messages for API
        const apiMessages = messages.value
          .filter(m => m.status !== 'failed' && m.status !== 'timeout')
          .map(m => ({
            role: m.role,
            content: m.content
          }))

        const response = await sendWithRetry(apiMessages, selectedModel.value)
        const assistantContent = response.choices?.[0]?.message?.content || '抱歉，未收到有效回复'

        // Success: update user message status
        updateMessage(tempId, {
          status: 'sent',
          isOptimistic: false
        })

        // Add assistant message
        addAssistantMessage(assistantContent)
      } catch (error) {
        // Failure: mark user message as failed
        const errorCode = getErrorCode(error)
        updateMessage(tempId, {
          status: errorCode === 'TIMEOUT' ? 'timeout' : 'failed',
          errorCode,
          retryCount: (messages.value.find(m => m.id === tempId)?.retryCount || 0) + 1
        })
      } finally {
        isLoading.value = false
        isTyping.value = false
        sendingPromise = null
      }
    })()

    await sendingPromise
  }

  /**
   * Retry a failed message
   */
  const retryMessage = async (messageId: string) => {
    const message = messages.value.find(m => m.id === messageId)
    if (!message || message.role !== 'user') return

    // Reset message status
    updateMessage(messageId, {
      status: 'sending',
      errorCode: undefined
    })

    isLoading.value = true
    isTyping.value = true

    try {
      // Get all messages up to and including the retry message
      const messageIndex = messages.value.findIndex(m => m.id === messageId)
      const apiMessages = messages.value
        .slice(0, messageIndex + 1)
        .filter(m => m.status !== 'failed' && m.status !== 'timeout' || m.id === messageId)
        .map(m => ({
          role: m.role,
          content: m.content
        }))

      const response = await sendWithRetry(apiMessages, selectedModel.value)
      const assistantContent = response.choices?.[0]?.message?.content || '抱歉，未收到有效回复'

      // Success
      updateMessage(messageId, {
        status: 'sent',
        isOptimistic: false
      })

      addAssistantMessage(assistantContent)
    } catch (error) {
      const errorCode = getErrorCode(error)
      const currentRetryCount = message.retryCount || 0
      updateMessage(messageId, {
        status: errorCode === 'TIMEOUT' ? 'timeout' : 'failed',
        errorCode,
        retryCount: currentRetryCount + 1
      })
    } finally {
      isLoading.value = false
      isTyping.value = false
    }
  }

  /**
   * Delete a message
   */
  const deleteMessage = (messageId: string) => {
    const index = messages.value.findIndex(m => m.id === messageId)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }

  /**
   * Clear all messages
   */
  const clearChat = () => {
    clearPersist()
  }

  /**
   * Apply quick prompt to input
   */
  const applyPrompt = (prompt: string) => {
    inputMessage.value = prompt
  }

  return {
    // State
    messages,
    selectedModel,
    isLoading,
    isTyping,
    inputMessage,
    isOnline,

    // Computed
    canSend,
    hasMessages,

    // Constants (from centralized data)
    models: chatModels,
    quickPrompts,

    // Methods
    sendMessage,
    retryMessage,
    deleteMessage,
    clearChat,
    applyPrompt,
    updateMessage
  }
}
