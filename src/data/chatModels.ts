/**
 * Chat Models and Quick Prompts Data
 * Centralized AI chat configuration for useAIChat composable
 */

import type { ModelOption, QuickPrompt, DemoMessage } from '../types/chat'
import type { ChatConfig } from '../types/common'

/**
 * Available AI models
 */
export const chatModels: ModelOption[] = [
  { id: 'deepseek-chat', name: 'DeepSeek' },
  { id: 'gpt-4o-mini', name: '标准模型' },
  { id: 'claude-sonnet-4-20250514', name: '高级模型' },
]

/**
 * Quick prompts for chat interface
 */
export const quickPrompts: QuickPrompt[] = [
  { icon: '📚', label: '论文总结', prompt: '请帮我总结这篇论文的核心观点、方法论和结论：' },
  { icon: '💹', label: '金融分析', prompt: '请分析以下金融数据的市场影响和投资建议：' },
  { icon: '💻', label: '技术解读', prompt: '请解释以下技术概念，并提供代码示例：' },
  { icon: '🏥', label: '医学科普', prompt: '请用通俗语言解释以下医学知识：' },
  { icon: '⚖️', label: '法律咨询', prompt: '请查询相关法条并解释其实际应用：' },
]

/**
 * Chat configuration constants
 */
export const chatConfig: ChatConfig = {
  debounceMs: 300,
  maxRetries: 3,
  timeoutMs: 30000,
}

/**
 * Documentation URL for fallback when Chat is unavailable
 */
export const DOCS_URL = 'https://docs.lurus.cn'

/**
 * Pre-recorded demo conversation for ChatPreview unavailable state
 * Shown as static content when Chat backend is unreachable (ADR-010)
 */
export const fallbackDemoMessages: DemoMessage[] = [
  { role: 'user', content: 'Lurus API 支持哪些 AI 模型？' },
  { role: 'assistant', content: '目前支持 50+ 主流 AI 模型，包括 GPT-4o、DeepSeek、Claude 等。访问文档了解完整列表。' },
]
