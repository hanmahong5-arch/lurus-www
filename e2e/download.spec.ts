/**
 * E2E tests for Download page
 */

import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Download Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/download')
  })

  test('should load download page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Lurus/)
    await expect(page.locator('h1')).toContainText('下载中心')
  })

  test('should display product filter tabs', async ({ page }) => {
    const allProductsTab = page.getByRole('button', { name: '全部产品' })
    await expect(allProductsTab).toBeVisible()

    const switchTab = page.getByRole('button', { name: 'Lurus Switch' })
    await expect(switchTab).toBeVisible()

    const cliTab = page.getByRole('button', { name: 'Lurus CLI' })
    await expect(cliTab).toBeVisible()
  })

  test('should toggle prerelease filter', async ({ page }) => {
    const prereleaseCheckbox = page.locator('input[type="checkbox"]')
    await expect(prereleaseCheckbox).toBeVisible()

    // Should be unchecked by default
    await expect(prereleaseCheckbox).not.toBeChecked()

    // Toggle on
    await prereleaseCheckbox.click()
    await expect(prereleaseCheckbox).toBeChecked()
  })

  test('should switch between product tabs', async ({ page }) => {
    const switchTab = page.getByRole('button', { name: 'Lurus Switch' })
    const cliTab = page.getByRole('button', { name: 'Lurus CLI' })
    const allTab = page.getByRole('button', { name: '全部产品' })

    // Click Lurus Switch
    await switchTab.click()
    await expect(switchTab).toHaveClass(/bg-primary/)

    // Click Lurus CLI
    await cliTab.click()
    await expect(cliTab).toHaveClass(/bg-primary/)

    // Click All Products
    await allTab.click()
    await expect(allTab).toHaveClass(/bg-primary/)
  })

  test('should display installation guide section', async ({ page }) => {
    const installGuide = page.getByRole('heading', { name: '安装指南' })
    await expect(installGuide).toBeVisible()

    await expect(page.locator('text=Windows 安装')).toBeVisible()
    await expect(page.locator('text=macOS 安装')).toBeVisible()
    await expect(page.locator('text=Linux 安装')).toBeVisible()
  })

  test('should display system requirements section', async ({ page }) => {
    const sysReq = page.getByRole('heading', { name: '系统要求' })
    await expect(sysReq).toBeVisible()

    await expect(page.locator('text=Windows 10 或更高版本')).toBeVisible()
    await expect(page.locator('text=macOS 11 Big Sur 或更高版本')).toBeVisible()
    await expect(page.locator('text=Ubuntu 20.04+ / Debian 11+')).toBeVisible()
  })

  test('should pass accessibility checks', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })

  // Note: The following tests would require mocking the API or having a test backend
  // They are commented out but show the intended test coverage

  /*
  test.describe('with API mocked', () => {
    test.beforeEach(async ({ page }) => {
      // Mock API responses
      await page.route('**/api/v1/releases*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              releases: [
                {
                  id: 1,
                  product_id: 'lurus-switch',
                  version: '1.0.0',
                  title: 'Test Release v1.0.0',
                  description: 'Test description',
                  changelog_md: '## New Features\\n- Feature A\\n- Feature B',
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
                      filename: 'test-win-x64.exe',
                      file_size: 47185920,
                      mime_type: 'application/octet-stream',
                      storage_path: 'test/v1.0.0/test-win-x64.exe',
                      checksum_sha256: 'abc123def456',
                      download_count: 42,
                      created_at: '2026-02-01T00:00:00Z',
                      updated_at: '2026-02-01T00:00:00Z',
                    },
                  ],
                },
              ],
              total: 1,
              page: 1,
              page_size: 20,
            },
          }),
        })
      })

      await page.goto('/download')
    })

    test('should display release cards', async ({ page }) => {
      await expect(page.locator('text=Test Release v1.0.0')).toBeVisible()
      await expect(page.locator('text=稳定版')).toBeVisible()
      await expect(page.locator('text=最新版本')).toBeVisible()
    })

    test('should display download buttons', async ({ page }) => {
      await expect(page.locator('text=Windows x64')).toBeVisible()
    })

    test('should toggle changelog', async ({ page }) => {
      const changelogButton = page.getByRole('button', { name: '更新日志' })
      await changelogButton.click()

      await expect(page.locator('text=New Features')).toBeVisible()
      await expect(page.locator('text=Feature A')).toBeVisible()
    })

    test('should toggle checksums', async ({ page }) => {
      const checksumsButton = page.getByRole('button', { name: /文件校验和/ })
      await checksumsButton.click()

      await expect(page.locator('text=abc123def456')).toBeVisible()
    })

    test('should display pagination when needed', async ({ page }) => {
      // This would require mocking a response with more than 20 releases
      // Pagination should appear when total > page_size
    })
  })
  */
})
