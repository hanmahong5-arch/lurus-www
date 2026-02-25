/**
 * Dashboard Preview Data
 * Centralized configuration for the Platform Overview dashboard preview (S3)
 * When screenshotSrc is empty, the component falls back to CodeShowcase
 */

import type { DashboardPreviewConfig } from '../types/dashboardPreview'

export const dashboardPreviewConfig = {
  screenshotSrc: '',
  screenshotAlt: 'Lurus API 控制台仪表盘 — 展示调用量、延迟和模型分布等关键监控指标',
  fallbackCode: `// Lurus API — OpenAI-compatible interface
const response = await fetch("https://api.lurus.cn/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    model: "deepseek-chat",
    messages: [{ role: "user", content: "Hello!" }],
    stream: true
  })
})`,
  fallbackLanguage: 'typescript',
  fallbackAriaLabel: 'Lurus API 调用代码示例',
  title: '控制台预览',
  caption: '兼容 OpenAI 接口，一行代码切换模型',
} satisfies DashboardPreviewConfig
