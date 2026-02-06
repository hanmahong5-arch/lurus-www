/**
 * Copy text to clipboard with fallback for older browsers.
 * Primary: navigator.clipboard.writeText (modern browsers, HTTPS)
 * Fallback: document.execCommand('copy') via temporary textarea (HTTP, older browsers)
 *
 * @param text - The text to copy to clipboard
 * @returns true if copy succeeded, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Primary path: modern Clipboard API
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fall through to execCommand fallback
    }
  }

  // Fallback path: legacy execCommand via temporary textarea
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    // Position offscreen to avoid visual flash
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '-9999px'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch {
    return false
  }
}
