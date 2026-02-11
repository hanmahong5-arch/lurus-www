import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FinalCTA from '../FinalCTA.vue'
import PrimaryButton from '../PrimaryButton.vue'
import SecondaryButton from '../SecondaryButton.vue'

describe('FinalCTA', () => {
  it('renders the brand tagline text correctly', () => {
    const wrapper = mount(FinalCTA)
    const tagline = wrapper.find('h2')
    expect(tagline.text()).toBe('全栈自建，匠心品质。')
  })

  it('applies Caveat font class (font-hand) to tagline', () => {
    const wrapper = mount(FinalCTA)
    const tagline = wrapper.find('h2')
    expect(tagline.classes()).toContain('font-hand')
  })

  it('applies phi-2xl size class to tagline', () => {
    const wrapper = mount(FinalCTA)
    const tagline = wrapper.find('h2')
    expect(tagline.classes()).toContain('text-phi-2xl')
  })

  it('renders PrimaryButton with correct props', () => {
    const wrapper = mount(FinalCTA)
    const primaryButton = wrapper.findComponent(PrimaryButton)
    expect(primaryButton.exists()).toBe(true)
    expect(primaryButton.props('text')).toBe('获取 API Key')
    expect(primaryButton.props('href')).toBe('https://api.lurus.cn')
    expect(primaryButton.props('target')).toBe('_blank')
    expect(primaryButton.props('ariaLabel')).toBe('跳转到 API Key 注册页面')
  })

  it('renders SecondaryButton with correct props', () => {
    const wrapper = mount(FinalCTA)
    const secondaryButton = wrapper.findComponent(SecondaryButton)
    expect(secondaryButton.exists()).toBe(true)
    expect(secondaryButton.props('text')).toBe('联系我们')
    expect(secondaryButton.props('href')).toBe('https://lurus.cn/contact')
    expect(secondaryButton.props('ariaLabel')).toBe('跳转到联系我们页面')
  })

  it('renders section tag with aria-label attribute', () => {
    const wrapper = mount(FinalCTA)
    const section = wrapper.find('section')
    expect(section.exists()).toBe(true)
    expect(section.attributes('aria-label')).toBe('行动号召')
  })

  it('applies responsive CSS classes (flex-col, sm:flex-row)', () => {
    const wrapper = mount(FinalCTA)
    const buttonContainer = wrapper.find('.flex')
    expect(buttonContainer.classes()).toContain('flex-col')
    expect(buttonContainer.classes()).toContain('sm:flex-row')
  })

  it('applies vertical padding py-fib-7 to section', () => {
    const wrapper = mount(FinalCTA)
    const section = wrapper.find('section')
    expect(section.classes()).toContain('py-fib-7')
  })

  it('applies centered layout classes (max-w-4xl, mx-auto, text-center)', () => {
    const wrapper = mount(FinalCTA)
    const container = wrapper.find('.max-w-4xl')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('mx-auto')
    expect(container.classes()).toContain('text-center')
  })
})
