# Story 4.3: ChatPreview Component

Status: done

## Story

As a visitor,
I want to see a Chat preview card on the right side of the Hero section,
So that I can quickly understand the AI Chat capability and start a conversation.

## Acceptance Criteria

1. **Preview card display**: When Chat is enabled (`VITE_CHAT_ENABLED=true`) and the Hero section renders, ChatPreview displays inside the Hero right slot, showing a brand icon, "Lurus AI" title, 2-3 quick prompts preview, and a "Start Chat" button.
2. **Start chat action**: Clicking the "Start Chat" button triggers the Chat panel to open (emits `open-chat` event consumed by parent/App.vue), moving focus to the Chat input.
3. **Unavailable state**: When the Chat backend is unavailable (detected via `useChatApi` or network status), ChatPreview renders an `unavailable` state showing a static demo/description and a "Coming Soon" button instead of "Start Chat".
4. **Mobile hidden**: On viewports < 768px, ChatPreview is hidden (`hidden md:block`). Users access Chat via the ChatFloatingTrigger instead.
5. **Accessibility**: The component accepts an `ariaLabel` prop (ADR-012). All interactive elements are keyboard navigable. Quick prompt buttons have descriptive aria-labels.
6. **prefers-reduced-motion**: When the user prefers reduced motion, all transitions are disabled via CSS media query.
7. **Bundle**: The component is part of the `chat` chunk (ADR-013). It is conditionally loaded via `useChatFeature`.
8. **Design system**: Uses Lurus design tokens (cream/ink/ochre), hand-drawn aesthetic (sketchy borders), and follows the existing Chat component patterns.

## Technical Design

### Component Structure

```
src/components/Chat/ChatPreview.vue
src/components/Chat/__tests__/ChatPreview.test.ts
```

### Props Interface

```typescript
interface ChatPreviewProps {
  ariaLabel?: string  // default: "AI Chat preview"
  quickPrompts: QuickPrompt[]
  isAvailable: boolean
}
```

### Emits

```typescript
defineEmits<{
  'open-chat': []
  'select-prompt': [prompt: string]
}>()
```

### Integration Points

- **Home.vue**: Conditionally renders ChatPreview inside `HeroSection`'s `#right` slot (replacing or alongside CodeShowcase based on Chat availability).
- **App.vue**: Receives `open-chat` event to set `isChatOpen = true` via custom DOM event `lurus:open-chat`.
- **useAIChat**: Provides `quickPrompts` and availability state.
- **useChatFeature**: Controls whether ChatPreview loads at all.

## Tasks / Subtasks

- [x] Task 1: Write unit tests (RED phase) (AC: #1-#7)
  - [x] 1.1 Test ChatPreview renders brand icon, title, quick prompts, and action button
  - [x] 1.2 Test "Start Chat" button emits `open-chat` event
  - [x] 1.3 Test quick prompt button emits `select-prompt` event with prompt text
  - [x] 1.4 Test unavailable state renders "Coming Soon" button and static description
  - [x] 1.5 Test ariaLabel prop (default and custom)
  - [x] 1.6 Test keyboard navigation (Enter/Space on buttons)
  - [x] 1.7 Test component renders with proper card-sketchy styling classes
- [x] Task 2: Create ChatPreview.vue component (GREEN phase) (AC: #1-#8)
  - [x] 2.1 Implement component with brand header (icon + title)
  - [x] 2.2 Render quick prompt preview buttons (first 3)
  - [x] 2.3 Render "Start Chat" / "Coming Soon" button based on `isAvailable` prop
  - [x] 2.4 Apply card-sketchy design with Lurus tokens
  - [x] 2.5 Add hidden md:block for mobile hiding
  - [x] 2.6 Add prefers-reduced-motion media query
  - [x] 2.7 Add keyboard navigation support
- [x] Task 3: Integrate into Home.vue (AC: #1, #7)
  - [x] 3.1 Import ChatPreview conditionally using useChatFeature
  - [x] 3.2 Replace CodeShowcase in Hero slot with ChatPreview (or fallback to CodeShowcase when Chat disabled)
  - [x] 3.3 Wire open-chat event to App.vue's handleChatToggle via custom DOM event
- [x] Task 4: Lint + build verification (AC: all)
  - [x] 4.1 Run `bun run lint` with zero errors
  - [x] 4.2 Run `bun run test:unit` with all tests passing
  - [x] 4.3 Run `bun run build` with zero warnings

## Dev Notes

### Architecture Constraints

- **Chat is a plugin, not core** (Architecture Key Principle #1): Page works 100% without Chat
- **CSS-first, JS-last** (Architecture Key Principle #2): Animations via CSS transitions
- **a11y is architecture** (ADR-012): ariaLabel prop on interactive components
- **Bundle splitting** (ADR-013): Component in chat chunk
- **Three-state degradation** (ADR-010): loading -> ready | unavailable
- **Zero heavy libraries** (Architecture Key Principle #7)

### Existing Code to Modify

| File | Operation | Description |
|------|-----------|-------------|
| `src/components/Chat/ChatPreview.vue` | Create | Chat preview card component |
| `src/components/Chat/__tests__/ChatPreview.test.ts` | Create | Unit tests |
| `src/pages/Home.vue` | Modify | Integrate ChatPreview into Hero right slot |
| `src/App.vue` | Modify | Listen for `lurus:open-chat` custom event |

### FRs Covered

- FR29: Chat preview as entry point to AI Chat panel
- FR31: Quick prompts preview in ChatPreview

### ADRs Referenced

- ADR-001: defineAsyncComponent lazy loading
- ADR-010: Three-state degradation (unavailable state)
- ADR-012: Component a11y interface (ariaLabel)
- ADR-013: Bundle chunk strategy (chat chunk)

## Definition of Done

- [x] ChatPreview.vue renders preview card with brand icon, title, prompts, action button
- [x] "Start Chat" emits open-chat event
- [x] Unavailable state renders "Coming Soon" with static description
- [x] Hidden on mobile (< 768px)
- [x] ariaLabel prop + keyboard navigation
- [x] prefers-reduced-motion disables animations
- [x] Component is in chat async chunk
- [x] All unit tests pass
- [x] ESLint passes with zero errors
- [x] `bun run build` succeeds with zero warnings
