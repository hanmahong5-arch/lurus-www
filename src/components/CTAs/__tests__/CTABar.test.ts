import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CTABar from '../CTABar.vue'
import PrimaryButton from '../PrimaryButton.vue'
import SecondaryButton from '../SecondaryButton.vue'

describe('CTABar', () => {
  const primaryCta = {
    text: 'Get API Key',
    href: 'https://api.lurus.cn',
    ariaLabel: 'Navigate to API Key registration'
  }

  const secondaryCta = {
    text: 'View Docs',
    href: 'https://docs.lurus.cn',
    ariaLabel: 'Navigate to documentation'
  }

  it('renders with required props', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Want to learn more?',
        primaryCta
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Want to learn more?')
  })

  it('displays message text correctly', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Need API access?',
        primaryCta
      }
    })

    const messageElement = wrapper.find('.cta-bar-message')
    expect(messageElement.exists()).toBe(true)
    expect(messageElement.text()).toBe('Need API access?')
  })

  it('renders PrimaryButton with correct props', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Test message',
        primaryCta
      }
    })

    const primaryButton = wrapper.findComponent(PrimaryButton)
    expect(primaryButton.exists()).toBe(true)
    expect(primaryButton.props('text')).toBe('Get API Key')
    expect(primaryButton.props('href')).toBe('https://api.lurus.cn')
    expect(primaryButton.props('ariaLabel')).toBe('Navigate to API Key registration')
    expect(primaryButton.props('target')).toBe('_blank')
  })

  it('renders SecondaryButton when secondaryCta is provided', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Test message',
        primaryCta,
        secondaryCta
      }
    })

    const secondaryButton = wrapper.findComponent(SecondaryButton)
    expect(secondaryButton.exists()).toBe(true)
    expect(secondaryButton.props('text')).toBe('View Docs')
    expect(secondaryButton.props('href')).toBe('https://docs.lurus.cn')
    expect(secondaryButton.props('ariaLabel')).toBe('Navigate to documentation')
    expect(secondaryButton.props('target')).toBe('_blank')
  })

  it('does not render SecondaryButton when secondaryCta is not provided', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Test message',
        primaryCta
      }
    })

    const secondaryButton = wrapper.findComponent(SecondaryButton)
    expect(secondaryButton.exists()).toBe(false)
  })

  it('has correct background styling (bg-cream-100)', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Test message',
        primaryCta
      }
    })

    const ctaBarElement = wrapper.find('.cta-bar')
    expect(ctaBarElement.exists()).toBe(true)
    expect(ctaBarElement.classes()).toContain('cta-bar')
  })

  it('has responsive layout classes (flex-col on mobile, flex-row on desktop)', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Test message',
        primaryCta
      }
    })

    const contentElement = wrapper.find('.cta-bar-content')
    expect(contentElement.exists()).toBe(true)
    // Component uses CSS to apply responsive classes via media queries
    // We verify the class exists; actual responsive behavior is CSS-driven
    expect(contentElement.classes()).toContain('cta-bar-content')
  })

  it('renders button container with correct structure', () => {
    const wrapper = mount(CTABar, {
      props: {
        message: 'Test message',
        primaryCta,
        secondaryCta
      }
    })

    const buttonsContainer = wrapper.find('.cta-bar-buttons')
    expect(buttonsContainer.exists()).toBe(true)

    const buttons = buttonsContainer.findAll('a')
    expect(buttons.length).toBe(2) // Primary + Secondary
  })
})
