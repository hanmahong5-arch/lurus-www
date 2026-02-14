import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeExampleShowcase from '../CodeExampleShowcase.vue'

// Mock clipboard utility used by CodeShowcase
vi.mock('@/utils/clipboard', () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}))

describe('CodeExampleShowcase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  function mountComponent() {
    return mount(CodeExampleShowcase)
  }

  describe('tab rendering', () => {
    it('should render Request and Response tabs', () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs.length).toBe(2)
      expect(tabs[0].text()).toBe('Request')
      expect(tabs[1].text()).toBe('Response')
    })

    it('should have tablist role on tab container', () => {
      const wrapper = mountComponent()

      const tablist = wrapper.find('[role="tablist"]')
      expect(tablist.exists()).toBe(true)
    })

    it('should have tabpanel role on content container', () => {
      const wrapper = mountComponent()

      const tabpanels = wrapper.findAll('[role="tabpanel"]')
      expect(tabpanels.length).toBeGreaterThan(0)
    })
  })

  describe('default state', () => {
    it('should show Request tab as active by default', () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[0].attributes('aria-selected')).toBe('true')
      expect(tabs[1].attributes('aria-selected')).toBe('false')
    })

    it('should show request tab content by default', () => {
      const wrapper = mountComponent()

      // The active tabpanel should be visible (no hidden attr)
      const visiblePanel = wrapper.find('[role="tabpanel"]:not([hidden])')
      expect(visiblePanel.exists()).toBe(true)
    })

    it('should display Request tab with active styling', () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[0].classes()).toContain('tab-button--active')
      expect(tabs[1].classes()).not.toContain('tab-button--active')
    })
  })

  describe('tab switching', () => {
    it('should switch to Response tab on click', async () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      await tabs[1].trigger('click')

      expect(tabs[1].attributes('aria-selected')).toBe('true')
      expect(tabs[0].attributes('aria-selected')).toBe('false')
    })

    it('should switch back to Request tab on click', async () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      // Go to Response
      await tabs[1].trigger('click')
      // Go back to Request
      await tabs[0].trigger('click')

      expect(tabs[0].attributes('aria-selected')).toBe('true')
      expect(tabs[1].attributes('aria-selected')).toBe('false')
    })
  })

  describe('keyboard navigation', () => {
    it('should switch to next tab on ArrowRight', async () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      await tabs[0].trigger('keydown', { key: 'ArrowRight' })

      expect(tabs[1].attributes('aria-selected')).toBe('true')
    })

    it('should switch to previous tab on ArrowLeft', async () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      // First go to second tab
      await tabs[0].trigger('keydown', { key: 'ArrowRight' })
      // Then go back
      await tabs[1].trigger('keydown', { key: 'ArrowLeft' })

      expect(tabs[0].attributes('aria-selected')).toBe('true')
    })

    it('should wrap around on ArrowRight from last tab', async () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      await tabs[0].trigger('keydown', { key: 'ArrowRight' })
      await tabs[1].trigger('keydown', { key: 'ArrowRight' })

      expect(tabs[0].attributes('aria-selected')).toBe('true')
    })

    it('should go to first tab on Home key', async () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      // Go to second tab first
      await tabs[0].trigger('keydown', { key: 'ArrowRight' })
      // Press Home
      await tabs[1].trigger('keydown', { key: 'Home' })

      expect(tabs[0].attributes('aria-selected')).toBe('true')
    })

    it('should go to last tab on End key', async () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      await tabs[0].trigger('keydown', { key: 'End' })

      expect(tabs[1].attributes('aria-selected')).toBe('true')
    })
  })

  describe('accessibility', () => {
    it('should have aria-controls linking tabs to panels', () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      tabs.forEach((tab) => {
        const controlsId = tab.attributes('aria-controls')
        expect(controlsId).toBeTruthy()
        expect(wrapper.find('#' + controlsId).exists()).toBe(true)
      })
    })

    it('should have aria-labelledby linking panels to tabs', () => {
      const wrapper = mountComponent()

      const panels = wrapper.findAll('[role="tabpanel"]')
      panels.forEach((panel) => {
        const labelledbyId = panel.attributes('aria-labelledby')
        expect(labelledbyId).toBeTruthy()
        expect(wrapper.find('#' + labelledbyId).exists()).toBe(true)
      })
    })

    it('should have tabindex 0 only on active tab', () => {
      const wrapper = mountComponent()

      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[0].attributes('tabindex')).toBe('0')
      expect(tabs[1].attributes('tabindex')).toBe('-1')
    })

    it('should have aria-label on tablist', () => {
      const wrapper = mountComponent()

      const tablist = wrapper.find('[role="tablist"]')
      expect(tablist.attributes('aria-label')).toBeTruthy()
    })
  })

  describe('CodeShowcase integration', () => {
    it('should render CodeShowcase component', () => {
      const wrapper = mountComponent()

      const codeShowcase = wrapper.findComponent({ name: 'CodeShowcase' })
      expect(codeShowcase.exists()).toBe(true)
    })

    it('should pass showAuthTag to CodeShowcase for request tab', () => {
      const wrapper = mountComponent()

      // Request tab is active by default and has showAuthTag=true
      const authTag = wrapper.find('.auth-tag')
      expect(authTag.exists()).toBe(true)
    })

    it('should have reveal-fade-up class for scroll animation', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('.code-example-showcase').classes()).toContain('reveal-fade-up')
    })
  })
})
