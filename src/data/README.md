# Data Directory Index

This directory contains centralized data files for the lurus-www website.
Edit these files to update website content without modifying component code.

## Files

| File | Purpose | Used By |
|------|---------|---------|
| `navItems.ts` | Navigation menu items and CTA links | `Navbar.vue` |
| `products.ts` | Product information (4 core products), icons, useCase, showcase (screenshot/code/features fallback), and curl example | `ProductShowcase.vue`, `ProductSubCard.vue`, `ProductShowcaseArea.vue`, `HeroSection.vue` |
| `stats.ts` | Statistics and trust badges | `Home.vue` |
| `externalRoutes.ts` | External URL redirect mappings | `main.ts` |
| `chatModels.ts` | AI models and quick prompts | `useAIChat.ts` |
| `portalLinks.ts` | Portal link categories (48 links) | `PortalLinks.vue` |
| `platformCapabilities.ts` | Platform capability cards (6 items) + icons | `PlatformCapabilities.vue` |
| `codeExamples.ts` | API request/response code examples (2 items) | `CodeExampleShowcase.vue` |
| `dashboardPreview.ts` | Dashboard preview config (screenshot + fallback) | `DashboardPreview.vue` |
| `infrastructureHighlights.ts` | Infrastructure highlight items (4 items) + icons | `InfrastructureHighlights.vue` |
| `apiHealth.ts` | API health check config + status banner text | `useApiHealth.ts`, `ApiStatusBanner.vue` |

## How to Update

### Navigation Links
Edit `navItems.ts` to add/modify navigation items:
```typescript
export const navItems = [
  { name: 'Products', path: '#products' },
  { name: 'Docs', path: 'https://docs.lurus.cn', external: true },
]
```

### Products
Edit `products.ts` to update product cards:
```typescript
export const products = [
  {
    id: 'api',
    name: 'Lurus API',
    tagline: 'LLM Gateway',
    // ...
  }
]
```

### Statistics
Edit `stats.ts` to update homepage stats:
```typescript
export const stats = [
  { value: '99.9%', label: 'Uptime', color: 'text-ochre' },
]
```

### External Redirects
Edit `externalRoutes.ts` to add redirect paths:
```typescript
export const externalRedirects = {
  '/login': 'https://api.lurus.cn/login',
}
```

### Chat Configuration
Edit `chatModels.ts` to update AI models and prompts:
```typescript
export const chatModels = [
  { id: 'deepseek-chat', name: 'DeepSeek' },
]
```

### Platform Capabilities
Edit `platformCapabilities.ts` to update the 6 capability cards:
```typescript
export const platformCapabilities = [
  { id: 'models', icon: 'layers', title: '50+ AI 模型', description: '...' },
]
```

### Code Examples
Edit `codeExamples.ts` to update the API request/response examples:
```typescript
export const codeExamples = [
  { id: 'request', label: 'Request', language: 'bash', code: '...', showAuthTag: true, ariaLabel: '...' },
  { id: 'response', label: 'Response', language: 'json', code: '...', showAuthTag: false, ariaLabel: '...' },
]
```

### Dashboard Preview
Edit `dashboardPreview.ts` to configure the dashboard preview:
```typescript
export const dashboardPreviewConfig = {
  screenshotSrc: '/images/dashboard.webp',  // empty string for fallback mode
  screenshotAlt: 'Dashboard screenshot description',
  fallbackCode: '{ ... }',
  fallbackLanguage: 'json',
  fallbackAriaLabel: 'API monitoring data example',
  title: '控制台预览',
  caption: 'Dashboard description',
}
```

### Infrastructure Highlights
Edit `infrastructureHighlights.ts` to update the 4 infrastructure items:
```typescript
export const infrastructureHighlights = [
  { id: 'k8s', icon: 'server', title: 'K8s 集群', description: '5 节点 Kubernetes 集群，高可用生产环境' },
]
```

### API Health Check
Edit `apiHealth.ts` to configure API health detection and status banner:
```typescript
export const apiHealthConfig = {
  healthEndpoint: 'https://api.lurus.cn/v1/models',
  timeoutMs: 5000,
  maxRetries: 1,
}

export const apiStatusBannerConfig = {
  unavailableMessage: '服务维护中，以下为示例数据',
  ariaLabel: 'API 服务状态提示',
}
```

## Architecture Decision

This data centralization follows ADR-006 and ADR-007:
- All configurable content in `src/data/`
- TypeScript interfaces for type safety
- `as const satisfies` pattern for readonly arrays
