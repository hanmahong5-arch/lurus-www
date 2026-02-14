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
  { id: 'lurus-switch', name: 'Lurus Switch', description: 'Wails desktop app' },
  { id: 'lurus-cli', name: 'Lurus CLI', description: 'TUI CLI tool' },
]

const selectedProduct = ref<string | undefined>(undefined)
const includePrerelease = ref(false)

const filteredReleases = computed(() => releases.value)

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

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
  window.scrollTo({ top: 300, behavior: 'smooth' })
}

onMounted(() => {
  loadReleases()
})
</script>

<template>
  <div class="pt-20">
    <!-- Page Header -->
    <section class="py-16 bg-cream-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 font-hand">
          Download
        </h1>
        <p class="text-lg text-ink-500 max-w-2xl mx-auto">
          Windows, macOS, Linux
        </p>
      </div>
    </section>

    <!-- Product Filter & Controls -->
    <section class="py-6 bg-cream-50 border-b-2 border-ink-100 sticky top-20 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Product Tabs -->
          <div class="flex items-center gap-2">
            <button
              @click="selectProduct(undefined)"
              :class="[
                'px-4 py-2 font-medium transition-all border-2',
                selectedProduct === undefined
                  ? 'bg-ochre text-cream-50 border-ochre'
                  : 'bg-cream-100 text-ink-500 border-ink-100 hover:text-ink-900 hover:border-ink-300',
              ]"
              style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px"
            >
              All
            </button>
            <button
              v-for="product in availableProducts"
              :key="product.id"
              @click="selectProduct(product.id)"
              :class="[
                'px-4 py-2 font-medium transition-all border-2',
                selectedProduct === product.id
                  ? 'bg-ochre text-cream-50 border-ochre'
                  : 'bg-cream-100 text-ink-500 border-ink-100 hover:text-ink-900 hover:border-ink-300',
              ]"
              style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px"
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
              class="w-4 h-4 rounded border-ink-300 text-ochre focus:ring-ochre focus:ring-offset-0"
            >
            <span class="text-sm text-ink-500">Show Pre-release</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Releases List -->
    <section class="py-16 bg-cream-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="isLoading && releases.length === 0" class="text-center py-12">
          <div class="inline-block w-8 h-8 border-4 border-ochre border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-ink-500">Loading...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-ink-900 mb-2">Failed to load</h3>
          <p class="text-ink-500 mb-6">{{ error }}</p>
          <button
            @click="loadReleases()"
            class="btn-hand btn-hand-primary"
          >
            Retry
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="releases.length === 0" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cream-200 border-2 border-ink-100 mb-4">
            <svg class="w-8 h-8 text-ink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-ink-900 mb-2">No releases</h3>
          <p class="text-ink-500">No releases found for the current filter</p>
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
              'px-4 py-2 font-medium transition-colors border-2',
              currentPage === 1
                ? 'bg-cream-100 text-ink-100 border-ink-100 cursor-not-allowed'
                : 'bg-cream-100 text-ink-700 border-ink-300 hover:bg-cream-200',
            ]"
            style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px"
          >
            Prev
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 font-medium transition-colors border-2',
                currentPage === page
                  ? 'bg-ochre text-cream-50 border-ochre'
                  : 'bg-cream-100 text-ink-500 border-ink-100 hover:text-ink-900 hover:border-ink-300',
              ]"
              style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[
              'px-4 py-2 font-medium transition-colors border-2',
              currentPage === totalPages
                ? 'bg-cream-100 text-ink-100 border-ink-100 cursor-not-allowed'
                : 'bg-cream-100 text-ink-700 border-ink-300 hover:bg-cream-200',
            ]"
            style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px"
          >
            Next
          </button>
        </div>

        <!-- Results Info -->
        <div v-if="!isLoading && releases.length > 0" class="mt-8 text-center text-sm text-ink-300">
          {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, total) }} / {{ total }}
        </div>
      </div>
    </section>

    <!-- Installation Guide -->
    <section class="py-16 bg-cream-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-ink-900 mb-8 text-center font-hand">
          Installation Guide
        </h2>

        <div class="space-y-6">
          <!-- Windows -->
          <div class="card-sketchy p-6">
            <h3 class="text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-product-switch" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-9.91.09V5.79L20 3zm0 18l-9.91-1.82V13l9.91.09V21zM3 13l6 .09v6.72l-6-1.06V13z"/>
              </svg>
              Windows
            </h3>
            <ol class="text-ink-500 space-y-2 list-decimal list-inside">
              <li>Download the <code class="text-ochre font-mono text-sm">.exe</code> installer</li>
              <li>Run the installer and follow the wizard</li>
              <li>Launch from the Start menu</li>
            </ol>
          </div>

          <!-- macOS -->
          <div class="card-sketchy p-6">
            <h3 class="text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-product-switch" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              macOS
            </h3>
            <ol class="text-ink-500 space-y-2 list-decimal list-inside">
              <li>Download the <code class="text-ochre font-mono text-sm">.dmg</code> for your chip (Apple Silicon / Intel)</li>
              <li>Open the DMG file</li>
              <li>Drag the app to the Applications folder</li>
              <li>First launch: right-click and select "Open" to bypass Gatekeeper</li>
            </ol>
          </div>

          <!-- Linux -->
          <div class="card-sketchy p-6">
            <h3 class="text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-product-switch" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/>
              </svg>
              Linux
            </h3>
            <ol class="text-ink-500 space-y-2 list-decimal list-inside">
              <li>Download the <code class="text-ochre font-mono text-sm">.tar.gz</code> archive</li>
              <li>
                Extract:
                <code class="block mt-1 p-2 bg-cream-200 border border-ink-100 rounded text-sm font-mono">tar -xzf lurus-*.tar.gz</code>
              </li>
              <li>
                Run:
                <code class="block mt-1 p-2 bg-cream-200 border border-ink-100 rounded text-sm font-mono">./lurus</code>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- System Requirements -->
    <section class="py-16 bg-cream-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-ink-900 mb-8 text-center font-hand">
          System Requirements
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card-sketchy p-6">
            <h4 class="text-ochre font-medium mb-4 text-lg">Windows</h4>
            <ul class="text-ink-500 space-y-2 text-sm">
              <li>Windows 10+</li>
              <li>64-bit processor</li>
              <li>4 GB RAM+</li>
              <li>500 MB disk space</li>
            </ul>
          </div>
          <div class="card-sketchy p-6">
            <h4 class="text-ochre font-medium mb-4 text-lg">macOS</h4>
            <ul class="text-ink-500 space-y-2 text-sm">
              <li>macOS 11 Big Sur+</li>
              <li>Apple Silicon or Intel</li>
              <li>4 GB RAM+</li>
              <li>500 MB disk space</li>
            </ul>
          </div>
          <div class="card-sketchy p-6">
            <h4 class="text-ochre font-medium mb-4 text-lg">Linux</h4>
            <ul class="text-ink-500 space-y-2 text-sm">
              <li>Ubuntu 20.04+ / Debian 11+</li>
              <li>64-bit processor</li>
              <li>4 GB RAM+</li>
              <li>500 MB disk space</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
