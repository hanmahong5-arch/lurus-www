<script setup lang="ts">
const products = [
  { name: 'Lurus API', color: '#6B8BA4' },
  { name: 'GuShen', color: '#7D8B6A' },
  { name: 'Switch', color: '#C67B5C' },
  { name: 'Docs', color: '#C9A227' },
  { name: 'Deaigc', color: '#8B6B7D' },
]
</script>

<template>
  <section class="relative min-h-golden-vh flex items-center justify-center overflow-hidden bg-cream-50">
    <!-- Paper texture background -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Subtle grid pattern like notebook paper -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>

      <!-- Corner doodles -->
      <div class="doodle-corner top-12 left-12"></div>
      <div class="doodle-corner top-12 right-12 -scale-x-100"></div>
      <div class="doodle-corner bottom-24 left-12 -scale-y-100"></div>
      <div class="doodle-corner bottom-24 right-12 scale-[-1]"></div>

      <!-- Floating decorative elements -->
      <div
        v-for="i in 4"
        :key="i"
        class="absolute w-3 h-3 rounded-full bg-ochre/20 animate-float"
        :style="{
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${4 + Math.random() * 4}s`
        }"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-fib-7 pt-24">
      <!-- Logo Badge -->
      <div class="inline-flex items-center gap-3 px-6 py-3 border-sketchy bg-cream-100 mb-fib-6 hover:shadow-paper-hover transition-all">
        <div class="w-10 h-10 rounded-lg bg-ochre flex items-center justify-center border-2 border-ink-300">
          <span class="text-cream-50 font-hand font-bold text-xl">L</span>
        </div>
        <span class="text-ink-700 font-medium">Lurus Technology</span>
        <span class="w-2 h-2 rounded-full bg-product-gushen animate-pulse"></span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-phi-2xl sm:text-phi-3xl lg:text-[80px] text-ink-900 mb-fib-4 leading-tight font-bold">
        <span class="block mb-2">统一接入全球 AI 模型</span>
        <span class="text-gradient-ochre font-hand">一个 API，所有模型</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-phi-xl text-ink-500 max-w-3xl mx-auto mb-fib-6 leading-relaxed">
        通过 Lurus API 统一调用主流大模型，内置智能路由与负载均衡，
        让你专注于 <span class="text-ink-900 font-medium underline-doodle">产品开发</span>，
        而非 <span class="text-ink-900 font-medium underline-doodle">基础设施</span>
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-fib-4 justify-center mb-fib-5">
        <a
          href="https://api.lurus.cn"
          class="btn-hand btn-hand-primary inline-flex items-center gap-2"
        >
          <span>获取 API Key</span>
          <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a
          href="https://docs.lurus.cn"
          class="btn-hand inline-flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>查看文档</span>
        </a>
      </div>

      <!-- Product Tags -->
      <div class="relative">
        <p class="text-sm text-ink-300 mb-fib-5">我们的产品</p>
        <div class="flex flex-wrap justify-center gap-fib-4">
          <div
            v-for="product in products"
            :key="product.name"
            class="group px-5 py-2.5 border-sketchy bg-cream-100 hover:shadow-paper-hover transition-all cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125"
                :style="{ backgroundColor: product.color }"
              ></div>
              <span class="text-sm text-ink-700 group-hover:text-ink-900 transition-colors">{{ product.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-ink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../styles/main.css";
</style>
