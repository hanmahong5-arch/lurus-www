/**
 * Active Section Detection
 * Uses IntersectionObserver to track which section is currently visible
 * FR5: 访客可通过导航栏活动指示器识别当前所在区段
 */

import { ref, onMounted, onUnmounted } from 'vue'

const SECTION_IDS = ['products', 'portal'] as const
type SectionId = (typeof SECTION_IDS)[number]

const MIN_VISIBLE_RATIO = 0.1
const NAVBAR_HEIGHT_OFFSET = '-80px 0px 0px 0px'
const RATIO_THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

function isSectionId(id: string): id is SectionId {
  return (SECTION_IDS as readonly string[]).includes(id)
}

export function useActiveSection() {
  const activeSection = ref<SectionId | null>(null)
  const sectionRatios = ref<Map<string, number>>(new Map())

  let observer: IntersectionObserver | null = null

  const updateActiveSection = () => {
    let maxRatio = 0
    let maxSection: SectionId | null = null

    sectionRatios.value.forEach((ratio, id) => {
      if (ratio > maxRatio && isSectionId(id)) {
        maxRatio = ratio
        maxSection = id
      }
    })

    activeSection.value = maxRatio > MIN_VISIBLE_RATIO ? maxSection : null
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.value.set(entry.target.id, entry.intersectionRatio)
        })
        updateActiveSection()
      },
      {
        threshold: RATIO_THRESHOLDS,
        rootMargin: NAVBAR_HEIGHT_OFFSET,
      }
    )

    // Observe all sections
    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer?.observe(element)
      }
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    activeSection,
  }
}
