/**
 * Unit tests for ChatPreview component
 * Tests rendering states, user interactions, accessibility, and design system compliance
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatPreview from '../ChatPreview.vue'
import type { QuickPrompt } from '../../../types/chat'

/** Test fixture: sample quick prompts */
const mockPrompts: QuickPrompt[] = [
  { icon: '📚', label: 'Paper Summary', prompt: 'Please summarize this paper:' },
  { icon: '💻', label: 'Tech Explain', prompt: 'Please explain this technical concept:' },
  { icon: '💹', label: 'Finance Analysis', prompt: 'Please analyze this financial data:' },
]

/** Default props factory */
const createProps = (overrides: Partial<{
  ariaLabel: string
  quickPrompts: QuickPrompt[]
  isAvailable: boolean
}> = {}) => ({
  quickPrompts: mockPrompts,
  isAvailable: true,
  ...overrides,
})

describe('ChatPreview', () => {
  describe('rendering - available state', () => {
    it('should render the brand title', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      expect(wrapper.text()).toContain('Lurus AI')
    })

    it('should render brand icon element', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      const icon = wrapper.find('.brand-icon')
      expect(icon.exists()).toBe(true)
    })

    it('should render quick prompt preview buttons', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      expect(promptButtons.length).toBe(3)
    })

    it('should display prompt labels', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      expect(wrapper.text()).toContain('Paper Summary')
      expect(wrapper.text()).toContain('Tech Explain')
      expect(wrapper.text()).toContain('Finance Analysis')
    })

    it('should render "Start Chat" action button when available', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      const actionBtn = wrapper.find('.action-btn')
      expect(actionBtn.exists()).toBe(true)
      expect(actionBtn.text()).toContain('开始对话')
    })

    it('should limit displayed prompts to maximum 3', () => {
      const manyPrompts: QuickPrompt[] = [
        ...mockPrompts,
        { icon: '🏥', label: 'Medical', prompt: 'Medical question' },
        { icon: '⚖️', label: 'Legal', prompt: 'Legal question' },
      ]

      const wrapper = mount(ChatPreview, {
        props: createProps({ quickPrompts: manyPrompts }),
      })

      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      expect(promptButtons.length).toBe(3)
    })
  })

  describe('rendering - unavailable state', () => {
    it('should render "Coming Soon" button when unavailable', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: false }),
      })

      const actionBtn = wrapper.find('.action-btn')
      expect(actionBtn.exists()).toBe(true)
      expect(actionBtn.text()).toContain('即将开放')
    })

    it('should disable the action button when unavailable', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: false }),
      })

      const actionBtn = wrapper.find('.action-btn')
      expect(actionBtn.attributes('disabled')).toBeDefined()
    })

    it('should show static description when unavailable', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: false }),
      })

      expect(wrapper.text()).toContain('AI')
    })

    it('should still render brand title when unavailable', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: false }),
      })

      expect(wrapper.text()).toContain('Lurus AI')
    })
  })

  describe('user interactions', () => {
    it('should emit open-chat when action button is clicked and available', async () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      await wrapper.find('.action-btn').trigger('click')
      expect(wrapper.emitted('open-chat')).toHaveLength(1)
    })

    it('should NOT emit open-chat when action button is clicked and unavailable', async () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: false }),
      })

      await wrapper.find('.action-btn').trigger('click')
      expect(wrapper.emitted('open-chat')).toBeUndefined()
    })

    it('should emit select-prompt with prompt text when a quick prompt is clicked', async () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      await promptButtons[0].trigger('click')

      const emitted = wrapper.emitted('select-prompt')
      expect(emitted).toHaveLength(1)
      expect(emitted![0]).toEqual(['Please summarize this paper:'])
    })

    it('should emit select-prompt for each different prompt', async () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      await promptButtons[1].trigger('click')

      const emitted = wrapper.emitted('select-prompt')
      expect(emitted).toHaveLength(1)
      expect(emitted![0]).toEqual(['Please explain this technical concept:'])
    })
  })

  describe('accessibility', () => {
    it('should have default ariaLabel on the container', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      const container = wrapper.find('.chat-preview')
      expect(container.attributes('aria-label')).toBe('AI Chat 预览')
    })

    it('should use custom ariaLabel when provided', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ ariaLabel: 'Custom Chat Preview' }),
      })

      const container = wrapper.find('.chat-preview')
      expect(container.attributes('aria-label')).toBe('Custom Chat Preview')
    })

    it('should have role="region" on the container', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      const container = wrapper.find('.chat-preview')
      expect(container.attributes('role')).toBe('region')
    })

    it('should have descriptive aria-labels on prompt buttons', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      for (const btn of promptButtons) {
        expect(btn.attributes('aria-label')).toBeTruthy()
      }
    })

    it('should have aria-label on action button', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      const actionBtn = wrapper.find('.action-btn')
      expect(actionBtn.attributes('aria-label')).toBeTruthy()
    })

    it('should emit open-chat on Enter key on action button', async () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      await wrapper.find('.action-btn').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('open-chat')).toHaveLength(1)
    })

    it('should emit open-chat on Space key on action button', async () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      await wrapper.find('.action-btn').trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('open-chat')).toHaveLength(1)
    })
  })

  describe('design system', () => {
    it('should apply card-sketchy class', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps(),
      })

      const container = wrapper.find('.chat-preview')
      expect(container.classes()).toContain('card-sketchy')
    })

    it('should have the unavailable modifier class when not available', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: false }),
      })

      const container = wrapper.find('.chat-preview')
      expect(container.classes()).toContain('is-unavailable')
    })

    it('should NOT have the unavailable modifier class when available', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ isAvailable: true }),
      })

      const container = wrapper.find('.chat-preview')
      expect(container.classes()).not.toContain('is-unavailable')
    })
  })

  describe('edge cases', () => {
    it('should handle empty quick prompts gracefully', () => {
      const wrapper = mount(ChatPreview, {
        props: createProps({ quickPrompts: [] }),
      })

      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      expect(promptButtons.length).toBe(0)
      // Should still render without errors
      expect(wrapper.find('.chat-preview').exists()).toBe(true)
    })

    it('should handle single quick prompt', () => {
      const singlePrompt: QuickPrompt[] = [
        { icon: '📚', label: 'Single', prompt: 'Single prompt' },
      ]

      const wrapper = mount(ChatPreview, {
        props: createProps({ quickPrompts: singlePrompt }),
      })

      const promptButtons = wrapper.findAll('.prompt-preview-btn')
      expect(promptButtons.length).toBe(1)
    })
  })
})
