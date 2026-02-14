import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeShowcase from '../CodeShowcase.vue'

// Mock clipboard utility
vi.mock('@/utils/clipboard', () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}))

import { copyToClipboard } from '@/utils/clipboard'

const defaultProps = {
  code: 'curl https://api.lurus.cn/v1/models',
  language: 'bash',
  ariaLabel: 'API request example',
}

describe('CodeShowcase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering and props', () => {
    it('should render code content', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      expect(wrapper.find('code').text()).toContain('curl')
      expect(wrapper.find('code').text()).toContain('https://api.lurus.cn/v1/models')
    })

    it('should display language label', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      expect(wrapper.find('.code-language').text()).toBe('bash')
    })

    it('should pass ariaLabel to code element', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      const code = wrapper.find('code')
      expect(code.attributes('aria-label')).toBe('API request example')
    })

    it('should pass ariaLabel to region container', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      const region = wrapper.find('[role="region"]')
      expect(region.attributes('aria-label')).toBe('API request example')
    })
  })

  describe('syntax highlighting tokens', () => {
    it('should highlight curl keyword with token-keyword class', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      const keywordSpans = wrapper.findAll('.token-keyword')
      const curlToken = keywordSpans.find(span => span.text() === 'curl')
      expect(curlToken).toBeTruthy()
    })

    it('should highlight URL with token-url class', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      const urlSpans = wrapper.findAll('.token-url')
      expect(urlSpans.length).toBeGreaterThan(0)
      expect(urlSpans[0].text()).toContain('https://api.lurus.cn')
    })

    it('should highlight strings with token-string class', () => {
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          code: 'curl -H "Content-Type: application/json" https://api.lurus.cn/v1/models',
        },
      })

      const stringSpans = wrapper.findAll('.token-string')
      expect(stringSpans.length).toBeGreaterThan(0)
    })

    it('should highlight flags with token-flag class', () => {
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          code: 'curl -H "Authorization: Bearer token" https://api.lurus.cn/v1/models',
        },
      })

      const flagSpans = wrapper.findAll('.token-flag')
      expect(flagSpans.length).toBeGreaterThan(0)
    })

    it('should tokenize JSON with proper token types', () => {
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          language: 'json',
          code: '{"key": "value"}',
        },
      })

      // JSON tokenizer splits into key, string, and structural tokens
      const keySpans = wrapper.findAll('.token-key')
      expect(keySpans.length).toBeGreaterThan(0)
      const stringSpans = wrapper.findAll('.token-string')
      expect(stringSpans.length).toBeGreaterThan(0)
      expect(wrapper.find('code').text()).toContain('key')
      expect(wrapper.find('code').text()).toContain('value')
    })

    it('should render unsupported languages as plain text', () => {
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          language: 'python',
          code: 'print(42)',
        },
      })

      const plainSpans = wrapper.findAll('.token-plain')
      expect(plainSpans.length).toBe(1)
      expect(plainSpans[0].text()).toBe('print(42)')
    })

    it('should highlight JSON numbers with token-number class', () => {
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          language: 'json',
          code: '{"count": 42}',
        },
      })

      const numberSpans = wrapper.findAll('.token-number')
      expect(numberSpans.length).toBeGreaterThan(0)
      const has42 = numberSpans.some(s => s.text() === '42')
      expect(has42).toBe(true)
    })

    it('should highlight JSON booleans with token-boolean class', () => {
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          language: 'json',
          code: '{"active": true}',
        },
      })

      const boolSpans = wrapper.findAll('.token-boolean')
      expect(boolSpans.length).toBeGreaterThan(0)
      const hasTrue = boolSpans.some(s => s.text() === 'true')
      expect(hasTrue).toBe(true)
    })

    it('should highlight JSON null with token-null class', () => {
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          language: 'json',
          code: '{"data": null}',
        },
      })

      const nullSpans = wrapper.findAll('.token-null')
      expect(nullSpans.length).toBeGreaterThan(0)
      const hasNull = nullSpans.some(s => s.text() === 'null')
      expect(hasNull).toBe(true)
    })
  })


  describe('copy functionality', () => {
    it('should call copyToClipboard when copy button is clicked', async () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      const copyBtn = wrapper.find('.copy-btn')
      await copyBtn.trigger('click')

      expect(copyToClipboard).toHaveBeenCalledWith(defaultProps.code)
    })

    it('should show "已复制" after successful copy', async () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      const copyBtn = wrapper.find('.copy-btn')
      await copyBtn.trigger('click')

      // Wait for async copyToClipboard to resolve
      await vi.dynamicImportSettled()

      expect(wrapper.find('.copy-label').text()).toBe('已复制')
    })

    it('should show "复制" in default state', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      expect(wrapper.find('.copy-label').text()).toBe('复制')
    })
  })

  describe('showAuthTag prop', () => {
    it('should not show auth tag by default', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      expect(wrapper.find('.auth-tag').exists()).toBe(false)
    })

    it('should show auth tag when showAuthTag is true', () => {
      const wrapper = mount(CodeShowcase, {
        props: { ...defaultProps, showAuthTag: true },
      })

      const authTag = wrapper.find('.auth-tag')
      expect(authTag.exists()).toBe(true)
      expect(authTag.text()).toBe('需 API Key')
    })

    it('should hide auth tag when showAuthTag is false', () => {
      const wrapper = mount(CodeShowcase, {
        props: { ...defaultProps, showAuthTag: false },
      })

      expect(wrapper.find('.auth-tag').exists()).toBe(false)
    })
  })

  describe('showLineNumbers prop', () => {
    it('should not show line numbers by default', () => {
      const wrapper = mount(CodeShowcase, { props: defaultProps })

      expect(wrapper.findAll('.line-number').length).toBe(0)
    })

    it('should show line numbers when showLineNumbers is true', () => {
      const multiLineCode = 'line1\nline2\nline3'
      const wrapper = mount(CodeShowcase, {
        props: {
          ...defaultProps,
          code: multiLineCode,
          showLineNumbers: true,
        },
      })

      const lineNumbers = wrapper.findAll('.line-number')
      expect(lineNumbers.length).toBe(3)
      expect(lineNumbers[0].text()).toBe('1')
      expect(lineNumbers[1].text()).toBe('2')
      expect(lineNumbers[2].text()).toBe('3')
    })
  })
})
