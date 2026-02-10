import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SecondaryButton from '../SecondaryButton.vue'

describe('SecondaryButton', () => {
  it('renders with required props', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'View Docs',
        href: 'https://docs.example.com',
        ariaLabel: 'Navigate to documentation'
      }
    })

    expect(wrapper.text()).toBe('View Docs')
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('passes href and target props to anchor element', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'Contact Us',
        href: 'https://contact.example.com',
        target: '_blank',
        ariaLabel: 'Open contact page in new tab'
      }
    })

    const anchor = wrapper.find('a')
    expect(anchor.attributes('href')).toBe('https://contact.example.com')
    expect(anchor.attributes('target')).toBe('_blank')
  })

  it('passes ariaLabel to anchor element', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'Learn More',
        href: '/learn',
        ariaLabel: 'Navigate to learning resources'
      }
    })

    expect(wrapper.find('a').attributes('aria-label')).toBe('Navigate to learning resources')
  })

  it('applies secondary button styles', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'Button',
        href: '/path',
        ariaLabel: 'Button'
      }
    })

    const anchor = wrapper.find('a')
    expect(anchor.classes()).toContain('secondary-button')
  })

  it('has correct CSS classes for secondary styling', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'Test',
        href: '#',
        ariaLabel: 'Test button'
      }
    })

    const anchor = wrapper.find('a')
    // Check that secondary-button class exists (actual styles are in scoped CSS)
    expect(anchor.classes()).toContain('secondary-button')
  })

  it('adds rel="noopener noreferrer" when target="_blank"', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'External Link',
        href: 'https://external.com',
        target: '_blank',
        ariaLabel: 'Open external site'
      }
    })

    expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
  })

  it('does not add rel attribute when target is not "_blank"', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'Internal Link',
        href: '/internal',
        ariaLabel: 'Navigate internally'
      }
    })

    expect(wrapper.find('a').attributes('rel')).toBeUndefined()
  })

  it('defaults target to "_self" when not specified', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: 'Default Target',
        href: '/page',
        ariaLabel: 'Navigate to page'
      }
    })

    expect(wrapper.find('a').attributes('target')).toBe('_self')
  })
})
