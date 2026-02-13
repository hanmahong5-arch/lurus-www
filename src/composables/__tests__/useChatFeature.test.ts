/**
 * Unit tests for useChatFeature composable
 */

import { describe, it, expect, vi, afterEach } from 'vitest'

describe('useChatFeature', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('should return isChatEnabled=true when VITE_CHAT_ENABLED is "true"', async () => {
    vi.stubEnv('VITE_CHAT_ENABLED', 'true')
    const { useChatFeature } = await import('../useChatFeature')

    const { isChatEnabled } = useChatFeature()
    expect(isChatEnabled.value).toBe(true)
  })

  it('should return isChatEnabled=false when VITE_CHAT_ENABLED is "false"', async () => {
    vi.stubEnv('VITE_CHAT_ENABLED', 'false')
    const { useChatFeature } = await import('../useChatFeature')

    const { isChatEnabled } = useChatFeature()
    expect(isChatEnabled.value).toBe(false)
  })

  it('should return isChatEnabled=false when VITE_CHAT_ENABLED is empty string', async () => {
    vi.stubEnv('VITE_CHAT_ENABLED', '')
    const { useChatFeature } = await import('../useChatFeature')

    const { isChatEnabled } = useChatFeature()
    expect(isChatEnabled.value).toBe(false)
  })

  it('should handle case-insensitive "TRUE" value', async () => {
    vi.stubEnv('VITE_CHAT_ENABLED', 'TRUE')
    const { useChatFeature } = await import('../useChatFeature')

    const { isChatEnabled } = useChatFeature()
    expect(isChatEnabled.value).toBe(true)
  })

  it('should handle whitespace-padded value " true "', async () => {
    vi.stubEnv('VITE_CHAT_ENABLED', ' true ')
    const { useChatFeature } = await import('../useChatFeature')

    const { isChatEnabled } = useChatFeature()
    expect(isChatEnabled.value).toBe(true)
  })

  it('should return isChatEnabled=false for unexpected values like "1" or "yes"', async () => {
    vi.stubEnv('VITE_CHAT_ENABLED', '1')
    const { useChatFeature: useChatFeature1 } = await import('../useChatFeature')
    expect(useChatFeature1().isChatEnabled.value).toBe(false)

    vi.resetModules()
    vi.stubEnv('VITE_CHAT_ENABLED', 'yes')
    const { useChatFeature: useChatFeature2 } = await import('../useChatFeature')
    expect(useChatFeature2().isChatEnabled.value).toBe(false)
  })
})
