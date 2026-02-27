<script setup lang="ts">
import { products } from '../../data/products'
import ProductSubCard from './ProductSubCard.vue'
import AnimatedProductGraph from './AnimatedProductGraph.vue'
</script>

<template>
  <section id="products" aria-label="产品生态" class="py-fib-7 bg-cream-50 relative overflow-hidden">
    <div class="doodle-corner top-8 left-8" aria-hidden="true"></div>
    <div class="doodle-corner bottom-8 right-8 rotate-180" aria-hidden="true"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-fib-6 reveal-fade-up">
        <span class="inline-block px-4 py-2 border-sketchy-light text-ink-500 text-sm font-medium mb-fib-4">
          <span class="doodle-star mr-2" aria-hidden="true"></span>
          Product Ecosystem
        </span>
        <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4 font-semibold">
          探索 <span class="text-gradient-ochre underline-doodle">产品生态</span>
        </h2>
        <p class="text-phi-xl text-ink-500 max-w-2xl mx-auto">
          全栈自建，从 AI 网关到量化交易到企业邮件
        </p>
      </div>

      <!-- Main Card -->
      <div data-testid="product-main-card" class="card-sketchy p-8 lg:p-12 mb-10 reveal-fade-up">
        <div class="flex flex-col lg:flex-row items-center gap-8">
          <div class="flex-1 text-center lg:text-left">
            <h3 class="text-phi-2xl text-ink-900 mb-fib-3 font-semibold">
              一个团队，全栈自建
            </h3>
            <p class="text-phi-lg text-ink-500 mb-fib-4 max-w-2xl">
              从统一 AI 网关到量化交易平台，从企业邮件到桌面客户端，每一行代码都出自同一支团队，确保一致的品质与体验。
            </p>
            <div class="flex flex-wrap justify-center lg:justify-start gap-fib-3">
              <span v-for="product in products" :key="product.id" class="inline-flex items-center gap-2 px-3 py-1 border-sketchy-light text-sm text-ink-700">
                <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: product.bgColor }" aria-hidden="true"></span>
                {{ product.name }}
              </span>
            </div>
          </div>

          <div class="w-full lg:w-2/5 flex justify-center">
            <AnimatedProductGraph :products="products" />
          </div>
        </div>
      </div>

      <!-- Product Sub-cards Grid (2x2) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-stagger">
        <ProductSubCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>
