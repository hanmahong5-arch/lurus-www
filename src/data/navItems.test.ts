import { describe, it, expect } from 'vitest'
import { navItems, ctaLinks } from './navItems'

describe('navItems', () => {
  it('should have navigation items', () => {
    expect(navItems.length).toBeGreaterThan(0)
  })

  it('should have valid name and path for all items', () => {
    navItems.forEach((item) => {
      expect(item.path).toBeTruthy()
      expect(item.name).toBeTruthy()
    })
  })

  it('should have HTTPS URLs for external links', () => {
    navItems.forEach((item) => {
      if (item.external) {
        expect(item.path).toMatch(/^https:\/\//)
      }
    })
  })

  it('should have no duplicate paths at top level', () => {
    const paths = navItems.map((item) => item.path)
    const uniquePaths = new Set(paths)
    expect(uniquePaths.size).toBe(paths.length)
  })

  it('should have children array for dropdown items', () => {
    navItems.forEach((item) => {
      if ('children' in item && item.children) {
        expect(Array.isArray(item.children)).toBe(true)
        expect(item.children.length).toBeGreaterThan(0)
        item.children.forEach((child) => {
          expect(child.name).toBeTruthy()
          expect(child.path).toBeTruthy()
        })
      }
    })
  })

  it('should have external children with HTTPS URLs', () => {
    navItems.forEach((item) => {
      if ('children' in item && item.children) {
        item.children.forEach((child) => {
          if (child.external) {
            expect(child.path).toMatch(/^https:\/\//)
          }
        })
      }
    })
  })
})

describe('ctaLinks', () => {
  it('should have login and register URLs using HTTPS', () => {
    expect(ctaLinks.login).toMatch(/^https:\/\//)
    expect(ctaLinks.register).toMatch(/^https:\/\//)
  })

  it('should point to api.lurus.cn domain', () => {
    expect(ctaLinks.login).toContain('api.lurus.cn')
    expect(ctaLinks.register).toContain('api.lurus.cn')
  })
})
