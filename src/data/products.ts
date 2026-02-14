/**
 * Products Data
 * Centralized product information for ProductShowcase component
 *
 * 4 core products: API Gateway, GuShen, Webmail, Switch
 * Each product has a useCase field for one-line value proposition
 * Each product has an optional showcase field for visual demo area
 */

import type { Product, ProductIconPaths } from '../types/products'

export const products = [
  {
    id: 'api',
    name: 'Lurus API',
    tagline: 'LLM 统一网关',
    description: '一站式接入 Claude、GPT、Gemini 等主流 AI 模型，提供稳定、低延迟的企业级 API 服务',
    useCase: '3 行代码接入 50+ AI 模型',
    url: 'https://api.lurus.cn',
    icon: 'api',
    color: 'product-api',
    bgColor: '#6B8BA4',
    features: ['统一 API 接口', '智能负载均衡', '用量监控分析', '多租户支持'],
    stats: { value: '99.9%', label: '可用性' },
    showcase: {
      type: 'code' as const,
      fallbackCode: `curl https://api.lurus.cn/v1/chat/completions \\
  -H "Authorization: Bearer $LURUS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'`,
      fallbackLanguage: 'bash',
      fallbackAriaLabel: 'Lurus API curl 请求示例',
    },
  },
  {
    id: 'gushen',
    name: 'GuShen',
    tagline: 'AI 量化交易',
    description: '基于 AI 的智能量化交易平台，自然语言描述策略需求，AI 自动生成可执行代码',
    useCase: '自然语言描述 → AI 生成量化策略',
    url: 'https://gushen.lurus.cn',
    icon: 'chart',
    color: 'product-gushen',
    bgColor: '#7D8B6A',
    features: ['AI 策略引擎', '实时行情', '风险控制', '回测模拟'],
    stats: { value: '50+', label: '量化策略' },
    showcase: {
      type: 'screenshot' as const,
      screenshotSrc: '',
      screenshotAlt: 'GuShen 量化交易平台策略编辑器 — 展示自然语言输入与 AI 生成的量化策略代码',
      fallbackCode: `# Natural language → AI-generated strategy
def strategy(context):
    """Buy when 5-day MA crosses above 20-day MA"""
    ma5 = context.ta.sma(period=5)
    ma20 = context.ta.sma(period=20)

    if ma5[-1] > ma20[-1] and ma5[-2] <= ma20[-2]:
        context.order_percent("BTC/USDT", 0.5)`,
      fallbackLanguage: 'bash',
      fallbackAriaLabel: 'GuShen AI 量化策略代码示例',
    },
  },
  {
    id: 'webmail',
    name: 'Webmail',
    tagline: '企业邮件',
    description: '自建企业邮件系统，针对中国网络环境优化送达率，支持多域名管理',
    useCase: '自建企业邮件，中国送达率优化',
    url: 'https://mail.lurus.cn',
    icon: 'mail',
    color: 'product-deaigc',
    bgColor: '#8B6B7D',
    features: ['多域名管理', '送达率优化', '反垃圾邮件', '安全加密'],
    stats: { value: '99%', label: '送达率' },
    showcase: {
      type: 'features' as const,
      fallbackFeatures: [
        '多域名管理与统一控制台',
        'SPF/DKIM/DMARC 全配置',
        '中国网络环境送达率优化',
        '端到端 TLS 加密传输',
      ],
    },
  },
  {
    id: 'switch',
    name: 'Lurus Switch',
    tagline: '智能客户端',
    description: '桌面端 AI 模型网关，Go + Web 技术栈，一键切换模型服务',
    useCase: 'Go + Web 跨平台桌面应用',
    url: '#',
    icon: 'desktop',
    color: 'product-switch',
    bgColor: '#C67B5C',
    features: ['桌面端应用', '本地代理', '多平台支持', '离线可用'],
    stats: { value: '3', label: '平台支持' },
    showcase: {
      type: 'features' as const,
      fallbackFeatures: [
        'Windows / macOS / Linux 全平台',
        '本地代理与模型路由',
        '一键切换 AI 模型服务',
        '离线配置管理',
      ],
    },
  },
] satisfies Product[]

/**
 * Icon paths for product icons (SVG path data)
 */
export const productIconPaths: ProductIconPaths = {
  api: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  desktop: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
}

/**
 * curl example for API showcase (API quick start example)
 */
export const curlExample = `curl https://api.lurus.cn/v1/chat/completions \
  -H "Authorization: Bearer $LURUS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'`
