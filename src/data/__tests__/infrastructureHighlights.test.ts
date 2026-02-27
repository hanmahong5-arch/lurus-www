import { describe, it, expect } from 'vitest'
import {
  infrastructureHighlights,
  infrastructureHighlightIcons,
} from '../infrastructureHighlights'

describe('infrastructureHighlights', () => {
  it('should export exactly 4 highlight items', () => {
    expect(infrastructureHighlights).toHaveLength(4)
  })

  it('should have required fields for each highlight', () => {
    infrastructureHighlights.forEach((highlight) => {
      expect(highlight.id).toBeTruthy()
      expect(typeof highlight.id).toBe('string')
      expect(highlight.icon).toBeTruthy()
      expect(typeof highlight.icon).toBe('string')
      expect(highlight.title).toBeTruthy()
      expect(typeof highlight.title).toBe('string')
      expect(highlight.description).toBeTruthy()
      expect(typeof highlight.description).toBe('string')
    })
  })

  it('should have unique IDs', () => {
    const ids = infrastructureHighlights.map((h) => h.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have icon paths for all highlight icons', () => {
    infrastructureHighlights.forEach((highlight) => {
      expect(infrastructureHighlightIcons[highlight.icon]).toBeTruthy()
    })
  })

  it('should contain the expected highlight IDs', () => {
    const ids = infrastructureHighlights.map((h) => h.id)
    expect(ids).toContain('high-availability')
    expect(ids).toContain('continuous-delivery')
    expect(ids).toContain('open-ecosystem')
    expect(ids).toContain('elastic-scaling')
  })

  it('should have non-empty SVG path strings for all icons', () => {
    Object.values(infrastructureHighlightIcons).forEach((path) => {
      expect(typeof path).toBe('string')
      expect(path.length).toBeGreaterThan(0)
    })
  })

  it('should have descriptions that are concise (single line)', () => {
    infrastructureHighlights.forEach((highlight) => {
      expect(highlight.description).not.toContain('\n')
      expect(highlight.description.length).toBeLessThan(100)
    })
  })
})
