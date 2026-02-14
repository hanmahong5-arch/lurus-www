/**
 * Unit tests for ReleaseCard component
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReleaseCard from '../ReleaseCard.vue'
import type { Release } from '../../../types/release'

const mockRelease: Release = {
  id: 1,
  product_id: 'lurus-switch',
  version: '1.0.0',
  title: 'Lurus Switch v1.0.0',
  description: 'Initial stable release',
  changelog_md: '## New Features\n- Feature A\n- Feature B',
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
      filename: 'lurus-switch-win-x64.exe',
      file_size: 47185920,
      mime_type: 'application/octet-stream',
      storage_path: 'lurus-switch/v1.0.0/lurus-switch-win-x64.exe',
      checksum_sha256: 'abc123def456',
      download_count: 42,
      created_at: '2026-02-01T00:00:00Z',
      updated_at: '2026-02-01T00:00:00Z',
    },
    {
      id: 2,
      release_id: 1,
      platform: 'darwin',
      arch: 'arm64',
      filename: 'lurus-switch-mac-arm64.dmg',
      file_size: 52428800,
      mime_type: 'application/octet-stream',
      storage_path: 'lurus-switch/v1.0.0/lurus-switch-mac-arm64.dmg',
      checksum_sha256: 'def456abc123',
      download_count: 38,
      created_at: '2026-02-01T00:00:00Z',
      updated_at: '2026-02-01T00:00:00Z',
    },
  ],
}

describe('ReleaseCard', () => {
  it('should render release information correctly', () => {
    const wrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
      },
    })

    expect(wrapper.text()).toContain('Lurus Switch v1.0.0')
    expect(wrapper.text()).toContain('1.0.0')
    expect(wrapper.text()).toContain('Stable')
  })

  it('should display latest badge when isLatest is true', () => {
    const wrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
        isLatest: true,
      },
    })

    expect(wrapper.text()).toContain('Latest')
  })

  it('should not display latest badge when isLatest is false', () => {
    const wrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
        isLatest: false,
      },
    })

    expect(wrapper.text()).not.toContain('Latest')
  })

  it('should render all artifacts', () => {
    const wrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
      },
    })

    expect(wrapper.text()).toContain('Windows')
    expect(wrapper.text()).toContain('macOS')
  })

  it('should display total download count', () => {
    const wrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
      },
    })

    const totalDownloads = 42 + 38
    expect(wrapper.text()).toContain(totalDownloads.toString())
  })

  it('should toggle changelog visibility', async () => {
    const wrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
      },
    })

    // Changelog should be hidden initially
    expect(wrapper.text()).toContain('Changelog')
    expect(wrapper.text()).not.toContain('New Features')

    // Find and click the changelog toggle button
    const buttons = wrapper.findAll('button')
    const changelogButton = buttons.find(b => b.text().includes('Changelog'))
    expect(changelogButton).toBeDefined()

    await changelogButton!.trigger('click')

    // Changelog content should be visible after toggle
    expect(wrapper.text()).toContain('New Features')
  })

  it('should display release type with correct styling', () => {
    const stableWrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
      },
    })
    expect(stableWrapper.text()).toContain('Stable')

    const betaRelease = { ...mockRelease, release_type: 'beta' as const }
    const betaWrapper = mount(ReleaseCard, {
      props: {
        release: betaRelease,
      },
    })
    expect(betaWrapper.text()).toContain('Beta')

    const alphaRelease = { ...mockRelease, release_type: 'alpha' as const }
    const alphaWrapper = mount(ReleaseCard, {
      props: {
        release: alphaRelease,
      },
    })
    expect(alphaWrapper.text()).toContain('Alpha')
  })

  it('should format file sizes correctly', () => {
    const wrapper = mount(ReleaseCard, {
      props: {
        release: mockRelease,
      },
    })

    expect(wrapper.text()).toContain('45 MB') // 47185920 bytes
    expect(wrapper.text()).toContain('50 MB') // 52428800 bytes
  })
})
