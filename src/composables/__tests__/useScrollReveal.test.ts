import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useScrollReveal } from '../useScrollReveal'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Helper to create a wrapper component that uses the composable
function createTestComponent(hash = '') {
  return defineComponent({
    setup() {
      const containerRef = ref<HTMLElement | null>(null)

      // Set hash before composable runs
      Object.defineProperty(window, 'location', {
        value: { ...window.location, hash },
        writable: true,
        configurable: true,
      })

      useScrollReveal(containerRef)
      return { containerRef }
    },
    template: `
      <div ref="containerRef">
        <div class="reveal-fade-up">Content A</div>
        <div class="reveal-stagger">Content B</div>
        <div class="reveal-fade-up">Content C</div>
      </div>
    `,
  })
}

// Mock IntersectionObserver
let mockObserverInstances: Array<{
  observe: ReturnType<typeof vi.fn>
  unobserve: ReturnType<typeof vi.fn>
  disconnect: ReturnType<typeof vi.fn>
  callback: IntersectionObserverCallback
}>

function setupMockIntersectionObserver() {
  mockObserverInstances = []

  class MockObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    callback: IntersectionObserverCallback

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback
      mockObserverInstances.push(this)
    }
  }

  vi.stubGlobal('IntersectionObserver', MockObserver)
  return MockObserver
}

describe('useScrollReveal', () => {
  let originalHash: string
  let matchMediaMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    originalHash = window.location.hash
    // Default: no reduced motion preference
    matchMediaMock = vi.fn().mockReturnValue({ matches: false })
    vi.stubGlobal('matchMedia', matchMediaMock)
    setupMockIntersectionObserver()
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hash: originalHash },
      writable: true,
      configurable: true,
    })
    vi.restoreAllMocks()
  })

  describe('anchor-direct mode (hash navigation)', () => {
    it('should immediately add is-visible to all reveal elements when hash is present', async () => {
      const TestComponent = createTestComponent('#portal')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      const revealElements = wrapper.element.querySelectorAll('.reveal-fade-up, .reveal-stagger')
      for (const el of revealElements) {
        expect(el.classList.contains('is-visible')).toBe(true)
      }

      wrapper.unmount()
    })

    it('should NOT create IntersectionObserver when hash is present', async () => {
      const TestComponent = createTestComponent('#portal')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      // No observer instances should have been created for observation
      expect(mockObserverInstances.length).toBe(0)

      wrapper.unmount()
    })

    it('should handle any hash value, not just #portal', async () => {
      const TestComponent = createTestComponent('#products')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      const revealElements = wrapper.element.querySelectorAll('.reveal-fade-up, .reveal-stagger')
      for (const el of revealElements) {
        expect(el.classList.contains('is-visible')).toBe(true)
      }

      wrapper.unmount()
    })
  })

  describe('reduced-motion preference', () => {
    it('should immediately add is-visible when prefers-reduced-motion is set', async () => {
      matchMediaMock.mockReturnValue({ matches: true })

      const TestComponent = createTestComponent('')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      const revealElements = wrapper.element.querySelectorAll('.reveal-fade-up, .reveal-stagger')
      for (const el of revealElements) {
        expect(el.classList.contains('is-visible')).toBe(true)
      }

      wrapper.unmount()
    })

    it('should NOT create IntersectionObserver with reduced motion', async () => {
      matchMediaMock.mockReturnValue({ matches: true })

      const TestComponent = createTestComponent('')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      expect(mockObserverInstances.length).toBe(0)

      wrapper.unmount()
    })
  })

  describe('normal mode (no hash, no reduced motion)', () => {
    it('should create IntersectionObserver when no hash and no reduced motion', async () => {
      const TestComponent = createTestComponent('')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      expect(mockObserverInstances.length).toBe(1)

      wrapper.unmount()
    })

    it('should observe all reveal-fade-up and reveal-stagger elements', async () => {
      const TestComponent = createTestComponent('')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      const observer = mockObserverInstances[0]
      // 2 reveal-fade-up + 1 reveal-stagger = 3 elements
      expect(observer.observe).toHaveBeenCalledTimes(3)

      wrapper.unmount()
    })

    it('should add is-visible when element intersects', async () => {
      const TestComponent = createTestComponent('')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      const observer = mockObserverInstances[0]
      const targetElement = wrapper.element.querySelector('.reveal-fade-up')!

      // Simulate intersection
      observer.callback(
        [{ isIntersecting: true, target: targetElement } as IntersectionObserverEntry],
        observer as unknown as IntersectionObserver
      )

      expect(targetElement.classList.contains('is-visible')).toBe(true)

      wrapper.unmount()
    })

    it('should unobserve element after it becomes visible (once mode)', async () => {
      const TestComponent = createTestComponent('')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      const observer = mockObserverInstances[0]
      const targetElement = wrapper.element.querySelector('.reveal-fade-up')!

      observer.callback(
        [{ isIntersecting: true, target: targetElement } as IntersectionObserverEntry],
        observer as unknown as IntersectionObserver
      )

      expect(observer.unobserve).toHaveBeenCalledWith(targetElement)

      wrapper.unmount()
    })
  })

  describe('cleanup', () => {
    it('should disconnect observer on unmount', async () => {
      const TestComponent = createTestComponent('')
      const wrapper = mount(TestComponent, { attachTo: document.body })
      await nextTick()

      const observer = mockObserverInstances[0]
      wrapper.unmount()

      expect(observer.disconnect).toHaveBeenCalled()
    })
  })
})
