<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '../components/Hero/HeroSection.vue'
import CodeShowcase from '../components/TechDemo/CodeShowcase.vue'
import PortalLinks from '../components/Portal/PortalLinks.vue'
import ProductShowcase from '../components/Products/ProductShowcase.vue'
import FeatureGrid from '../components/Features/FeatureGrid.vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTracking } from '../composables/useTracking'
import { stats, trustBadges, trustBadgeIconPaths } from '../data/stats'
import FinalCTA from '../components/CTAs/FinalCTA.vue'

const pageRef = ref<HTMLElement | null>(null)
useScrollReveal(pageRef)

const { track } = useTracking()
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

    <!-- Features Section -->
    <FeatureGrid />

    <!-- Stats Section -->
    <section class="py-16 bg-cream-50 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-8 left-8 doodle-corner opacity-30"></div>
      <div class="absolute bottom-8 right-8 doodle-corner rotate-180 opacity-30"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-stagger">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center px-6 py-8 border-sketchy bg-cream-100 hover:shadow-paper-hover transition-all"
          >
            <div :class="['text-phi-2xl mb-2 font-bold', stat.color]">{{ stat.value }}</div>
            <div class="text-ink-500">{{ stat.label }}</div>
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
          <a
            href="https://api.lurus.cn/register"
            class="btn-hand btn-hand-primary inline-flex items-center justify-center gap-2 text-lg px-10 py-5"
            @click="trackCta('register')"
          >
            <span>免费注册</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="https://api.lurus.cn"
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
