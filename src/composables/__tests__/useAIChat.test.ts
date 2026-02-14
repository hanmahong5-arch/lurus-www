/**
 * Unit tests for useAIChat composable - hasRetriesExhausted computed
 * Tests the retry exhaustion detection logic
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import type { ChatMessage } from '../../types/chat'

// Mock dependencies before importing
vi.mock('../useChatPersist', () => ({
  useChatPersist: () => ({
    messages: ref<ChatMessage[]>([]),
    selectedModel: ref('deepseek-chat'),
    clear: vi.fn(),
  }),
}))

vi.mock('../useChatApi', () => ({
  useChatApi: () => ({
    sendWithRetry: vi.fn(),
  }),
  getErrorCode: vi.fn(() => 'UNKNOWN'),
}))

vi.mock('../useNetworkStatus', () => ({
  useNetworkStatus: () => ({
    isOnline: ref(true),
  }),
}))

describe('useAIChat - hasRetriesExhausted', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be false when there are no messages', async () => {
    const { useAIChat } = await import('../useAIChat')
    const { hasRetriesExhausted } = useAIChat()
    expect(hasRetriesExhausted.value).toBe(false)
  })

  it('should be false when all messages are sent successfully', async () => {
    vi.resetModules()

    const messagesRef = ref<ChatMessage[]>([
      {
        id: 'msg_1',
        role: 'user',
        content: 'Hello',
        timestamp: new Date(),
        status: 'sent',
      },
      {
        id: 'msg_2',
        role: 'assistant',
        content: 'Hi there',
        timestamp: new Date(),
        status: 'sent',
      },
    ])

    vi.doMock('../useChatPersist', () => ({
      useChatPersist: () => ({
        messages: messagesRef,
        selectedModel: ref('deepseek-chat'),
        clear: vi.fn(),
      }),
    }))

    vi.doMock('../useChatApi', () => ({
      useChatApi: () => ({
        sendWithRetry: vi.fn(),
      }),
      getErrorCode: vi.fn(() => 'UNKNOWN'),
    }))

    vi.doMock('../useNetworkStatus', () => ({
      useNetworkStatus: () => ({
        isOnline: ref(true),
      }),
    }))

    const { useAIChat } = await import('../useAIChat')
    const { hasRetriesExhausted } = useAIChat()
    expect(hasRetriesExhausted.value).toBe(false)
  })

  it('should be true when latest user message has failed status', async () => {
    vi.resetModules()

    const messagesRef = ref<ChatMessage[]>([
      {
        id: 'msg_1',
        role: 'user',
        content: 'Hello',
        timestamp: new Date(),
        status: 'failed',
        retryCount: 1,
        errorCode: 'HTTP_500',
      },
    ])

    vi.doMock('../useChatPersist', () => ({
      useChatPersist: () => ({
        messages: messagesRef,
        selectedModel: ref('deepseek-chat'),
        clear: vi.fn(),
      }),
    }))

    vi.doMock('../useChatApi', () => ({
      useChatApi: () => ({
        sendWithRetry: vi.fn(),
      }),
      getErrorCode: vi.fn(() => 'UNKNOWN'),
    }))

    vi.doMock('../useNetworkStatus', () => ({
      useNetworkStatus: () => ({
        isOnline: ref(true),
      }),
    }))

    const { useAIChat } = await import('../useAIChat')
    const { hasRetriesExhausted } = useAIChat()
    expect(hasRetriesExhausted.value).toBe(true)
  })

  it('should be true when latest user message has timeout status', async () => {
    vi.resetModules()

    const messagesRef = ref<ChatMessage[]>([
      {
        id: 'msg_1',
        role: 'user',
        content: 'Hello',
        timestamp: new Date(),
        status: 'timeout',
        retryCount: 1,
        errorCode: 'TIMEOUT',
      },
    ])

    vi.doMock('../useChatPersist', () => ({
      useChatPersist: () => ({
        messages: messagesRef,
        selectedModel: ref('deepseek-chat'),
        clear: vi.fn(),
      }),
    }))

    vi.doMock('../useChatApi', () => ({
      useChatApi: () => ({
        sendWithRetry: vi.fn(),
      }),
      getErrorCode: vi.fn(() => 'TIMEOUT'),
    }))

    vi.doMock('../useNetworkStatus', () => ({
      useNetworkStatus: () => ({
        isOnline: ref(true),
      }),
    }))

    const { useAIChat } = await import('../useAIChat')
    const { hasRetriesExhausted } = useAIChat()
    expect(hasRetriesExhausted.value).toBe(true)
  })

  it('should be false when only assistant messages exist', async () => {
    vi.resetModules()

    const messagesRef = ref<ChatMessage[]>([
      {
        id: 'msg_1',
        role: 'assistant',
        content: 'Welcome!',
        timestamp: new Date(),
        status: 'sent',
      },
    ])

    vi.doMock('../useChatPersist', () => ({
      useChatPersist: () => ({
        messages: messagesRef,
        selectedModel: ref('deepseek-chat'),
        clear: vi.fn(),
      }),
    }))

    vi.doMock('../useChatApi', () => ({
      useChatApi: () => ({
        sendWithRetry: vi.fn(),
      }),
      getErrorCode: vi.fn(() => 'UNKNOWN'),
    }))

    vi.doMock('../useNetworkStatus', () => ({
      useNetworkStatus: () => ({
        isOnline: ref(true),
      }),
    }))

    const { useAIChat } = await import('../useAIChat')
    const { hasRetriesExhausted } = useAIChat()
    expect(hasRetriesExhausted.value).toBe(false)
  })

  it('should expose docsUrl from chatModels', async () => {
    vi.resetModules()

    vi.doMock('../useChatPersist', () => ({
      useChatPersist: () => ({
        messages: ref<ChatMessage[]>([]),
        selectedModel: ref('deepseek-chat'),
        clear: vi.fn(),
      }),
    }))

    vi.doMock('../useChatApi', () => ({
      useChatApi: () => ({
        sendWithRetry: vi.fn(),
      }),
      getErrorCode: vi.fn(() => 'UNKNOWN'),
    }))

    vi.doMock('../useNetworkStatus', () => ({
      useNetworkStatus: () => ({
        isOnline: ref(true),
      }),
    }))

    const { useAIChat } = await import('../useAIChat')
    const { docsUrl } = useAIChat()
    expect(docsUrl).toBe('https://docs.lurus.cn')
  })
})
