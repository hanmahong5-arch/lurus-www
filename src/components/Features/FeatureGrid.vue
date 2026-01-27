<script setup lang="ts">
const features = [
  {
    icon: 'shield',
    title: '企业级安全',
    description: '端到端加密传输，SOC 2 合规，支持私有化部署',
    color: '#6B8BA4'
  },
  {
    icon: 'zap',
    title: '极致性能',
    description: '全球 CDN 加速，智能路由优化，毫秒级响应',
    color: '#C9A227'
  },
  {
    icon: 'layers',
    title: '统一接口',
    description: '一套 SDK 接入所有模型，降低集成复杂度',
    color: '#8B6B7D'
  },
  {
    icon: 'scale',
    title: '弹性扩展',
    description: '自动扩缩容，支持千万级并发请求',
    color: '#7D8B6A'
  },
  {
    icon: 'chart',
    title: '实时监控',
    description: '完整的调用链追踪，可视化数据分析面板',
    color: '#C67B5C'
  },
  {
    icon: 'support',
    title: '专业支持',
    description: '7x24 技术支持，专属客户成功经理',
    color: '#6B8BA4'
  }
]

const getIconPath = (name: string) => {
  const icons: Record<string, string> = {
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    zap: 'M13 10V3L4 14h7v7l9-11h-7z',
    layers: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    scale: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    support: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
  }
  return icons[name] || icons.shield
}
</script>

<template>
  <section id="features" class="py-fib-7 bg-cream-100 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-12 right-12 doodle-corner -scale-x-100 opacity-40"></div>
    <div class="absolute bottom-12 left-12 doodle-corner -scale-y-100 opacity-40"></div>

    <!-- Subtle pattern -->
    <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 55px 55px;"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-fib-6">
        <span class="inline-block px-4 py-2 border-sketchy-light text-ink-500 text-sm font-medium mb-fib-4">
          <span class="doodle-star mr-2"></span>
          核心优势
        </span>
        <h2 class="font-hand text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4">
          为什么选择 <span class="text-gradient-ochre underline-doodle">Lurus</span>
        </h2>
        <p class="text-phi-xl text-ink-500 max-w-2xl mx-auto">
          专为企业级应用设计，提供可靠、安全、高性能的 AI 基础设施
        </p>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="group card-sketchy p-8 hover:shadow-paper-hover"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-xl flex items-center justify-center mb-5 border-sketchy group-hover:animate-wiggle"
            :style="{ backgroundColor: feature.color }"
          >
            <svg class="w-8 h-8 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getIconPath(feature.icon)" />
            </svg>
          </div>

          <!-- Content -->
          <h3 class="font-hand text-phi-xl text-ink-900 mb-3 group-hover:text-gradient-ochre transition-all duration-300">
            {{ feature.title }}
          </h3>
          <p class="text-ink-500 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../styles/main.css";
</style>
