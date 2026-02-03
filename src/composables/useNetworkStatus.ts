/**
 * Network status detection composable
 * Monitors online/offline state and provides reactive status
 */

import { ref, onMounted, onUnmounted } from 'vue'

export const useNetworkStatus = () => {
  const isOnline = ref(navigator.onLine)

  const handleOnline = () => {
    isOnline.value = true
  }

  const handleOffline = () => {
    isOnline.value = false
  }

  onMounted(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })

  return { isOnline }
}
