import { describe, it, expect } from 'vitest'
import { platformCapabilities, platformCapabilityIcons } from '../platformCapabilities'

describe('platformCapabilities', () => {
  it('should export exactly 6 capability items', () => {
    expect(platformCapabilities).toHaveLength(6)
  })

  it('should have required fields for each capability', () => {
    platformCapabilities.forEach((capability) => {
      expect(capability.id).toBeTruthy()
      expect(typeof capability.id).toBe('string')
      expect(capability.icon).toBeTruthy()
      expect(typeof capability.icon).toBe('string')
      expect(capability.title).toBeTruthy()
      expect(typeof capability.title).toBe('string')
      expect(capability.description).toBeTruthy()
      expect(typeof capability.description).toBe('string')
    })
  })

  it('should have unique IDs', () => {
    const ids = platformCapabilities.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have icon paths for all capability icons', () => {
    platformCapabilities.forEach((capability) => {
      expect(platformCapabilityIcons[capability.icon]).toBeTruthy()
    })
  })

  it('should contain the expected capability IDs', () => {
    const ids = platformCapabilities.map((c) => c.id)
    expect(ids).toContain('models')
    expect(ids).toContain('load-balancing')
    expect(ids).toContain('auto-fallback')
    expect(ids).toContain('response-cache')
    expect(ids).toContain('monitoring')
    expect(ids).toContain('openai-compat')
  })
})
