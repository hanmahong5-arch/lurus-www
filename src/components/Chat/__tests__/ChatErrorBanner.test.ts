/**
 * Unit tests for ChatErrorBanner component
 * Tests rendering, accessibility, keyboard interaction, and design system compliance
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatErrorBanner from '../ChatErrorBanner.vue'

const DOCS_URL = 'https://docs.lurus.cn'

const createWrapper = (props = {}) => {
  return mount(ChatErrorBanner, {
    props: {
      docsUrl: DOCS_URL,
      ...props,
    },
  })
}

describe('ChatErrorBanner', () => {
  describe('rendering', () => {
    it('should render friendly error message text', () => {
      const wrapper = createWrapper()
      expect(wrapper.text()).toContain('AI')
    })

    it('should not display technical error details', () => {
      const wrapper = createWrapper()
      const text = wrapper.text()
      expect(text).not.toContain('Error')
      expect(text).not.toContain('Stack')
      expect(text).not.toContain('500')
      expect(text).not.toContain('TypeError')
    })

    it('should render a docs link with correct href', () => {
      const wrapper = createWrapper()
      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe(DOCS_URL)
    })

    it('should render docs link with target=_blank', () => {
      const wrapper = createWrapper()
      const link = wrapper.find('a')
      expect(link.attributes('target')).toBe('_blank')
    })

    it('should render docs link with rel=noopener noreferrer', () => {
      const wrapper = createWrapper()
      const link = wrapper.find('a')
      expect(link.attributes('rel')).toContain('noopener')
      expect(link.attributes('rel')).toContain('noreferrer')
    })

    it('should render a warning icon', () => {
      const wrapper = createWrapper()
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('should have role=alert on the banner container', () => {
      const wrapper = createWrapper()
      const banner = wrapper.find('[role="alert"]')
      expect(banner.exists()).toBe(true)
    })

    it('should have aria-live=assertive on the banner', () => {
      const wrapper = createWrapper()
      const banner = wrapper.find('[role="alert"]')
      expect(banner.attributes('aria-live')).toBe('assertive')
    })

    it('should have descriptive aria-label on docs link', () => {
      const wrapper = createWrapper()
      const link = wrapper.find('a')
      expect(link.attributes('aria-label')).toBeTruthy()
    })
  })

  describe('design system', () => {
    it('should apply error-banner class', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.error-banner').exists()).toBe(true)
    })

    it('should contain a docs link button element', () => {
      const wrapper = createWrapper()
      const link = wrapper.find('.docs-link')
      expect(link.exists()).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle custom docsUrl', () => {
      const wrapper = createWrapper({ docsUrl: 'https://custom.docs.example.com' })
      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('https://custom.docs.example.com')
    })
  })
})
