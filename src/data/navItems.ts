/**
 * Navigation Items Data
 * Centralized navigation configuration for Navbar component
 */

import type { NavDropdownItem } from '../types/navigation'

export const navItems: NavDropdownItem[] = [
  {
    name: '产品',
    path: '#products',
    children: [
      { name: 'API Gateway', path: 'https://api.lurus.cn', external: true },
      { name: 'GuShen', path: 'https://gushen.lurus.cn', external: true },
      { name: 'Switch', path: '/download' },
      { name: 'MemX', path: '/download#memx' },
      { name: 'Docs', path: 'https://docs.lurus.cn', external: true },
    ],
  },
  {
    name: '解决方案',
    path: '/solutions',
  },
  {
    name: '资源',
    path: '#resources',
    children: [
      { name: '文档', path: 'https://docs.lurus.cn', external: true },
    ],
  },
  { name: '下载', path: '/download' },
  { name: '定价', path: '/pricing' },
  { name: '关于', path: '/about' },
]
