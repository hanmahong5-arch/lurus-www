/**
 * Navigation Items Data
 * Centralized navigation configuration for Navbar component
 */

import type { NavDropdownItem, CtaLinks } from '../types/navigation'

export const navItems: NavDropdownItem[] = [
  {
    name: '产品',
    path: '#products',
    children: [
      { name: 'API Gateway', path: 'https://api.lurus.cn', external: true },
      { name: 'GuShen', path: 'https://gushen.lurus.cn', external: true },
      { name: 'Switch', path: '/download' },
      { name: 'Docs', path: 'https://docs.lurus.cn', external: true },
      { name: 'Deaigc', path: 'https://deaigc.lurus.cn', external: true },
    ],
  },
  {
    name: '资源',
    path: '#resources',
    children: [
      { name: 'Portal', path: '#portal' },
      { name: '文档', path: 'https://docs.lurus.cn', external: true },
    ],
  },
  { name: '定价', path: '/pricing' },
  { name: '关于', path: '/about' },
]

/**
 * Get login URL with optional return URL
 */
export function getLoginUrl(returnUrl?: string): string {
  const redirectUrl = returnUrl || window.location.href
  return `https://api.lurus.cn/login?redirect_url=${encodeURIComponent(redirectUrl)}`
}

/**
 * Get register URL with optional return URL
 */
export function getRegisterUrl(returnUrl?: string): string {
  const redirectUrl = returnUrl || window.location.href
  return `https://api.lurus.cn/register?redirect_url=${encodeURIComponent(redirectUrl)}`
}

/**
 * Legacy static links (deprecated - use functions above)
 * @deprecated Use getLoginUrl() and getRegisterUrl() instead
 */
export const ctaLinks: CtaLinks = {
  login: 'https://api.lurus.cn/login',
  register: 'https://api.lurus.cn/register',
} as const
