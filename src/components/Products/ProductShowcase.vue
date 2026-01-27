<script setup lang="ts">
interface Product {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  icon: string
  color: string
  bgColor: string
  features: string[]
  stats: { value: string; label: string }
  featured?: boolean
}

const products: Product[] = [
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
]

const getIconPath = (icon: string) => {
  const paths: Record<string, string> = {
    api: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    desktop: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    paper: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
  return paths[icon] || paths.api
}

const featuredProduct = products.find(p => p.featured)
const gridProducts = products.filter(p => !p.featured)
</script>

<template>
  <section id="products" class="py-fib-7 bg-cream-50 relative overflow-hidden">
    <!-- Decorative corner doodles -->
    <div class="doodle-corner top-8 left-8"></div>
    <div class="doodle-corner bottom-8 right-8 rotate-180"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-fib-6">
        <span class="inline-block px-4 py-2 border-sketchy-light text-ink-500 text-sm font-medium mb-fib-4">
          <span class="doodle-star mr-2"></span>
          产品矩阵
        </span>
        <h2 class="font-hand text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4">
          完整的 <span class="text-gradient-ochre underline-doodle">AI 解决方案</span>
        </h2>
        <p class="text-phi-xl text-ink-500 max-w-2xl mx-auto">
          从开发工具到生产部署，我们提供全方位的 AI 基础设施服务
        </p>
      </div>

      <!-- Featured Product (Lurus API) - Golden Ratio Hero -->
      <a
        v-if="featuredProduct"
        :href="featuredProduct.url"
        class="group block mb-10"
      >
        <div
          class="card-sketchy p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8"
          :class="`card-${featuredProduct.id}`"
        >
          <!-- Icon -->
          <div
            class="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center border-sketchy group-hover:animate-wiggle"
            :style="{ backgroundColor: featuredProduct.bgColor }"
          >
            <svg class="w-12 h-12 lg:w-16 lg:h-16 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getIconPath(featuredProduct.icon)" />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1 text-center lg:text-left">
            <div class="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-fib-3">
              <h3 class="font-hand text-phi-2xl text-ink-900 group-hover:text-gradient-ochre transition-colors">
                {{ featuredProduct.name }}
              </h3>
              <span class="inline-block px-3 py-1 text-xs font-medium text-cream-50 rounded-full" :style="{ backgroundColor: featuredProduct.bgColor }">
                {{ featuredProduct.tagline }}
              </span>
            </div>
            <p class="text-ink-500 mb-fib-4 max-w-2xl">
              {{ featuredProduct.description }}
            </p>
            <!-- Features -->
            <div class="flex flex-wrap justify-center lg:justify-start gap-fib-2">
              <span
                v-for="feature in featuredProduct.features"
                :key="feature"
                class="px-3 py-1 text-sm bg-cream-200 text-ink-700 border-sketchy-light"
              >
                {{ feature }}
              </span>
            </div>
          </div>

          <!-- Stats -->
          <div class="text-center px-8 py-6 border-sketchy bg-cream-100">
            <div class="font-hand text-phi-2xl" :style="{ color: featuredProduct.bgColor }">{{ featuredProduct.stats.value }}</div>
            <div class="text-sm text-ink-500 mt-1">{{ featuredProduct.stats.label }}</div>
          </div>
        </div>
      </a>

      <!-- Product Grid (4 cards in golden layout) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a
          v-for="product in gridProducts"
          :key="product.id"
          :href="product.url"
          class="group"
        >
          <div
            class="card-sketchy p-6 h-full flex flex-col"
            :class="`card-${product.id}`"
          >
            <!-- Header -->
            <div class="flex items-start justify-between mb-fib-3">
              <!-- Icon -->
              <div
                class="w-14 h-14 rounded-xl flex items-center justify-center border-sketchy group-hover:animate-wiggle"
                :style="{ backgroundColor: product.bgColor }"
              >
                <svg class="w-7 h-7 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getIconPath(product.icon)" />
                </svg>
              </div>
              <!-- Stats Badge -->
              <div class="text-right">
                <div class="font-hand text-xl" :style="{ color: product.bgColor }">{{ product.stats.value }}</div>
                <div class="text-xs text-ink-300">{{ product.stats.label }}</div>
              </div>
            </div>

            <!-- Title & Tagline -->
            <h3 class="font-hand text-phi-xl text-ink-900 group-hover:text-gradient-ochre transition-colors mb-1">
              {{ product.name }}
            </h3>
            <p class="text-sm text-ink-500 mb-fib-3">{{ product.tagline }}</p>

            <!-- Description -->
            <p class="text-ink-500 text-sm flex-1 mb-fib-3">
              {{ product.description }}
            </p>

            <!-- Features -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span
                v-for="feature in product.features.slice(0, 2)"
                :key="feature"
                class="px-3 py-1 text-xs bg-cream-200 text-ink-700 border-sketchy-light"
              >
                {{ feature }}
              </span>
              <span v-if="product.features.length > 2" class="px-3 py-1 text-xs text-ink-300">
                +{{ product.features.length - 2 }}
              </span>
            </div>

            <!-- Arrow indicator -->
            <div class="mt-4 flex items-center gap-2 text-ink-500 group-hover:text-ochre transition-colors">
              <span class="text-sm font-medium">了解更多</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../styles/main.css";
</style>
