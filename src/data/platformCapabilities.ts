/**
 * Platform Capabilities Data
 * Centralized data for the Platform Overview section (S3)
 * 6 core capabilities of the Lurus AI Gateway
 */

import type { PlatformCapability, PlatformCapabilityIconPaths } from '../types/platform'

export const platformCapabilities = [
  {
    id: 'models',
    icon: 'layers',
    title: '50+ AI 模型',
    description: '一站式接入 Claude、GPT、Gemini、DeepSeek 等主流模型',
  },
  {
    id: 'load-balancing',
    icon: 'scale',
    title: '智能负载均衡',
    description: '多供应商自动分流，确保最优延迟和可用性',
  },
  {
    id: 'auto-fallback',
    icon: 'shield',
    title: '自动回退',
    description: '主模型异常时自动切换备用供应商，零停机体验',
  },
  {
    id: 'response-cache',
    icon: 'zap',
    title: '响应缓存',
    description: '相同请求智能缓存，降低成本、提升响应速度',
  },
  {
    id: 'monitoring',
    icon: 'chart',
    title: '实时监控',
    description: '完整调用链追踪，可视化用量和性能分析面板',
  },
  {
    id: 'openai-compat',
    icon: 'code',
    title: 'OpenAI 兼容',
    description: '兼容 OpenAI SDK 接口，一行代码迁移',
  },
] satisfies PlatformCapability[]

/**
 * SVG icon paths for platform capability icons
 */
export const platformCapabilityIcons: PlatformCapabilityIconPaths = {
  layers: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  scale: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  zap: 'M13 10V3L4 14h7v7l9-11h-7z',
  chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
}
