/**
 * Mock release data for development/demo purposes
 * Remove this file when backend API is ready
 */

import type { Release } from '../types/release'

export const MOCK_RELEASES: Release[] = [
  {
    id: 1,
    product_id: 'lurus-switch',
    version: '1.0.0',
    title: 'Lurus Switch v1.0.0',
    description: 'Initial stable release with multi-provider API support',
    changelog_md: `## New Features

- Multi-provider API gateway support (Claude, OpenAI, Gemini)
- Cross-platform desktop application (Windows, macOS, Linux)
- Token management and usage tracking
- Real-time API status monitoring
- Customizable routing rules

## Improvements

- Optimized startup performance
- Enhanced error handling
- Improved UI/UX design

## Bug Fixes

- Fixed token expiration handling
- Resolved memory leak in long-running sessions
- Corrected Windows installer path issues`,
    release_type: 'stable',
    is_draft: false,
    is_prerelease: false,
    is_published: true,
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-01T00:00:00Z',
    published_at: '2026-02-01T00:00:00Z',
    artifacts: [
      {
        id: 1,
        release_id: 1,
        platform: 'windows',
        arch: 'x64',
        filename: 'lurus-switch-windows-x64-v1.0.0.exe',
        file_size: 47185920, // ~45 MB
        mime_type: 'application/octet-stream',
        storage_path: 'lurus-switch/v1.0.0/lurus-switch-windows-x64-v1.0.0.exe',
        checksum_sha256: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
        download_count: 1247,
        created_at: '2026-02-01T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
      {
        id: 2,
        release_id: 1,
        platform: 'darwin',
        arch: 'arm64',
        filename: 'lurus-switch-macos-arm64-v1.0.0.dmg',
        file_size: 52428800, // 50 MB
        mime_type: 'application/x-apple-diskimage',
        storage_path: 'lurus-switch/v1.0.0/lurus-switch-macos-arm64-v1.0.0.dmg',
        checksum_sha256: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3',
        download_count: 892,
        created_at: '2026-02-01T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
      {
        id: 3,
        release_id: 1,
        platform: 'darwin',
        arch: 'x64',
        filename: 'lurus-switch-macos-x64-v1.0.0.dmg',
        file_size: 52428800,
        mime_type: 'application/x-apple-diskimage',
        storage_path: 'lurus-switch/v1.0.0/lurus-switch-macos-x64-v1.0.0.dmg',
        checksum_sha256: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4',
        download_count: 534,
        created_at: '2026-02-01T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
      {
        id: 4,
        release_id: 1,
        platform: 'linux',
        arch: 'x64',
        filename: 'lurus-switch-linux-x64-v1.0.0.tar.gz',
        file_size: 44040192, // ~42 MB
        mime_type: 'application/gzip',
        storage_path: 'lurus-switch/v1.0.0/lurus-switch-linux-x64-v1.0.0.tar.gz',
        checksum_sha256: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5',
        download_count: 678,
        created_at: '2026-02-01T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
    ],
  },
  {
    id: 2,
    product_id: 'lurus-switch',
    version: '0.9.5',
    title: 'Lurus Switch v0.9.5 Beta',
    description: 'Beta release with experimental features',
    changelog_md: `## New Features (Beta)

- Experimental auto-retry mechanism
- Beta API caching layer
- Preview of new UI theme

## Known Issues

- Auto-retry may cause increased latency in some cases
- UI theme customization incomplete`,
    release_type: 'beta',
    is_draft: false,
    is_prerelease: true,
    is_published: true,
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
    artifacts: [
      {
        id: 5,
        release_id: 2,
        platform: 'windows',
        arch: 'x64',
        filename: 'lurus-switch-windows-x64-v0.9.5-beta.exe',
        file_size: 46137344,
        mime_type: 'application/octet-stream',
        storage_path: 'lurus-switch/v0.9.5-beta/lurus-switch-windows-x64-v0.9.5-beta.exe',
        checksum_sha256: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6',
        download_count: 234,
        created_at: '2026-01-15T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
    ],
  },
  {
    id: 3,
    product_id: 'lurus-cli',
    version: '0.5.0',
    title: 'Lurus CLI v0.5.0',
    description: 'Terminal-based UI for quick API access',
    changelog_md: `## New Features

- Interactive TUI with keyboard navigation
- Quick API key switching
- Real-time usage monitoring
- Export usage reports to CSV

## Improvements

- Faster startup time
- Reduced memory footprint
- Better error messages`,
    release_type: 'stable',
    is_draft: false,
    is_prerelease: false,
    is_published: true,
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-01-20T00:00:00Z',
    published_at: '2026-01-20T00:00:00Z',
    artifacts: [
      {
        id: 6,
        release_id: 3,
        platform: 'windows',
        arch: 'x64',
        filename: 'lurus-cli-windows-x64-v0.5.0.exe',
        file_size: 8388608, // 8 MB
        mime_type: 'application/octet-stream',
        storage_path: 'lurus-cli/v0.5.0/lurus-cli-windows-x64-v0.5.0.exe',
        checksum_sha256: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7',
        download_count: 456,
        created_at: '2026-01-20T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
      {
        id: 7,
        release_id: 3,
        platform: 'darwin',
        arch: 'universal',
        filename: 'lurus-cli-macos-universal-v0.5.0',
        file_size: 10485760, // 10 MB
        mime_type: 'application/octet-stream',
        storage_path: 'lurus-cli/v0.5.0/lurus-cli-macos-universal-v0.5.0',
        checksum_sha256: 'g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8',
        download_count: 312,
        created_at: '2026-01-20T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
      {
        id: 8,
        release_id: 3,
        platform: 'linux',
        arch: 'x64',
        filename: 'lurus-cli-linux-x64-v0.5.0',
        file_size: 7340032, // ~7 MB
        mime_type: 'application/octet-stream',
        storage_path: 'lurus-cli/v0.5.0/lurus-cli-linux-x64-v0.5.0',
        checksum_sha256: 'h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9',
        download_count: 289,
        created_at: '2026-01-20T00:00:00Z',
        updated_at: '2026-02-11T00:00:00Z',
      },
    ],
  },
]

/**
 * Get mock releases with optional filtering
 */
export function getMockReleases(options: {
  product_id?: string
  release_type?: 'stable' | 'beta' | 'alpha'
  include_prerelease?: boolean
  page?: number
  page_size?: number
} = {}) {
  const {
    product_id,
    release_type = 'stable',
    include_prerelease = false,
    page = 1,
    page_size = 20,
  } = options

  let filtered = [...MOCK_RELEASES]

  // Filter by product
  if (product_id) {
    filtered = filtered.filter(r => r.product_id === product_id)
  }

  // Filter by release type and prerelease
  if (!include_prerelease) {
    filtered = filtered.filter(r => !r.is_prerelease)
  }
  if (release_type) {
    filtered = filtered.filter(r => r.release_type === release_type)
  }

  // Sort by published date (newest first)
  filtered.sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  })

  // Pagination
  const total = filtered.length
  const start = (page - 1) * page_size
  const end = start + page_size
  const releases = filtered.slice(start, end)

  return {
    releases,
    total,
    page,
    page_size,
  }
}

/**
 * Get latest release for a product
 */
export function getMockLatestRelease(
  productId: string,
  currentVersion?: string
) {
  const productReleases = MOCK_RELEASES
    .filter(r => r.product_id === productId && !r.is_prerelease && r.is_published)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())

  const release = productReleases[0]
  if (!release) return null

  let has_update = false
  if (currentVersion) {
    has_update = release.version !== currentVersion
  }

  return {
    release,
    has_update,
  }
}
