/**
 * Unit tests for ApiStatusBanner component
 * Verifies neutral styling, a11y attributes, and conditional rendering
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ApiStatusBanner from '../ApiStatusBanner.vue'
import type { ApiHealthStatus } from '@/types/apiHealth'

describe('ApiStatusBanner', () => {
  const mountComponent = (status: ApiHealthStatus) => {
    return mount(ApiStatusBanner, {
      props: { status },
    })
  }

  describe('rendering - unavailable state', () => {
    it('should render banner when status is unavailable', () => {
      const wrapper = mountComponent('unavailable')
      expect(wrapper.find('[role="status"]').exists()).toBe(true)
    })

    it('should display the correct status message', () => {
      const wrapper = mountComponent('unavailable')
      expect(wrapper.text()).toContain('服务维护中，以下为示例数据')
    })

    it('should render an info icon', () => {
      const wrapper = mountComponent('unavailable')
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
    })
  })

  describe('rendering - hidden states', () => {
    it('should not render banner when status is ready', () => {
      const wrapper = mountComponent('ready')
      expect(wrapper.find('[role="status"]').exists()).toBe(false)
    })

    it('should not render banner when status is loading', () => {
      const wrapper = mountComponent('loading')
      expect(wrapper.find('[role="status"]').exists()).toBe(false)
    })
  })

  describe('neutral styling', () => {
    it('should not use error red colors', () => {
      const wrapper = mountComponent('unavailable')
      const html = wrapper.html()
      // Ensure no red/error/danger classes are present
      expect(html).not.toContain('text-red')
      expect(html).not.toContain('bg-red')
      expect(html).not.toContain('border-red')
      expect(html).not.toContain('text-danger')
      expect(html).not.toContain('text-error')
    })

    it('should use neutral ink and cream design tokens', () => {
      const wrapper = mountComponent('unavailable')
      const banner = wrapper.find('[role="status"]')
      const classes = banner.classes().join(' ')
      // Should have neutral styling classes
      expect(classes).toContain('ink')
      expect(classes).toContain('cream')
    })
  })

  describe('accessibility', () => {
    it('should have role="status" for screen reader announcement', () => {
      const wrapper = mountComponent('unavailable')
      const banner = wrapper.find('[role="status"]')
      expect(banner.exists()).toBe(true)
    })

    it('should have aria-live="polite"', () => {
      const wrapper = mountComponent('unavailable')
      const banner = wrapper.find('[role="status"]')
      expect(banner.attributes('aria-live')).toBe('polite')
    })

    it('should have aria-label on the banner', () => {
      const wrapper = mountComponent('unavailable')
      const banner = wrapper.find('[role="status"]')
      expect(banner.attributes('aria-label')).toBeTruthy()
    })

    it('should mark the info icon as aria-hidden', () => {
      const wrapper = mountComponent('unavailable')
      const svg = wrapper.find('svg')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })
})
