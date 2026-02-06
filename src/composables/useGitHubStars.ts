/**
 * GitHub Stars Integration
 * Fetches star count from GitHub API with caching and graceful degradation
 * FR36: GitHub repo link, FR37: Stars badge when ≥ 500
 * ADR-009: Runtime fetch with static fallback
 */

import { ref, onMounted } from 'vue'

const CACHE_KEY = 'lurus-github-stars'
const CACHE_DURATION_MS = 60 * 60 * 1000 // 1 hour
const FETCH_TIMEOUT_MS = 5000 // 5 seconds
const STAR_THRESHOLD = 500
const GITHUB_REPO = 'zetatechmx/lurus'
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`

interface CachedData {
  stars: number
  timestamp: number
}

export function useGitHubStars() {
  const stars = ref<number | null>(null)
  const isLoading = ref(true)
  const showBadge = ref(false)

  const fetchStars = async (): Promise<number | null> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}`,
        {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return typeof data.stargazers_count === 'number' ? data.stargazers_count : null
    } catch {
      clearTimeout(timeoutId)
      return null
    }
  }

  const getCachedData = (): CachedData | null => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const data: CachedData = JSON.parse(cached)
      const now = Date.now()

      // Check if cache is still valid
      if (now - data.timestamp < CACHE_DURATION_MS) {
        return data
      }

      // Cache expired
      sessionStorage.removeItem(CACHE_KEY)
      return null
    } catch {
      return null
    }
  }

  const setCachedData = (starCount: number): void => {
    try {
      const data: CachedData = {
        stars: starCount,
        timestamp: Date.now(),
      }
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
    } catch {
      // Silently fail if storage is full or unavailable
    }
  }

  onMounted(async () => {
    // Check cache first
    const cached = getCachedData()
    if (cached !== null) {
      stars.value = cached.stars
      showBadge.value = cached.stars >= STAR_THRESHOLD
      isLoading.value = false
      return
    }

    // Fetch from API
    const fetchedStars = await fetchStars()
    isLoading.value = false

    if (fetchedStars !== null) {
      stars.value = fetchedStars
      showBadge.value = fetchedStars >= STAR_THRESHOLD
      setCachedData(fetchedStars)
    }
    // If fetch fails, stars remains null and badge hidden (graceful degradation)
  })

  return {
    stars,
    showBadge,
    isLoading,
    githubUrl: GITHUB_URL,
  }
}
