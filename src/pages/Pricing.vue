<script setup lang="ts">
import PricingCards from '../components/Pricing/PricingCards.vue'
import CheckIcon from '../components/Pricing/icons/CheckIcon.vue'
import MinusIcon from '../components/Pricing/icons/MinusIcon.vue'
import FaqItem from '../components/Pricing/FaqItem.vue'
</script>

<template>
  <div class="pt-16">
    <!-- Page Header -->
    <section class="py-16 bg-surface-dark">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
          定价方案
        </h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          选择适合你的套餐，开始享受稳定、快速的 AI 模型代理服务
        </p>
      </div>
    </section>

    <!-- Pricing Section -->
    <PricingCards />

    <!-- Comparison Table -->
    <section class="py-16 bg-surface">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          套餐对比
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-800">
                <th class="py-4 px-4 text-gray-400 font-medium">功能</th>
                <th class="py-4 px-4 text-gray-400 font-medium text-center">周卡</th>
                <th class="py-4 px-4 text-gray-400 font-medium text-center">月卡</th>
                <th class="py-4 px-4 text-gray-400 font-medium text-center">季卡</th>
                <th class="py-4 px-4 text-gray-400 font-medium text-center">年卡</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">日配额</td>
                <td class="py-4 px-4 text-center text-gray-300">50 万</td>
                <td class="py-4 px-4 text-center text-gray-300">100 万</td>
                <td class="py-4 px-4 text-center text-gray-300">200 万</td>
                <td class="py-4 px-4 text-center text-gray-300">500 万</td>
              </tr>
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">总配额</td>
                <td class="py-4 px-4 text-center text-gray-300">500 万</td>
                <td class="py-4 px-4 text-center text-gray-300">5000 万</td>
                <td class="py-4 px-4 text-center text-gray-300">2 亿</td>
                <td class="py-4 px-4 text-center text-gray-300">无限</td>
              </tr>
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">Claude 模型</td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">GPT 模型</td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">Gemini 模型</td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">配额降级保护</td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">优先客服</td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr class="border-b border-gray-800/50">
                <td class="py-4 px-4 text-white">1对1 专属客服</td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><MinusIcon /></td>
                <td class="py-4 px-4 text-center"><CheckIcon /></td>
              </tr>
              <tr>
                <td class="py-4 px-4 text-white">企业发票</td>
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
    <section class="py-16 bg-surface-dark">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          常见问题
        </h2>
        <div class="space-y-4">
          <FaqItem
            question="什么是 Token 配额？"
            answer="Token 是 AI 模型处理文本的基本单位。日配额是每天可使用的 Token 数量，总配额是套餐期内的总可用量。一般来说，1 个汉字约等于 2 个 Token，1 个英文单词约等于 1 个 Token。"
          />
          <FaqItem
            question="配额用完了怎么办？"
            answer="日配额用完后，系统会自动降级到基础服务（响应速度可能变慢）。你也可以随时充值或升级套餐来增加配额。"
          />
          <FaqItem
            question="支持哪些支付方式？"
            answer="我们支持支付宝、微信支付、银行卡（通过 Stripe）等多种支付方式。企业用户可以申请对公转账。"
          />
          <FaqItem
            question="可以退款吗？"
            answer="套餐购买后 7 天内，如未使用超过总配额的 10%，可以申请全额退款。超过 7 天或使用超过 10% 后，将按实际使用量计算退款金额。"
          />
          <FaqItem
            question="如何获取企业发票？"
            answer="年卡用户可以在控制台申请企业增值税发票。请确保填写正确的公司名称和税号。"
          />
        </div>
      </div>
    </section>
  </div>
</template>
