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
  { name: '微信公众号', href: '#', icon: 'wechat' },
  { name: '微博', href: 'https://weibo.com/lurus', icon: 'weibo' },
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
              <svg v-if="social.icon === 'wechat'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.152 4.098c-1.511-.07-3.08.378-4.267 1.36-1.404 1.163-2.084 2.97-1.592 4.713.492 1.744 2.058 3.108 3.834 3.536 1.776.428 3.747-.001 5.094-1.163a.55.55 0 01.544-.082l1.427.835a.244.244 0 00.126.04.222.222 0 00.218-.221c0-.054-.022-.107-.036-.16l-.292-1.11a.444.444 0 01.16-.499C20.518 16.065 21.5 14.5 21.5 12.787c0-2.964-2.93-4.698-6.75-4.698zm-1.872 2.454c.482 0 .873.397.873.886a.879.879 0 01-.873.886.879.879 0 01-.872-.886c0-.489.39-.886.872-.886zm4.362 0c.483 0 .873.397.873.886a.879.879 0 01-.873.886.879.879 0 01-.872-.886c0-.489.39-.886.872-.886z"/>
              </svg>
              <svg v-else-if="social.icon === 'weibo'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.583.631.275.825.985.442 1.574zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.095-.307-.378-.169-.611.141-.236.443-.352.681-.258.239.09.315.375.177.616zm.668-2.327c-1.591-.405-3.393.253-4.109 1.461-.731 1.229-.203 2.605 1.225 3.073 1.478.484 3.382-.172 4.098-1.441.722-1.289.133-2.696-1.214-3.093zM20.683 6.433c-1.073-1.277-2.651-1.881-4.322-1.86-.314.004-.473.312-.293.576.115.164.328.243.53.231 1.35-.081 2.627.426 3.478 1.418.849.991 1.098 2.316.741 3.557-.061.208.035.431.233.527.198.094.435.01.536-.178.617-1.503.238-3.185-.903-4.271zm-.033 2.836c-.282-.767-.859-1.353-1.594-1.641-.242-.094-.517.016-.603.26-.089.243.033.51.275.613.493.19.867.592 1.047 1.082.183.49.13 1.02-.149 1.466-.148.235-.065.545.173.688.232.139.54.058.686-.176.428-.684.506-1.509.165-2.292zM16.645 15.072c-.413 1.627-2.112 3.208-4.281 3.924-2.179.716-4.173.289-4.838-1.029-.645-1.276.081-3.089 1.8-4.18 1.753-1.111 3.749-1.159 4.766-.239.564.51.808 1.199.553 1.524z"/>
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
