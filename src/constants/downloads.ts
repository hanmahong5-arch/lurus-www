/**
 * Download Configuration
 * Centralized download metadata for CodeSwitch application
 */

export interface DownloadItem {
  platform: string
  arch: string
  label: string
  filename: string
  icon: string
  size?: string
}

/**
 * Base URL for download files
 */
export const DOWNLOAD_BASE_URL = '/downloads'

/**
 * Available downloads for CodeSwitch
 */
export const DOWNLOADS: DownloadItem[] = [
  {
    platform: 'windows',
    arch: 'x64',
    label: 'Windows (x64)',
    filename: 'codeswitch-win-x64.exe',
    icon: 'windows',
    size: '~45 MB',
  },
  {
    platform: 'macos',
    arch: 'arm64',
    label: 'macOS (Apple Silicon)',
    filename: 'codeswitch-mac-arm64.dmg',
    icon: 'apple',
    size: '~50 MB',
  },
  {
    platform: 'macos',
    arch: 'x64',
    label: 'macOS (Intel)',
    filename: 'codeswitch-mac-x64.dmg',
    icon: 'apple',
    size: '~50 MB',
  },
  {
    platform: 'linux',
    arch: 'x64',
    label: 'Linux (x64)',
    filename: 'codeswitch-linux-x64.tar.gz',
    icon: 'linux',
    size: '~40 MB',
  },
] as const

/**
 * Get full download URL for a given filename
 */
export function getDownloadUrl(filename: string): string {
  return `${DOWNLOAD_BASE_URL}/${filename}`
}
