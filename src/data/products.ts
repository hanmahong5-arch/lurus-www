/**
 * Products Data
 * Centralized product information for ProductShowcase component
 */

import type { Product, ProductIconPaths } from '../types/products'

export const products = [
  {
    id: 'api',
    name: 'Lurus API',
    tagline: 'LLM 统一网关',
    description: '一站式接入 Claude、GPT、Gemini 等主流 AI 模型，提供稳定、低延迟的企业级 API 服务',
    url: 'https://api.lurus.cn',
    icon: 'api',
    color: 'product-api',
    bgColor: '#6B8BA4',
    features: ['统一 API 接口', '智能负载均衡', '用量监控分析', '多租户支持'],
    stats: { value: '99.9%', label: '可用性' },
    featured: true
  },
  {
    id: 'gushen',
    name: 'GuShen',
    tagline: 'AI 量化交易',
    description: '基于 AI 的智能量化交易平台，助力投资决策',
    url: 'https://gushen.lurus.cn',
    icon: 'chart',
    color: 'product-gushen',
    bgColor: '#7D8B6A',
    features: ['AI 策略引擎', '实时行情', '风险控制', '回测模拟'],
    stats: { value: '50+', label: '量化策略' }
  },
  {
    id: 'switch',
    name: 'Lurus Switch',
    tagline: '智能客户端',
    description: '桌面端 AI 模型网关，一键切换模型服务',
    url: '#',
    icon: 'desktop',
    color: 'product-switch',
    bgColor: '#C67B5C',
    features: ['桌面端应用', '本地代理', '多平台支持', '离线可用'],
    stats: { value: '3', label: '平台支持' }
  },
  {
    id: 'docs',
    name: 'Lurus Docs',
    tagline: '文档中心',
    description: '完整的 API 文档、使用指南和最佳实践',
    url: 'https://docs.lurus.cn',
    icon: 'book',
    color: 'product-docs',
    bgColor: '#C9A227',
    features: ['API 参考', '快速入门', '代码示例', '常见问题'],
    stats: { value: '100+', label: '文档页面' }
  },
  {
    id: 'deaigc',
    name: 'Deaigc',
    tagline: '论文润色服务',
    description: 'AI 驱动的学术论文润色与翻译服务，助力学术发表',
    url: 'https://deaigc.lurus.cn',
    icon: 'paper',
    color: 'product-deaigc',
    bgColor: '#8B6B7D',
    features: ['语法校正', '风格优化', '学术翻译', '格式规范'],
    stats: { value: '10K+', label: '论文处理' }
  }
] satisfies Product[]

/**
 * Icon paths for product icons
 */
export const productIconPaths: ProductIconPaths = {
  api: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  desktop: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  paper: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
}

/**
 * curl example for API showcase
 */
export const curlExample = `curl https://api.lurus.cn/v1/chat/completions \\
  -H "Authorization: Bearer $LURUS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'`
