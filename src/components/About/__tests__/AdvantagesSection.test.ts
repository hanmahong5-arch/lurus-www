import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AdvantagesSection from '../AdvantagesSection.vue'

describe('AdvantagesSection', () => {
  it('should render with data-testid', () => {
    const wrapper = mount(AdvantagesSection)
    expect(wrapper.find('[data-testid="advantages-section"]').exists()).toBe(true)
  })

  it('should display section heading', () => {
    const wrapper = mount(AdvantagesSection)
    expect(wrapper.text()).toContain('我们的优势')
  })

  it('should render 4 advantage cards', () => {
    const wrapper = mount(AdvantagesSection)
    const text = wrapper.text()
    expect(text).toContain('企业级可靠性')
    expect(text).toContain('统一接入')
    expect(text).toContain('全面可观测')
    expect(text).toContain('安全优先')
  })

  it('should include EcosystemGraph', () => {
    const wrapper = mount(AdvantagesSection)
    expect(wrapper.find('[data-testid="ecosystem-graph"]').exists()).toBe(true)
  })
})
