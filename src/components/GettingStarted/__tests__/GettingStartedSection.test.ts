import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GettingStartedSection from '../GettingStartedSection.vue'
import { gettingStartedItems } from '../../../data/gettingStarted'

describe('GettingStartedSection', () => {
  const mountComponent = () => {
    return mount(GettingStartedSection)
  }

  describe('section structure', () => {
    it('should render a section element', () => {
      const wrapper = mountComponent()
      const section = wrapper.find('section')
      expect(section.exists()).toBe(true)
    })

    it('should have aria-label for accessibility', () => {
      const wrapper = mountComponent()
      const section = wrapper.find('section')
      expect(section.attributes('aria-label')).toBeTruthy()
    })

    it('should have a heading with "开始使用 Lurus"', () => {
      const wrapper = mountComponent()
      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toContain('开始使用 Lurus')
    })
  })

  describe('link buttons', () => {
    it('should render exactly 3 link buttons', () => {
      const wrapper = mountComponent()
      const links = wrapper.findAll('[data-testid="getting-started-item"]')
      expect(links).toHaveLength(3)
    })

    it('should display the label for each item', () => {
      const wrapper = mountComponent()
      gettingStartedItems.forEach((item) => {
        expect(wrapper.text()).toContain(item.label)
      })
    })

    it('should display the description for each item', () => {
      const wrapper = mountComponent()
      gettingStartedItems.forEach((item) => {
        expect(wrapper.text()).toContain(item.description)
      })
    })

    it('should have correct href for each link', () => {
      const wrapper = mountComponent()
      const links = wrapper.findAll('[data-testid="getting-started-item"]')
      links.forEach((link, index) => {
        expect(link.attributes('href')).toBe(gettingStartedItems[index].href)
      })
    })

    it('should have aria-label for each link', () => {
      const wrapper = mountComponent()
      const links = wrapper.findAll('[data-testid="getting-started-item"]')
      links.forEach((link, index) => {
        expect(link.attributes('aria-label')).toBe(gettingStartedItems[index].ariaLabel)
      })
    })
  })

  describe('external links', () => {
    it('should open external links in new tab', () => {
      const wrapper = mountComponent()
      const links = wrapper.findAll('[data-testid="getting-started-item"]')
      links.forEach((link, index) => {
        const item = gettingStartedItems[index]
        if (item.external) {
          expect(link.attributes('target')).toBe('_blank')
          expect(link.attributes('rel')).toContain('noopener')
          expect(link.attributes('rel')).toContain('noreferrer')
        }
      })
    })

    it('should NOT set target="_blank" on internal links', () => {
      const wrapper = mountComponent()
      const links = wrapper.findAll('[data-testid="getting-started-item"]')
      links.forEach((link, index) => {
        const item = gettingStartedItems[index]
        if (!item.external) {
          expect(link.attributes('target')).toBeUndefined()
        }
      })
    })
  })

  describe('icons', () => {
    it('should render an SVG icon for each item', () => {
      const wrapper = mountComponent()
      const items = wrapper.findAll('[data-testid="getting-started-item"]')
      items.forEach((item) => {
        const svg = item.find('svg')
        expect(svg.exists()).toBe(true)
      })
    })
  })

  describe('layout and styling', () => {
    it('should have centered layout', () => {
      const wrapper = mountComponent()
      const container = wrapper.find('.getting-started-container')
      expect(container.exists()).toBe(true)
    })

    it('should have reveal-fade-up animation class', () => {
      const wrapper = mountComponent()
      const revealElements = wrapper.findAll('.reveal-fade-up')
      expect(revealElements.length).toBeGreaterThan(0)
    })

    it('should use section padding classes', () => {
      const wrapper = mountComponent()
      const section = wrapper.find('section')
      expect(section.classes()).toContain('py-fib-7')
    })
  })
})
