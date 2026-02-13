/**
 * Unit tests for ChatFloatingTrigger component
 * Tests visibility logic, click behavior, accessibility, and icon switching
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatFloatingTrigger from '../ChatFloatingTrigger.vue'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()
let observerCallback: IntersectionObserverCallback | null = null

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback
  }
  observe = mockObserve
  disconnect = mockDisconnect
  unobserve = vi.fn()
  root = null
  rootMargin = ''
  thresholds = [] as number[]
  takeRecords = vi.fn(() => [] as IntersectionObserverEntry[])
}

describe('ChatFloatingTrigger', () => {
  beforeEach(() => {
    observerCallback = null
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    mockObserve.mockClear()
    mockDisconnect.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    removeHeroElement()
  })

  /**
   * Helper to create a fake Hero element in the DOM for IntersectionObserver to find
   */
  const createHeroElement = () => {
    const hero = document.createElement('section')
    hero.setAttribute('aria-label', 'Hero')
    document.body.appendChild(hero)
    return hero
  }

  const removeHeroElement = () => {
    const hero = document.querySelector('[aria-label="Hero"]')
    if (hero) hero.remove()
  }

  /** Helper to simulate IntersectionObserver entry */
  const simulateIntersection = (isIntersecting: boolean) => {
    if (observerCallback) {
      observerCallback(
        [{ isIntersecting } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    }
  }

  describe('IntersectionObserver visibility logic', () => {
    it('should hide the button when Hero section is visible', async () => {
      createHeroElement()

      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      // Simulate Hero being visible
      simulateIntersection(true)
      await wrapper.vm.$nextTick()

      const button = wrapper.find('.floating-trigger')
      // v-show sets display: none when hidden (check style attribute for happy-dom compat)
      expect(button.attributes('style')).toContain('display: none')
    })

    it('should show the button when Hero section is NOT visible', async () => {
      createHeroElement()

      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      // Simulate Hero leaving viewport
      simulateIntersection(false)
      await wrapper.vm.$nextTick()

      const button = wrapper.find('.floating-trigger')
      // v-show should not set display: none when visible
      const style = button.attributes('style') || ''
      expect(style).not.toContain('display: none')
    })

    it('should default to showing the button when Hero element is not found', async () => {
      // No Hero element in DOM -> onMounted sets isHeroVisible to false -> button visible
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      // Wait for onMounted to set isHeroVisible = false
      await wrapper.vm.$nextTick()

      const button = wrapper.find('.floating-trigger')
      const style = button.attributes('style') || ''
      expect(style).not.toContain('display: none')
    })

    it('should observe the Hero section element', () => {
      const hero = createHeroElement()

      mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      expect(mockObserve).toHaveBeenCalledWith(hero)
    })

    it('should disconnect observer on unmount', () => {
      createHeroElement()

      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      wrapper.unmount()
      expect(mockDisconnect).toHaveBeenCalled()
    })
  })

  describe('click behavior', () => {
    it('should emit toggle on click', async () => {
      // No Hero so button is visible by default
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      await wrapper.find('.floating-trigger').trigger('click')
      expect(wrapper.emitted('toggle')).toHaveLength(1)
    })
  })

  describe('icon switching', () => {
    it('should show Chat icon when isOpen is false', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      const svgs = wrapper.findAll('svg')
      // Chat icon has the chat bubble path
      const chatIcon = svgs.find(svg =>
        svg.find('path').attributes('d')?.includes('M8 12h.01')
      )
      expect(chatIcon).toBeTruthy()
    })

    it('should show Close icon when isOpen is true', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: true },
      })

      const svgs = wrapper.findAll('svg')
      // Close icon has the X path
      const closeIcon = svgs.find(svg =>
        svg.find('path').attributes('d')?.includes('M6 18L18 6')
      )
      expect(closeIcon).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('should have default ariaLabel when closed', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      const button = wrapper.find('.floating-trigger')
      expect(button.attributes('aria-label')).toBe('打开 AI 对话')
    })

    it('should use custom ariaLabel when provided and closed', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false, ariaLabel: 'Custom label' },
      })

      const button = wrapper.find('.floating-trigger')
      expect(button.attributes('aria-label')).toBe('Custom label')
    })

    it('should show close label when open regardless of ariaLabel prop', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: true, ariaLabel: 'Custom label' },
      })

      const button = wrapper.find('.floating-trigger')
      expect(button.attributes('aria-label')).toBe('关闭 AI 对话')
    })

    it('should have aria-expanded attribute', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      const button = wrapper.find('.floating-trigger')
      expect(button.attributes('aria-expanded')).toBe('false')
    })

    it('should have aria-controls pointing to sidebar', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      const button = wrapper.find('.floating-trigger')
      expect(button.attributes('aria-controls')).toBe('ai-chat-sidebar')
    })

    it('should emit toggle on Enter key', async () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      await wrapper.find('.floating-trigger').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('toggle')).toHaveLength(1)
    })

    it('should emit toggle on Space key', async () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      await wrapper.find('.floating-trigger').trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('toggle')).toHaveLength(1)
    })

    it('should not emit toggle on other keys', async () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      await wrapper.find('.floating-trigger').trigger('keydown', { key: 'Tab' })
      expect(wrapper.emitted('toggle')).toBeUndefined()
    })
  })

  describe('CSS classes', () => {
    it('should add is-open class when isOpen prop is true', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: true },
      })

      const button = wrapper.find('.floating-trigger')
      expect(button.classes()).toContain('is-open')
    })

    it('should not have is-open class when isOpen prop is false', () => {
      const wrapper = mount(ChatFloatingTrigger, {
        props: { isOpen: false },
      })

      const button = wrapper.find('.floating-trigger')
      expect(button.classes()).not.toContain('is-open')
    })
  })
})
