/**
 * Authentication Composable
 * Manages cross-domain SSO session state with api.lurus.cn
 */

import { ref, type Ref } from 'vue'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.lurus.cn'

export interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
}

export interface SessionCheckResponse {
  user: UserInfo
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
}

/**
 * Composable for authentication and session management
 */
export function useAuth() {
  const isLoggedIn: Ref<boolean> = ref(false)
  const userInfo: Ref<UserInfo | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  /**
   * Check session status from api.lurus.cn
   * Uses credentials: 'include' to send cross-domain cookies
   */
  async function checkSession(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/session`, {
        method: 'GET',
        credentials: 'include', // Critical: send cookies to .lurus.cn domain
        headers: {
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        const data: ApiResponse<SessionCheckResponse> = await response.json()

        if (data.success && data.data.user) {
          isLoggedIn.value = true
          userInfo.value = data.data.user
        } else {
          isLoggedIn.value = false
          userInfo.value = null
        }
      } else if (response.status === 401) {
        // Not authenticated - expected state for logged-out users
        isLoggedIn.value = false
        userInfo.value = null
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (err) {
      // Network errors or API failures - don't show error to user
      // Just treat as not logged in
      console.warn('Session check failed:', err)
      isLoggedIn.value = false
      userInfo.value = null
      error.value = null // Don't expose error to UI
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Redirect to login page with return URL
   */
  function login(): void {
    const currentURL = encodeURIComponent(window.location.href)
    window.location.href = `${API_BASE_URL}/login?redirect_url=${currentURL}`
  }

  /**
   * Logout and clear session
   */
  async function logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      isLoggedIn.value = false
      userInfo.value = null
    } catch (err) {
      console.error('Logout failed:', err)
      // Still clear local state even if API call fails
      isLoggedIn.value = false
      userInfo.value = null
    }
  }

  return {
    isLoggedIn,
    userInfo,
    isLoading,
    error,
    checkSession,
    login,
    logout,
  }
}
