/**
 * Dashboard Preview Data
 * Centralized configuration for the Platform Overview dashboard preview (S3)
 * When screenshotSrc is empty, the component falls back to CodeShowcase
 */

import type { DashboardPreviewConfig } from '../types/dashboardPreview'

export const dashboardPreviewConfig = {
  screenshotSrc: '',
  screenshotAlt: 'Lurus API 控制台仪表盘 — 展示调用量、延迟和模型分布等关键监控指标',
  fallbackCode: `{
  "period": "2026-02-13",
  "total_requests": 12847,
  "avg_latency_ms": 245,
  "models": {
    "deepseek-chat": 5621,
    "gpt-4o": 3892,
    "claude-sonnet": 2104,
    "gemini-pro": 1230
  },
  "success_rate": 99.7,
  "cache_hit_rate": 34.2
}`,
  fallbackLanguage: 'json',
  fallbackAriaLabel: 'API 监控仪表盘数据示例',
  title: '控制台预览',
  caption: '实时监控 API 调用量、响应延迟和模型使用分布',
} satisfies DashboardPreviewConfig
