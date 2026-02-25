/**
 * Unit tests for useAuth composable (OIDC PKCE flow)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAuth } from '../useAuth'

// Mock crypto.subtle for PKCE
const mockDigest = vi.fn().mockResolvedValue(new ArrayBuffer(32))
vi.stubGlobal('crypto', {
  getRandomValues: (arr: Uint8Array) => {
    for (let i = 0; i < arr.length; i++) arr[i] = i % 256
    return arr
  },
  subtle: { digest: mockDigest },
})

// Mock sessionStorage
const storage: Record<string, string> = {}
vi.stubGlobal('sessionStorage', {
  getItem: (key: string) => storage[key] ?? null,
  setItem: (key: string, val: string) => { storage[key] = val },
  removeItem: (key: string) => { delete storage[key] },
})

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useAuth', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    Object.keys(storage).forEach(key => delete storage[key])
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initial state', () => {
    it('should initialize with default values', () => {
      const { isLoggedIn, userInfo, isLoading, error } = useAuth()
      expect(isLoggedIn.value).toBe(false)
      expect(userInfo.value).toBeNull()
      expect(isLoading.value).toBe(false)
      expect(error.value).toBeNull()
    })
  })

  describe('login', () => {
    it('should redirect to Zitadel authorize URL', async () => {
      const hrefSetter = vi.fn()
      const loc = {
        _href: 'https://www.lurus.cn',
        get href() { return this._href },
        set href(val: string) { hrefSetter(val); this._href = val },
        pathname: '/',
        origin: 'https://www.lurus.cn',
        get search() { return '' },
      }
      Object.defineProperty(window, 'location', {
        value: loc,
        writable: true,
        configurable: true,
      })

      const { login } = useAuth()
      await login()

      expect(hrefSetter).toHaveBeenCalledTimes(1)
      const url = hrefSetter.mock.calls[0][0] as string
      expect(url).toContain('auth.lurus.cn/oauth/v2/authorize')
      expect(url).toContain('response_type=code')
      expect(url).toContain('code_challenge_method=S256')
    })

    it('should add prompt=create for registration flow', async () => {
      const hrefSetter = vi.fn()
      const loc = {
        _href: 'https://www.lurus.cn',
        get href() { return this._href },
        set href(val: string) { hrefSetter(val); this._href = val },
        pathname: '/',
        origin: 'https://www.lurus.cn',
        get search() { return '' },
      }
      Object.defineProperty(window, 'location', {
        value: loc,
        writable: true,
        configurable: true,
      })

      const { login } = useAuth()
      await login({ prompt: 'create' })

      const url = hrefSetter.mock.calls[0][0] as string
      expect(url).toContain('prompt=create')
    })
  })

  describe('handleCallback', () => {
    it('should exchange code for tokens', async () => {
      // Setup PKCE state
      storage['oidc_state'] = 'test-state'
      storage['oidc_code_verifier'] = 'test-verifier'

      mockFetch
        .mockResolvedValueOnce({
          // Token exchange
          ok: true,
          json: async () => ({
            access_token: 'at-123',
            id_token: 'id-123',
            refresh_token: 'rt-123',
            token_type: 'Bearer',
            expires_in: 3600,
          }),
        })
        .mockResolvedValueOnce({
          // UserInfo
          ok: true,
          json: async () => ({
            sub: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
          }),
        })

      const { handleCallback, isLoggedIn, userInfo } = useAuth()
      await handleCallback('test-code', 'test-state')

      expect(isLoggedIn.value).toBe(true)
      expect(userInfo.value).toMatchObject({
        sub: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
      })
    })

    it('should reject mismatched state', async () => {
      storage['oidc_state'] = 'correct-state'
      storage['oidc_code_verifier'] = 'test-verifier'

      const { handleCallback } = useAuth()

      await expect(handleCallback('test-code', 'wrong-state')).rejects.toThrow('state')
    })
  })

  describe('logout', () => {
    it('should redirect to Zitadel end_session URL', () => {
      const hrefSetter = vi.fn()
      const loc = {
        _href: 'https://www.lurus.cn',
        get href() { return this._href },
        set href(val: string) { hrefSetter(val); this._href = val },
        pathname: '/',
        origin: 'https://www.lurus.cn',
        get search() { return '' },
      }
      Object.defineProperty(window, 'location', {
        value: loc,
        writable: true,
        configurable: true,
      })

      const { logout, userInfo } = useAuth()
      userInfo.value = null
      logout()

      expect(hrefSetter).toHaveBeenCalledTimes(1)
      const url = hrefSetter.mock.calls[0][0] as string
      expect(url).toContain('auth.lurus.cn/oidc/v1/end_session')
    })
  })

  describe('getAccessToken', () => {
    it('should return null when not authenticated', () => {
      const { getAccessToken } = useAuth()
      expect(getAccessToken()).toBeNull()
    })
  })
})
