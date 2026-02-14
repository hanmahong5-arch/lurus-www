# Story 7.4: AI Chat Portal Preview

Status: done

## Story

As a visitor,
I want to see an AI Chat preview alongside the portal links section,
So that I can start a conversation to quickly locate links or get help from the portal area.

## Acceptance Criteria

1. **Desktop two-column layout**: On desktop (>= 1024px), the Portal section renders a 60/40 split layout with the portal category grid on the left (60%) and a Chat preview card on the right (40%).
2. **Mobile stacked layout**: On mobile (< 1024px), the Chat preview card stacks below the portal category grid.
3. **Chat preview card content**: The Chat preview card displays the brand icon + "Lurus AI" title, quick prompts preview (2-3 items from `src/data/chatModels.ts`), and a "Start Chat" CTA button.
4. **Open Chat action**: Clicking the "Start Chat" button dispatches the `lurus:open-chat` custom event to trigger the ChatFloatingTrigger/AIChatSidebar panel opening.
5. **Prompt selection**: Clicking a quick prompt dispatches `lurus:open-chat` with the prompt text as detail, pre-filling the Chat input.
6. **Chat disabled fallback**: When `VITE_CHAT_ENABLED` is `false`, the Chat preview card is not rendered. The portal section displays full-width without the split layout.
7. **CTA bar preserved**: The existing CTABar ("Need API access? [Get API Key]") at the bottom of the Portal section remains intact.
8. **Tracking**: Chat open and prompt selection events are tracked via `useTracking`.
9. **Accessibility**: The Chat preview card has `role="region"` and an appropriate `aria-label`. All interactive elements have aria-labels.
10. **Design system compliance**: Uses `card-sketchy` class, cream/ink/ochre tokens, `<style scoped>` with `@reference`.
11. **Tests**: Unit tests cover rendering, layout class presence, event dispatching, fallback when Chat disabled, and accessibility attributes.

## Tasks / Subtasks

- [x] Task 1: Write tests for PortalChatPreview component (RED phase)
  - [x] 1.1 Create `src/components/Portal/__tests__/PortalChatPreview.test.ts`
  - [x] 1.2 Test: renders ChatPreview with brand title and quick prompts
  - [x] 1.3 Test: dispatches `lurus:open-chat` event on CTA click
  - [x] 1.4 Test: dispatches `lurus:open-chat` with prompt detail on prompt click
  - [x] 1.5 Test: has `role="region"` and `aria-label` on container
  - [x] 1.6 Test: uses `card-sketchy` class

- [x] Task 2: Create PortalChatPreview component (GREEN phase)
  - [x] 2.1 Create `src/components/Portal/PortalChatPreview.vue`
  - [x] 2.2 Render brand header (icon + "Lurus AI" + status dot)
  - [x] 2.3 Render quick prompts from `src/data/chatModels.ts`
  - [x] 2.4 Render "Start Chat" CTA button
  - [x] 2.5 Wire up event dispatching for open-chat and prompt selection
  - [x] 2.6 Add tracking calls

- [x] Task 3: Update PortalLinks layout for 60/40 split (GREEN phase)
  - [x] 3.1 Update `src/components/Portal/PortalLinks.vue` template
  - [x] 3.2 Add conditional rendering based on `useChatFeature`
  - [x] 3.3 Add CSS grid/flex for 60/40 desktop split, stacked mobile
  - [x] 3.4 Update existing PortalLinks tests if needed

- [x] Task 4: Run tests and verify (REFACTOR phase)
  - [x] 4.1 Run `npx vitest run` and verify all pass
  - [x] 4.2 Run `npx vue-tsc --noEmit` for type checking
  - [x] 4.3 Code review checklist verification

## Dev Notes

### Architecture Constraints

- **Composable pattern**: Use `useChatFeature` for conditional rendering
- **Data centralization** (ADR-006): Quick prompts from `src/data/chatModels.ts`
- **Event-driven Chat opening**: Use `window.dispatchEvent(new CustomEvent('lurus:open-chat'))` pattern (matches Home.vue)
- **Design tokens**: cream/ink/ochre palette, card-sketchy class
- **Scoped style**: `<style scoped>` with `@reference` pattern
- **Reduced motion**: Respect `prefers-reduced-motion: reduce`
- **No AI model names in code**: Per team constitution

### File Manifest

| File | Operation | Description |
|------|-----------|-------------|
| `src/components/Portal/PortalChatPreview.vue` | New | Chat preview card for Portal section |
| `src/components/Portal/__tests__/PortalChatPreview.test.ts` | New | Unit tests for PortalChatPreview |
| `src/components/Portal/PortalLinks.vue` | Modify | Add 60/40 layout with Chat preview |
| `src/components/Portal/__tests__/PortalLinks.test.ts` | Modify | Add tests for layout changes |

### FRs/NFRs Covered

- FR28: Visitor can navigate to 3 quick access entries (API docs, Portal, GuShen) from the portal area
- FR29: Chat panel accessible from portal Chat preview
- FR31: Quick prompts available in portal Chat preview
