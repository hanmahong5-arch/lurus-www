/**
 * External Routes Data
 * Centralized external redirect mappings for main.ts
 */

/**
 * Direct path to URL mappings
 * When user visits these paths, redirect to external URLs
 */
export const externalRedirects = {
  '/docs': 'https://docs.lurus.cn',
} as const satisfies Record<string, string>

/**
 * Prefix-based redirect patterns
 * Paths starting with these prefixes are redirected to api.lurus.cn
 */
export const prefixRedirects: readonly string[] = [
  '/console',
] as const

/**
 * Check if a path should be redirected externally
 * Returns the redirect URL or null if no redirect needed
 */
export const getExternalRedirect = (path: string): string | null => {
  // Check direct redirects first
  if (path in externalRedirects) {
    return externalRedirects[path as keyof typeof externalRedirects]
  }

  // Check prefix redirects
  for (const prefix of prefixRedirects) {
    if (path.startsWith(prefix)) {
      return `https://api.lurus.cn${path}`
    }
  }

  return null
}
