import { onMounted, onUnmounted, type Ref } from 'vue'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * Composable that adds IntersectionObserver-based scroll reveal to elements.
 * Respects prefers-reduced-motion by skipping animations.
 */
export function useScrollReveal(
  containerRef: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true
  } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // Skip animations if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      applyVisibleToAll()
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            if (once) {
              observer?.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold, rootMargin }
    )

    observeElements()
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  function observeElements() {
    if (!containerRef.value || !observer) return
    const targets = containerRef.value.querySelectorAll('.reveal-fade-up, .reveal-stagger')
    targets.forEach((el) => observer!.observe(el))
  }

  function applyVisibleToAll() {
    if (!containerRef.value) return
    const targets = containerRef.value.querySelectorAll('.reveal-fade-up, .reveal-stagger')
    targets.forEach((el) => el.classList.add('is-visible'))
  }
}
