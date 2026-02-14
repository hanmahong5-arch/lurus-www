<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useReleases } from '../composables/useReleases'
import ReleaseCard from '../components/Download/ReleaseCard.vue'

const ACEST_DOWNLOAD_URL = '/releases/acest-desktop/v0.2.0/ACEST-Desktop_0.2.0_x64-setup.exe'
const ACEST_FILE_SIZE = '37.4 MB'
const ACEST_VERSION = '0.2.0'
const ACEST_SHA256 = '1e8bdb46fb45fde5b7e9c4b51a8beab31376afe369d214adea4dbcaf25544d26'

const {
  releases,
  total,
  currentPage,
  pageSize,
  isLoading,
  error,
  fetchReleases,
} = useReleases()

const availableProducts = [
  { id: 'acest-desktop', name: 'ACEST Desktop', description: 'AI terminal assistant' },
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
    release_type: includePrerelease.value ? undefined : 'stable',
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
  const el = document.getElementById('all-releases')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function downloadAcest() {
  window.location.href = ACEST_DOWNLOAD_URL
}

// Feature cards data
const features = [
  {
    title: 'Self-Learning',
    subtitle: '越用越聪明',
    description: 'ACE framework learns from every conversation. Insights are extracted, scored, and stored — the assistant improves over time.',
    icon: 'brain',
  },
  {
    title: 'Context-Efficient',
    subtitle: '极致上下文效率',
    description: 'Five-layer context model with JIT skill mounting. Only 4-8 tools active at any time, system context under 6k tokens.',
    icon: 'layers',
  },
  {
    title: '55+ Skills',
    subtitle: '覆盖十大领域',
    description: 'Office, Academic, Analysis, Research, Management, Knowledge, Batch, Creative, Developer, Content — loaded on demand.',
    icon: 'grid',
  },
  {
    title: 'Office Native',
    subtitle: '原生文档处理',
    description: 'Read and write Excel, Word, PDF, PowerPoint. Formulas, charts, tables, styles — full office document support.',
    icon: 'file',
  },
  {
    title: 'Graceful Fallback',
    subtitle: '从不失败',
    description: 'When no skill matches, falls back to atomic tools — shell, file I/O, web search. Never fails simply because a scenario is unforeseen.',
    icon: 'shield',
  },
  {
    title: 'MCP Ecosystem',
    subtitle: '可扩展工具生态',
    description: 'Integrates with Playwright, Tavily, email, calendar, and more. Extend capabilities through the MCP protocol.',
    icon: 'plug',
  },
]

// Skill domains data
const skillDomains = [
  { name: 'Office', count: 7, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Academic', count: 6, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Analysis', count: 6, color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Research', count: 1, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { name: 'Manager', count: 8, color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Knowledge', count: 4, color: 'bg-teal-100 text-teal-700 border-teal-200' },
  { name: 'Batch', count: 5, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'Creative', count: 5, color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { name: 'Developer', count: 5, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { name: 'Content', count: 5, color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
]

onMounted(() => {
  loadReleases()
})
</script>

<template>
  <div class="pt-20">
    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- HERO: ACEST Desktop -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="relative py-20 sm:py-28 bg-cream-100 overflow-hidden">
      <!-- Decorative grid -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>

      <!-- Corner decorations -->
      <div class="absolute top-12 left-12 doodle-corner opacity-30"></div>
      <div class="absolute top-12 right-12 doodle-corner -scale-x-100 opacity-30"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left: Text + CTA -->
          <div>
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border-2 border-ochre/30 bg-ochre/5 text-ochre text-sm font-medium" style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px">
              <span class="w-2 h-2 rounded-full bg-ochre animate-pulse"></span>
              v{{ ACEST_VERSION }} — Windows
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 mb-4 font-hand leading-tight">
              ACEST Desktop
            </h1>
            <p class="text-xl sm:text-2xl text-ink-500 mb-2 font-medium">
              Adaptive Context Engine for Smart Tasks
            </p>
            <p class="text-lg text-ink-400 mb-8">
              自适应上下文智能任务引擎 — 一个懂你的 AI 桌面助手
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                @click="downloadAcest"
                class="btn-hand btn-hand-primary inline-flex items-center justify-center gap-3 text-lg px-8 py-4 group"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download for Windows</span>
                <span class="text-sm opacity-70">({{ ACEST_FILE_SIZE }})</span>
              </button>
              <a
                href="#all-releases"
                class="btn-hand inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                All Releases
              </a>
            </div>

            <!-- Trust signals -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-ink-300">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>SHA256 verified</span>
              </div>
              <span class="text-ink-200">|</span>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Rust + Tauri 2.0</span>
              </div>
              <span class="text-ink-200">|</span>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span>macOS coming soon</span>
              </div>
            </div>
          </div>

          <!-- Right: Architecture Visualization -->
          <div class="hidden lg:block">
            <div class="card-sketchy p-6 bg-cream-50">
              <p class="text-xs text-ink-300 uppercase tracking-wider mb-4 font-medium">Five-Layer Context Model</p>
              <div class="space-y-2 font-mono text-sm">
                <div class="p-3 bg-ochre/10 border-2 border-ochre/30 text-ink-700" style="border-radius: 3px 8px 4px 10px / 10px 4px 8px 3px">
                  <span class="text-ochre font-bold">L0</span> Kernel
                  <span class="float-right text-ink-300 text-xs">&lt;800 tok</span>
                </div>
                <div class="p-3 bg-blue-50 border-2 border-blue-200 text-ink-700" style="border-radius: 3px 8px 4px 10px / 10px 4px 8px 3px">
                  <span class="text-blue-600 font-bold">L1</span> Registry
                  <span class="float-right text-ink-300 text-xs">&lt;1500 tok</span>
                </div>
                <div class="p-3 bg-green-50 border-2 border-green-200 text-ink-700" style="border-radius: 3px 8px 4px 10px / 10px 4px 8px 3px">
                  <span class="text-green-600 font-bold">L2</span> Router
                  <span class="float-right text-ink-300 text-xs">dynamic</span>
                </div>
                <div class="p-3 bg-purple-50 border-2 border-purple-200 text-ink-700" style="border-radius: 3px 8px 4px 10px / 10px 4px 8px 3px">
                  <span class="text-purple-600 font-bold">L3</span> Active Skills
                  <span class="float-right text-ink-300 text-xs">&le;3 slots</span>
                </div>
                <div class="p-3 bg-pink-50 border-2 border-pink-200 text-ink-700" style="border-radius: 3px 8px 4px 10px / 10px 4px 8px 3px">
                  <span class="text-pink-600 font-bold">L4</span> Tool Interface
                  <span class="float-right text-ink-300 text-xs">dynamic</span>
                </div>
              </div>
              <p class="mt-4 text-xs text-ink-300 text-center">
                Total system context &lt; 6k tokens — 60% less than traditional assistants
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- FEATURES GRID -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-cream-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-ink-900 mb-4 font-hand">
            Why ACEST
          </h2>
          <p class="text-lg text-ink-500 max-w-2xl mx-auto">
            Built with Rust for performance, designed for intelligence
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card-sketchy p-6 hover:border-ochre/40 transition-colors group"
          >
            <!-- Icon -->
            <div class="w-12 h-12 rounded-lg bg-ochre/10 flex items-center justify-center mb-4 group-hover:bg-ochre/20 transition-colors">
              <!-- Brain -->
              <svg v-if="feature.icon === 'brain'" class="w-6 h-6 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <!-- Layers -->
              <svg v-else-if="feature.icon === 'layers'" class="w-6 h-6 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <!-- Grid -->
              <svg v-else-if="feature.icon === 'grid'" class="w-6 h-6 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <!-- File -->
              <svg v-else-if="feature.icon === 'file'" class="w-6 h-6 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <!-- Shield -->
              <svg v-else-if="feature.icon === 'shield'" class="w-6 h-6 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <!-- Plug -->
              <svg v-else-if="feature.icon === 'plug'" class="w-6 h-6 text-ochre" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>

            <h3 class="text-lg font-bold text-ink-900 mb-1">{{ feature.title }}</h3>
            <p class="text-sm text-ochre mb-2">{{ feature.subtitle }}</p>
            <p class="text-sm text-ink-500 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- SKILL DOMAINS -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-cream-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-ink-900 mb-4 font-hand">
            55+ Built-in Skills
          </h2>
          <p class="text-lg text-ink-500 max-w-2xl mx-auto">
            Ten domains, loaded on demand — only what you need, when you need it
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div
            v-for="domain in skillDomains"
            :key="domain.name"
            :class="[
              'p-4 border rounded-lg text-center transition-transform hover:scale-105',
              domain.color,
            ]"
          >
            <p class="text-2xl font-bold">{{ domain.count }}</p>
            <p class="text-sm font-medium mt-1">{{ domain.name }}</p>
          </div>
        </div>

        <!-- ACE Learning Pipeline -->
        <div class="mt-14 card-sketchy p-8 bg-cream-50">
          <h3 class="text-lg font-bold text-ink-900 mb-6 text-center">ACE Learning Pipeline</h3>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-sm font-mono text-ink-500">
            <div class="px-4 py-2 bg-ochre/10 border border-ochre/30 rounded whitespace-nowrap">
              Conversation
            </div>
            <svg class="w-6 h-6 text-ink-300 hidden sm:block flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <svg class="w-6 h-6 text-ink-300 sm:hidden flex-shrink-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <div class="px-4 py-2 bg-blue-50 border border-blue-200 rounded whitespace-nowrap">
              Reflector
            </div>
            <svg class="w-6 h-6 text-ink-300 hidden sm:block flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <svg class="w-6 h-6 text-ink-300 sm:hidden flex-shrink-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <div class="px-4 py-2 bg-green-50 border border-green-200 rounded whitespace-nowrap">
              Curator
            </div>
            <svg class="w-6 h-6 text-ink-300 hidden sm:block flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <svg class="w-6 h-6 text-ink-300 sm:hidden flex-shrink-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <div class="px-4 py-2 bg-purple-50 border border-purple-200 rounded whitespace-nowrap">
              Storage
            </div>
            <svg class="w-6 h-6 text-ink-300 hidden sm:block flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <svg class="w-6 h-6 text-ink-300 sm:hidden flex-shrink-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            <div class="px-4 py-2 bg-pink-50 border border-pink-200 rounded whitespace-nowrap">
              Retrieval
            </div>
          </div>
          <p class="text-center text-sm text-ink-300 mt-4">
            Every conversation makes the assistant smarter — hybrid retrieval (keyword 60% + semantic 40%) with time decay
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- SECONDARY DOWNLOAD CTA -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-16 bg-cream-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-ink-900 mb-4 font-hand">
          Ready to Get Started?
        </h2>
        <p class="text-lg text-ink-500 mb-8 max-w-xl mx-auto">
          Download ACEST Desktop and experience the future of AI-assisted work
        </p>

        <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
          <button
            @click="downloadAcest"
            class="btn-hand btn-hand-primary inline-flex items-center justify-center gap-3 text-lg px-10 py-5 group"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download for Windows</span>
          </button>

          <div class="flex items-center gap-3 text-sm text-ink-300">
            <svg class="w-5 h-5 text-ink-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span>macOS version coming soon</span>
          </div>
        </div>

        <!-- SHA256 -->
        <div class="mt-8 inline-block">
          <details class="text-left">
            <summary class="text-sm text-ink-300 cursor-pointer hover:text-ink-500 transition-colors">
              SHA256 Checksum
            </summary>
            <code class="block mt-2 p-3 bg-cream-200 border border-ink-100 rounded text-xs font-mono text-ink-500 break-all max-w-lg">
              {{ ACEST_SHA256 }}
            </code>
          </details>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- SYSTEM REQUIREMENTS -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-16 bg-cream-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-ink-900 mb-8 text-center font-hand">
          System Requirements
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Windows -->
          <div class="card-sketchy p-6">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-6 h-6 text-ochre" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-9.91.09V5.79L20 3zm0 18l-9.91-1.82V13l9.91.09V21zM3 13l6 .09v6.72l-6-1.06V13z"/>
              </svg>
              <h4 class="text-lg font-medium text-ink-900">Windows</h4>
              <span class="ml-auto px-2 py-0.5 text-xs font-medium rounded border text-green-700 bg-green-50 border-green-300">Available</span>
            </div>
            <ul class="text-ink-500 space-y-2 text-sm">
              <li>Windows 10 or later</li>
              <li>64-bit processor (x64)</li>
              <li>4 GB RAM minimum</li>
              <li>200 MB disk space</li>
              <li>Internet connection (for LLM API)</li>
            </ul>
          </div>
          <!-- macOS -->
          <div class="card-sketchy p-6 opacity-60">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-6 h-6 text-ink-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <h4 class="text-lg font-medium text-ink-500">macOS</h4>
              <span class="ml-auto px-2 py-0.5 text-xs font-medium rounded border text-ink-400 bg-cream-200 border-ink-200">Coming Soon</span>
            </div>
            <ul class="text-ink-400 space-y-2 text-sm">
              <li>macOS 12 Monterey or later</li>
              <li>Apple Silicon or Intel</li>
              <li>4 GB RAM minimum</li>
              <li>200 MB disk space</li>
              <li>Internet connection (for LLM API)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- ALL RELEASES -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section id="all-releases" class="py-16 bg-cream-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-ink-900 mb-8 text-center font-hand">
          All Releases
        </h2>

        <!-- Product Filter & Controls -->
        <div class="mb-8 p-4 bg-cream-100 border-2 border-ink-100" style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px">
          <div class="flex flex-wrap items-center gap-4">
            <!-- Product Tabs -->
            <div class="flex items-center gap-2 flex-wrap">
              <button
                @click="selectProduct(undefined)"
                :class="[
                  'px-4 py-2 text-sm font-medium transition-all border-2',
                  selectedProduct === undefined
                    ? 'bg-ochre text-cream-50 border-ochre'
                    : 'bg-cream-50 text-ink-500 border-ink-100 hover:text-ink-900 hover:border-ink-300',
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
                  'px-4 py-2 text-sm font-medium transition-all border-2',
                  selectedProduct === product.id
                    ? 'bg-ochre text-cream-50 border-ochre'
                    : 'bg-cream-50 text-ink-500 border-ink-100 hover:text-ink-900 hover:border-ink-300',
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
  </div>
</template>
