<script setup lang="ts">
import PrimaryButton from './PrimaryButton.vue'
import SecondaryButton from './SecondaryButton.vue'
</script>

<template>
  <section aria-label="行动号召" class="py-fib-7 bg-cream-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Brand Tagline -->
      <h2 class="font-hand text-phi-2xl text-ink-900 mb-fib-5">
        全栈自建，匠心品质。
      </h2>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-fib-4 justify-center items-center">
        <PrimaryButton
          text="获取 API Key"
          href="https://api.lurus.cn"
          target="_blank"
          ariaLabel="跳转到 API Key 注册页面"
          trackLocation="final"
        />
        <SecondaryButton
          text="联系我们"
          href="https://lurus.cn/contact"
          ariaLabel="跳转到联系我们页面"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference '../../styles/main.css';
</style>
