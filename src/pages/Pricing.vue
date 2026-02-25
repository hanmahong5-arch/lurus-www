<script setup lang="ts">
import PricingCards from '../components/Pricing/PricingCards.vue'
import CheckIcon from '../components/Pricing/icons/CheckIcon.vue'
import MinusIcon from '../components/Pricing/icons/MinusIcon.vue'
import FaqItem from '../components/Pricing/FaqItem.vue'
import { PRICING_FAQ } from '../config/pricing'
</script>

<template>
  <div class="pt-16">
    <!-- Page Header -->
    <section class="py-fib-6 bg-cream-100 relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-phi-3xl sm:text-phi-4xl font-hand font-bold text-ink-900 mb-fib-3">
          定价方案
        </h1>
        <p class="text-phi-lg text-ink-500 max-w-2xl mx-auto">
          选择适合你的套餐，开始享受稳定、快速的 AI 模型代理服务
        </p>
      </div>
    </section>

    <!-- Pricing Section -->
    <PricingCards />

    <!-- Top-up CTA -->
    <section class="py-fib-5 bg-cream-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="border-sketchy bg-cream-50 p-fib-5">
          <h3 class="text-phi-xl font-hand font-bold text-ink-900 mb-2">需要更多 Token？随时充值</h3>
          <p class="text-ink-500 mb-fib-4">套餐配额不够用？可以在控制台直接充值，按需补充额度，即充即用。</p>
          <a
            href="https://api.lurus.cn/console/topup"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hand btn-hand-primary inline-flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            前往充值
          </a>
        </div>
      </div>
    </section>

    <!-- Payment Methods -->
    <section class="py-fib-5 bg-cream-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="text-phi-lg font-hand font-bold text-ink-900 mb-fib-4">支持的支付方式</h3>
        <div class="flex flex-wrap justify-center gap-fib-5 items-center">
          <!-- Alipay -->
          <div class="flex items-center gap-2 px-4 py-2 border-sketchy-light bg-cream-100">
            <svg class="w-6 h-6 text-[#1677FF]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.422 15.358c-3.18-1.44-5.94-3.065-6.39-3.358.51-1.297.87-2.712.99-4.2h-3.36v-1.8h4.2V4.8h-4.2V2.4h-1.8V4.8h-4.2v1.2h4.2v1.8H7.662v1.2h6.87c-.12 1.02-.39 2.04-.81 2.94-1.56-.72-3.3-1.32-4.92-1.32-2.7 0-4.38 1.56-4.38 3.36 0 2.16 2.04 3.6 4.98 3.6 2.16 0 4.08-.84 5.64-2.4 1.62.9 4.56 2.34 6.96 3.24L21.422 15.358zM9.402 16.398c-2.1 0-3.18-.96-3.18-2.16 0-1.08.96-1.92 2.58-1.92 1.32 0 2.76.42 4.26 1.2-1.26 1.8-2.52 2.88-3.66 2.88z"/>
            </svg>
            <span class="text-ink-500 text-sm font-medium">支付宝</span>
          </div>
          <!-- WeChat Pay -->
          <div class="flex items-center gap-2 px-4 py-2 border-sketchy-light bg-cream-100">
            <svg class="w-6 h-6 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
            </svg>
            <span class="text-ink-500 text-sm font-medium">微信支付</span>
          </div>
          <!-- Stripe -->
          <div class="flex items-center gap-2 px-4 py-2 border-sketchy-light bg-cream-100">
            <svg class="w-6 h-6 text-[#635BFF]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19l-.879 5.625C5.248 23.063 8.082 24 11.461 24c2.682 0 4.835-.681 6.319-1.98 1.621-1.413 2.463-3.413 2.463-5.944.044-4.36-2.534-5.922-6.267-6.926z"/>
            </svg>
            <span class="text-ink-500 text-sm font-medium">Stripe</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="py-fib-6 bg-cream-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-phi-2xl font-hand font-bold text-ink-900 mb-fib-5 text-center">
          套餐对比
        </h2>
        <div class="overflow-x-auto border-sketchy bg-cream-50">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b-2 border-ink-100">
                <th class="py-4 px-4 text-ink-500 font-medium">功能</th>
                <th class="py-4 px-4 text-ink-500 font-medium text-center">周卡</th>
                <th class="py-4 px-4 text-ink-500 font-medium text-center">月卡</th>
                <th class="py-4 px-4 text-ink-500 font-medium text-center">季卡</th>
                <th class="py-4 px-4 text-ink-500 font-medium text-center">年卡</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">日配额</td>
                <td class="py-4 px-4 text-center text-ink-500">50 万</td>
                <td class="py-4 px-4 text-center text-ink-500">100 万</td>
                <td class="py-4 px-4 text-center text-ink-500">200 万</td>
                <td class="py-4 px-4 text-center text-ink-500">500 万</td>
              </tr>
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">总配额</td>
                <td class="py-4 px-4 text-center text-ink-500">500 万</td>
                <td class="py-4 px-4 text-center text-ink-500">5000 万</td>
                <td class="py-4 px-4 text-center text-ink-500">2 亿</td>
                <td class="py-4 px-4 text-center text-ink-500">无限</td>
              </tr>
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">Claude 模型</td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">GPT 模型</td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">Gemini 模型</td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">配额降级保护</td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">优先客服</td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-ink-100/50">
                <td class="py-4 px-4 text-ink-900">1对1 专属客服</td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr>
                <td class="py-4 px-4 text-ink-900">企业发票</td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-fib-6 bg-cream-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-phi-2xl font-hand font-bold text-ink-900 mb-fib-5 text-center">
          常见问题
        </h2>
        <div class="space-y-fib-3">
          <FaqItem
            v-for="faq in PRICING_FAQ"
            :key="faq.question"
            :question="faq.question"
            :answer="faq.answer"
          />
        </div>
      </div>
    </section>

    <!-- Enterprise CTA -->
    <section class="py-fib-6 bg-cream-100 relative overflow-hidden">
      <div class="absolute top-8 left-8 doodle-corner opacity-40"></div>
      <div class="absolute bottom-8 right-8 doodle-corner rotate-180 opacity-40"></div>
      <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-phi-2xl font-hand font-bold text-ink-900 mb-fib-3">企业套餐？联系我们</h2>
        <p class="text-ink-500 mb-fib-4 max-w-xl mx-auto">
          需要大额配额、专属模型部署、定制 SLA 或私有化部署方案？我们的商务团队随时为您服务。
        </p>
        <a
          href="mailto:enterprise@lurus.cn"
          class="btn-hand btn-hand-primary inline-flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          enterprise@lurus.cn
        </a>
      </div>
    </section>
  </div>
</template>
