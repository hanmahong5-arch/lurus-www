/**
 * Pricing Configuration
 * Centralized pricing plan data for subscription management
 */

export interface PricingPlan {
  code: string
  name: string
  price: number
  period: string
  dailyQuota: string
  totalQuota: string
  features: string[]
  popular?: boolean
}

/**
 * Default pricing plans
 * These serve as fallback when API is unavailable
 */
export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    code: 'weekly',
    name: '周卡',
    price: 19.9,
    period: '7天',
    dailyQuota: '50万',
    totalQuota: '500万',
    features: [
      '每日 50 万 Token 配额',
      '总计 500 万 Token',
      '支持 Claude / GPT / Gemini',
      '基础客服支持',
    ],
  },
  {
    code: 'monthly',
    name: '月卡',
    price: 59.9,
    period: '30天',
    dailyQuota: '100万',
    totalQuota: '5000万',
    features: [
      '每日 100 万 Token 配额',
      '总计 5000 万 Token',
      '支持 Claude / GPT / Gemini',
      '优先客服支持',
      '配额用尽自动降级',
    ],
    popular: true,
  },
  {
    code: 'quarterly',
    name: '季卡',
    price: 149.9,
    period: '90天',
    dailyQuota: '200万',
    totalQuota: '2亿',
    features: [
      '每日 200 万 Token 配额',
      '总计 2 亿 Token',
      '支持 Claude / GPT / Gemini',
      '专属客服支持',
      '配额用尽自动降级',
    ],
  },
  {
    code: 'yearly',
    name: '年卡',
    price: 499.9,
    period: '365天',
    dailyQuota: '500万',
    totalQuota: '无限',
    features: [
      '每日 500 万 Token 配额',
      '总配额无限制',
      '支持 Claude / GPT / Gemini',
      '1对1 专属客服',
      '优先体验新功能',
      '企业发票支持',
    ],
  },
]

/**
 * Pricing API endpoint
 */
export const PRICING_API_ENDPOINT = '/api/subscription/plans'

/**
 * FAQ link
 */
export const PRICING_FAQ_URL = 'https://docs.lurus.cn/faq'

/**
 * Support email
 */
export const SUPPORT_EMAIL = 'support@lurus.cn'
