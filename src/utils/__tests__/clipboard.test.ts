import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { copyToClipboard } from '../clipboard'

describe('copyToClipboard', () => {
  let originalClipboard: Clipboard

  beforeEach(() => {
    originalClipboard = navigator.clipboard
  })

  afterEach(() => {
    vi.restoreAllMocks()
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    })
  })

  it('should copy text using navigator.clipboard.writeText', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })

    const result = await copyToClipboard('test text')

    expect(writeTextMock).toHaveBeenCalledWith('test text')
    expect(result).toBe(true)
  })

  it('should return false when navigator.clipboard.writeText fails', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'))
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })

    // Also mock execCommand fallback to fail
    const execCommandMock = vi.fn().mockReturnValue(false)
    vi.stubGlobal('document', {
      ...document,
      execCommand: execCommandMock,
      createElement: document.createElement.bind(document),
      body: document.body,
    })

    const result = await copyToClipboard('test text')

    expect(result).toBe(false)
  })

  it('should fall back to execCommand when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    const execCommandMock = vi.spyOn(document, 'execCommand').mockReturnValue(true)

    const result = await copyToClipboard('fallback text')

    expect(execCommandMock).toHaveBeenCalledWith('copy')
    expect(result).toBe(true)
  })

  it('should return false when both clipboard API and execCommand fail', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    vi.spyOn(document, 'execCommand').mockReturnValue(false)

    const result = await copyToClipboard('fail text')

    expect(result).toBe(false)
  })

  it('should return false when execCommand throws', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    vi.spyOn(document, 'execCommand').mockImplementation(() => {
      throw new Error('execCommand not supported')
    })

    const result = await copyToClipboard('error text')

    expect(result).toBe(false)
  })

  it('should handle empty string input', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })

    const result = await copyToClipboard('')

    expect(writeTextMock).toHaveBeenCalledWith('')
    expect(result).toBe(true)
  })
})
