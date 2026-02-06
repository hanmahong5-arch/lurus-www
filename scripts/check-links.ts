#!/usr/bin/env tsx
/**
 * Link Health Check Script
 * Validates all external links in src/data/ are reachable
 * FR41: 管理员可通过自动化脚本检查外部链接健康状态
 */

import { portalCategories } from '../src/data/portalLinks'
import { products } from '../src/data/products'
import { navItems, ctaLinks } from '../src/data/navItems'

// ANSI colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  dim: '\x1b[2m',
}

interface LinkCheckResult {
  url: string
  source: string
  status: number | 'error'
  ok: boolean
  error?: string
}

const TIMEOUT_MS = 10000
const CONCURRENT_LIMIT = 5

/**
 * Extract all external URLs from data sources
 */
function collectUrls(): { url: string; source: string }[] {
  const urls: { url: string; source: string }[] = []

  // Portal links (48 links)
  for (const category of portalCategories) {
    for (const link of category.links) {
      urls.push({ url: link.url, source: `portal/${category.id}/${link.name}` })
    }
  }

  // Product URLs
  for (const product of products) {
    if (product.url && product.url !== '#') {
      urls.push({ url: product.url, source: `product/${product.id}` })
    }
  }

  // Nav items with external flag
  for (const item of navItems) {
    if ('external' in item && item.external && item.path.startsWith('http')) {
      urls.push({ url: item.path, source: `nav/${item.name}` })
    }
  }

  // CTA links
  urls.push({ url: ctaLinks.login, source: 'cta/login' })
  urls.push({ url: ctaLinks.register, source: 'cta/register' })

  return urls
}

/**
 * Check a single URL with HEAD request
 */
async function checkUrl(url: string, source: string): Promise<LinkCheckResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Lurus-Link-Checker/1.0',
      },
    })

    return {
      url,
      source,
      status: response.status,
      ok: response.ok,
    }
  } catch (err) {
    const error = err as Error
    return {
      url,
      source,
      status: 'error',
      ok: false,
      error: error.name === 'AbortError' ? 'Timeout' : error.message,
    }
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Check URLs with concurrency limit
 */
async function checkUrlsWithLimit(
  urls: { url: string; source: string }[],
  limit: number
): Promise<LinkCheckResult[]> {
  const results: LinkCheckResult[] = []
  const queue = [...urls]

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift()
      if (item) {
        const result = await checkUrl(item.url, item.source)
        results.push(result)
        printResult(result)
      }
    }
  }

  const workers = Array(Math.min(limit, urls.length))
    .fill(null)
    .map(() => worker())

  await Promise.all(workers)
  return results
}

/**
 * Print single result to console
 */
function printResult(result: LinkCheckResult) {
  const statusStr =
    result.status === 'error' ? `ERR: ${result.error}` : `${result.status}`

  if (result.ok) {
    console.log(
      `${colors.green}✓${colors.reset} ${colors.dim}[${statusStr}]${colors.reset} ${result.source}`
    )
  } else {
    console.log(
      `${colors.red}✗${colors.reset} ${colors.red}[${statusStr}]${colors.reset} ${result.source} ${colors.dim}${result.url}${colors.reset}`
    )
  }
}

/**
 * Main entry point
 */
async function main() {
  console.log(`${colors.blue}Link Health Check${colors.reset}\n`)

  const urls = collectUrls()
  console.log(`Checking ${urls.length} URLs...\n`)

  const results = await checkUrlsWithLimit(urls, CONCURRENT_LIMIT)

  // Summary
  const passed = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok).length

  console.log(`\n${colors.blue}Summary${colors.reset}`)
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`)

  if (failed > 0) {
    console.log(`${colors.red}Failed: ${failed}${colors.reset}`)
    console.log(`\n${colors.red}Failed URLs:${colors.reset}`)

    for (const result of results.filter((r) => !r.ok)) {
      console.log(`  ${colors.red}•${colors.reset} ${result.url} (${result.source})`)
    }

    process.exit(1)
  }

  console.log(`\n${colors.green}All links healthy!${colors.reset}`)
}

main().catch((err) => {
  console.error(`${colors.red}Error:${colors.reset}`, err)
  process.exit(1)
})
