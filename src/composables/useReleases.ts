/**
 * Composable for managing releases and downloads
 * Always fetches from real API; shows friendly error on failure
 */

import { ref, type Ref } from 'vue'
import type {
  Release,
  ReleaseListResponse,
  LatestReleaseResponse,
  FetchReleasesParams,
  ApiResponse,
  ReleaseArtifact,
} from '../types/release'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.lurus.cn'

export function useReleases() {
  const releases: Ref<Release[]> = ref([])
  const total: Ref<number> = ref(0)
  const currentPage: Ref<number> = ref(1)
  const pageSize: Ref<number> = ref(20)
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  async function fetchReleases(params: FetchReleasesParams = {}): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()

      if (params.product_id) queryParams.append('product_id', params.product_id)
      if (params.release_type) queryParams.append('release_type', params.release_type)
      if (params.include_prerelease !== undefined) {
        queryParams.append('include_prerelease', String(params.include_prerelease))
      }
      if (params.page) queryParams.append('page', String(params.page))
      if (params.page_size) queryParams.append('page_size', String(params.page_size))

      const url = `${API_BASE_URL}/api/releases?${queryParams.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<ReleaseListResponse> = await response.json()

      if (!result.success) {
        throw new Error(result.error || '获取发布列表失败')
      }

      releases.value = result.data.releases
      total.value = result.data.total
      currentPage.value = result.data.page
      pageSize.value = result.data.page_size
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取发布信息时发生未知错误'
      console.error('Failed to fetch releases:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchLatestRelease(
    productId: string,
    currentVersion?: string
  ): Promise<LatestReleaseResponse | null> {
    isLoading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      if (currentVersion) {
        queryParams.append('current_version', currentVersion)
      }

      const url = `${API_BASE_URL}/api/releases/latest/${productId}?${queryParams.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<LatestReleaseResponse> = await response.json()

      if (!result.success) {
        throw new Error(result.error || '获取最新版本失败')
      }

      return result.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取最新版本时发生未知错误'
      console.error('Failed to fetch latest release:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchReleaseById(releaseId: number): Promise<Release | null> {
    isLoading.value = true
    error.value = null

    try {
      const url = `${API_BASE_URL}/api/releases/${releaseId}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<Release> = await response.json()

      if (!result.success) {
        throw new Error(result.error || '获取发布详情失败')
      }

      return result.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取发布详情时发生未知错误'
      console.error('Failed to fetch release:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  function getDownloadUrl(releaseId: number, artifactId: number): string {
    return `${API_BASE_URL}/api/releases/${releaseId}/download/${artifactId}`
  }

  function downloadArtifact(releaseId: number, artifactId: number): void {
    const url = getDownloadUrl(releaseId, artifactId)
    window.location.href = url
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  function getPlatformName(platform: string): string {
    const names: Record<string, string> = {
      windows: 'Windows',
      darwin: 'macOS',
      linux: 'Linux',
      android: 'Android',
      ios: 'iOS',
    }
    return names[platform] || platform
  }

  function getArchName(arch: string): string {
    const names: Record<string, string> = {
      x64: 'x64',
      arm64: 'ARM64',
      amd64: 'AMD64',
      universal: 'Universal',
    }
    return names[arch] || arch
  }

  function findRecommendedArtifact(artifacts: ReleaseArtifact[]): ReleaseArtifact | null {
    const ua = navigator.userAgent.toLowerCase()
    let platform = 'windows'
    let arch = 'x64'

    if (ua.includes('mac')) {
      platform = 'darwin'
    } else if (ua.includes('linux')) {
      platform = 'linux'
    }

    if (ua.includes('arm64') || ua.includes('aarch64')) {
      arch = 'arm64'
    }

    const exact = artifacts.find(a => a.platform === platform && a.arch === arch)
    if (exact) return exact

    const platformMatch = artifacts.find(a => a.platform === platform)
    if (platformMatch) return platformMatch

    return artifacts[0] || null
  }

  return {
    releases,
    total,
    currentPage,
    pageSize,
    isLoading,
    error,
    fetchReleases,
    fetchLatestRelease,
    fetchReleaseById,
    getDownloadUrl,
    downloadArtifact,
    formatFileSize,
    getPlatformName,
    getArchName,
    findRecommendedArtifact,
  }
}
