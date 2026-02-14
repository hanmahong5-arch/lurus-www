# Story 4.6: Chat Streaming Response & Accessibility

Status: done

## Story

As a visitor,
I want to see AI replies streamed character-by-character,
So that I can start reading responses faster and have a more engaging experience.

## Acceptance Criteria

1. **Streaming display**: When a visitor sends a message and the AI begins responding, the reply content is displayed incrementally (token-by-token) using SSE streaming, with the TypingIndicator shown during the streaming phase.
2. **UI non-blocking**: During streaming, the UI remains responsive - the user can scroll, and the message container auto-scrolls to follow the latest content.
3. **aria-live polite**: The messages container uses aria-live=polite so screen readers announce new content without interrupting the current narration. A completion announcement is made when streaming finishes.
4. **Panel open animation**: The Chat sidebar open/close animation completes within 300ms using CSS transition with GPU-accelerated properties (transform + opacity). will-change: transform is applied.
5. **Focus trap**: When the Chat panel is open, keyboard focus is trapped within the panel. Tab/Shift+Tab cycles only through focusable elements inside the sidebar. When the panel closes, focus returns to the ChatFloatingTrigger button.
6. **Escape to close**: Pressing Escape while the Chat panel is open closes it (already exists, verify preserved).
7. **prefers-reduced-motion**: All animations (panel slide, message fade-in, typing indicator bounce) are disabled when prefers-reduced-motion: reduce is active.
8. **Streaming error handling**: If the SSE stream is interrupted mid-response, the partial content is preserved and the message is marked with a failed status, allowing retry.
## Technical Design

### Analysis of Existing Code

The current implementation uses non-streaming API calls (stream: false in useChatApi.ts). Key existing infrastructure:

- **useChatApi.ts**: sendWithRetry() with 30s timeout, 3 retries, exponential backoff. Currently returns full response.
- **useAIChat.ts**: Message lifecycle (optimistic create -> send -> success/fail). isTyping ref for typing indicator.
- **ChatMessages.vue**: Already has aria-live=polite and role=log on container. Auto-scroll via watch.
- **ChatMessageBubble.vue**: Renders message content via template interpolation. Has failed/retry states.
- **TypingIndicator.vue**: Bouncing dots animation. Shown when isTyping is true.
- **AIChatSidebar.vue**: Has Escape key handler. No focus trap. CSS transition on transform: translateX.

### What Needs to Be Built

1. **useChatApi.ts** - Add sendStreamMessage() that uses SSE (stream: true) with ReadableStream / TextDecoder to yield tokens incrementally.
2. **useAIChat.ts** - Modify sendMessage() to use streaming: create assistant message early, update content progressively, handle stream errors.
3. **AIChatSidebar.vue** - Add focus trap logic (trap focus on open, restore on close). Add will-change: transform to CSS.
4. **ChatMessages.vue** - Add streaming completion announcement for screen readers. Ensure auto-scroll works during streaming.
5. **App.vue** - Add focus return to trigger after sidebar close.
6. **TypingIndicator.vue** - Add prefers-reduced-motion support to disable bounce animation.
7. **ChatMessageBubble.vue** - Support streaming status for in-progress messages. Show partial content with cursor indicator.

### Streaming Architecture

User sends message -> useAIChat.sendMessage() -> Create optimistic user message (status: sending) -> Create assistant message placeholder (status: streaming, content: empty) -> useChatApi.sendStreamMessage() begins SSE -> Each SSE token: update assistant message content progressively -> Stream complete: mark assistant message status = sent -> Stream error: mark status = failed, preserve partial content.

SSE response format (OpenAI-compatible): each line starts with "data: " followed by JSON. Final line is "data: [DONE]". Delta content is at choices[0].delta.content.

### Focus Trap Strategy

Use a lightweight custom implementation (no library):
1. On sidebar open: query all focusable elements inside #ai-chat-sidebar
2. On Tab at last element: move focus to first element
3. On Shift+Tab at first element: move focus to last element
4. On close: restore focus to the element that triggered the open (ChatFloatingTrigger button)

### Component Changes

| File | Operation | Description |
|------|-----------|-------------|
| src/composables/useChatApi.ts | Modify | Add sendStreamMessage() SSE streaming function |
| src/composables/useAIChat.ts | Modify | Use streaming in sendMessage(), progressive content updates |
| src/types/chat.ts | Modify | Add streaming to MessageStatus type |
| src/components/Chat/AIChatSidebar.vue | Modify | Add focus trap, will-change, focus restore |
| src/components/Chat/ChatMessages.vue | Modify | Watch content changes for auto-scroll, sr-only completion |
| src/components/Chat/ChatMessageBubble.vue | Modify | Support streaming status with cursor indicator |
| src/components/Chat/TypingIndicator.vue | Modify | Add prefers-reduced-motion media query |
| src/App.vue | Modify | Pass trigger ref for focus restore |
| src/constants/ui.ts | Modify | Add FOCUSABLE_SELECTOR constant |
## Tasks / Subtasks

- [x] Task 1: Extend chat types for streaming (AC: #1, #8)
  - [x] 1.1 Add streaming to MessageStatus union type in chat.ts

- [x] Task 2: Write tests for SSE streaming parser (RED phase) (AC: #1, #8)
  - [x] 2.1 Test parseSSEChunk extracts content delta from SSE data line
  - [x] 2.2 Test parseSSEChunk returns null for [DONE] signal
  - [x] 2.3 Test parseSSEChunk handles malformed SSE data gracefully
  - [x] 2.4 Test sendStreamMessage yields tokens from ReadableStream

- [x] Task 3: Implement SSE streaming in useChatApi (GREEN phase) (AC: #1, #8)
  - [x] 3.1 Add parseSSEChunk() helper to parse SSE data lines
  - [x] 3.2 Add sendStreamMessage() using fetch with stream: true + ReadableStream + TextDecoder
  - [x] 3.3 Handle stream interruption: yield partial content, throw on error
  - [x] 3.4 Maintain 30s timeout via AbortController

- [x] Task 4: Write tests for streaming message flow in useAIChat (RED phase) (AC: #1, #2)
  - [x] 4.1 Test sendMessage creates assistant message with status streaming
  - [x] 4.2 Test assistant message content updates progressively
  - [x] 4.3 Test assistant message status changes to sent on completion
  - [x] 4.4 Test stream error preserves partial content and marks failed

- [x] Task 5: Modify useAIChat to use streaming (GREEN phase) (AC: #1, #2, #8)
  - [x] 5.1 Refactor sendMessage to call sendStreamMessage
  - [x] 5.2 Create assistant message placeholder at start (status: streaming)
  - [x] 5.3 Update content progressively as tokens arrive
  - [x] 5.4 Handle stream error: preserve partial content, mark failed

- [x] Task 6: Write tests for focus trap (RED phase) (AC: #5, #6)
  - [x] 6.1 Test focus moves to first focusable element on open
  - [x] 6.2 Test Tab at last element wraps to first element
  - [x] 6.3 Test Shift+Tab at first element wraps to last element
  - [x] 6.4 Test Escape closes the panel
  - [x] 6.5 Test focus returns to trigger element on close

- [x] Task 7: Implement focus trap in AIChatSidebar (GREEN phase) (AC: #5, #6)
  - [x] 7.1 Add FOCUSABLE_SELECTOR constant
  - [x] 7.2 Add focus trap keydown handler for Tab/Shift+Tab
  - [x] 7.3 Move focus into sidebar on open (nextTick)
  - [x] 7.4 Emit closed event; parent restores focus to trigger
  - [x] 7.5 Add will-change: transform to sidebar CSS

- [x] Task 8: Update ChatMessageBubble for streaming status (AC: #1)
  - [x] 8.1 Add streaming state visual (blinking cursor after content)
  - [x] 8.2 Style streaming message bubble

- [x] Task 9: Update ChatMessages auto-scroll for streaming (AC: #2, #3)
  - [x] 9.1 Watch message content changes (not just count) for auto-scroll during streaming
  - [x] 9.2 Add sr-only element announcing completion when streaming finishes

- [x] Task 10: Add prefers-reduced-motion to TypingIndicator (AC: #7)
  - [x] 10.1 Add @media (prefers-reduced-motion: reduce) to disable bounce animation
  - [x] 10.2 Show static dots instead of bouncing

- [x] Task 11: Update App.vue for focus restore (AC: #5)
  - [x] 11.1 Add template ref for ChatFloatingTrigger
  - [x] 11.2 On sidebar close, return focus to trigger button

- [x] Task 12: Lint + build + test verification (AC: all)
  - [x] 12.1 Run bun run lint with zero errors
  - [x] 12.2 Run bun run test:unit with all tests passing
  - [x] 12.3 Run bun run build with zero warnings
## Dev Notes

### Architecture Constraints

- **Chat is a plugin, not core** (Architecture Key Principle #1): Page works 100% without Chat
- **CSS-first, JS-last** (Architecture Key Principle #2): Animations via CSS transitions, GPU-accelerated
- **a11y is architecture** (ADR-012): ariaLabel on interactive components, focus management mandatory
- **Three-state degradation** (ADR-010): loading -> ready | unavailable
- **Bundle splitting** (ADR-013): All changes stay in chat chunk
- **Zero heavy libraries** (Architecture Key Principle #7): No focus-trap library, custom implementation
- **Data centralization** (ADR-006): Constants in src/data/ or src/constants/

### SSE Parsing Notes

The Lurus API is OpenAI-compatible. SSE format:
- Each line starts with "data: " followed by JSON
- Final line is "data: [DONE]"
- Delta content is at choices[0].delta.content
- Empty deltas (role-only) should be skipped

### Streaming Fallback

If SSE streaming fails on first token (e.g., API does not support streaming), fall back to non-streaming sendWithRetry. This ensures backward compatibility.

### FRs Covered

- FR30: Visitor can input questions and receive streaming AI replies

### NFRs Covered

- NFR-P3: Chat Panel open animation <= 300ms (CSS transition, GPU accelerated)
- NFR-A3: Chat streaming messages use aria-live=polite, do not interrupt screen reader

### ADRs Referenced

- ADR-010: Three-state degradation
- ADR-012: Component a11y interface (ariaLabel, focus management)
- ADR-013: Bundle chunk strategy (chat chunk)

## Definition of Done

- [x] AI reply content streams token-by-token (not all-at-once)
- [x] TypingIndicator shown during streaming
- [x] UI remains responsive during streaming (no jank)
- [x] Messages container auto-scrolls during streaming
- [x] aria-live=polite on messages container (already exists, verified)
- [x] Screen reader announces completion when streaming finishes
- [x] Chat panel open/close animation <= 300ms, GPU accelerated
- [x] Focus trapped inside panel when open
- [x] Focus returns to trigger button on close
- [x] Escape closes panel (preserved)
- [x] prefers-reduced-motion disables all animations
- [x] Stream interruption preserves partial content
- [x] All unit tests pass
- [x] ESLint passes with zero errors
- [x] bun run build succeeds with zero warnings
