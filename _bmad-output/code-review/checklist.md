# Code Review Checklist

## Security (XSS/Injection)

- [ ] **No v-html usage** - All dynamic content uses `{{ }}` or `v-text`
  - If v-html is necessary, confirm content is from trusted constant in `src/data/`
  - Require explicit comment: `<!-- XSS-SAFE: content from trusted constant -->`
- [ ] **External links** - All external links have `rel="noopener noreferrer"`
- [ ] **User input** - No user input is directly rendered without sanitization
- [ ] **API data** - External API responses are treated as untrusted

## TypeScript

- [ ] **No `any` type** - ESLint should catch this (`@typescript-eslint/no-explicit-any: error`)
- [ ] **Proper types** - New data structures have type definitions in `src/types/`
- [ ] **Type exports** - Types are exported from `src/types/index.ts`

## Data & Configuration

- [ ] **Centralized data** - Content is in `src/data/` per ADR-006
- [ ] **Environment variables** - Use `VITE_` prefix for client-side env vars
- [ ] **No hardcoded values** - Magic numbers/strings extracted to constants

## Vue Components

- [ ] **Props validation** - Components have properly typed props
- [ ] **Accessibility** - Interactive elements have `aria-label` per ADR-012
- [ ] **Component naming** - PascalCase for components

## Performance

- [ ] **Image optimization** - Images are appropriately sized and compressed
- [ ] **Lazy loading** - Large components use `defineAsyncComponent`
- [ ] **Bundle impact** - Changes don't significantly increase bundle size

## Testing

- [ ] **Unit tests** - New logic has corresponding unit tests
- [ ] **Test coverage** - Coverage targets met per ADR-011

## Documentation

- [ ] **Code comments** - Complex logic has English comments
- [ ] **Data file comments** - Data files describe their purpose
