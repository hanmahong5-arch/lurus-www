/**
 * Chat module type definitions
 * Defines message status, roles, and API response types
 */

export type MessageStatus = 'sending' | 'sent' | 'failed' | 'timeout'
export type MessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  status: MessageStatus
  isOptimistic?: boolean
  retryCount?: number
  errorCode?: string
}

export interface ChatApiResponse {
  id: string
  choices: Array<{
    message: { role: string; content: string }
    finish_reason: string
  }>
}

export interface QuickPrompt {
  icon: string
  label: string
  prompt: string
}

export interface ModelOption {
  id: string
  name: string
}

export interface ChatState {
  messages: ChatMessage[]
  selectedModel: string
  isLoading: boolean
  isTyping: boolean
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TimeoutError'
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}
