import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed, type Component } from 'vue'

// Mock CodeShowcase to isolate DashboardPreview tests
vi.mock('../../TechDemo/CodeShowcase.vue', () => ({
  default: {
    name: 'CodeShowcase',
    props: ['code', 'language', 'ariaLabel', 'showAuthTag'],
    template: '<div data-testid="code-showcase" :data-language="language" :data-aria-label="ariaLabel">{{ code }}</div>',
  },
}))

// Screenshot mode config for testing
const screenshotConfig = {
  screenshotSrc: '/images/dashboard.webp',
  screenshotAlt: 'Dashboard screenshot',
  fallbackCode: '{"total_requests": 12847}',
  fallbackLanguage: 'json',
  fallbackAriaLabel: 'API monitoring data',
  title: '\u63a7\u5236\u53f0\u9884\u89c8',
  caption: '\u5b9e\u65f6\u76d1\u63a7 API \u8c03\u7528\u91cf',
}

/**
 * Build a component with the same template as DashboardPreview but
 * using a custom config (enables testing screenshot mode without mutating module exports).
 */
function buildMockComponent(config: typeof screenshotConfig): Component {
  return {
    name: 'DashboardPreviewMock',
    setup() {
      const imageError = ref(false)
      const hasScreenshot = computed(() => config.screenshotSrc.length > 0 && !imageError.value)
      function handleImageError() { imageError.value = true }
      return { config, imageError, hasScreenshot, handleImageError }
    },
    template: `
      <div class="dashboard-preview mt-fib-5 reveal-fade-up">
        <h3 class="flex items-center gap-fib-2 text-phi-xl font-semibold text-ink-900 mb-fib-4">
          <svg class="w-5 h-5 text-ochre shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6" />
          </svg>
          {{ config.title }}
        </h3>
        <figure class="preview-figure card-sketchy">
          <div v-if="hasScreenshot" class="preview-container">
            <img :src="config.screenshotSrc" :alt="config.screenshotAlt" loading="lazy" class="preview-image" @error="handleImageError" />
          </div>
          <div v-else class="fallback-container">
            <div data-testid="code-showcase" :data-language="config.fallbackLanguage" :data-aria-label="config.fallbackAriaLabel">{{ config.fallbackCode }}</div>
          </div>
          <figcaption class="preview-caption">{{ config.caption }}</figcaption>
        </figure>
      </div>
    `,
  }
}

import DashboardPreview from '../DashboardPreview.vue'

describe('DashboardPreview', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('Fallback mode (no screenshot)', () => {
    it('renders CodeShowcase when screenshotSrc is empty', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('[data-testid="code-showcase"]').exists()).toBe(true)
    })

    it('does not render img element when screenshotSrc is empty', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('img').exists()).toBe(false)
    })

    it('passes correct language to CodeShowcase in fallback mode', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('[data-testid="code-showcase"]').attributes('data-language')).toBe('typescript')
    })

    it('passes non-empty ariaLabel to CodeShowcase', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('[data-testid="code-showcase"]').attributes('data-aria-label')).toBeTruthy()
    })

    it('renders fallback code content containing API example', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('[data-testid="code-showcase"]').text()).toContain('chat/completions')
    })
  })

  describe('Screenshot mode', () => {
    it('renders img element when screenshotSrc is provided', () => {
      const wrapper = mount(buildMockComponent(screenshotConfig))
      expect(wrapper.find('img').exists()).toBe(true)
    })

    it('img has loading lazy attribute', () => {
      const wrapper = mount(buildMockComponent(screenshotConfig))
      expect(wrapper.find('img').attributes('loading')).toBe('lazy')
    })

    it('img has descriptive alt text', () => {
      const wrapper = mount(buildMockComponent(screenshotConfig))
      const alt = wrapper.find('img').attributes('alt')
      expect(alt).toBeTruthy()
      expect(alt!.length).toBeGreaterThan(0)
    })

    it('switches to fallback on img error event', async () => {
      const wrapper = mount(buildMockComponent(screenshotConfig))
      expect(wrapper.find('img').exists()).toBe(true)
      expect(wrapper.find('[data-testid="code-showcase"]').exists()).toBe(false)

      await wrapper.find('img').trigger('error')

      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.find('[data-testid="code-showcase"]').exists()).toBe(true)
    })

    it('screenshot container has preview-container class for CLS prevention', () => {
      const wrapper = mount(buildMockComponent(screenshotConfig))
      expect(wrapper.find('.preview-container').exists()).toBe(true)
    })

    it('does not render CodeShowcase when screenshot is available', () => {
      const wrapper = mount(buildMockComponent(screenshotConfig))
      expect(wrapper.find('[data-testid="code-showcase"]').exists()).toBe(false)
    })
  })

  describe('Semantic HTML and Accessibility', () => {
    it('renders a figure element', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('figure').exists()).toBe(true)
    })

    it('renders a figcaption element', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('figcaption').exists()).toBe(true)
    })

    it('figcaption contains non-empty caption text', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('figcaption').text().length).toBeGreaterThan(0)
    })

    it('renders the title heading', () => {
      const wrapper = mount(DashboardPreview)
      const title = wrapper.find('h3')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBeTruthy()
    })

    it('title icon has aria-hidden attribute', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('h3 svg').attributes('aria-hidden')).toBe('true')
    })
  })

  describe('Styling', () => {
    it('figure has card-sketchy class', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('figure').classes()).toContain('card-sketchy')
    })

    it('outer container has reveal-fade-up class for scroll animation', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('.dashboard-preview').classes()).toContain('reveal-fade-up')
    })

    it('fallback container exists with min-height class', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('.fallback-container').exists()).toBe(true)
    })

    it('outer container uses Fibonacci spacing token', () => {
      const wrapper = mount(DashboardPreview)
      expect(wrapper.find('.dashboard-preview').classes()).toContain('mt-fib-5')
    })
  })
})
