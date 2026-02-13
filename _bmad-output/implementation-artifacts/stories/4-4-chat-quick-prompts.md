# Story 4.4: Chat Quick Prompts

Status: done

## Story

As a visitor,
I want to see pre-configured quick prompt buttons when opening the Chat panel with no message history,
So that I can quickly start a conversation without having to think of a question.

## Acceptance Criteria

1. **Quick prompts display**: When the Chat panel is open (`AIChatSidebar.is-open = true`) and there are no prior messages (`hasMessages = false`), 3-5 quick prompt buttons are displayed. Example prompts: "Lurus API pricing?", "How to use 50+ AI models?".
2. **Auto-send on click**: When a visitor clicks a quick prompt, the prompt text is automatically filled into the input and sent as a message (calls `sendMessage` with the prompt text).
3. **Hide when messages exist**: When there is message history (`hasMessages = true`), the quick prompts section is hidden or collapsed, showing the message list instead.
4. **Data from centralized file**: Quick prompts data is loaded from `src/data/chatModels.ts` (`quickPrompts` export), not hardcoded in the component. Supports configuration changes.
5. **Accessibility**: Quick prompt buttons have descriptive `aria-label` attributes. The container has `role="group"` and `aria-label`. All buttons are keyboard navigable (Tab + Enter/Space).
6. **prefers-reduced-motion**: When the user prefers reduced motion, all transitions on prompt buttons are disabled via CSS media query.
7. **Design system**: Uses Lurus design tokens (cream/ink/ochre), hand-drawn aesthetic (sketchy border-radius), and follows the existing ChatQuickPrompts component patterns.

## Technical Design

### Component Structure

The ChatQuickPrompts component already exists at `src/components/Chat/ChatQuickPrompts.vue`. This story focuses on:

1. Modifying `AIChatSidebar.vue` to conditionally show/hide ChatQuickPrompts based on `hasMessages`
2. Modifying the prompt selection behavior to auto-send (instead of just filling input)
3. Adding comprehensive unit tests for the ChatQuickPrompts component
4. Ensuring the data pipeline from `src/data/chatModels.ts` through `useAIChat` to ChatQuickPrompts is tested

### Integration Points

- **AIChatSidebar.vue**: Conditionally renders ChatQuickPrompts when `!hasMessages`, hides when messages exist
- **ChatQuickPrompts.vue**: Existing component; ensure it matches AC requirements
- **useAIChat.ts**: Provides `quickPrompts`, `hasMessages`, `sendMessage`, `applyPrompt`
- **src/data/chatModels.ts**: Source of quick prompt data

### Behavior Change

Current: Prompt click calls `applyPrompt()` which only fills the input field.
Required: Prompt click should call `sendMessage(prompt)` to auto-fill AND auto-send.

## Tasks / Subtasks

- [x] Task 1: Write unit tests for ChatQuickPrompts (RED phase) (AC: #1-#7)
  - [x] 1.1 Test ChatQuickPrompts renders prompt buttons from props
  - [x] 1.2 Test prompt button click emits `select` event with prompt text
  - [x] 1.3 Test all prompt buttons have descriptive aria-labels
  - [x] 1.4 Test container has role="group" with aria-label
  - [x] 1.5 Test keyboard navigation (Enter/Space triggers select)
  - [x] 1.6 Test empty prompts array renders gracefully
  - [x] 1.7 Test component uses card-sketchy design tokens

- [x] Task 2: Write integration test for sidebar prompt visibility (RED phase) (AC: #3)
  - [x] 2.1 Test AIChatSidebar shows ChatQuickPrompts when hasMessages is false
  - [x] 2.2 Test AIChatSidebar hides ChatQuickPrompts when hasMessages is true

- [x] Task 3: Modify AIChatSidebar for conditional prompt display (GREEN phase) (AC: #1, #3)
  - [x] 3.1 Add v-if="!hasMessages" to ChatQuickPrompts rendering
  - [x] 3.2 Update prompt selection handler to call sendMessage instead of applyPrompt

- [x] Task 4: Verify data pipeline (AC: #4)
  - [x] 4.1 Confirm chatModels.ts exports quickPrompts with correct shape
  - [x] 4.2 Confirm useAIChat passes quickPrompts through to components

- [x] Task 5: Lint + build verification (AC: all)
  - [x] 5.1 Run `bun run lint` with zero errors
  - [x] 5.2 Run `bun run test:unit` with all tests passing
  - [x] 5.3 Run `bun run build` with zero warnings

## Dev Notes

### Architecture Constraints

- **Chat is a plugin, not core** (Architecture Key Principle #1): Page works 100% without Chat
- **CSS-first, JS-last** (Architecture Key Principle #2): Animations via CSS transitions
- **a11y is architecture** (ADR-012): ariaLabel on interactive components
- **Bundle splitting** (ADR-013): Component in chat chunk
- **Zero heavy libraries** (Architecture Key Principle #7)

### Existing Code to Modify

| File | Operation | Description |
|------|-----------|-------------|
| `src/components/Chat/AIChatSidebar.vue` | Modify | Conditional quick prompt display + auto-send |
| `src/components/Chat/__tests__/ChatQuickPrompts.test.ts` | Create | Comprehensive unit tests |

### FRs Covered

- FR31: Visitors can start a conversation from pre-configured quick prompts

### ADRs Referenced

- ADR-006: Data centralization (chatModels.ts)
- ADR-010: Three-state degradation
- ADR-012: Component a11y interface (ariaLabel)
- ADR-013: Bundle chunk strategy (chat chunk)

## Definition of Done

- [x] ChatQuickPrompts renders prompt buttons with correct data from chatModels.ts
- [x] Clicking a prompt auto-sends the message (not just fills input)
- [x] Quick prompts hidden when message history exists
- [x] All prompt buttons have descriptive aria-labels
- [x] Container has role="group" with aria-label
- [x] Keyboard navigation works (Tab + Enter/Space)
- [x] prefers-reduced-motion disables animations
- [x] All unit tests pass
- [x] ESLint passes with zero errors
- [x] `bun run build` succeeds with zero warnings
