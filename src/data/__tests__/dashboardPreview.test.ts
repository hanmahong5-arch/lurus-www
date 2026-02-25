import { describe, it, expect } from 'vitest'
import { dashboardPreviewConfig } from '../dashboardPreview'

describe('dashboardPreview data', () => {
  it('exports a config object', () => {
    expect(dashboardPreviewConfig).toBeDefined()
    expect(typeof dashboardPreviewConfig).toBe('object')
  })

  it('has all required fields', () => {
    expect(dashboardPreviewConfig).toHaveProperty('screenshotSrc')
    expect(dashboardPreviewConfig).toHaveProperty('screenshotAlt')
    expect(dashboardPreviewConfig).toHaveProperty('fallbackCode')
    expect(dashboardPreviewConfig).toHaveProperty('fallbackLanguage')
    expect(dashboardPreviewConfig).toHaveProperty('fallbackAriaLabel')
    expect(dashboardPreviewConfig).toHaveProperty('title')
    expect(dashboardPreviewConfig).toHaveProperty('caption')
  })

  it('has string type for all fields', () => {
    expect(typeof dashboardPreviewConfig.screenshotSrc).toBe('string')
    expect(typeof dashboardPreviewConfig.screenshotAlt).toBe('string')
    expect(typeof dashboardPreviewConfig.fallbackCode).toBe('string')
    expect(typeof dashboardPreviewConfig.fallbackLanguage).toBe('string')
    expect(typeof dashboardPreviewConfig.fallbackAriaLabel).toBe('string')
    expect(typeof dashboardPreviewConfig.title).toBe('string')
    expect(typeof dashboardPreviewConfig.caption).toBe('string')
  })

  it('has non-empty fallback code for degradation', () => {
    expect(dashboardPreviewConfig.fallbackCode.length).toBeGreaterThan(0)
  })

  it('fallback code is non-empty code snippet', () => {
    expect(dashboardPreviewConfig.fallbackCode.length).toBeGreaterThan(10)
  })

  it('has typescript as fallback language', () => {
    expect(dashboardPreviewConfig.fallbackLanguage).toBe('typescript')
  })

  it('has non-empty alt text for screenshot', () => {
    expect(dashboardPreviewConfig.screenshotAlt.length).toBeGreaterThan(0)
  })

  it('has non-empty title and caption', () => {
    expect(dashboardPreviewConfig.title.length).toBeGreaterThan(0)
    expect(dashboardPreviewConfig.caption.length).toBeGreaterThan(0)
  })

  it('currently has empty screenshotSrc (no asset available)', () => {
    expect(dashboardPreviewConfig.screenshotSrc).toBe('')
  })
})
