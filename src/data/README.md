# Data Directory Index

This directory contains centralized data files for the lurus-www website.
Edit these files to update website content without modifying component code.

## Files

| File | Purpose | Used By |
|------|---------|---------|
| `navItems.ts` | Navigation menu items and CTA links | `Navbar.vue` |
| `products.ts` | Product information, icons, and curl example | `ProductShowcase.vue` |
| `stats.ts` | Statistics and trust badges | `Home.vue` |
| `externalRoutes.ts` | External URL redirect mappings | `main.ts` |
| `chatModels.ts` | AI models and quick prompts | `useAIChat.ts` |
| `portalLinks.ts` | Portal link categories (48 links) | `PortalLinks.vue` |

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

## Architecture Decision

This data centralization follows ADR-006 and ADR-007:
- All configurable content in `src/data/`
- TypeScript interfaces for type safety
- `as const satisfies` pattern for readonly arrays
