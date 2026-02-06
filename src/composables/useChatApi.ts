/**
 * Chat API composable
 * Handles API calls with timeout, retry, and error handling
 */

import type { ChatApiResponse } from '../types/chat'
import { TimeoutError, NetworkError } from '../types/chat'

const API_URL = 'https://api.lurus.cn/v1/chat/completions'
const API_KEY = 'sk-gushenAIQuantTradingPlatform2026'
const TIMEOUT_MS = 30000
const MAX_RETRIES = 3

/**
 * Get human-readable error message based on error type and status code
 */
export const getErrorMessage = (error: unknown, statusCode?: number): string => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return '请求超时(30秒)，请检查网络后重试'
  }
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return '网络连接失败，请检查网络'
  }
  if (error instanceof TimeoutError) {
    return error.message
  }
  if (error instanceof NetworkError) {
    return error.message
  }
  if (statusCode === 401) return '认证失败，请刷新页面'
  if (statusCode === 429) return '请求过于频繁，请稍后再试'
  if (statusCode === 500) return '服务器繁忙，请稍后重试'
  if (statusCode && statusCode >= 500) return '服务器错误，请稍后重试'
  return '未知错误，请稍后重试'
}

/**
 * Get error code from error for tracking
 */
export const getErrorCode = (error: unknown, statusCode?: number): string => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return 'TIMEOUT'
  }
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'NETWORK_ERROR'
  }
  if (statusCode) {
    return `HTTP_${statusCode}`
  }
  return 'UNKNOWN'
}

/**
 * Send message with timeout using AbortController
 */
const sendWithTimeout = async (
  messages: Array<{ role: string; content: string }>,
  model: string
): Promise<ChatApiResponse> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorMsg = getErrorMessage(null, response.status)
      throw new NetworkError(errorMsg)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new TimeoutError('请求超时(30秒)，请检查网络后重试')
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Send message with exponential backoff retry
 * Retry delays: 1s -> 2s -> 4s (max 3 attempts)
 */
export const sendWithRetry = async (
  messages: Array<{ role: string; content: string }>,
  model: string,
  maxRetries: number = MAX_RETRIES
): Promise<ChatApiResponse> => {
  let lastError: unknown

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await sendWithTimeout(messages, model)
    } catch (error) {
      lastError = error

      // Don't retry on specific errors
      if (error instanceof NetworkError) {
        const msg = error.message
        if (msg.includes('认证失败') || msg.includes('请求过于频繁')) {
          throw error
        }
      }

      // Last attempt, throw the error
      if (attempt === maxRetries - 1) {
        throw error
      }

      // Exponential backoff: 1s, 2s, 4s...
      const delay = Math.min(1000 * Math.pow(2, attempt), 8000)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

export const useChatApi = () => {
  return {
    sendWithRetry,
    getErrorMessage,
    getErrorCode
  }
}
