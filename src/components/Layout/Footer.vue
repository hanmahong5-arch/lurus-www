<script setup lang="ts">
const currentYear = new Date().getFullYear()

const products = [
  { name: 'Lurus API', href: 'https://api.lurus.cn', description: 'LLM 统一网关' },
  { name: 'GuShen', href: 'https://gushen.lurus.cn', description: 'AI 量化交易' },
  { name: 'Lurus Switch', href: '#', description: '智能客户端' },
  { name: 'Lurus Docs', href: 'https://docs.lurus.cn', description: '文档中心' },
  { name: 'Deaigc', href: 'https://deaigc.lurus.cn', description: '论文润色服务' },
]

const resources = [
  { name: 'API 文档', href: 'https://docs.lurus.cn/api' },
  { name: '快速入门', href: 'https://docs.lurus.cn/quickstart' },
  { name: '定价方案', href: '/pricing' },
  { name: '状态监控', href: 'https://status.lurus.cn' },
]

const company = [
  { name: '关于我们', href: '/about' },
  { name: '联系我们', href: 'mailto:support@lurus.cn' },
  { name: '服务条款', href: '/terms' },
  { name: '隐私政策', href: '/privacy' },
]

const socials = [
  { name: 'GitHub', href: 'https://github.com/zetatechmx/lurus', icon: 'github' },
  { name: 'Discord', href: 'https://discord.gg/lurus', icon: 'discord' },
]

const ICP_NUMBER = import.meta.env.VITE_ICP_NUMBER || '沪ICP备XXXXXXXX号-1'
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
          <!-- Social Links -->
          <div class="flex items-center gap-fib-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="w-10 h-10 border-sketchy bg-cream-50 hover:bg-cream-200 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-all duration-300"
            >
              <svg v-if="social.icon === 'github'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <svg v-else-if="social.icon === 'discord'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
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
              <a
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
        <div class="flex items-center gap-fib-4 text-sm text-ink-300">
          <div class="flex items-center gap-2 px-3 py-1 border-sketchy-light bg-cream-50">
            <span class="w-2 h-2 rounded-full bg-product-gushen animate-pulse"></span>
            <span class="text-ink-500">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "../../styles/main.css";
</style>
