import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavDropdown from '../NavDropdown.vue'
import type { NavItem } from '@/types/navigation'

const mockItems: NavItem[] = [
  { name: 'Item 1', path: '/item-1' },
  { name: 'Item 2', path: 'https://example.com', external: true },
]

describe('NavDropdown', () => {
  describe('active state indicator (AC2)', () => {
    it('should show active indicator when active prop is true', () => {
      const wrapper = mount(NavDropdown, {
        props: { label: 'Products', items: mockItems, active: true },
        global: { stubs: { 'router-link': true } },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('border-b-2')
      expect(button.classes()).toContain('border-ochre')
      expect(button.classes()).toContain('text-ink-900')
      expect(button.classes()).not.toContain('border-transparent')
    })

    it('should show transparent border when active prop is false', () => {
      const wrapper = mount(NavDropdown, {
        props: { label: 'Products', items: mockItems, active: false },
        global: { stubs: { 'router-link': true } },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('border-b-2')
      expect(button.classes()).toContain('border-transparent')
      expect(button.classes()).not.toContain('border-ochre')
    })

    it('should show transparent border when active prop is not provided', () => {
      const wrapper = mount(NavDropdown, {
        props: { label: 'Products', items: mockItems },
        global: { stubs: { 'router-link': true } },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('border-b-2')
      expect(button.classes()).toContain('border-transparent')
      expect(button.classes()).not.toContain('border-ochre')
    })

    it('should have transition classes for smooth indicator animation (AC4)', () => {
      const wrapper = mount(NavDropdown, {
        props: { label: 'Products', items: mockItems },
        global: { stubs: { 'router-link': true } },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('transition-all')
      expect(button.classes()).toContain('duration-200')
    })
  })

  describe('dropdown toggle', () => {
    it('should toggle dropdown open/close on click', async () => {
      const wrapper = mount(NavDropdown, {
        props: { label: 'Products', items: mockItems },
        global: { stubs: { 'router-link': true } },
      })

      expect(wrapper.find('[class*="absolute"]').exists()).toBe(false)

      await wrapper.find('button').trigger('click')
      expect(wrapper.find('[class*="absolute"]').exists()).toBe(true)

      await wrapper.find('button').trigger('click')
      expect(wrapper.find('[class*="absolute"]').exists()).toBe(false)
    })
  })

  describe('accessibility', () => {
    it('should have aria-expanded attribute on button', () => {
      const wrapper = mount(NavDropdown, {
        props: { label: 'Products', items: mockItems },
        global: { stubs: { 'router-link': true } },
      })

      const button = wrapper.find('button')
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(button.attributes('aria-haspopup')).toBe('true')
    })

    it('should update aria-expanded when opened', async () => {
      const wrapper = mount(NavDropdown, {
        props: { label: 'Products', items: mockItems },
        global: { stubs: { 'router-link': true } },
      })

      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })
  })
})
