<script setup lang="ts">
// Typing indicator component with bouncing dots animation
</script>

<template>
  <div class="typing-indicator">
    <div class="dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <span class="label">AI 正在思考...</span>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--color-cream-100);
  border: 1px solid var(--color-ink-100);
  border-radius: 0 12px 12px 12px;
  width: fit-content;
  max-width: 200px;
}

.dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-ink-300);
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

.label {
  font-size: 12px;
  color: var(--color-ink-500);
  white-space: nowrap;
}
</style>
