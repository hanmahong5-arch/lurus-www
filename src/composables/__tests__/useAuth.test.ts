/**
 * Unit tests for useAuth composable
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAuth } from '../useAuth'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useAuth', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    vi.stubGlobal('location', {
      href: 'https://www.lurus.cn',
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('checkSession', () => {
    it('should set isLoggedIn to true when session is valid', async () => {
      const mockUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        avatar: 'https://example.com/avatar.jpg',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          data: {
            user: mockUser,
          },
        }),
      })

      const { checkSession, isLoggedIn, userInfo, isLoading } = useAuth()

      expect(isLoading.value).toBe(false)
      await checkSession()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.lurus.cn/api/v1/auth/session',
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
          headers: { Accept: 'application/json' },
        })
      )
      expect(isLoggedIn.value).toBe(true)
      expect(userInfo.value).toEqual(mockUser)
      expect(isLoading.value).toBe(false)
    })

    it('should set isLoggedIn to false when session returns 401', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      })

      const { checkSession, isLoggedIn, userInfo, isLoading } = useAuth()

      await checkSession()

      expect(isLoggedIn.value).toBe(false)
      expect(userInfo.value).toBeNull()
      expect(isLoading.value).toBe(false)
    })

    it('should handle API error gracefully without showing error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      const { checkSession, isLoggedIn, error } = useAuth()

      await checkSession()

      expect(isLoggedIn.value).toBe(false)
      expect(error.value).toBeNull() // Should not expose error to UI
    })

    it('should handle network error gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { checkSession, isLoggedIn, userInfo, error } = useAuth()

      await checkSession()

      expect(isLoggedIn.value).toBe(false)
      expect(userInfo.value).toBeNull()
      expect(error.value).toBeNull()
    })

    it('should handle invalid API response format', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          success: false,
        }),
      })

      const { checkSession, isLoggedIn, userInfo } = useAuth()

      await checkSession()

      expect(isLoggedIn.value).toBe(false)
      expect(userInfo.value).toBeNull()
    })
  })

  describe('login', () => {
    it('should redirect to login page with current URL', () => {
      const { login } = useAuth()

      login()

      expect(global.location.href).toBe(
        'https://api.lurus.cn/login?redirect_url=https%3A%2F%2Fwww.lurus.cn'
      )
    })
  })

  describe('logout', () => {
    it('should call logout API and clear local state', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      const { logout, isLoggedIn, userInfo } = useAuth()

      // Set initial logged-in state
      isLoggedIn.value = true
      userInfo.value = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
      }

      await logout()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.lurus.cn/logout',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
        })
      )
      expect(isLoggedIn.value).toBe(false)
      expect(userInfo.value).toBeNull()
    })

    it('should clear local state even if API call fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { logout, isLoggedIn, userInfo } = useAuth()

      isLoggedIn.value = true
      userInfo.value = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
      }

      await logout()

      expect(isLoggedIn.value).toBe(false)
      expect(userInfo.value).toBeNull()
    })
  })

  describe('reactive state', () => {
    it('should initialize with default values', () => {
      const { isLoggedIn, userInfo, isLoading, error } = useAuth()

      expect(isLoggedIn.value).toBe(false)
      expect(userInfo.value).toBeNull()
      expect(isLoading.value).toBe(false)
      expect(error.value).toBeNull()
    })

    it('should update isLoading during checkSession', async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  status: 200,
                  json: async () => ({
                    success: true,
                    data: {
                      user: {
                        id: '123',
                        username: 'test',
                        email: 'test@example.com',
                      },
                    },
                  }),
                }),
              100
            )
          )
      )

      const { checkSession, isLoading } = useAuth()

      const promise = checkSession()
      expect(isLoading.value).toBe(true)

      await promise
      expect(isLoading.value).toBe(false)
    })
  })
})
