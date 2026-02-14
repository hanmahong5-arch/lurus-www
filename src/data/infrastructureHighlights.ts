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
    id: 'k8s',
    icon: 'server',
    title: 'K8s 集群',
    description: '5 节点 Kubernetes 集群，高可用生产环境',
  },
  {
    id: 'gitops',
    icon: 'git-branch',
    title: 'GitOps 流水线',
    description: 'GitHub Actions + ArgoCD 自动化部署',
  },
  {
    id: 'opensource',
    icon: 'code-fork',
    title: '开源',
    description: '核心网关组件开源，社区驱动',
  },
  {
    id: 'hybrid-cloud',
    icon: 'cloud',
    title: '混合云架构',
    description: '多云容灾，灵活扩展',
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
