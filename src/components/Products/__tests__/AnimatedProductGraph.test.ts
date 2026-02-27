import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnimatedProductGraph from '../AnimatedProductGraph.vue'

const mockProducts = [
  { id: 'api', name: 'API', bgColor: '#6B8BA4' },
  { id: 'gushen', name: 'GuShen', bgColor: '#7D8B6A' },
  { id: 'webmail', name: 'Mail', bgColor: '#8B6B7D' },
  { id: 'switch', name: 'Switch', bgColor: '#C67B5C' },
] as any[]

describe('AnimatedProductGraph', () => {
  it('should render with data-testid', () => {
    const wrapper = mount(AnimatedProductGraph, { props: { products: mockProducts } })
    expect(wrapper.find('[data-testid="animated-product-graph"]').exists()).toBe(true)
  })

  it('should render an SVG', () => {
    const wrapper = mount(AnimatedProductGraph, { props: { products: mockProducts } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should be aria-hidden for decorative purpose', () => {
    const wrapper = mount(AnimatedProductGraph, { props: { products: mockProducts } })
    expect(wrapper.find('[data-testid="animated-product-graph"]').attributes('aria-hidden')).toBe('true')
  })

  it('should render center Lurus label', () => {
    const wrapper = mount(AnimatedProductGraph, { props: { products: mockProducts } })
    expect(wrapper.text()).toContain('Lurus')
  })
})
