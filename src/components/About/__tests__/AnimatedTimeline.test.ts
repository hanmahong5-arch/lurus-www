import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnimatedTimeline from '../AnimatedTimeline.vue'

const milestones = [
  { year: '2024', event: 'Company founded' },
  { year: '2025 Q1', event: 'API gateway launched' },
]

describe('AnimatedTimeline', () => {
  it('should render with data-testid', () => {
    const wrapper = mount(AnimatedTimeline, { props: { milestones } })
    expect(wrapper.find('[data-testid="animated-timeline"]').exists()).toBe(true)
  })

  it('should render all milestones', () => {
    const wrapper = mount(AnimatedTimeline, { props: { milestones } })
    const text = wrapper.text()
    expect(text).toContain('2024')
    expect(text).toContain('Company founded')
    expect(text).toContain('2025 Q1')
    expect(text).toContain('API gateway launched')
  })

  it('should render the section heading', () => {
    const wrapper = mount(AnimatedTimeline, { props: { milestones } })
    expect(wrapper.text()).toContain('发展历程')
  })

  it('should render a vertical SVG line', () => {
    const wrapper = mount(AnimatedTimeline, { props: { milestones } })
    expect(wrapper.find('svg line').exists()).toBe(true)
  })
})
