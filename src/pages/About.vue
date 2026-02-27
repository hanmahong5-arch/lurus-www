<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import AdvantagesSection from '../components/About/AdvantagesSection.vue'
import AnimatedTimeline from '../components/About/AnimatedTimeline.vue'

const pageRef = ref<HTMLElement | null>(null)
useScrollReveal(pageRef)

const milestones = [
  { year: '2024', event: '公司成立，确立 AI 基础设施服务方向' },
  { year: '2025 Q1', event: 'Lurus API 网关上线，支持 OpenAI / Anthropic' },
  { year: '2025 Q2', event: 'GuShen AI 量化交易平台发布' },
  { year: '2025 Q3', event: '接入 50+ 模型，日均 API 调用突破百万' },
  { year: '2026 Q1', event: 'Lurus Switch 桌面客户端发布，全平台覆盖' },
]

const values = [
  {
    title: '可靠稳定',
    desc: '多节点部署，智能容灾，确保服务 7x24 小时稳定运行',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: '极致性能',
    desc: '优化网络路由，就近接入，提供极低延迟的访问体验',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: '透明定价',
    desc: '简单清晰的定价模式，按需付费，没有隐藏费用',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]
</script>

<template>
  <div ref="pageRef" class="pt-16">
    <!-- Hero -->
    <section class="py-fib-7 bg-cream-100 relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>
      <div class="absolute top-12 left-12 doodle-corner opacity-40"></div>
      <div class="absolute bottom-12 right-12 doodle-corner rotate-180 opacity-40"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-fade-up">
        <h1 class="text-phi-3xl sm:text-phi-4xl font-hand font-bold text-ink-900 mb-fib-3">
          关于 Lurus
        </h1>
        <p class="text-phi-xl text-ink-500 max-w-2xl mx-auto">
          让 AI 开发更简单、更稳定、更高效
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="py-fib-6 bg-cream-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-fib-5 items-center reveal-fade-up">
          <div>
            <h2 class="text-phi-2xl font-hand font-bold text-ink-900 mb-fib-3">我们的使命</h2>
            <p class="text-ink-500 leading-relaxed">
              在 AI 技术快速发展的今天，开发者面临着 API 访问不稳定、多模型切换困难、
              成本控制复杂等挑战。Lurus 致力于提供统一、稳定、高效的 AI 模型访问服务，
              让开发者专注于创造价值，而不是解决基础设施问题。
            </p>
          </div>
          <div class="border-sketchy bg-cream-100 p-fib-5">
            <div class="grid grid-cols-2 gap-fib-4 text-center">
              <div>
                <div class="text-phi-2xl font-hand font-bold text-ochre mb-1">99.9%</div>
                <div class="text-ink-400 text-sm">服务可用性</div>
              </div>
              <div>
                <div class="text-phi-2xl font-hand font-bold text-ochre mb-1">50+</div>
                <div class="text-ink-400 text-sm">支持模型</div>
              </div>
              <div>
                <div class="text-phi-2xl font-hand font-bold text-ochre mb-1">&lt;100ms</div>
                <div class="text-ink-400 text-sm">平均延迟</div>
              </div>
              <div>
                <div class="text-phi-2xl font-hand font-bold text-ochre mb-1">24/7</div>
                <div class="text-ink-400 text-sm">技术支持</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-fib-6 bg-cream-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-phi-2xl font-hand font-bold text-ink-900 mb-fib-5 text-center reveal-fade-up">核心价值</h2>
        <div class="grid md:grid-cols-3 gap-fib-4">
          <div
            v-for="v in values"
            :key="v.title"
            class="border-sketchy bg-cream-50 p-fib-4 reveal-fade-up"
          >
            <div class="w-12 h-12 border-sketchy bg-cream-100 flex items-center justify-center mb-fib-3">
              <svg class="w-6 h-6 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="v.icon" />
              </svg>
            </div>
            <h3 class="text-phi-lg font-hand font-bold text-ink-900 mb-2">{{ v.title }}</h3>
            <p class="text-ink-500 text-sm">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <AnimatedTimeline :milestones="milestones" />

    <!-- Advantages + Ecosystem Graph -->
    <AdvantagesSection />

    <!-- Contact -->
    <section class="py-fib-6 bg-cream-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-fade-up">
        <h2 class="text-phi-2xl font-hand font-bold text-ink-900 mb-fib-3">联系我们</h2>
        <p class="text-ink-500 mb-fib-5">
          有任何问题或建议？我们很乐意听取你的反馈
        </p>
        <div class="flex flex-wrap justify-center gap-fib-3">
          <a
            href="mailto:support@lurus.cn"
            class="btn-hand inline-flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@lurus.cn
          </a>
          <a
            href="https://docs.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hand inline-flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            文档
          </a>
          <a
            href="https://status.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hand inline-flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            服务状态
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "../styles/main.css";
</style>
