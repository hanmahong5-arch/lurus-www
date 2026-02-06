<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { NavItem } from '../../types/navigation'

const props = defineProps<{
  label: string
  items: NavItem[]
  active?: boolean
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    close()
    buttonRef.value?.focus()
  }
}

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    close()
  }
}

const handleNavigate = () => {
  close()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      ref="buttonRef"
      @click="toggle"
      class="flex items-center gap-1 px-5 py-2.5 rounded-lg transition-all duration-200"
      :class="[
        'border-b-2',
        active
          ? 'text-ink-900 border-ochre'
          : 'text-ink-500 border-transparent hover:text-ink-900 hover:bg-cream-200'
      ]"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      {{ label }}
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-2 py-2 min-w-48 bg-cream-50 border-2 border-ink-200 rounded-lg shadow-lg"
      >
        <template v-for="item in items" :key="item.path">
          <a
            v-if="item.external"
            :href="item.path"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-2.5 text-ink-500 hover:text-ink-900 hover:bg-cream-200 transition-colors"
            @click="handleNavigate"
          >
            <span class="flex items-center gap-2">
              {{ item.name }}
              <svg class="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
          <router-link
            v-else-if="item.path.startsWith('/')"
            :to="item.path"
            class="block px-4 py-2.5 text-ink-500 hover:text-ink-900 hover:bg-cream-200 transition-colors"
            @click="handleNavigate"
          >
            {{ item.name }}
          </router-link>
          <a
            v-else
            :href="item.path"
            class="block px-4 py-2.5 text-ink-500 hover:text-ink-900 hover:bg-cream-200 transition-colors"
            @click="handleNavigate"
          >
            {{ item.name }}
          </a>
        </template>
      </div>
    </Transition>
  </div>
</template>
