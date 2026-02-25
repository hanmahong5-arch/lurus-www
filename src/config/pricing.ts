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
 * Support email
 */
export const SUPPORT_EMAIL = 'support@lurus.cn'

/**
 * FAQ items for pricing page
 */
export interface FaqData {
  question: string
  answer: string
}

export const PRICING_FAQ: FaqData[] = [
  {
    question: '什么是 Token 配额？',
    answer: 'Token 是 AI 模型处理文本的基本单位。日配额是每天可使用的 Token 数量，总配额是套餐期内的总可用量。一般来说，1 个汉字约等于 2 个 Token，1 个英文单词约等于 1 个 Token。',
  },
  {
    question: '配额用完了怎么办？',
    answer: '日配额用完后，系统会自动降级到基础服务（响应速度可能变慢）。你也可以随时充值或升级套餐来增加配额。',
  },
  {
    question: '支持哪些支付方式？',
    answer: '我们支持支付宝、微信支付、银行卡（通过 Stripe）等多种支付方式。企业用户可以申请对公转账。',
  },
  {
    question: '可以退款吗？',
    answer: '套餐购买后 7 天内，如未使用超过总配额的 10%，可以申请全额退款。超过 7 天或使用超过 10% 后，将按实际使用量计算退款金额。',
  },
  {
    question: '如何获取企业发票？',
    answer: '年卡用户可以在控制台申请企业增值税发票。请确保填写正确的公司名称和税号。',
  },
  {
    question: '如何切换套餐？',
    answer: '可以在控制台随时升级套餐，升级后按差价补费。降级需等当前套餐到期后生效，系统会自动切换。',
  },
  {
    question: '套餐过期怎么办？',
    answer: '套餐到期后，API 访问会自动降级为免费基础服务。你的账户数据和配置不会丢失，随时可以续费恢复。',
  },
  {
    question: '企业定制套餐如何申请？',
    answer: '如需大额配额、专属模型部署或定制 SLA，请发送邮件至 enterprise@lurus.cn，我们的商务团队将在 24 小时内联系你。',
  },
]
