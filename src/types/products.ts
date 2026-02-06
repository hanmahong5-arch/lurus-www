/**
 * Product type definitions
 * Used by ProductShowcase and product data files
 */

export interface ProductStats {
  value: string
  label: string
}

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  icon: string
  color: string
  bgColor: string
  features: string[]
  stats: ProductStats
  featured?: boolean
}

export type ProductIconPaths = Record<string, string>
