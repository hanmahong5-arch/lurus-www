/**
 * Release and Artifact Type Definitions
 * Types for download/release management system
 */

/**
 * Platform types supported by the system
 */
export type Platform = 'windows' | 'darwin' | 'linux' | 'android' | 'ios'

/**
 * Architecture types
 */
export type Architecture = 'x64' | 'arm64' | 'amd64' | 'universal'

/**
 * Release type categories
 */
export type ReleaseType = 'stable' | 'beta' | 'alpha'

/**
 * Download log status
 */
export type DownloadStatus = 'initiated' | 'completed' | 'failed'

/**
 * Release artifact (downloadable file)
 */
export interface ReleaseArtifact {
  id: number
  release_id: number
  platform: Platform
  arch: Architecture
  filename: string
  file_size: number
  mime_type: string
  storage_path: string
  checksum_sha256: string
  download_count: number
  created_at: string
  updated_at: string
}

/**
 * Release (version) information
 */
export interface Release {
  id: number
  product_id: string
  version: string
  title: string
  description: string
  changelog_md: string
  release_type: ReleaseType
  is_draft: boolean
  is_prerelease: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  published_at: string
  artifacts: ReleaseArtifact[]
}

/**
 * API response for release list
 */
export interface ReleaseListResponse {
  releases: Release[]
  total: number
  page: number
  page_size: number
}

/**
 * API response for latest release (with update check)
 */
export interface LatestReleaseResponse {
  release: Release
  has_update: boolean
}

/**
 * API response for changelog
 */
export interface ChangelogResponse {
  changelog_md: string
}

/**
 * Query parameters for fetching releases
 */
export interface FetchReleasesParams {
  product_id?: string
  release_type?: ReleaseType
  include_prerelease?: boolean
  page?: number
  page_size?: number
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
}
