/**
 * Code Examples Data
 * Centralized data for the Platform Overview code showcase (S3)
 * Contains API request and response examples for developer trust
 */

import type { CodeExample } from '../types/codeExample'

export const codeExamples = [
  {
    id: 'request',
    label: 'Request',
    language: 'bash',
    code: `curl https://api.lurus.cn/v1/chat/completions \
  -H "Authorization: Bearer $LURUS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'`,
    showAuthTag: true,
    ariaLabel: 'API chat completion 请求示例',
  },
  {
    id: 'response',
    label: 'Response',
    language: 'json',
    code: `{
  "id": "chatcmpl-abc123",
  "model": "deepseek-chat",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 9,
    "total_tokens": 17
  }
}`,
    showAuthTag: false,
    ariaLabel: 'API chat completion 响应示例',
  },
] satisfies CodeExample[]
