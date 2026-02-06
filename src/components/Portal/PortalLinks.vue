<script setup lang="ts">
import { portalCategories } from '../../data/portalLinks'
import { useTracking } from '../../composables/useTracking'

const { track } = useTracking()
const trackPortalClick = (linkName: string, category: string) => {
  track('portal_click', { link: linkName, category })
}
</script>

<template>
  <section id="portal" class="py-fib-7 bg-cream-100 relative overflow-hidden">
    <!-- Background texture -->
    <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>

    <!-- Corner decorations -->
    <div class="doodle-corner absolute top-8 left-8 opacity-40"></div>
    <div class="doodle-corner absolute top-8 right-8 -scale-x-100 opacity-40"></div>
    <div class="doodle-corner absolute bottom-8 left-8 -scale-y-100 opacity-40"></div>
    <div class="doodle-corner absolute bottom-8 right-8 scale-[-1] opacity-40"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-fib-6">
        <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-3 font-semibold">
          知识门户
        </h2>
        <p class="text-phi-xl text-ink-500 max-w-2xl mx-auto">
          一站式访问学术、金融、科技、医疗、法律等专业资源
        </p>
      </div>

      <!-- Portal Categories Grid -->
      <!-- Desktop: 3 cols x 2 rows | Tablet: 2 cols x 3 rows | Mobile: 1 col x 6 rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="category in portalCategories"
          :key="category.id"
          class="portal-category-card"
          :style="{ '--category-color': category.color }"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-4 h-4 rounded-full flex-shrink-0"
              :style="{ backgroundColor: category.color }"
            ></div>
            <h3 class="text-xl text-ink-900 font-semibold">{{ category.name }}</h3>
            <span class="text-sm text-ink-300">{{ category.nameEn }}</span>
          </div>

          <!-- Links Grid -->
          <div class="flex flex-wrap gap-3">
            <a
              v-for="link in category.links"
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
              <svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../styles/main.css";

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
