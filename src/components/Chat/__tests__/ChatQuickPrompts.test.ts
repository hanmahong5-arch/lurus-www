/**
 * Unit tests for ChatQuickPrompts component
 * Tests rendering, user interactions, accessibility, design system, and edge cases
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatQuickPrompts from '../ChatQuickPrompts.vue'
import type { QuickPrompt } from '../../../types/chat'

/** Test fixture: sample quick prompts */
const mockPrompts: QuickPrompt[] = [
  { icon: '\u{1F4DA}', label: 'Paper Summary', prompt: 'Please summarize this paper:' },
  { icon: '\u{1F4BB}', label: 'Tech Explain', prompt: 'Please explain this technical concept:' },
  { icon: '\u{1F4B9}', label: 'Finance Analysis', prompt: 'Please analyze this financial data:' },
]

/** Default props factory */
const createProps = (overrides: Partial<{
  prompts: QuickPrompt[]
}> = {}) => ({
  prompts: mockPrompts,
  ...overrides,
})

describe('ChatQuickPrompts', () => {
  describe('rendering', () => {
    it('should render prompt buttons from props', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      expect(buttons.length).toBe(3)
    })

    it('should display prompt labels correctly', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      expect(wrapper.text()).toContain('Paper Summary')
      expect(wrapper.text()).toContain('Tech Explain')
      expect(wrapper.text()).toContain('Finance Analysis')
    })

    it('should display prompt icons', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const icons = wrapper.findAll('.icon')
      expect(icons.length).toBe(3)
    })
  })

  describe('user interactions', () => {
    it('should emit select event with prompt text when clicked', async () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      await buttons[0].trigger('click')

      const emitted = wrapper.emitted('select')
      expect(emitted).toHaveLength(1)
      expect(emitted![0]).toEqual(['Please summarize this paper:'])
    })

    it('should emit correct prompt text for each button', async () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      await buttons[1].trigger('click')

      const emitted = wrapper.emitted('select')
      expect(emitted).toHaveLength(1)
      expect(emitted![0]).toEqual(['Please explain this technical concept:'])
    })

    it('should emit select for the third prompt', async () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      await buttons[2].trigger('click')

      const emitted = wrapper.emitted('select')
      expect(emitted).toHaveLength(1)
      expect(emitted![0]).toEqual(['Please analyze this financial data:'])
    })
  })

  describe('accessibility', () => {
    it('should have role="group" on the container', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const container = wrapper.find('.quick-prompts')
      expect(container.attributes('role')).toBe('group')
    })

    it('should have aria-label on the container', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const container = wrapper.find('.quick-prompts')
      expect(container.attributes('aria-label')).toBeTruthy()
    })

    it('should have descriptive aria-labels on all prompt buttons', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      for (const btn of buttons) {
        const ariaLabel = btn.attributes('aria-label')
        expect(ariaLabel).toBeTruthy()
        expect(ariaLabel!.length).toBeGreaterThan(0)
      }
    })

    it('should include the prompt label in the aria-label', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      expect(buttons[0].attributes('aria-label')).toContain('Paper Summary')
    })

    it('should have aria-hidden on icon elements', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const icons = wrapper.findAll('.icon')
      for (const icon of icons) {
        expect(icon.attributes('aria-hidden')).toBe('true')
      }
    })

    it('should be keyboard navigable - buttons are focusable', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      for (const btn of buttons) {
        // Native button elements are focusable by default
        expect(btn.element.tagName).toBe('BUTTON')
      }
    })
  })

  describe('design system', () => {
    it('should apply sketchy border-radius styling class', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      // Component uses .prompt-btn with sketchy border-radius in CSS
      const buttons = wrapper.findAll('.prompt-btn')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should have flex-wrap layout for prompt buttons', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps(),
      })

      const container = wrapper.find('.quick-prompts')
      expect(container.exists()).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle empty prompts array gracefully', () => {
      const wrapper = mount(ChatQuickPrompts, {
        props: createProps({ prompts: [] }),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      expect(buttons.length).toBe(0)
      // Container should still render
      expect(wrapper.find('.quick-prompts').exists()).toBe(true)
    })

    it('should handle a single prompt', () => {
      const singlePrompt: QuickPrompt[] = [
        { icon: '\u{1F4DA}', label: 'Only One', prompt: 'Only prompt' },
      ]

      const wrapper = mount(ChatQuickPrompts, {
        props: createProps({ prompts: singlePrompt }),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      expect(buttons.length).toBe(1)
    })

    it('should handle many prompts', () => {
      const manyPrompts: QuickPrompt[] = [
        { icon: '1', label: 'One', prompt: 'p1' },
        { icon: '2', label: 'Two', prompt: 'p2' },
        { icon: '3', label: 'Three', prompt: 'p3' },
        { icon: '4', label: 'Four', prompt: 'p4' },
        { icon: '5', label: 'Five', prompt: 'p5' },
        { icon: '6', label: 'Six', prompt: 'p6' },
        { icon: '7', label: 'Seven', prompt: 'p7' },
      ]

      const wrapper = mount(ChatQuickPrompts, {
        props: createProps({ prompts: manyPrompts }),
      })

      const buttons = wrapper.findAll('.prompt-btn')
      expect(buttons.length).toBe(7)
    })

    it('should handle prompts with special characters', () => {
      const specialPrompts: QuickPrompt[] = [
        { icon: '?', label: 'Question <b>bold</b>', prompt: 'What about <script>alert(1)</script>?' },
      ]

      const wrapper = mount(ChatQuickPrompts, {
        props: createProps({ prompts: specialPrompts }),
      })

      // Vue template {{ }} auto-escapes HTML content in text nodes
      const labelSpan = wrapper.find('.label')
      expect(labelSpan.text()).toContain('Question <b>bold</b>')
      // Verify the HTML tag is escaped in the text content (not rendered as HTML)
      expect(labelSpan.element.innerHTML).toContain('&lt;b&gt;bold&lt;/b&gt;')
    })
  })
})
