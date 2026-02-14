<script setup lang="ts">
import { ref, computed } from 'vue'
import { portalCategories } from '../../data/portalLinks'
import { useTracking } from '../../composables/useTracking'
import { useChatFeature } from '../../composables/useChatFeature'
import CTABar from '../CTAs/CTABar.vue'
import PortalChatPreview from './PortalChatPreview.vue'

const PREVIEW_LINK_COUNT = 4
const TOTAL_LINK_COUNT = 48

const { track } = useTracking()
const { isChatEnabled } = useChatFeature()
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

/**
 * Return the links to display for a given category.
 * In collapsed mode, show only the first PREVIEW_LINK_COUNT links.
 */
const getDisplayedLinks = (links: typeof portalCategories[number]['links']) => {
  if (isExpanded.value) {
    return links
  }
  return links.slice(0, PREVIEW_LINK_COUNT)
}

const toggleLabel = computed(() =>
  isExpanded.value ? '收起链接' : `探索全部 ${TOTAL_LINK_COUNT} 个链接`
)

const trackPortalClick = (linkName: string, category: string) => {
  track('portal_link_click', { link_name: linkName, link_category: category })
}
</script>

<template>
  <section id="portal" aria-label="知识门户" class="py-fib-7 bg-cream-100 relative overflow-hidden">
    <!-- Background texture -->
    <div class="absolute inset-0 opacity-[0.02]" aria-hidden="true" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>

    <!-- Corner decorations -->
    <div class="doodle-corner absolute top-8 left-8 opacity-40" aria-hidden="true"></div>
    <div class="doodle-corner absolute top-8 right-8 -scale-x-100 opacity-40" aria-hidden="true"></div>
    <div class="doodle-corner absolute bottom-8 left-8 -scale-y-100 opacity-40" aria-hidden="true"></div>
    <div class="doodle-corner absolute bottom-8 right-8 scale-[-1] opacity-40" aria-hidden="true"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-fib-6 reveal-fade-up">
        <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-3 font-semibold">
          知识门户
        </h2>
        <p class="text-phi-xl text-ink-500 max-w-2xl mx-auto">
          一站式访问学术、金融、科技、医疗、法律等专业资源
        </p>
      </div>

      <!-- Portal Content: 60/40 split when Chat is enabled, full-width otherwise -->
      <div
        data-testid="portal-content-layout"
        class="portal-content-layout"
        :class="{ 'has-chat': isChatEnabled }"
      >
        <!-- Left: Portal Categories (60% on desktop when Chat enabled) -->
        <div class="portal-links-area">
          <!-- Portal Categories Grid -->
          <!-- Desktop: 3 cols x 2 rows | Tablet: 2 cols x 3 rows | Mobile: 1 col x 6 rows -->
          <!-- When Chat enabled: Desktop drops to 2 cols to fit 60% width -->
          <div
            data-testid="portal-grid"
            class="grid gap-6 lg:gap-8 reveal-stagger"
            :class="isChatEnabled
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'"
          >
            <div
              v-for="category in portalCategories"
              :key="category.id"
              data-testid="portal-category-card"
              class="portal-category-card"
              :style="{ '--category-color': category.color }"
            >
              <!-- Category Header -->
              <div class="flex items-center gap-3 mb-5">
                <div
                  data-testid="category-color-dot"
                  class="w-4 h-4 rounded-full flex-shrink-0"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <h3 class="text-xl text-ink-900 font-semibold">{{ category.name }}</h3>
                <span class="text-sm text-ink-300">{{ category.nameEn }}</span>
              </div>

              <!-- Links Grid -->
              <div class="flex flex-wrap gap-3">
                <a
                  v-for="link in getDisplayedLinks(category.links)"
                  :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="portal-link-btn group"
                  :class="category.colorClass"
                  :title="link.desc"
                  @click="trackPortalClick(link.name, category.id)"
                >
                  <span>{{ link.name }}</span>
                  <svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Expand/Collapse Toggle -->
          <div class="text-center mt-fib-5">
            <button
              data-testid="portal-expand-toggle"
              class="btn-hand inline-flex items-center gap-2 text-ink-700 hover:text-ink-900"
              @click="toggleExpand"
            >
              <span>{{ toggleLabel }}</span>
              <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isExpanded }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Right: Chat Preview Card (40% on desktop, only when Chat enabled) -->
        <div v-if="isChatEnabled" class="portal-chat-area reveal-fade-up">
          <PortalChatPreview />
        </div>
      </div>
    </div>

    <!-- CTA Bar at bottom of Portal section -->
    <CTABar
      message="需要 API 访问？"
      :primary-cta="{
        text: '获取 API Key',
        href: 'https://api.lurus.cn',
        ariaLabel: '跳转到 API Key 注册页面'
      }"
    />
  </section>
</template>

<style scoped>
@reference "../../styles/main.css";

/* Portal content layout: side-by-side when Chat is enabled on desktop */
.portal-content-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.portal-content-layout.has-chat {
  /* Desktop: 60/40 split */
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 32px;
  }
}

.portal-links-area {
  flex: 1;
  min-width: 0;
}

.portal-content-layout.has-chat .portal-links-area {
  /* Desktop: take 60% width */
  @media (min-width: 1024px) {
    flex: 3;
  }
}

.portal-chat-area {
  /* Mobile: full width, stacked below portal grid */
  width: 100%;
}

.portal-content-layout.has-chat .portal-chat-area {
  /* Desktop: take 40% width, sticky positioning */
  @media (min-width: 1024px) {
    flex: 2;
    align-self: flex-start;
    position: sticky;
    top: 100px;
  }
}

.portal-category-card {
  background-color: var(--color-cream-50);
  border: 2px solid var(--color-ink-100);
  border-left: 4px solid var(--category-color);
  border-radius: 4px 15px 8px 12px / 12px 8px 15px 4px;
  padding: 28px;
  transition: all 0.3s ease;
}

.portal-category-card:hover {
  box-shadow: 4px 4px 0 var(--color-ink-100);
  transform: translate(-2px, -2px);
}
</style>
