import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimaryButton from '../PrimaryButton.vue'

const defaultProps = {
  text: '获取 API Key',
  href: 'https://api.lurus.cn',
  ariaLabel: '跳转到 API Key 注册页面',
}

describe('PrimaryButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  describe('rendering and props', () => {
    it('should render button text', () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      expect(wrapper.text()).toBe('获取 API Key')
    })

    it('should render as anchor element with correct href', () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('https://api.lurus.cn')
    })

    it('should pass target prop to anchor', () => {
      const wrapper = mount(PrimaryButton, {
        props: { ...defaultProps, target: '_blank' },
      })

      const link = wrapper.find('a')
      expect(link.attributes('target')).toBe('_blank')
    })

    it('should default target to _self when not specified', () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      const link = wrapper.find('a')
      expect(link.attributes('target')).toBe('_self')
    })

    it('should pass ariaLabel to anchor element', () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      const link = wrapper.find('a')
      expect(link.attributes('aria-label')).toBe('跳转到 API Key 注册页面')
    })

    it('should add rel="noopener noreferrer" when target is _blank', () => {
      const wrapper = mount(PrimaryButton, {
        props: { ...defaultProps, target: '_blank' },
      })

      const link = wrapper.find('a')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })

    it('should not add rel attribute when target is _self', () => {
      const wrapper = mount(PrimaryButton, {
        props: { ...defaultProps, target: '_self' },
      })

      const link = wrapper.find('a')
      expect(link.attributes('rel')).toBeUndefined()
    })
  })

  describe('click behavior and debouncing', () => {
    it('should allow first click without debounce', async () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      const link = wrapper.find('a')
      const clickEvent = new MouseEvent('click')
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault')

      await link.element.dispatchEvent(clickEvent)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should debounce rapid successive clicks (< 300ms)', async () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      const link = wrapper.find('a')

      // First click: should proceed
      const firstClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
      const firstPreventDefaultSpy = vi.spyOn(firstClickEvent, 'preventDefault')
      link.element.dispatchEvent(firstClickEvent)
      expect(firstPreventDefaultSpy).not.toHaveBeenCalled()

      // Advance time by 100ms (less than debounce threshold)
      vi.advanceTimersByTime(100)

      // Second click within 300ms: should be blocked
      const secondClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
      const secondPreventDefaultSpy = vi.spyOn(secondClickEvent, 'preventDefault')
      link.element.dispatchEvent(secondClickEvent)
      expect(secondPreventDefaultSpy).toHaveBeenCalled()
    })

    it('should allow click after debounce period (>= 300ms)', async () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      const link = wrapper.find('a')

      // First click
      const firstClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
      link.element.dispatchEvent(firstClickEvent)

      // Advance time by 300ms (exactly at debounce threshold)
      vi.advanceTimersByTime(300)

      // Second click after debounce period: should proceed
      const secondClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
      const secondPreventDefaultSpy = vi.spyOn(secondClickEvent, 'preventDefault')
      link.element.dispatchEvent(secondClickEvent)
      expect(secondPreventDefaultSpy).not.toHaveBeenCalled()
    })
  })

  describe('styling and accessibility', () => {
    it('should have primary-button class', () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      const link = wrapper.find('a')
      expect(link.classes()).toContain('primary-button')
    })

    it('should be rendered as a link element for better semantics', () => {
      const wrapper = mount(PrimaryButton, { props: defaultProps })

      expect(wrapper.element.tagName).toBe('A')
    })
  })
})
