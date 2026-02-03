<script setup lang="ts">
// Network status banner component
// Shows offline warning when network is disconnected

defineProps<{
  isOnline: boolean
}>()
</script>

<template>
  <Transition name="slide">
    <div v-if="!isOnline" class="network-banner offline" role="alert" aria-live="polite">
      <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 01-1.414-7.072m-2.829 9.9a9 9 0 010-12.728" />
      </svg>
      <span class="text">网络已断开，消息将在恢复后发送</span>
    </div>
  </Transition>
</template>

<style scoped>
@reference "../../styles/main.css";

.network-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
}

.network-banner.offline {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  color: #991b1b;
  border-bottom: 1px solid #fecaca;
}

.icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.text {
  flex: 1;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
