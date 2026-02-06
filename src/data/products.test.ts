import { describe, it, expect } from 'vitest'
import { products, productIconPaths } from './products'

describe('products', () => {
  it('should have products defined', () => {
    expect(products.length).toBeGreaterThan(0)
  })

  it('should have one featured product', () => {
    const featured = products.filter((p) => 'featured' in p && p.featured)
    expect(featured.length).toBe(1)
  })

  it('should have valid URLs', () => {
    products.forEach((product) => {
      if (product.url !== '#') {
        expect(product.url).toMatch(/^https?:\/\//)
      }
    })
  })

  it('should have icon paths for all product icons', () => {
    products.forEach((product) => {
      expect(productIconPaths[product.icon]).toBeTruthy()
    })
  })
})
