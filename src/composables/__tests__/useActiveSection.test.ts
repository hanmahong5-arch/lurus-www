import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { useActiveSection } from '../useActiveSection'

// Mock IntersectionObserver
type IntersectionCallback = (entries: Partial<IntersectionObserverEntry>[]) => void

let observerCallback: IntersectionCallback | null = null
let observedElements: Element[] = []
const mockDisconnect = vi.fn()
const mockObserve = vi.fn((el: Element) => {
  observedElements.push(el)
})

const MockIntersectionObserver = vi.fn(function (
  this: unknown,
  callback: IntersectionCallback,
  _options?: IntersectionObserverInit,
) {
  observerCallback = callback
  return {
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: vi.fn(),
  }
})

// Helper: create a test component that exposes useActiveSection
const TestComponent = defineComponent({
  setup() {
    const { activeSection } = useActiveSection()
    return { activeSection }
  },
  template: '<div>{{ activeSection }}</div>',
})

// Helper: simulate IntersectionObserver entries
function simulateIntersection(entries: Array<{ id: string; ratio: number }>) {
  if (!observerCallback) throw new Error('Observer not initialized')
  observerCallback(
    entries.map(({ id, ratio }) => ({
      target: { id } as Element,
      intersectionRatio: ratio,
    }))
  )
}

describe('useActiveSection', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    observerCallback = null
    observedElements = []
    mockDisconnect.mockClear()
    mockObserve.mockClear()
    MockIntersectionObserver.mockClear()

    // Create DOM elements for observed sections
    ;['products', 'portal'].forEach((id) => {
      const el = document.createElement('section')
      el.id = id
      document.body.appendChild(el)
    })
  })

  afterEach(() => {
    // Clean up DOM
    ;['products', 'portal'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) el.remove()
    })
  })

  it('should initialize with null activeSection', () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.vm.activeSection).toBeNull()
    wrapper.unmount()
  })

  it('should create IntersectionObserver on mount', () => {
    const wrapper = mount(TestComponent)
    expect(MockIntersectionObserver).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should observe all section elements', () => {
    const wrapper = mount(TestComponent)
    expect(mockObserve).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })

  it('should configure observer with correct thresholds', () => {
    const wrapper = mount(TestComponent)
    const options = MockIntersectionObserver.mock.calls[0][1] as IntersectionObserverInit | undefined
    expect(options?.threshold).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
    wrapper.unmount()
  })

  it('should configure observer with rootMargin for navbar offset', () => {
    const wrapper = mount(TestComponent)
    const options = MockIntersectionObserver.mock.calls[0][1] as IntersectionObserverInit | undefined
    expect(options?.rootMargin).toBe('-80px 0px 0px 0px')
    wrapper.unmount()
  })

  it('should update activeSection when a section becomes visible', async () => {
    const wrapper = mount(TestComponent)

    simulateIntersection([{ id: 'products', ratio: 0.5 }])
    await nextTick()

    expect(wrapper.vm.activeSection).toBe('products')
    wrapper.unmount()
  })

  it('should select section with highest intersection ratio (AC3)', async () => {
    const wrapper = mount(TestComponent)

    simulateIntersection([
      { id: 'products', ratio: 0.3 },
      { id: 'portal', ratio: 0.6 },
    ])
    await nextTick()

    expect(wrapper.vm.activeSection).toBe('portal')
    wrapper.unmount()
  })

  it('should set activeSection to null when all ratios are below threshold', async () => {
    const wrapper = mount(TestComponent)

    simulateIntersection([
      { id: 'products', ratio: 0.05 },
      { id: 'portal', ratio: 0.08 },
    ])
    await nextTick()

    expect(wrapper.vm.activeSection).toBeNull()
    wrapper.unmount()
  })

  it('should update when section ratios change over time', async () => {
    const wrapper = mount(TestComponent)

    // First: products is most visible
    simulateIntersection([
      { id: 'products', ratio: 0.8 },
      { id: 'portal', ratio: 0.2 },
    ])
    await nextTick()
    expect(wrapper.vm.activeSection).toBe('products')

    // Scroll: portal becomes most visible
    simulateIntersection([
      { id: 'products', ratio: 0.1 },
      { id: 'portal', ratio: 0.7 },
    ])
    await nextTick()
    expect(wrapper.vm.activeSection).toBe('portal')

    wrapper.unmount()
  })

  it('should disconnect observer on unmount', () => {
    const wrapper = mount(TestComponent)
    wrapper.unmount()
    expect(mockDisconnect).toHaveBeenCalledTimes(1)
  })

  it('should handle missing DOM elements gracefully', () => {
    // Remove one section from DOM
    const el = document.getElementById('portal')
    if (el) el.remove()

    const wrapper = mount(TestComponent)
    // Should observe only 1 element instead of 2
    expect(mockObserve).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
