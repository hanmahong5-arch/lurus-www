<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useReleases } from '../composables/useReleases'
import ReleaseCard from '../components/Download/ReleaseCard.vue'

const {
  releases,
  total,
  currentPage,
  pageSize,
  isLoading,
  error,
  fetchReleases,
} = useReleases()

// Product selection
const availableProducts = [
  { id: 'lurus-switch', name: 'Lurus Switch', description: 'Wails 桌面应用' },
  { id: 'lurus-cli', name: 'Lurus CLI', description: 'TUI 命令行工具' },
]

const selectedProduct = ref<string | undefined>(undefined)
const includePrerelease = ref(false)

// Computed
const filteredReleases = computed(() => releases.value)

// Pagination state (for future use when backend supports pagination)
// const hasMore = computed(() => {
//   return currentPage.value * pageSize.value < total.value
// })

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

// Methods
async function loadReleases(page = 1) {
  await fetchReleases({
    product_id: selectedProduct.value,
    release_type: 'stable',
    include_prerelease: includePrerelease.value,
    page,
    page_size: 20,
  })
}

function selectProduct(productId: string | undefined) {
  selectedProduct.value = productId
  loadReleases(1)
}

function togglePrerelease() {
  includePrerelease.value = !includePrerelease.value
  loadReleases(1)
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  loadReleases(page)
  // Scroll to top of releases
  window.scrollTo({ top: 300, behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  loadReleases()
})
</script>

<template>
  <div class="pt-16">
    <!-- Page Header -->
    <section class="py-16 bg-surface-dark">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
          下载中心
        </h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          获取 Lurus 系列产品，支持 Windows、macOS、Linux 等多个平台
        </p>
      </div>
    </section>

    <!-- Product Filter & Controls -->
    <section class="py-8 bg-surface border-b border-gray-800 sticky top-16 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Product Tabs -->
          <div class="flex items-center gap-2">
            <button
              @click="selectProduct(undefined)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                selectedProduct === undefined
                  ? 'bg-primary text-white'
                  : 'bg-surface-dark text-gray-400 hover:text-white hover:bg-surface-dark/80',
              ]"
            >
              全部产品
            </button>
            <button
              v-for="product in availableProducts"
              :key="product.id"
              @click="selectProduct(product.id)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                selectedProduct === product.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-dark text-gray-400 hover:text-white hover:bg-surface-dark/80',
              ]"
            >
              {{ product.name }}
            </button>
          </div>

          <!-- Prerelease Toggle -->
          <label class="flex items-center gap-2 ml-auto cursor-pointer">
            <input
              type="checkbox"
              :checked="includePrerelease"
              @change="togglePrerelease"
              class="w-4 h-4 rounded border-gray-600 bg-surface-dark text-primary focus:ring-primary focus:ring-offset-0"
            >
            <span class="text-sm text-gray-400">显示预发布版本</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Releases List -->
    <section class="py-16 bg-surface">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="isLoading && releases.length === 0" class="text-center py-12">
          <div class="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-gray-400">加载中...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">加载失败</h3>
          <p class="text-gray-400 mb-6">{{ error }}</p>
          <button
            @click="loadReleases()"
            class="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            重试
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="releases.length === 0" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
            <svg class="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">暂无发布版本</h3>
          <p class="text-gray-400">当前筛选条件下没有可用的版本</p>
        </div>

        <!-- Releases -->
        <div v-else class="space-y-6">
          <ReleaseCard
            v-for="(release, index) in filteredReleases"
            :key="release.id"
            :release="release"
            :is-latest="index === 0 && currentPage === 1"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              currentPage === 1
                ? 'bg-surface-dark text-gray-600 cursor-not-allowed'
                : 'bg-surface-dark text-white hover:bg-gray-800',
            ]"
          >
            上一页
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-surface-dark text-gray-400 hover:text-white hover:bg-gray-800',
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              currentPage === totalPages
                ? 'bg-surface-dark text-gray-600 cursor-not-allowed'
                : 'bg-surface-dark text-white hover:bg-gray-800',
            ]"
          >
            下一页
          </button>
        </div>

        <!-- Results Info -->
        <div v-if="!isLoading && releases.length > 0" class="mt-8 text-center text-sm text-gray-500">
          显示第 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, total) }} 个版本，共 {{ total }} 个
        </div>
      </div>
    </section>

    <!-- Installation Guide -->
    <section class="py-16 bg-surface-dark">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          安装指南
        </h2>

        <div class="space-y-8">
          <!-- Windows -->
          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-9.91.09V5.79L20 3zm0 18l-9.91-1.82V13l9.91.09V21zM3 13l6 .09v6.72l-6-1.06V13z"/>
              </svg>
              Windows 安装
            </h3>
            <ol class="text-gray-400 space-y-2 list-decimal list-inside">
              <li>下载对应的 <code class="text-primary">.exe</code> 安装包</li>
              <li>双击运行安装程序，按照向导完成安装</li>
              <li>安装完成后，从开始菜单启动应用</li>
              <li>根据应用提示完成初始配置</li>
            </ol>
          </div>

          <!-- macOS -->
          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              macOS 安装
            </h3>
            <ol class="text-gray-400 space-y-2 list-decimal list-inside">
              <li>下载对应芯片版本的 <code class="text-primary">.dmg</code> 文件</li>
              <li>双击打开 DMG 文件</li>
              <li>将应用拖入 Applications 文件夹</li>
              <li>首次运行时，右键点击应用选择"打开"以绕过 Gatekeeper</li>
              <li>根据应用提示完成初始配置</li>
            </ol>
          </div>

          <!-- Linux -->
          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/>
              </svg>
              Linux 安装
            </h3>
            <ol class="text-gray-400 space-y-2 list-decimal list-inside">
              <li>下载 <code class="text-primary">.tar.gz</code> 压缩包</li>
              <li>
                解压文件：
                <code class="block mt-1 p-2 bg-black/30 rounded text-sm">tar -xzf lurus-*.tar.gz</code>
              </li>
              <li>
                运行安装脚本或直接启动：
                <code class="block mt-1 p-2 bg-black/30 rounded text-sm">./lurus</code>
              </li>
              <li>根据应用提示完成初始配置</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- System Requirements -->
    <section class="py-16 bg-surface">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          系统要求
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-surface-dark rounded-xl border border-gray-800">
            <h4 class="text-primary font-medium mb-4 text-lg">Windows</h4>
            <ul class="text-gray-400 space-y-2 text-sm">
              <li>• Windows 10 或更高版本</li>
              <li>• 64 位处理器</li>
              <li>• 4 GB RAM 或更多</li>
              <li>• 500 MB 可用磁盘空间</li>
            </ul>
          </div>
          <div class="p-6 bg-surface-dark rounded-xl border border-gray-800">
            <h4 class="text-primary font-medium mb-4 text-lg">macOS</h4>
            <ul class="text-gray-400 space-y-2 text-sm">
              <li>• macOS 11 Big Sur 或更高版本</li>
              <li>• Apple Silicon 或 Intel 处理器</li>
              <li>• 4 GB RAM 或更多</li>
              <li>• 500 MB 可用磁盘空间</li>
            </ul>
          </div>
          <div class="p-6 bg-surface-dark rounded-xl border border-gray-800">
            <h4 class="text-primary font-medium mb-4 text-lg">Linux</h4>
            <ul class="text-gray-400 space-y-2 text-sm">
              <li>• Ubuntu 20.04+ / Debian 11+</li>
              <li>• 64 位处理器</li>
              <li>• 4 GB RAM 或更多</li>
              <li>• 500 MB 可用磁盘空间</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
