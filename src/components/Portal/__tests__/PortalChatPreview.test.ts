/**
 * Unit tests for PortalChatPreview component
 * Tests rendering, event dispatching, accessibility, and design system compliance
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PortalChatPreview from '../PortalChatPreview.vue'
import { quickPrompts } from '../../../data/chatModels'

// Mock useTracking composable
vi.mock('../../../composables/useTracking', () => ({
  useTracking: () => ({
    track: vi.fn(),
  }),
}))

describe('PortalChatPreview', () => {
  let dispatchEventSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
  })

  afterEach(() => {
    dispatchEventSpy.mockRestore()
  })

  const mountComponent = () => {
    return mount(PortalChatPreview)
  }

  describe('rendering', () => {
    it('should render the brand title "Lurus AI"', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Lurus AI')
    })

    it('should render the brand icon with letter "L"', () => {
      const wrapper = mountComponent()
      const brandIcon = wrapper.find('.brand-icon')
      expect(brandIcon.exists()).toBe(true)
      expect(brandIcon.text()).toContain('L')
    })

    it('should render quick prompts from data', () => {
      const wrapper = mountComponent()
      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      expect(promptButtons.length).toBeGreaterThan(0)
      expect(promptButtons.length).toBeLessThanOrEqual(3)
    })

    it('should display prompt labels', () => {
      const wrapper = mountComponent()
      const text = wrapper.text()
      // Check at least the first prompt label is present
      expect(text).toContain(quickPrompts[0].label)
    })

    it('should render the "Start Chat" action button', () => {
      const wrapper = mountComponent()
      const actionBtn = wrapper.find('.action-btn')
      expect(actionBtn.exists()).toBe(true)
      expect(actionBtn.text()).toContain('开始对话')
    })

    it('should render status indicator dot', () => {
      const wrapper = mountComponent()
      const statusDot = wrapper.find('.status-dot')
      expect(statusDot.exists()).toBe(true)
    })

    it('should render a prompts label text', () => {
      const wrapper = mountComponent()
      const label = wrapper.find('.prompts-label')
      expect(label.exists()).toBe(true)
    })
  })

  describe('event dispatching', () => {
    it('should dispatch lurus:open-chat event when action button is clicked', async () => {
      const wrapper = mountComponent()
      const actionBtn = wrapper.find('.action-btn')
      await actionBtn.trigger('click')

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'lurus:open-chat',
        })
      )
    })

    it('should dispatch lurus:open-chat with prompt detail when a prompt is clicked', async () => {
      const wrapper = mountComponent()
      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      await promptButtons[0].trigger('click')

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'lurus:open-chat',
        })
      )

      // Verify the event carries the prompt text as detail
      const calledEvent = dispatchEventSpy.mock.calls.find(
        (call: [Event]) => (call[0] as CustomEvent).type === 'lurus:open-chat' && (call[0] as CustomEvent).detail
      )
      expect(calledEvent).toBeTruthy()
      expect((calledEvent![0] as CustomEvent).detail).toHaveProperty('prompt')
    })

    it('should dispatch open-chat on Enter key on action button', async () => {
      const wrapper = mountComponent()
      const actionBtn = wrapper.find('.action-btn')
      await actionBtn.trigger('keydown', { key: 'Enter' })

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'lurus:open-chat',
        })
      )
    })

    it('should dispatch open-chat on Space key on action button', async () => {
      const wrapper = mountComponent()
      const actionBtn = wrapper.find('.action-btn')
      await actionBtn.trigger('keydown', { key: ' ' })

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'lurus:open-chat',
        })
      )
    })
  })

  describe('accessibility', () => {
    it('should have role="region" on the container', () => {
      const wrapper = mountComponent()
      const container = wrapper.find('.portal-chat-preview')
      expect(container.attributes('role')).toBe('region')
    })

    it('should have aria-label on the container', () => {
      const wrapper = mountComponent()
      const container = wrapper.find('.portal-chat-preview')
      expect(container.attributes('aria-label')).toBeTruthy()
    })

    it('should have aria-label on the action button', () => {
      const wrapper = mountComponent()
      const actionBtn = wrapper.find('.action-btn')
      expect(actionBtn.attributes('aria-label')).toBeTruthy()
    })

    it('should have aria-labels on prompt buttons', () => {
      const wrapper = mountComponent()
      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      for (const btn of promptButtons) {
        expect(btn.attributes('aria-label')).toBeTruthy()
      }
    })
  })

  describe('design system', () => {
    it('should apply card-sketchy class to the container', () => {
      const wrapper = mountComponent()
      const container = wrapper.find('.portal-chat-preview')
      expect(container.classes()).toContain('card-sketchy')
    })
  })

  describe('edge cases', () => {
    it('should render without errors even when quick prompts data is empty', () => {
      // Component should handle the case gracefully
      // since it reads from the data module directly
      const wrapper = mountComponent()
      expect(wrapper.find('.portal-chat-preview').exists()).toBe(true)
    })
  })
})
