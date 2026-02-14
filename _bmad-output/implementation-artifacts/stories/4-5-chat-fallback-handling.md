# Story 4.5: Chat Fallback Handling

Status: done

## Story

As a visitor,
I want to see a friendly fallback message when the Chat backend is unavailable,
So that I know the service is temporarily unavailable instead of seeing an error.

## Acceptance Criteria

1. **API error friendly message**: When a Chat API call fails or times out (30s), display a friendly message instead of technical errors or stack traces.
2. **Offline detection**: When the network is disconnected (useNetworkStatus detects offline), the Chat input is disabled and a network-disconnected banner is displayed.
3. **Max retry exhausted fallback**: When the Chat backend is persistently unavailable (3 exponential backoff retries all fail), stop retrying and show a docs-link alternative entry point linking to https://docs.lurus.cn.
4. **ChatPreview unavailable state**: When ChatPreview renders in unavailable state, display static content (pre-recorded conversation demo) instead of an error state.
5. **Existing retry logic preserved**: The useChatApi composable maintains 30s timeout + 3 retries + exponential backoff (1s -> 2s -> 4s).
6. **Accessibility**: All fallback messages use role=alert or aria-live=polite for screen reader announcements. The docs link is keyboard accessible.
7. **prefers-reduced-motion**: Transitions on fallback UI elements respect reduced motion preference.

## Technical Design

### Analysis of Existing Code

The codebase already has significant fallback infrastructure:
- useChatApi.ts: 30s timeout, 3-retry exponential backoff, getErrorMessage() for human-readable errors
- useNetworkStatus.ts: online/offline reactive detection
- NetworkStatusBanner.vue: Shows network-disconnected banner when offline
- ChatMessageBubble.vue: Shows failed/timeout status with retry/delete buttons on individual messages
- ChatPreview.vue: Has isAvailable prop with is-unavailable class and static description
- AIChatSidebar.vue: Integrates NetworkStatusBanner, disables input when !isOnline

### What Needs to Be Built

1. **ChatErrorBanner.vue** - New component: persistent error banner shown in sidebar when all retries exhausted, with docs link
2. **AIChatSidebar.vue** - Modify: integrate ChatErrorBanner, show it when hasRetriesExhausted is true
3. **useAIChat.ts** - Modify: add hasRetriesExhausted computed based on latest user message retry count
4. **ChatPreview.vue** - Modify: add pre-recorded demo conversation data for unavailable state
5. **chatModels.ts** - Modify: add fallbackDemoMessages data and DOCS_URL constant

### Component: ChatErrorBanner

Props: docsUrl (string)
Emits: (none)

Renders a friendly error banner with:
- Warning icon
- Friendly message text
- Docs link button pointing to docs.lurus.cn
- role=alert for screen reader
- Uses Lurus design tokens (cream/ink/ochre)

### Integration Flow

User sends message -> sendWithRetry (3 attempts) -> all fail
  -> message.status = failed, retryCount incremented
  -> useAIChat exposes hasRetriesExhausted = true
  -> AIChatSidebar shows ChatErrorBanner
  -> User can still retry individual messages or view docs

## Tasks / Subtasks

- [x] Task 1: Add fallback data constants to chatModels.ts (AC: #3, #4)
  - [x] 1.1 Add DOCS_URL constant
  - [x] 1.2 Add fallbackDemoMessages for ChatPreview unavailable state

- [x] Task 2: Write tests for ChatErrorBanner (RED phase) (AC: #1, #3, #6, #7)
  - [x] 2.1 Test renders friendly error message text
  - [x] 2.2 Test renders docs link with correct href
  - [x] 2.3 Test has role=alert for screen reader
  - [x] 2.4 Test link is keyboard accessible (has proper element type)
  - [x] 2.5 Test uses design system tokens (warning styling)

- [x] Task 3: Implement ChatErrorBanner component (GREEN phase) (AC: #1, #3, #6, #7)
  - [x] 3.1 Create ChatErrorBanner.vue with warning icon + message + docs link
  - [x] 3.2 Style with Lurus design tokens
  - [x] 3.3 Add prefers-reduced-motion media query

- [x] Task 4: Write tests for useAIChat hasRetriesExhausted (RED phase) (AC: #3)
  - [x] 4.1 Test hasRetriesExhausted is false when no messages
  - [x] 4.2 Test hasRetriesExhausted is false when messages are all sent
  - [x] 4.3 Test hasRetriesExhausted is true when latest user message has retryCount >= maxRetries

- [x] Task 5: Modify useAIChat to expose hasRetriesExhausted (GREEN phase) (AC: #3)
  - [x] 5.1 Add hasRetriesExhausted computed
  - [x] 5.2 Export docsUrl from chatModels

- [x] Task 6: Write integration tests for AIChatSidebar error banner (RED phase) (AC: #1, #3)
  - [x] 6.1 Test sidebar shows ChatErrorBanner when hasRetriesExhausted is true
  - [x] 6.2 Test sidebar hides ChatErrorBanner when hasRetriesExhausted is false

- [x] Task 7: Integrate ChatErrorBanner into AIChatSidebar (GREEN phase) (AC: #1, #3)
  - [x] 7.1 Import and conditionally render ChatErrorBanner
  - [x] 7.2 Pass docsUrl prop

- [x] Task 8: Write tests for ChatPreview demo conversation (RED phase) (AC: #4)
  - [x] 8.1 Test ChatPreview unavailable state shows demo messages
  - [x] 8.2 Test demo messages are from fallbackDemoMessages data

- [x] Task 9: Enhance ChatPreview unavailable state (GREEN phase) (AC: #4)
  - [x] 9.1 Add demo conversation display in unavailable state
  - [x] 9.2 Style demo messages to look like static chat bubbles

- [x] Task 10: Lint + build verification (AC: all)
  - [x] 10.1 Run bun run lint with zero errors
  - [x] 10.2 Run bun run test:unit with all tests passing
  - [x] 10.3 Run bun run build with zero warnings

## Dev Notes

### Architecture Constraints

- **Chat is a plugin, not core** (Architecture Key Principle #1): Page works 100% without Chat
- **CSS-first, JS-last** (Architecture Key Principle #2): Animations via CSS transitions
- **a11y is architecture** (ADR-012): ariaLabel on interactive components
- **Three-state degradation** (ADR-010): loading -> ready | unavailable
- **Bundle splitting** (ADR-013): Component in chat chunk
- **Zero heavy libraries** (Architecture Key Principle #7)
- **Data centralization** (ADR-006): Constants in src/data/chatModels.ts

### Existing Code to Modify

| File | Operation | Description |
|------|-----------|-------------|
| src/data/chatModels.ts | Modify | Add DOCS_URL and fallbackDemoMessages |
| src/components/Chat/ChatErrorBanner.vue | Create | Persistent error banner with docs link |
| src/components/Chat/__tests__/ChatErrorBanner.test.ts | Create | Unit tests |
| src/composables/useAIChat.ts | Modify | Add hasRetriesExhausted computed |
| src/components/Chat/AIChatSidebar.vue | Modify | Integrate ChatErrorBanner |
| src/components/Chat/ChatPreview.vue | Modify | Demo conversation in unavailable state |
| src/components/Chat/__tests__/ChatPreview.test.ts | Modify | Add tests for demo conversation |

### FRs Covered

- FR32: System shows graceful degradation prompt when Chat backend is unavailable

### ADRs Referenced

- ADR-006: Data centralization (chatModels.ts)
- ADR-010: Three-state degradation (loading -> ready | unavailable)
- ADR-012: Component a11y interface (ariaLabel)
- ADR-013: Bundle chunk strategy (chat chunk)

## Definition of Done

- [x] Friendly error message displayed when API call fails (not technical errors)
- [x] Chat input disabled when network is offline
- [x] Docs link shown when all retries exhausted
- [x] ChatPreview unavailable state shows demo conversation (not error)
- [x] 30s timeout + 3 retries + exponential backoff preserved
- [x] All fallback messages have role=alert or aria-live
- [x] Docs link is keyboard accessible
- [x] prefers-reduced-motion respected
- [x] All unit tests pass
- [x] ESLint passes with zero errors
- [x] bun run build succeeds with zero warnings
