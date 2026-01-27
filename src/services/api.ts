/**
 * API client for Lurus API
 * Fetches data from api.lurus.cn
 */

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.lurus.cn'

interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

interface SubscriptionPlan {
  code: string
  name: string
  price: number
  period_days: number
  daily_quota: number
  total_quota: number
  base_group: string
  features: string[]
}

interface DownloadInfo {
  platform: string
  arch: string
  version: string
  url: string
  size: number
  checksum: string
}

/**
 * Fetch subscription plans from API
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const res = await fetch(`${API_BASE}/api/subscription/plans`)
    const data: ApiResponse<SubscriptionPlan[]> = await res.json()
    if (data.success && data.data) {
      return data.data
    }
    return []
  } catch (error) {
    console.error('Failed to fetch subscription plans:', error)
    return []
  }
}

/**
 * Get download information for all platforms
 */
export async function getDownloads(): Promise<DownloadInfo[]> {
  // For now, return static download info
  // In the future, this could fetch from API
  return [
    {
      platform: 'windows',
      arch: 'x64',
      version: '1.0.0',
      url: '/downloads/codeswitch-win-x64.exe',
      size: 47185920,
      checksum: ''
    },
    {
      platform: 'darwin',
      arch: 'arm64',
      version: '1.0.0',
      url: '/downloads/codeswitch-mac-arm64.dmg',
      size: 52428800,
      checksum: ''
    },
    {
      platform: 'darwin',
      arch: 'x64',
      version: '1.0.0',
      url: '/downloads/codeswitch-mac-x64.dmg',
      size: 52428800,
      checksum: ''
    },
    {
      platform: 'linux',
      arch: 'x64',
      version: '1.0.0',
      url: '/downloads/codeswitch-linux-x64.tar.gz',
      size: 41943040,
      checksum: ''
    }
  ]
}

/**
 * Format bytes to human readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

/**
 * Format number with unit (e.g., 1000000 -> 100万)
 */
export function formatQuota(quota: number): string {
  if (quota <= 0) return '无限'
  if (quota >= 100000000) return `${(quota / 100000000).toFixed(0)}亿`
  if (quota >= 10000) return `${(quota / 10000).toFixed(0)}万`
  return quota.toString()
}
