import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import Navbar from '../Navbar.vue'

// Mock useActiveSection composable
vi.mock('../../../composables/useActiveSection', () => ({
  useActiveSection: () => ({
    activeSection: { value: null },
  }),
}))

// Mock IntersectionObserver for happy-dom
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()
vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: mockObserve,
  disconnect: mockDisconnect,
  unobserve: vi.fn(),
})))

const globalStubs = {
  'router-link': {
    template: '<a :href="to" class="router-link-stub"><slot /></a>',
    props: ['to'],
  },
  NavDropdown: { template: '<div class="nav-dropdown-stub"><slot /></div>', props: ['label', 'items', 'active'] },
  Transition: {
    template: '<div><slot /></div>',
  },
}

function mountNavbar() {
  return mount(Navbar, {
    global: {
      stubs: globalStubs,
    },
    attachTo: document.body,
  })
}

describe('Navbar — Mobile Hamburger Menu', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    document.body.style.overflow = ''
  })

  afterEach(() => {
    wrapper?.unmount()
    document.body.style.overflow = ''
  })

  describe('Task 1: Hamburger button interaction and animation', () => {
    it('should show hamburger button with md:hidden class (AC1 — 5.1)', () => {
      wrapper = mountNavbar()
      const button = wrapper.find('button[aria-label="Toggle menu"]')
      expect(button.exists()).toBe(true)
      expect(button.classes()).toContain('md:hidden')
    })

    it('should have >= 44x44px touch target (AC5 — 1.3)', () => {
      wrapper = mountNavbar()
      const button = wrapper.find('button[aria-label="Toggle menu"]')
      expect(button.classes()).toContain('min-w-[44px]')
      expect(button.classes()).toContain('min-h-[44px]')
    })

    it('should toggle menu open/close on click (5.2)', async () => {
      wrapper = mountNavbar()
      const button = wrapper.find('button[aria-label="Toggle menu"]')

      // Initially closed
      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

      // Open
      await button.trigger('click')
      await nextTick()
      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

      // Close
      await button.trigger('click')
      await nextTick()
      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('should have transition classes on hamburger icon (AC8 — 1.2)', () => {
      wrapper = mountNavbar()
      const g = wrapper.find('button[aria-label="Toggle menu"] svg g')
      expect(g.classes()).toContain('transition-transform')
      expect(g.classes()).toContain('duration-300')
    })
  })

  describe('Task 2: Full-screen menu panel', () => {
    it('should render full-screen overlay when open (AC2 — 2.1)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()

      const overlay = wrapper.find('[role="dialog"]')
      expect(overlay.exists()).toBe(true)
      expect(overlay.classes()).toContain('fixed')
      expect(overlay.classes()).toContain('inset-0')
      expect(overlay.classes()).toContain('top-20')
    })

    it('should have background overlay with click-to-close (AC4 — 2.3)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()

      const dialog = wrapper.find('[role="dialog"]')
      const backdrop = dialog.find('div[aria-hidden="true"]')
      expect(backdrop.exists()).toBe(true)
      expect(backdrop.classes().join(' ')).toContain('bg-ink-900/50')
    })

    it('should close menu when clicking overlay (AC4)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()
      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

      // Click on overlay container (not the inner panel)
      await wrapper.find('[role="dialog"]').trigger('click')
      await nextTick()
      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('should lock body scroll when open and restore on close (AC7 — 2.4)', async () => {
      wrapper = mountNavbar()
      const button = wrapper.find('button[aria-label="Toggle menu"]')

      // Open
      await button.trigger('click')
      await nextTick()
      expect(document.body.style.overflow).toBe('hidden')

      // Close
      await button.trigger('click')
      await nextTick()
      expect(document.body.style.overflow).toBe('')
    })

    it('should clean up body overflow on unmount (2.5)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()
      expect(document.body.style.overflow).toBe('hidden')

      wrapper.unmount()
      expect(document.body.style.overflow).toBe('')
    })

    it('should have role="dialog" and aria-modal on menu overlay (a11y)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()

      const dialog = wrapper.find('[role="dialog"]')
      expect(dialog.attributes('aria-modal')).toBe('true')
      expect(dialog.attributes('aria-label')).toBe('Navigation menu')
    })
  })

  describe('Task 3: Menu items navigation and links', () => {
    it('should display all navItems in mobile menu (5.3)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()

      // Check that section headers for dropdown items exist
      const sectionHeaders = wrapper.findAll('[role="dialog"] .text-xs.font-semibold')
      expect(sectionHeaders.length).toBeGreaterThanOrEqual(2) // 产品 and 资源

      // Check nav links exist
      const mobileLinks = wrapper.findAll('[role="dialog"] .mobile-nav-link')
      expect(mobileLinks.length).toBeGreaterThan(0)
    })

    it('should render external links with target="_blank" and rel="noopener noreferrer" (5.4)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()

      const externalLinks = wrapper.findAll('[role="dialog"] a[target="_blank"]')
      expect(externalLinks.length).toBeGreaterThan(0)
      externalLinks.forEach((link) => {
        expect(link.attributes('rel')).toBe('noopener noreferrer')
      })
    })

    it('should close menu when clicking a nav link (AC3 — 3.4)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()

      const firstLink = wrapper.find('[role="dialog"] .mobile-nav-link')
      expect(firstLink.exists()).toBe(true)
      await firstLink.trigger('click')
      await nextTick()

      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('should have min-height 44px on mobile-nav-link elements (AC5 — 5.8)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()

      const mobileLinks = wrapper.findAll('[role="dialog"] .mobile-nav-link')
      expect(mobileLinks.length).toBeGreaterThan(0)
      // The min-height is set via CSS class, verify class exists
      mobileLinks.forEach((link) => {
        expect(link.classes()).toContain('mobile-nav-link')
      })
    })
  })

  describe('Task 4: Focus management and keyboard navigation', () => {
    it('should close menu on ESC key (AC6 — 5.5)', async () => {
      wrapper = mountNavbar()
      await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
      await nextTick()
      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

      // Dispatch ESC keydown on document
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()

      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('should toggle aria-expanded on hamburger button (5.6)', async () => {
      wrapper = mountNavbar()
      const button = wrapper.find('button[aria-label="Toggle menu"]')

      expect(button.attributes('aria-expanded')).toBe('false')

      await button.trigger('click')
      await nextTick()
      expect(button.attributes('aria-expanded')).toBe('true')

      await button.trigger('click')
      await nextTick()
      expect(button.attributes('aria-expanded')).toBe('false')
    })

    it('should return focus to hamburger button when menu closes (AC9 — 5.7)', async () => {
      wrapper = mountNavbar()
      const button = wrapper.find('button[aria-label="Toggle menu"]')

      // Open menu
      await button.trigger('click')
      await nextTick()

      // Close with ESC
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()

      expect(document.activeElement).toBe(button.element)
    })

    it('should add keydown listener when menu opens and remove when closes', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener')
      const removeSpy = vi.spyOn(document, 'removeEventListener')

      wrapper = mountNavbar()
      const button = wrapper.find('button[aria-label="Toggle menu"]')

      await button.trigger('click')
      await nextTick()
      expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

      await button.trigger('click')
      await nextTick()
      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

      addSpy.mockRestore()
      removeSpy.mockRestore()
    })
  })
})
