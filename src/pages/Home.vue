<script setup lang="ts">
import HeroSection from '../components/Hero/HeroSection.vue'
import PortalLinks from '../components/Portal/PortalLinks.vue'
import ProductShowcase from '../components/Products/ProductShowcase.vue'
import FeatureGrid from '../components/Features/FeatureGrid.vue'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

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
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center px-6 py-8 border-sketchy bg-cream-100 hover:shadow-paper-hover transition-all">
            <div class="font-hand text-phi-2xl text-ochre mb-2">99.9%</div>
            <div class="text-ink-500">服务可用性</div>
          </div>
          <div class="text-center px-6 py-8 border-sketchy bg-cream-100 hover:shadow-paper-hover transition-all">
            <div class="font-hand text-phi-2xl text-product-api mb-2">50+</div>
            <div class="text-ink-500">支持模型</div>
          </div>
          <div class="text-center px-6 py-8 border-sketchy bg-cream-100 hover:shadow-paper-hover transition-all">
            <div class="font-hand text-phi-2xl text-product-gushen mb-2">&lt;100ms</div>
            <div class="text-ink-500">平均延迟</div>
          </div>
          <div class="text-center px-6 py-8 border-sketchy bg-cream-100 hover:shadow-paper-hover transition-all">
            <div class="font-hand text-phi-2xl text-product-switch mb-2">10M+</div>
            <div class="text-ink-500">API 调用/天</div>
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

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-hand text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4">
          准备好开始了吗？
        </h2>
        <p class="text-phi-xl text-ink-500 mb-fib-6 max-w-2xl mx-auto">
          立即注册，免费体验 Lurus 提供的全套 AI 基础设施服务
        </p>
        <div class="flex flex-col sm:flex-row gap-fib-4 justify-center">
          <a
            href="https://api.lurus.cn/register"
            class="btn-hand btn-hand-primary inline-flex items-center justify-center gap-2 text-lg px-10 py-5"
          >
            <span>免费注册</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="https://api.lurus.cn"
            class="btn-hand inline-flex items-center justify-center gap-2 text-lg px-10 py-5"
          >
            <span>探索更多</span>
          </a>
        </div>

        <!-- Trust Badges -->
        <div class="mt-fib-6 flex flex-wrap items-center justify-center gap-fib-5 text-ink-500 text-sm">
          <div class="flex items-center gap-2 px-4 py-2 border-sketchy-light bg-cream-50">
            <svg class="w-5 h-5 text-product-gushen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>数据安全加密</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 border-sketchy-light bg-cream-50">
            <svg class="w-5 h-5 text-product-gushen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>无需信用卡</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 border-sketchy-light bg-cream-50">
            <svg class="w-5 h-5 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>即时开通</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "../styles/main.css";
</style>
