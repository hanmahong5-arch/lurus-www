<script setup lang="ts">
import type { QuickPrompt } from '../../types/chat'

// Quick prompts component for template buttons

defineProps<{
  prompts: QuickPrompt[]
}>()

const emit = defineEmits<{
  select: [prompt: string]
}>()

const handleSelect = (prompt: string) => {
  emit('select', prompt)
}
</script>

<template>
  <div class="quick-prompts" role="group" aria-label="快捷模板">
    <button
      v-for="p in prompts"
      :key="p.label"
      @click="handleSelect(p.prompt)"
      class="prompt-btn"
      :aria-label="`使用${p.label}模板`"
    >
      <span class="icon" aria-hidden="true">{{ p.icon }}</span>
      <span class="label">{{ p.label }}</span>
    </button>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.quick-prompts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  border-bottom: 1px solid var(--color-ink-100);
  background: rgba(254, 249, 231, 0.5);
}

.prompt-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  font-size: 12px;
  background: var(--color-cream-100);
  border: 1.5px solid var(--color-ink-100);
  border-radius: 4px 10px 6px 8px / 8px 6px 10px 4px;
  color: var(--color-ink-700);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.prompt-btn:hover {
  background: var(--color-cream-200);
  border-color: var(--color-ink-300);
  transform: translateY(-1px);
}

.prompt-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-ochre);
}

.prompt-btn:active {
  transform: translateY(0);
}

.icon {
  font-size: 14px;
}

.label {
  font-weight: 500;
}
</style>
