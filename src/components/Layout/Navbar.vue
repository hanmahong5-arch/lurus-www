<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { name: '产品', path: '#products' },
  { name: '优势', path: '#features' },
  { name: '文档', path: 'https://docs.lurus.cn', external: true },
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      scrolled
        ? 'bg-cream-50/95 backdrop-blur-sm border-b-2 border-ink-100 shadow-paper'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="w-10 h-10 rounded-lg bg-ochre flex items-center justify-center border-2 border-ink-300 group-hover:animate-wiggle transition-transform duration-300">
              <span class="text-cream-50 font-hand font-bold text-xl">L</span>
            </div>
          </div>
          <span class="text-ink-900 font-hand font-bold text-2xl tracking-tight">Lurus</span>
        </router-link>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.path">
            <a
              v-if="link.external"
              :href="link.path"
              target="_blank"
              class="px-5 py-2.5 text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-lg transition-all duration-200"
            >
              {{ link.name }}
            </a>
            <a
              v-else
              :href="link.path"
              class="px-5 py-2.5 text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-lg transition-all duration-200"
            >
              {{ link.name }}
            </a>
          </template>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden md:flex items-center gap-3">
          <a
            href="https://api.lurus.cn/login"
            class="px-5 py-2.5 text-ink-500 hover:text-ink-900 transition-colors"
          >
            登录
          </a>
          <a
            href="https://api.lurus.cn/register"
            class="btn-hand btn-hand-primary"
          >
            开始使用
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2.5 text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-lg transition-all"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-cream-50/98 backdrop-blur-sm border-t-2 border-ink-100"
      >
        <div class="px-4 py-6 space-y-2">
          <template v-for="link in navLinks" :key="link.path">
            <a
              v-if="link.external"
              :href="link.path"
              target="_blank"
              class="block px-4 py-3 text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-lg transition-all"
              @click="mobileMenuOpen = false"
            >
              {{ link.name }}
            </a>
            <a
              v-else
              :href="link.path"
              class="block px-4 py-3 text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-lg transition-all"
              @click="mobileMenuOpen = false"
            >
              {{ link.name }}
            </a>
          </template>
          <hr class="border-ink-100 my-4">
          <a
            href="https://api.lurus.cn/login"
            class="block px-4 py-3 text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-lg transition-all"
          >
            登录
          </a>
          <a
            href="https://api.lurus.cn/register"
            class="block btn-hand btn-hand-primary text-center"
          >
            开始使用
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
@reference "../../styles/main.css";
</style>
