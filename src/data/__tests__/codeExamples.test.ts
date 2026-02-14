import { describe, it, expect } from 'vitest'
import { codeExamples } from '../codeExamples'

describe('codeExamples data', () => {
  it('should export exactly 2 code examples', () => {
    expect(codeExamples).toHaveLength(2)
  })

  it('should have request as first example', () => {
    expect(codeExamples[0].id).toBe('request')
    expect(codeExamples[0].label).toBe('Request')
    expect(codeExamples[0].language).toBe('bash')
  })

  it('should have response as second example', () => {
    expect(codeExamples[1].id).toBe('response')
    expect(codeExamples[1].label).toBe('Response')
    expect(codeExamples[1].language).toBe('json')
  })

  it('should have showAuthTag true only for request', () => {
    expect(codeExamples[0].showAuthTag).toBe(true)
    expect(codeExamples[1].showAuthTag).toBe(false)
  })

  it('should have all required fields for each example', () => {
    codeExamples.forEach((example) => {
      expect(example).toHaveProperty('id')
      expect(example).toHaveProperty('label')
      expect(example).toHaveProperty('language')
      expect(example).toHaveProperty('code')
      expect(example).toHaveProperty('showAuthTag')
      expect(example).toHaveProperty('ariaLabel')
      expect(typeof example.id).toBe('string')
      expect(typeof example.code).toBe('string')
      expect(example.code.length).toBeGreaterThan(0)
    })
  })

  it('should have request code containing curl and API URL', () => {
    const request = codeExamples[0]
    expect(request.code).toContain('curl')
    expect(request.code).toContain('api.lurus.cn')
    expect(request.code).toContain('chat/completions')
  })

  it('should have response code containing valid JSON structure', () => {
    const response = codeExamples[1]
    expect(response.code).toContain('choices')
    expect(response.code).toContain('usage')
    expect(response.code).toContain('model')
  })
})
