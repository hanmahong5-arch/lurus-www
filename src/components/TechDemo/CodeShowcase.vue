<script setup lang="ts">
import { ref, computed } from 'vue'
import { copyToClipboard } from '@/utils/clipboard'

interface Token {
  type: 'keyword' | 'url' | 'string' | 'flag' | 'plain'
  value: string
}

const props = withDefaults(defineProps<{
  code: string
  language: string
  showLineNumbers?: boolean
  ariaLabel: string
  showAuthTag?: boolean
}>(), {
  showLineNumbers: false,
  showAuthTag: false,
})

const COPY_FEEDBACK_DURATION_MS = 2000
const DEBOUNCE_INTERVAL_MS = 300

const copied = ref(false)
const lastCopyTime = ref(0)

/**
 * Tokenize a code string into typed tokens for CSS-only syntax highlighting.
 * Supports bash/curl commands with keywords, URLs, strings, flags, and plain text.
 */
function tokenize(code: string): Token[] {
  if (props.language !== 'bash') {
    return [{ type: 'plain', value: code }]
  }

  const tokens: Token[] = []
  // Pattern order matters: URLs before strings (URLs may contain quotes context)
  const regex = /(\bhttps?:\/\/[^\s"'\\]+)|(["'][^"']*["'])|(\\?\b(?:curl|GET|POST|PUT|DELETE|HEAD|PATCH)\b)|(-[a-zA-Z]\b)|(\\\n)/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(code)) !== null) {
    // Capture plain text before the match
    if (match.index > lastIndex) {
      tokens.push({ type: 'plain', value: code.slice(lastIndex, match.index) })
    }

    if (match[1]) {
      tokens.push({ type: 'url', value: match[0] })
    } else if (match[2]) {
      tokens.push({ type: 'string', value: match[0] })
    } else if (match[3]) {
      tokens.push({ type: 'keyword', value: match[0] })
    } else if (match[4]) {
      tokens.push({ type: 'flag', value: match[0] })
    } else if (match[5]) {
      tokens.push({ type: 'plain', value: match[0] })
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining plain text
  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIndex) })
  }

  return tokens
}

const tokens = computed(() => tokenize(props.code))

const lineCount = computed(() => props.code.split('\n').length)

async function handleCopy() {
  const now = Date.now()
  if (now - lastCopyTime.value < DEBOUNCE_INTERVAL_MS) return
  lastCopyTime.value = now

  const success = await copyToClipboard(props.code)
  if (success) {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, COPY_FEEDBACK_DURATION_MS)
  }
}
</script>

<template>
  <div class="code-showcase" role="region" :aria-label="ariaLabel">
    <!-- Header bar -->
    <div class="code-header">
      <span class="code-language">{{ language }}</span>
      <div class="code-actions">
        <span v-if="showAuthTag" class="auth-tag">
          需 API Key
        </span>
        <button
          type="button"
          class="copy-btn"
          :class="{ 'copy-btn--copied': copied }"
          :aria-label="copied ? '已复制到剪贴板' : '复制代码'"
          @click="handleCopy"
        >
          <!-- Clipboard icon (idle) -->
          <svg
            v-if="!copied"
            class="copy-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <!-- Checkmark icon (success) -->
          <svg
            v-else
            class="copy-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="copy-label">{{ copied ? '已复制' : '复制' }}</span>
        </button>
      </div>
    </div>

    <!-- Code block -->
    <div class="code-body">
      <pre class="code-pre"><code :aria-label="ariaLabel"><template v-if="showLineNumbers"><span
            v-for="(_, idx) in lineCount"
            :key="idx"
            class="line-number"
            aria-hidden="true"
          >{{ idx + 1 }}</span></template><span
          v-for="(token, idx) in tokens"
          :key="idx"
          :class="`token-${token.type}`"
        >{{ token.value }}</span></code></pre>
    </div>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";

.code-showcase {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-ink-700);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: var(--color-ink-900);
  border-bottom: 1px solid var(--color-ink-700);
}

.code-language {
  font-family: monospace;
  font-size: 12px;
  color: var(--color-ink-300);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.auth-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: rgba(201, 162, 39, 0.2);
  color: var(--color-ochre);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: var(--color-ink-300);
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
  font-size: 12px;
  font-family: inherit;
}

.copy-btn:hover {
  color: var(--color-ochre);
  background-color: rgba(201, 162, 39, 0.1);
}

.copy-btn--copied {
  color: #86EFAC;
  background-color: rgba(134, 239, 172, 0.1);
}

.copy-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.copy-label {
  font-size: 12px;
}

.code-body {
  background-color: var(--color-ink-900);
  overflow-x: auto;
}

.code-pre {
  margin: 0;
  padding: 21px;
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-cream-100);
  white-space: pre;
}

.line-number {
  display: inline-block;
  width: 2em;
  margin-right: 1em;
  text-align: right;
  color: var(--color-ink-500);
  border-right: 1px solid var(--color-ink-700);
  padding-right: 0.75em;
  user-select: none;
}

/* CSS-only syntax highlighting tokens */
.token-keyword {
  color: var(--color-ochre);
  font-weight: 600;
}

.token-url {
  color: #7DD3FC;
}

.token-string {
  color: #86EFAC;
}

.token-flag {
  color: var(--color-cream-300);
}

.token-plain {
  color: var(--color-cream-100);
}

/* Reduced motion: disable copy-flash transition */
@media (prefers-reduced-motion: reduce) {
  .copy-btn {
    transition-duration: 0ms;
  }

  .copy-btn--copied {
    transition-duration: 0ms;
  }
}
</style>
