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

export const ctaLinks: CtaLinks = {
  login: 'https://api.lurus.cn/login',
  register: 'https://api.lurus.cn/register',
} as const
