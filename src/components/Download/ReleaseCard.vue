<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Release, ReleaseArtifact } from '../../types/release'
import PlatformIcon from './PlatformIcon.vue'
import { useReleases } from '../../composables/useReleases'

interface Props {
  release: Release
  showAllArtifacts?: boolean
  isLatest?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showAllArtifacts: false,
  isLatest: false,
})

const { downloadArtifact, formatFileSize, getPlatformName, getArchName } = useReleases()

const showChangelog = ref(false)
const showChecksums = ref(false)

const releaseDate = computed(() => {
  const date = new Date(props.release.published_at)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const releaseTypeLabel = computed(() => {
  const labels: Record<string, string> = {
    stable: 'Stable',
    beta: 'Beta',
    alpha: 'Alpha',
  }
  return labels[props.release.release_type] || props.release.release_type
})

const releaseTypeColor = computed(() => {
  const colors: Record<string, string> = {
    stable: 'text-green-700 bg-green-50 border-green-300',
    beta: 'text-yellow-700 bg-yellow-50 border-yellow-300',
    alpha: 'text-orange-700 bg-orange-50 border-orange-300',
  }
  return colors[props.release.release_type] || 'text-ink-500 bg-cream-200 border-ink-100'
})

function handleDownload(artifact: ReleaseArtifact) {
  downloadArtifact(props.release.id, artifact.id)
}

function toggleChangelog() {
  showChangelog.value = !showChangelog.value
}

function toggleChecksums() {
  showChecksums.value = !showChecksums.value
}
</script>

<template>
  <div class="card-sketchy overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b-2 border-ink-100">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2 flex-wrap">
            <h3 class="text-xl font-bold text-ink-900">{{ release.title }}</h3>
            <span
              :class="[
                'px-2 py-0.5 text-xs font-medium rounded border',
                releaseTypeColor,
              ]"
            >
              {{ releaseTypeLabel }}
            </span>
            <span
              v-if="isLatest"
              class="px-2 py-0.5 text-xs font-medium rounded border text-ochre bg-yellow-50 border-ochre/30"
            >
              Latest
            </span>
          </div>
          <div class="flex items-center gap-4 text-sm text-ink-300">
            <span>v{{ release.version }}</span>
            <span>&middot;</span>
            <span>{{ releaseDate }}</span>
          </div>
          <p v-if="release.description" class="mt-2 text-ink-500">
            {{ release.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Download Buttons -->
    <div class="p-6 bg-cream-100/50">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
          v-for="artifact in release.artifacts"
          :key="artifact.id"
          @click="handleDownload(artifact)"
          class="p-4 bg-cream-50 border-2 border-ink-100 hover:border-ink-300 transition-all duration-200 flex items-center gap-3 text-left group"
          style="border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px"
        >
          <div class="w-10 h-10 rounded-lg bg-cream-200 flex items-center justify-center flex-shrink-0 group-hover:bg-ochre/20 transition-colors text-ink-500">
            <PlatformIcon :platform="artifact.platform" size="md" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-ink-900 font-medium truncate">
              {{ getPlatformName(artifact.platform) }} {{ getArchName(artifact.arch) }}
            </p>
            <p class="text-ink-300 text-sm">
              {{ formatFileSize(artifact.file_size) }}
            </p>
          </div>
          <svg
            class="w-5 h-5 text-ink-300 flex-shrink-0 group-hover:text-ochre transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>

      <!-- Download Statistics -->
      <div v-if="release.artifacts.length > 0" class="mt-4 pt-4 border-t-2 border-ink-100">
        <p class="text-sm text-ink-300">
          Downloads: {{ release.artifacts.reduce((sum, a) => sum + a.download_count, 0).toLocaleString() }}
        </p>
      </div>
    </div>

    <!-- Changelog Section -->
    <div v-if="release.changelog_md" class="border-t-2 border-ink-100">
      <button
        @click="toggleChangelog"
        class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cream-100/50 transition-colors"
      >
        <span class="text-ink-900 font-medium">Changelog</span>
        <svg
          :class="[
            'w-5 h-5 text-ink-300 transition-transform',
            showChangelog ? 'rotate-180' : '',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        v-if="showChangelog"
        class="px-6 pb-6"
      >
        <div class="text-ink-500 whitespace-pre-wrap text-sm">{{ release.changelog_md }}</div>
      </div>
    </div>

    <!-- Checksums Section -->
    <div class="border-t-2 border-ink-100">
      <button
        @click="toggleChecksums"
        class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cream-100/50 transition-colors"
      >
        <span class="text-ink-900 font-medium">SHA256 Checksums</span>
        <svg
          :class="[
            'w-5 h-5 text-ink-300 transition-transform',
            showChecksums ? 'rotate-180' : '',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div v-if="showChecksums" class="px-6 pb-6">
        <div class="space-y-3">
          <div
            v-for="artifact in release.artifacts"
            :key="artifact.id"
            class="p-3 bg-cream-200 border border-ink-100 rounded"
          >
            <p class="text-sm text-ink-500 mb-1">{{ artifact.filename }}</p>
            <code class="text-xs text-ink-300 font-mono break-all">
              {{ artifact.checksum_sha256 }}
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
