import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfrastructureHighlights from '../InfrastructureHighlights.vue'

describe('InfrastructureHighlights', () => {
  const mountComponent = () => {
    return mount(InfrastructureHighlights)
  }

  describe('rendering', () => {
    it('should render 4 highlight items', () => {
      const wrapper = mountComponent()
      const items = wrapper.findAll('li')
      expect(items).toHaveLength(4)
    })

    it('should render each item with a title', () => {
      const wrapper = mountComponent()
      const titles = wrapper.findAll('h4')
      expect(titles).toHaveLength(4)
      titles.forEach((title) => {
        expect(title.text().length).toBeGreaterThan(0)
      })
    })

    it('should render each item with a description', () => {
      const wrapper = mountComponent()
      const descriptions = wrapper.findAll('p')
      expect(descriptions).toHaveLength(4)
      descriptions.forEach((desc) => {
        expect(desc.text().length).toBeGreaterThan(0)
      })
    })

    it('should render an SVG icon in each item', () => {
      const wrapper = mountComponent()
      const items = wrapper.findAll('li')
      items.forEach((item) => {
        const svg = item.find('svg')
        expect(svg.exists()).toBe(true)
        expect(svg.find('path').exists()).toBe(true)
      })
    })

    it('should render the section heading', () => {
      const wrapper = mountComponent()
      const heading = wrapper.find('h3')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toContain('基础设施')
    })
  })

  describe('lightweight design', () => {
    it('should NOT use card-sketchy class (lightweight items)', () => {
      const wrapper = mountComponent()
      const sketchyElements = wrapper.findAll('.card-sketchy')
      expect(sketchyElements).toHaveLength(0)
    })

    it('should use icon-container class for lightweight icon styling', () => {
      const wrapper = mountComponent()
      const iconContainers = wrapper.findAll('.icon-container')
      expect(iconContainers).toHaveLength(4)
    })
  })

  describe('accessibility', () => {
    it('should use ul/li semantic list structure', () => {
      const wrapper = mountComponent()
      const ul = wrapper.find('ul')
      expect(ul.exists()).toBe(true)
      const lis = ul.findAll('li')
      expect(lis).toHaveLength(4)
    })

    it('should have aria-label on the region', () => {
      const wrapper = mountComponent()
      const region = wrapper.find('[aria-label="基础设施亮点"]')
      expect(region.exists()).toBe(true)
    })

    it('should have role="region" on the container', () => {
      const wrapper = mountComponent()
      const region = wrapper.find('[role="region"]')
      expect(region.exists()).toBe(true)
    })

    it('should mark SVG icons as aria-hidden', () => {
      const wrapper = mountComponent()
      const svgs = wrapper.findAll('li svg')
      svgs.forEach((svg) => {
        expect(svg.attributes('aria-hidden')).toBe('true')
      })
    })
  })

  describe('layout', () => {
    it('should use responsive grid classes', () => {
      const wrapper = mountComponent()
      const grid = wrapper.find('ul')
      expect(grid.classes()).toContain('grid')
      expect(grid.classes()).toContain('grid-cols-1')
      expect(grid.classes()).toContain('sm:grid-cols-2')
      expect(grid.classes()).toContain('lg:grid-cols-4')
    })

    it('should use Fibonacci gap spacing', () => {
      const wrapper = mountComponent()
      const grid = wrapper.find('ul')
      expect(grid.classes()).toContain('gap-fib-4')
    })

    it('should apply reveal-fade-up class for scroll animation', () => {
      const wrapper = mountComponent()
      const container = wrapper.find('.reveal-fade-up')
      expect(container.exists()).toBe(true)
    })

    it('should use Fibonacci margin tokens', () => {
      const wrapper = mountComponent()
      const container = wrapper.find('.infrastructure-highlights')
      expect(container.classes()).toContain('mt-fib-5')
      expect(container.classes()).toContain('mb-fib-4')
    })
  })
})
