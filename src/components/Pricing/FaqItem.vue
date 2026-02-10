<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  question: string
  answer: string
}

defineProps<Props>()

const open = ref(false)
</script>

<template>
  <div class="bg-surface rounded-xl border border-gray-800">
    <button
      @click="open = !open"
      class="w-full px-6 py-4 flex items-center justify-between text-left"
    >
      <span class="font-medium text-white">{{ question }}</span>
      <svg
        class="w-5 h-5 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="open" class="px-6 pb-4 text-gray-400">
      {{ answer }}
    </div>
  </div>
</template>
