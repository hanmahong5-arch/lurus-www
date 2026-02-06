<script setup lang="ts">
import { ref } from 'vue'
import { products, productIconPaths, curlExample } from '../../data/products'

const curlCopied = ref(false)

const copyCurl = async () => {
  try {
    await navigator.clipboard.writeText(curlExample)
    curlCopied.value = true
    setTimeout(() => { curlCopied.value = false }, 2000)
  } catch {
    // Fallback: no-op on clipboard failure
  }
}

const getIconPath = (icon: string) => {
  return productIconPaths[icon] || productIconPaths.api
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
        <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4 font-semibold">
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
              <h3 class="text-phi-2xl text-ink-900 group-hover:text-gradient-ochre transition-colors font-semibold">
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
            <div class="flex flex-wrap justify-center lg:justify-start gap-fib-2 mb-fib-4">
              <span
                v-for="feature in featuredProduct.features"
                :key="feature"
                class="px-3 py-1 text-sm bg-cream-200 text-ink-700 border-sketchy-light"
              >
                {{ feature }}
              </span>
            </div>

            <!-- Curl Example -->
            <div class="relative rounded-lg overflow-hidden" @click.prevent>
              <div class="flex items-center justify-between px-4 py-2 bg-ink-900 border-b border-ink-700">
                <span class="text-xs text-ink-300 font-mono">Quick Start</span>
                <button
                  @click.prevent="copyCurl"
                  class="text-xs text-ink-300 hover:text-cream-100 transition-colors px-2 py-1 rounded"
                >
                  {{ curlCopied ? '已复制' : '复制' }}
                </button>
              </div>
              <pre class="bg-ink-900 text-cream-100 p-6 font-mono text-sm overflow-x-auto leading-relaxed"><code>{{ curlExample }}</code></pre>
            </div>
          </div>

          <!-- Stats -->
          <div class="text-center px-8 py-6 border-sketchy bg-cream-100">
            <div class="text-phi-2xl font-bold" :style="{ color: featuredProduct.bgColor }">{{ featuredProduct.stats.value }}</div>
            <div class="text-sm text-ink-500 mt-1">{{ featuredProduct.stats.label }}</div>
          </div>
        </div>
      </a>

      <!-- Product Grid (4 cards in golden layout) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
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
                <div class="text-xl font-bold" :style="{ color: product.bgColor }">{{ product.stats.value }}</div>
                <div class="text-xs text-ink-300">{{ product.stats.label }}</div>
              </div>
            </div>

            <!-- Title & Tagline -->
            <h3 class="text-phi-xl text-ink-900 group-hover:text-gradient-ochre transition-colors mb-1 font-semibold">
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
