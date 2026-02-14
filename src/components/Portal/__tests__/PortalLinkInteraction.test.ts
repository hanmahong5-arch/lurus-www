import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import PortalLinks from '../PortalLinks.vue'
import { portalCategories } from '../../../data/portalLinks'

// Mock useTracking composable
const trackMock = vi.fn()
vi.mock('../../../composables/useTracking', () => ({
  useTracking: () => ({
    track: trackMock,
  }),
}))

describe('PortalLinks - Link Interaction (Story 7.2)', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    trackMock.mockClear()
    wrapper = mount(PortalLinks)
  })

  describe('external link attributes', () => {
    it('should have correct href matching portalLinks data for each link', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      // In collapsed mode, 6 categories x 4 preview links = 24
      expect(links.length).toBe(24)

      // Verify first category's first link matches data
      const firstCategory = portalCategories[0]
      const firstLink = links[0]
      expect(firstLink.attributes('href')).toBe(firstCategory.links[0].url)
    })

    it('should open every link in a new tab via target="_blank"', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      for (const link of links) {
        expect(link.attributes('target')).toBe('_blank')
      }
    })

    it('should have rel="noopener noreferrer" on every external link', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      for (const link of links) {
        const rel = link.attributes('rel')
        expect(rel).toContain('noopener')
        expect(rel).toContain('noreferrer')
      }
    })
  })

  describe('link content and tooltip', () => {
    it('should display link name text matching the data source', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      const firstCategory = portalCategories[0]
      // First link should show the name from data
      expect(links[0].text()).toContain(firstCategory.links[0].name)
    })

    it('should have a title attribute with description for tooltip', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      const firstCategory = portalCategories[0]
      expect(links[0].attributes('title')).toBe(firstCategory.links[0].desc)
    })

    it('should have title attributes on all rendered links', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      for (const link of links) {
        expect(link.attributes('title')).toBeTruthy()
      }
    })
  })

  describe('external link icon', () => {
    it('should contain an SVG icon inside each portal link', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      for (const link of links) {
        const svg = link.find('svg')
        expect(svg.exists()).toBe(true)
      }
    })

    it('should have aria-hidden="true" on the external link icon', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      for (const link of links) {
        const svg = link.find('svg')
        expect(svg.attributes('aria-hidden')).toBe('true')
      }
    })

    it('should have opacity-0 class on icon for hover reveal', () => {
      const firstLink = wrapper.find('a.portal-link-btn')
      const svg = firstLink.find('svg')
      expect(svg.classes()).toContain('opacity-0')
    })
  })

  describe('tracking', () => {
    it('should call track with portal_link_click event on link click', async () => {
      const firstLink = wrapper.find('a.portal-link-btn')
      await firstLink.trigger('click')

      expect(trackMock).toHaveBeenCalledTimes(1)
      expect(trackMock).toHaveBeenCalledWith(
        'portal_link_click',
        expect.objectContaining({
          link_name: portalCategories[0].links[0].name,
          link_category: portalCategories[0].id,
        })
      )
    })

    it('should include correct category and link name in tracking payload', async () => {
      // Expand to see all links
      const toggle = wrapper.find('[data-testid="portal-expand-toggle"]')
      await toggle.trigger('click')

      // Click a link in the second category (finance)
      const allLinks = wrapper.findAll('a.portal-link-btn')
      // First 8 links are academic, next 8 are finance
      const financeFirstLink = allLinks[8]
      await financeFirstLink.trigger('click')

      expect(trackMock).toHaveBeenCalledWith(
        'portal_link_click',
        expect.objectContaining({
          link_name: portalCategories[1].links[0].name,
          link_category: portalCategories[1].id,
        })
      )
    })
  })

  describe('data source verification', () => {
    it('should render links from portalLinks.ts data file', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      // All rendered hrefs should exist in the data source
      const allDataUrls = portalCategories.flatMap(c => c.links.map(l => l.url))
      for (const link of links) {
        expect(allDataUrls).toContain(link.attributes('href'))
      }
    })

    it('should match link names from portalLinks.ts data file', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      const allDataNames = portalCategories.flatMap(c => c.links.map(l => l.name))
      for (const link of links) {
        // The link text contains the name (plus icon, so use toContain)
        const linkTextContent = link.find('span')
        expect(linkTextContent.exists()).toBe(true)
        expect(allDataNames).toContain(linkTextContent.text())
      }
    })
  })

  describe('hover feedback styles', () => {
    it('should have portal-link-btn class for CSS hover styles', () => {
      const links = wrapper.findAll('a.portal-link-btn')
      expect(links.length).toBeGreaterThan(0)
      // All links have portal-link-btn class (verified by selector)
    })

    it('should have category-specific color class for hover tint', () => {
      // Check first category's links have the right color class
      const categoryCards = wrapper.findAll('[data-testid="portal-category-card"]')
      const firstCategoryLinks = categoryCards[0].findAll('a.portal-link-btn')
      for (const link of firstCategoryLinks) {
        expect(link.classes()).toContain(portalCategories[0].colorClass)
      }
    })

    it('should apply group class for group-hover icon reveal', () => {
      const firstLink = wrapper.find('a.portal-link-btn')
      expect(firstLink.classes()).toContain('group')
    })
  })
})
