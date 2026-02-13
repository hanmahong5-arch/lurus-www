# Story 4.2: ChatFloatingTrigger Component

Status: done

## Story

As a visitor,
I want to see a floating Chat button at the bottom-right corner of the page,
So that I can open the AI Chat panel at any time to get help.

## Acceptance Criteria

1. **Visibility logic**: When `VITE_CHAT_ENABLED=true` and the visitor scrolls past the Hero section, a floating Chat button appears at the bottom-right corner. The button is hidden while the Hero section is visible (IntersectionObserver detection).
2. **Appearance**: The button uses ochre background with a Chat icon, matching the Lurus hand-drawn design system.
3. **Hover animation**: The button displays a `hover-breathe` micro-animation on hover (CSS-only, GPU-accelerated via transform + opacity).
4. **Click behavior**: Clicking the button toggles the AIChatSidebar open/close state. When the Chat panel is open, the button icon changes to a close (X) icon.
5. **Mobile adaptation**: On viewports < 768px, the button is the sole Chat entry point (ChatPreview is hidden). Button position respects bottom safe area (`env(safe-area-inset-bottom)`).
6. **Accessibility**: The component accepts an `ariaLabel` prop (ADR-012). It is focusable via Tab key and has a visible focus ring. Keyboard Enter/Space activates the button.
7. **prefers-reduced-motion**: When the user prefers reduced motion, all animations are disabled (CSS media query).
8. **Bundle**: The component is part of the `chat` async chunk (ADR-013), loaded only when `isChatEnabled` is true.

## Technical Design

### Component Structure

```
src/components/Chat/ChatFloatingTrigger.vue
src/components/Chat/__tests__/ChatFloatingTrigger.test.ts
```

### Props Interface

```typescript
interface ChatFloatingTriggerProps {
  isOpen: boolean
  ariaLabel?: string  // default: "Open AI Chat"
}
```

### Emits

```typescript
defineEmits<{
  toggle: []
}>()
```

### IntersectionObserver Logic

- Observe the Hero section element (`[aria-label="Hero"]`) from the document.
- When Hero `intersectionRatio > 0` (visible in viewport), hide the trigger button.
- When Hero leaves viewport entirely (`intersectionRatio === 0`), show the trigger button.
- Use `threshold: [0]` for efficient detection.
- Cleanup observer on `onUnmounted`.
- Fallback: if Hero element not found, default to showing the button.

### CSS Animation Specs

- **hover-breathe**: `transform: scale(1.08)` + `box-shadow` expansion on hover, 300ms ease transition
- **enter/leave**: CSS transition on opacity + transform for show/hide, 300ms
- **focus-ring**: `box-shadow: 0 0 0 3px var(--color-ochre)` on `:focus-visible`
- **reduced-motion**: `@media (prefers-reduced-motion: reduce)` disables all transitions

### Integration with App.vue

The ChatFloatingTrigger will be rendered alongside AIChatSidebar in App.vue, sharing the same `isOpen` state from AIChatSidebar. This requires extracting sidebar open/close state to App.vue level.

Modification plan:
1. App.vue manages `isChatOpen` ref
2. ChatFloatingTrigger receives `isOpen` prop and emits `toggle`
3. AIChatSidebar receives `isOpen` prop and emits `close`
4. Both components are conditionally rendered via `v-if="isChatEnabled"`

## Tasks / Subtasks

- [x] Task 1: Create ChatFloatingTrigger.vue component (AC: #1-#7)
  - [x] 1.1 Define props interface with `isOpen: boolean` and optional `ariaLabel`
  - [x] 1.2 Implement IntersectionObserver to detect Hero section visibility
  - [x] 1.3 Render floating button with ochre background + Chat/Close SVG icons
  - [x] 1.4 Add hover-breathe animation (CSS transition)
  - [x] 1.5 Add enter/leave transition for show/hide
  - [x] 1.6 Add mobile-safe bottom spacing with `env(safe-area-inset-bottom)`
  - [x] 1.7 Add focus-visible ring and keyboard support
  - [x] 1.8 Add prefers-reduced-motion media query
- [x] Task 2: Integrate into App.vue (AC: #4, #8)
  - [x] 2.1 Extract `isChatOpen` state to App.vue level
  - [x] 2.2 Add ChatFloatingTrigger as defineAsyncComponent
  - [x] 2.3 Wire toggle/close events between trigger and sidebar
  - [x] 2.4 Ensure both components share the same open/close state
- [x] Task 3: Modify AIChatSidebar to accept external open state (AC: #4)
  - [x] 3.1 Add `isOpen` prop to AIChatSidebar
  - [x] 3.2 Emit `close` and `toggle` events instead of managing internal state
  - [x] 3.3 Remove internal toggle button from AIChatSidebar (replaced by ChatFloatingTrigger)
- [x] Task 4: Write unit tests (AC: all)
  - [x] 4.1 Test button hidden when Hero is visible
  - [x] 4.2 Test button shown when Hero is not visible
  - [x] 4.3 Test toggle emit on click
  - [x] 4.4 Test icon switch between chat/close based on isOpen
  - [x] 4.5 Test ariaLabel prop default and custom value
  - [x] 4.6 Test keyboard activation (Enter/Space)
- [x] Task 5: Lint + build verification (AC: all)
  - [x] 5.1 Run `bun run lint` with zero errors
  - [x] 5.2 Run `bun run test:unit` with all tests passing
  - [x] 5.3 Run `bun run build` with zero warnings

## Dev Notes

### Architecture Constraints

- **Chat is a plugin, not core** (Architecture Key Principle #1)
- **CSS-first, JS-last** (Architecture Key Principle #2): animations via CSS transitions
- **a11y is architecture** (ADR-012): ariaLabel prop mandatory for interactive components
- **Bundle splitting** (ADR-013): component lives in chat chunk
- **Zero heavy libraries** (Architecture Key Principle #7)

### Existing Code to Modify

| File | Operation | Description |
|------|-----------|-------------|
| `src/components/Chat/ChatFloatingTrigger.vue` | Create | Floating trigger button component |
| `src/components/Chat/__tests__/ChatFloatingTrigger.test.ts` | Create | Unit tests |
| `src/App.vue` | Modify | Add ChatFloatingTrigger + extract open state |
| `src/components/Chat/AIChatSidebar.vue` | Modify | Accept external isOpen prop + emit events |

### FRs Covered

- FR29: Floating button opens AI Chat panel

### ADRs Referenced

- ADR-001: defineAsyncComponent lazy loading
- ADR-012: Component a11y interface (ariaLabel)
- ADR-013: Bundle chunk strategy (chat chunk)

## Definition of Done

- [x] ChatFloatingTrigger.vue renders floating button at bottom-right
- [x] IntersectionObserver correctly hides/shows based on Hero visibility
- [x] Click toggles Chat panel open/close
- [x] Icon switches between chat/close
- [x] hover-breathe animation works on hover
- [x] Mobile bottom safe area respected
- [x] ariaLabel prop + focus-visible + keyboard navigation
- [x] prefers-reduced-motion disables animations
- [x] Component is in chat async chunk
- [x] All unit tests pass
- [x] ESLint passes with zero errors
- [x] `bun run build` succeeds with zero warnings
