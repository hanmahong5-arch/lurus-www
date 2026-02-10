<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  DEFAULT_PRICING_PLANS,
  PRICING_API_ENDPOINT,
  PRICING_FAQ_URL,
  SUPPORT_EMAIL,
  type PricingPlan,
} from '../../config/pricing'

const plans = ref<PricingPlan[]>(DEFAULT_PRICING_PLANS)
const loading = ref(false)

// Try to fetch plans from API
onMounted(async () => {
  try {
    loading.value = true
    const res = await fetch(PRICING_API_ENDPOINT)
    if (res.ok) {
      const data = await res.json()
      if (data.success && data.data) {
        // API data available, could merge with local
      }
    }
  } catch (_e) {
    // Use default plans
  } finally {
    loading.value = false
  }
})

const handleSubscribe = (planCode: string) => {
  // Redirect to api.lurus.cn for payment
  window.location.href = `https://api.lurus.cn/console/subscription?plan=${planCode}`
}
</script>

<template>
  <section id="pricing" class="py-24 bg-surface-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          简单透明的定价
        </h2>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          按需选择适合你的套餐，所有套餐均支持 Claude / GPT / Gemini 等主流模型
        </p>
      </div>

      <!-- Pricing Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="plan in plans"
          :key="plan.code"
          class="relative rounded-2xl p-6 transition-all duration-300"
          :class="[
            plan.popular
              ? 'bg-gradient-to-b from-primary/20 to-surface border-2 border-primary shadow-lg shadow-primary/20'
              : 'bg-surface border border-gray-800 hover:border-gray-700'
          ]"
        >
          <!-- Popular Badge -->
          <div
            v-if="plan.popular"
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-sm font-medium rounded-full"
          >
            最受欢迎
          </div>

          <!-- Plan Name -->
          <h3 class="text-xl font-semibold text-white mb-2">{{ plan.name }}</h3>
          <p class="text-gray-400 text-sm mb-4">{{ plan.period }} 有效期</p>

          <!-- Price -->
          <div class="mb-6">
            <span class="text-4xl font-bold text-white">¥{{ plan.price }}</span>
            <span class="text-gray-400 ml-1">/ {{ plan.period }}</span>
          </div>

          <!-- Quota Info -->
          <div class="space-y-2 mb-6 p-3 bg-black/30 rounded-lg">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">日配额</span>
              <span class="text-white font-medium">{{ plan.dailyQuota }} Token</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">总配额</span>
              <span class="text-white font-medium">{{ plan.totalQuota }} Token</span>
            </div>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-6">
            <li
              v-for="(feature, idx) in plan.features"
              :key="idx"
              class="flex items-start gap-2 text-sm text-gray-300"
            >
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <button
            @click="handleSubscribe(plan.code)"
            class="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200"
            :class="[
              plan.popular
                ? 'bg-primary hover:bg-primary/90 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white'
            ]"
          >
            立即订阅
          </button>
        </div>
      </div>

      <!-- FAQ Link -->
      <div class="text-center mt-12">
        <p class="text-gray-400">
          有疑问？查看我们的
          <a :href="PRICING_FAQ_URL" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">常见问题</a>
          或
          <a :href="`mailto:${SUPPORT_EMAIL}`" class="text-primary hover:underline">联系客服</a>
        </p>
      </div>
    </div>
  </section>
</template>
