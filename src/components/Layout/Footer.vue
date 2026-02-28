<script setup lang="ts">
const currentYear = new Date().getFullYear()

const products = [
  { name: 'Lurus API', href: 'https://api.lurus.cn', description: 'LLM 统一网关' },
  { name: 'GuShen', href: 'https://gushen.lurus.cn', description: 'AI 量化交易' },
  { name: 'Lurus Switch', href: '#', description: '智能客户端' },
  { name: 'Lurus Docs', href: 'https://docs.lurus.cn', description: '文档中心' },
]

const resources = [
  { name: 'API 文档', href: 'https://docs.lurus.cn/api' },
  { name: '快速入门', href: 'https://docs.lurus.cn/quickstart' },
  { name: '定价方案', href: '/pricing' },
]

const company = [
  { name: '关于我们', href: '/about' },
  { name: '联系我们', href: 'mailto:support@lurus.cn' },
  { name: '服务条款', href: '/terms' },
  { name: '隐私政策', href: '/privacy' },
]

const ICP_NUMBER = import.meta.env.VITE_ICP_NUMBER || '鲁ICP备2026000242号'
</script>

<template>
  <footer class="relative bg-cream-100 border-t-2 border-ink-100 overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-8 left-8 doodle-corner opacity-40"></div>
    <div class="absolute bottom-8 right-8 doodle-corner rotate-180 opacity-40"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-fib-6 grid grid-cols-2 md:grid-cols-5 gap-fib-5 lg:gap-fib-6">
        <!-- Brand Column -->
        <div class="col-span-2">
          <div class="flex items-center gap-3 mb-fib-4">
            <div class="w-10 h-10 rounded-lg bg-ochre flex items-center justify-center border-2 border-ink-300">
              <span class="text-cream-50 font-hand font-bold text-xl">L</span>
            </div>
            <span class="text-ink-900 font-hand font-bold text-2xl">Lurus</span>
          </div>
          <p class="text-ink-500 mb-fib-4 max-w-sm leading-relaxed">
            为开发者提供一站式 AI 基础设施服务，从模型接入到智能应用，助力创新加速落地。
          </p>
        </div>

        <!-- Products Column -->
        <div>
          <h3 class="text-phi-xl text-ink-900 mb-fib-4 font-semibold">产品</h3>
          <ul class="space-y-fib-3">
            <li v-for="item in products" :key="item.name">
              <a
                :href="item.href"
                :target="item.href.startsWith('http') ? '_blank' : undefined"
                :rel="item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="group flex flex-col"
              >
                <span class="text-ink-500 group-hover:text-ink-900 transition-colors">{{ item.name }}</span>
                <span class="text-xs text-ink-300">{{ item.description }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources Column -->
        <div>
          <h3 class="text-phi-xl text-ink-900 mb-fib-4 font-semibold">资源</h3>
          <ul class="space-y-fib-3">
            <li v-for="item in resources" :key="item.name">
              <a
                :href="item.href"
                :target="item.href.startsWith('http') ? '_blank' : undefined"
                :rel="item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="text-ink-500 hover:text-ink-900 transition-colors"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h3 class="text-phi-xl text-ink-900 mb-fib-4 font-semibold">公司</h3>
          <ul class="space-y-fib-3">
            <li v-for="item in company" :key="item.name">
              <router-link
                v-if="item.href.startsWith('/')"
                :to="item.href"
                class="text-ink-500 hover:text-ink-900 transition-colors"
              >
                {{ item.name }}
              </router-link>
              <a
                v-else
                :href="item.href"
                class="text-ink-500 hover:text-ink-900 transition-colors"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="py-fib-4 border-t-2 border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-fib-3">
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-ink-300 text-sm">
          <p>&copy; {{ currentYear }} Lurus Technology. All rights reserved.</p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-ink-500 transition-colors"
          >
            {{ ICP_NUMBER }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "../../styles/main.css";
</style>
