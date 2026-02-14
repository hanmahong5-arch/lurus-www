import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import PlatformCapabilities from '../PlatformCapabilities.vue'

// Mock useApiHealth composable to avoid real fetch calls in tests
vi.mock('@/composables/useApiHealth', () => ({
  useApiHealth: () => ({
    status: ref('ready'),
  }),
}))

describe('PlatformCapabilities', () => {
  const mountComponent = () => {
    return mount(PlatformCapabilities, {
      global: {
        stubs: {
          CTABar: true,
          DashboardPreview: true,
          InfrastructureHighlights: true,
          ApiStatusBanner: true,
        },
      },
    })
  }

  describe('rendering', () => {
    it('should render 6 capability cards', () => {
      const wrapper = mountComponent()
      const cards = wrapper.findAll('.card-sketchy')
      expect(cards).toHaveLength(6)
    })

    it('should render each card with title and description', () => {
      const wrapper = mountComponent()
      const cards = wrapper.findAll('.card-sketchy')

      cards.forEach((card) => {
        const title = card.find('h3')
        const description = card.find('p')
        expect(title.exists()).toBe(true)
        expect(title.text().length).toBeGreaterThan(0)
        expect(description.exists()).toBe(true)
        expect(description.text().length).toBeGreaterThan(0)
      })
    })

    it('should render an SVG icon in each card', () => {
      const wrapper = mountComponent()
      const cards = wrapper.findAll('.card-sketchy')

      cards.forEach((card) => {
        const svg = card.find('svg')
        expect(svg.exists()).toBe(true)
        expect(svg.find('path').exists()).toBe(true)
      })
    })

    it('should display the AI Gateway badge', () => {
      const wrapper = mountComponent()
      const badge = wrapper.find('.border-sketchy-light')
      expect(badge.exists()).toBe(true)
      expect(badge.text()).toContain('AI Gateway')
    })

    it('should render section heading', () => {
      const wrapper = mountComponent()
      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toContain('构建与')
      expect(heading.text()).toContain('迭代')
    })

    it('should render section subtitle', () => {
      const wrapper = mountComponent()
      const subtitle = wrapper.find('.text-phi-xl.text-ink-500')
      expect(subtitle.exists()).toBe(true)
      expect(subtitle.text()).toContain('统一 AI 网关')
    })

    it('should include DashboardPreview component', () => {
      const wrapper = mountComponent()
      const dashboardPreview = wrapper.findComponent({ name: 'DashboardPreview' })
      expect(dashboardPreview.exists()).toBe(true)
    })

    it('should include InfrastructureHighlights component', () => {
      const wrapper = mountComponent()
      const infraHighlights = wrapper.findComponent({ name: 'InfrastructureHighlights' })
      expect(infraHighlights.exists()).toBe(true)
    })

    it('should include ApiStatusBanner component', () => {
      const wrapper = mountComponent()
      const banner = wrapper.findComponent({ name: 'ApiStatusBanner' })
      expect(banner.exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('should have section with aria-label', () => {
      const wrapper = mountComponent()
      const section = wrapper.find('section')
      expect(section.attributes('aria-label')).toBe('平台能力')
    })

    it('should have section with id platform', () => {
      const wrapper = mountComponent()
      const section = wrapper.find('section')
      expect(section.attributes('id')).toBe('platform')
    })

    it('should mark decorative SVG icons as aria-hidden', () => {
      const wrapper = mountComponent()
      const cardSvgs = wrapper.findAll('.card-sketchy svg')
      cardSvgs.forEach((svg) => {
        expect(svg.attributes('aria-hidden')).toBe('true')
      })
    })

    it('should mark decorative doodle elements as aria-hidden', () => {
      const wrapper = mountComponent()
      const doodles = wrapper.findAll('.doodle-corner')
      doodles.forEach((doodle) => {
        expect(doodle.attributes('aria-hidden')).toBe('true')
      })
    })

    it('should mark doodle-star as aria-hidden', () => {
      const wrapper = mountComponent()
      const star = wrapper.find('.doodle-star')
      expect(star.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('layout', () => {
    it('should use grid layout with responsive columns', () => {
      const wrapper = mountComponent()
      const outerGrid = wrapper.find('.grid')
      expect(outerGrid.classes()).toContain('grid-cols-1')
      expect(outerGrid.classes()).toContain('lg:grid-cols-12')
      const innerGrid = wrapper.find('.reveal-stagger')
      expect(innerGrid.classes()).toContain('grid-cols-1')
      expect(innerGrid.classes()).toContain('md:grid-cols-2')
    })

    it('should apply reveal-stagger class for scroll animation', () => {
      const wrapper = mountComponent()
      const staggerGrid = wrapper.find('.reveal-stagger')
      expect(staggerGrid.exists()).toBe(true)
      expect(staggerGrid.classes()).toContain('reveal-stagger')
    })

    it('should apply hover-breathe class to capability cards', () => {
      const wrapper = mountComponent()
      const cards = wrapper.findAll('.card-sketchy')
      cards.forEach((card) => {
        expect(card.classes()).toContain('hover-breathe')
      })
    })
  })

  describe('CTABar integration', () => {
    it('should render CTABar component', () => {
      const wrapper = mountComponent()
      const ctaBar = wrapper.findComponent({ name: 'CTABar' })
      expect(ctaBar.exists()).toBe(true)
    })
  })
})
