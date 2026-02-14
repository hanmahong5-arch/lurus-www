<script setup lang="ts">
import { platformCapabilities, platformCapabilityIcons } from '@/data/platformCapabilities'
import { useApiHealth } from '@/composables/useApiHealth'
import CTABar from '../CTAs/CTABar.vue'
import CodeExampleShowcase from './CodeExampleShowcase.vue'
import DashboardPreview from './DashboardPreview.vue'
import InfrastructureHighlights from './InfrastructureHighlights.vue'
import ApiStatusBanner from './ApiStatusBanner.vue'

const { status: apiStatus } = useApiHealth()

/**
 * Retrieve SVG path for a given icon key.
 * Falls back to the 'layers' icon if key is not found.
 */
function getIconPath(iconKey: string): string {
  return platformCapabilityIcons[iconKey] || platformCapabilityIcons.layers
}
</script>

<template>
  <section
    id="platform"
    class="py-fib-7 bg-cream-100 relative overflow-hidden"
    aria-label="平台能力"
  >
    <!-- Decorative elements -->
    <div class="absolute top-12 right-12 doodle-corner -scale-x-100 opacity-40" aria-hidden="true"></div>
    <div class="absolute bottom-12 left-12 doodle-corner -scale-y-100 opacity-40" aria-hidden="true"></div>

    <!-- Subtle pattern -->
    <div
      class="absolute inset-0 opacity-[0.02]"
      style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 55px 55px;"
      aria-hidden="true"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-fib-6">
        <span class="inline-block px-4 py-2 border-sketchy-light text-ink-500 text-sm font-medium mb-fib-4">
          <span class="doodle-star mr-2" aria-hidden="true"></span>
          AI Gateway
        </span>
        <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4 font-semibold">
          构建与<span class="text-gradient-ochre underline-doodle">迭代</span>
        </h2>
        <p class="text-phi-xl text-ink-500 max-w-2xl mx-auto">
          统一 AI 网关，一个端点接入所有主流模型
        </p>
      </div>

      <!-- Two-column layout: capabilities grid + code showcase -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Capability Grid (left column on desktop) -->
        <div class="lg:col-span-7">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-stagger">
            <div
              v-for="(capability, index) in platformCapabilities"
              :key="capability.id"
              class="group card-sketchy p-8 hover-breathe"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <!-- Icon -->
              <div
                class="w-16 h-16 rounded-xl flex items-center justify-center mb-5 border-sketchy bg-ochre/10 group-hover:animate-wiggle"
              >
                <svg
                  class="w-8 h-8 text-ochre"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    :d="getIconPath(capability.icon)"
                  />
                </svg>
              </div>

              <!-- Content -->
              <h3 class="text-phi-xl text-ink-900 mb-3 group-hover:text-gradient-ochre transition-all duration-300 font-semibold">
                {{ capability.title }}
              </h3>
              <p class="text-ink-500 leading-relaxed">
                {{ capability.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Code Example Showcase (right column on desktop) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <!-- API Status Banner (shown only when unavailable) -->
          <ApiStatusBanner :status="apiStatus" />

          <CodeExampleShowcase />
        </div>
      </div>

      <!-- Dashboard Preview (full width, below the two-column layout) -->
      <DashboardPreview />

      <!-- Infrastructure Highlights (full width, below dashboard preview) -->
      <InfrastructureHighlights />
    </div>

    <!-- CTA Bar at bottom of Platform Overview section -->
    <CTABar
      message="想了解更多？"
      :primary-cta="{
        text: '获取 API Key',
        href: 'https://api.lurus.cn',
        ariaLabel: '跳转到 API Key 注册页面'
      }"
      :secondary-cta="{
        text: '查看文档',
        href: 'https://docs.lurus.cn',
        ariaLabel: '跳转到文档站点'
      }"
    />
  </section>
</template>

<style scoped>
@reference "../../styles/main.css";

.hover-breathe {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-breathe:hover {
  transform: scale(1.03);
  box-shadow: 5px 5px 0 var(--color-ink-100);
}

/* Disable hover-breathe animation when reduced motion is preferred */
@media (prefers-reduced-motion: reduce) {
  .hover-breathe {
    transition: none !important;
  }

  .hover-breathe:hover {
    transform: none;
  }
}
</style>
