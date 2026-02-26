<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '../components/Hero/HeroSection.vue'
import CodeShowcase from '../components/TechDemo/CodeShowcase.vue'
import PortalLinks from '../components/Portal/PortalLinks.vue'
import ProductShowcase from '../components/Products/ProductShowcase.vue'
import StatsDisplay from '../components/Products/StatsDisplay.vue'
import PlatformCapabilities from '../components/Features/PlatformCapabilities.vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTracking } from '../composables/useTracking'
import { useAuth } from '../composables/useAuth'
import { trustBadges, trustBadgeIconPaths } from '../data/stats'
import GettingStartedSection from '../components/GettingStarted/GettingStartedSection.vue'
import FinalCTA from '../components/CTAs/FinalCTA.vue'

const pageRef = ref<HTMLElement | null>(null)
useScrollReveal(pageRef)

const { track } = useTracking()
const { login } = useAuth()
const trackCta = (label: string) => {
  track('cta_click', { label })
}

</script>

<template>
  <div ref="pageRef">
    <!-- Hero Section -->
    <HeroSection>
      <template #right>
        <CodeShowcase
          code="curl https://api.lurus.cn/v1/models"
          language="bash"
          ariaLabel="API 调用示例"
        />
      </template>
    </HeroSection>

    <!-- Portal Links Section -->
    <PortalLinks />

    <!-- Products Section -->
    <ProductShowcase />

    <!-- Platform Capabilities Section (S3: Platform Overview) -->
    <PlatformCapabilities />

    <!-- Stats Section -->
    <StatsDisplay />

    <!-- Getting Started Section (S6) -->
    <GettingStartedSection />

    <!-- Use Cases Section -->
    <section class="py-fib-6 bg-cream-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-fib-5 reveal-fade-up">
          <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-3 font-semibold">覆盖多元场景</h2>
          <p class="text-phi-lg text-ink-500 max-w-2xl mx-auto">一个接口，连接学术、金融、医疗、法律、软件工程等行业场景</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-fib-4">
          <div class="border-sketchy bg-cream-100 p-fib-4 text-center reveal-fade-up">
            <div class="text-3xl mb-2">📚</div>
            <h3 class="font-hand font-bold text-ink-900 text-lg">学术研究</h3>
            <p class="text-ink-400 text-sm mt-1">论文综述 · 数据分析</p>
          </div>
          <div class="border-sketchy bg-cream-100 p-fib-4 text-center reveal-fade-up">
            <div class="text-3xl mb-2">💹</div>
            <h3 class="font-hand font-bold text-ink-900 text-lg">金融分析</h3>
            <p class="text-ink-400 text-sm mt-1">市场研究 · 量化策略</p>
          </div>
          <div class="border-sketchy bg-cream-100 p-fib-4 text-center reveal-fade-up">
            <div class="text-3xl mb-2">🏥</div>
            <h3 class="font-hand font-bold text-ink-900 text-lg">医疗健康</h3>
            <p class="text-ink-400 text-sm mt-1">文献检索 · 临床辅助</p>
          </div>
          <div class="border-sketchy bg-cream-100 p-fib-4 text-center reveal-fade-up">
            <div class="text-3xl mb-2">⚖️</div>
            <h3 class="font-hand font-bold text-ink-900 text-lg">法律服务</h3>
            <p class="text-ink-400 text-sm mt-1">法规检索 · 合同审查</p>
          </div>
        </div>
        <div class="text-center mt-fib-4">
          <router-link to="/solutions" class="text-ochre hover:underline font-medium text-sm">
            查看全部解决方案 →
          </router-link>
        </div>
      </div>
    </section>

    <!-- Tech & Security Highlights -->
    <section class="py-fib-6 bg-cream-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-fib-4">
          <div class="border-sketchy bg-cream-50 p-fib-4 reveal-fade-up">
            <svg class="w-8 h-8 text-ochre mb-fib-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <h3 class="font-hand font-bold text-ink-900 text-lg mb-2">多供应商智能路由</h3>
            <p class="text-ink-500 text-sm">自动选择最优供应商，故障时秒级切换备用通道</p>
          </div>
          <div class="border-sketchy bg-cream-50 p-fib-4 reveal-fade-up">
            <svg class="w-8 h-8 text-ochre mb-fib-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 class="font-hand font-bold text-ink-900 text-lg mb-2">端到端加密</h3>
            <p class="text-ink-500 text-sm">全链路 TLS 1.3，不存储对话内容，符合 PIPL 合规要求</p>
          </div>
          <div class="border-sketchy bg-cream-50 p-fib-4 reveal-fade-up">
            <svg class="w-8 h-8 text-ochre mb-fib-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 class="font-hand font-bold text-ink-900 text-lg mb-2">智能缓存加速</h3>
            <p class="text-ink-500 text-sm">语义级缓存重复请求，降低成本并提升响应速度</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-fib-7 bg-cream-100 relative overflow-hidden">
      <!-- Decorative pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>

      <!-- Corner decorations -->
      <div class="absolute top-12 left-12 doodle-corner opacity-40"></div>
      <div class="absolute top-12 right-12 doodle-corner -scale-x-100 opacity-40"></div>
      <div class="absolute bottom-12 left-12 doodle-corner -scale-y-100 opacity-40"></div>
      <div class="absolute bottom-12 right-12 doodle-corner scale-[-1] opacity-40"></div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-fade-up">
        <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4 font-semibold">
          准备好开始了吗？
        </h2>
        <p class="text-phi-xl text-ink-500 mb-fib-6 max-w-2xl mx-auto">
          立即注册，免费体验 Lurus 提供的全套 AI 基础设施服务
        </p>
        <div class="flex flex-col sm:flex-row gap-fib-4 justify-center">
          <button
            class="btn-hand btn-hand-primary inline-flex items-center justify-center gap-2 text-lg px-10 py-5"
            @click="trackCta('register'); login({ prompt: 'create' })"
          >
            <span>免费注册</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <a
            href="https://docs.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hand inline-flex items-center justify-center gap-2 text-lg px-10 py-5"
            @click="trackCta('explore')"
          >
            <span>探索更多</span>
          </a>
        </div>

        <!-- Trust Badges -->
        <div class="mt-fib-6 flex flex-wrap items-center justify-center gap-fib-5 text-ink-500 text-sm">
          <div
            v-for="badge in trustBadges"
            :key="badge.label"
            class="flex items-center gap-2 px-4 py-2 border-sketchy-light bg-cream-50"
          >
            <svg :class="['w-5 h-5', badge.iconColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="trustBadgeIconPaths[badge.icon]" />
            </svg>
            <span>{{ badge.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <FinalCTA />
  </div>
</template>

<style scoped>
@reference "../styles/main.css";
</style>
