/**
 * Infrastructure Highlights Data
 * Centralized data for the infrastructure highlights section
 * within Platform Overview (S3).
 * 4 lightweight items showcasing platform infrastructure scale.
 */

import type {
  InfrastructureHighlight,
  InfrastructureHighlightIconPaths,
} from '../types/infrastructure'

export const infrastructureHighlights = [
  {
    id: 'high-availability',
    icon: 'server',
    title: '高可用架构',
    description: '多节点冗余部署，自动故障转移，99.9% 可用性保障',
  },
  {
    id: 'continuous-delivery',
    icon: 'git-branch',
    title: '持续交付',
    description: '自动化测试与部署流水线，分钟级上线',
  },
  {
    id: 'open-ecosystem',
    icon: 'code-fork',
    title: '开放生态',
    description: '核心组件开源，开发者社区驱动',
  },
  {
    id: 'elastic-scaling',
    icon: 'cloud',
    title: '弹性扩展',
    description: '多区域容灾，按需弹性伸缩',
  },
] satisfies InfrastructureHighlight[]

/**
 * SVG icon paths for infrastructure highlight icons.
 * Each path is a single <path d="..."> value for a 24x24 viewBox.
 */
export const infrastructureHighlightIcons: InfrastructureHighlightIconPaths = {
  server:
    'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-7-4h.01M12 16h.01',
  'git-branch':
    'M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zm0 0a9 9 0 01-9 9M6 21a3 3 0 100-6 3 3 0 000 6z',
  'code-fork':
    'M7 7V3m10 4V3M7 7a4 4 0 004 4h2a4 4 0 004-4M7 7a4 4 0 014 4h2a4 4 0 004-4m-5 4v6m0 0a3 3 0 100 6 3 3 0 000-6z',
  cloud:
    'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
}
