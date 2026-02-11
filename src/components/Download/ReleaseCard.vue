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
    stable: '稳定版',
    beta: '测试版',
    alpha: '预览版',
  }
  return labels[props.release.release_type] || props.release.release_type
})

const releaseTypeColor = computed(() => {
  const colors: Record<string, string> = {
    stable: 'text-green-500 bg-green-500/10 border-green-500/30',
    beta: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    alpha: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
  }
  return colors[props.release.release_type] || 'text-gray-500 bg-gray-500/10 border-gray-500/30'
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
  <div class="bg-surface rounded-xl border border-gray-800 overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b border-gray-800">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-xl font-bold text-white">{{ release.title }}</h3>
            <span
              :class="[
                'px-2 py-1 text-xs font-medium rounded-md border',
                releaseTypeColor,
              ]"
            >
              {{ releaseTypeLabel }}
            </span>
            <span
              v-if="isLatest"
              class="px-2 py-1 text-xs font-medium rounded-md border text-primary bg-primary/10 border-primary/30"
            >
              最新版本
            </span>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-400">
            <span>版本 {{ release.version }}</span>
            <span>•</span>
            <span>{{ releaseDate }}</span>
          </div>
          <p v-if="release.description" class="mt-2 text-gray-400">
            {{ release.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Download Buttons -->
    <div class="p-6 bg-surface-dark">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
          v-for="artifact in release.artifacts"
          :key="artifact.id"
          @click="handleDownload(artifact)"
          class="p-4 bg-surface rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-200 flex items-center gap-3 text-left group"
        >
          <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <PlatformIcon :platform="artifact.platform" size="md" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white font-medium truncate">
              {{ getPlatformName(artifact.platform) }} {{ getArchName(artifact.arch) }}
            </p>
            <p class="text-gray-500 text-sm">
              {{ formatFileSize(artifact.file_size) }}
            </p>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-primary transition-colors"
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
      <div v-if="release.artifacts.length > 0" class="mt-4 pt-4 border-t border-gray-800">
        <p class="text-sm text-gray-500">
          总下载次数：{{ release.artifacts.reduce((sum, a) => sum + a.download_count, 0).toLocaleString() }}
        </p>
      </div>
    </div>

    <!-- Changelog Section -->
    <div v-if="release.changelog_md" class="border-t border-gray-800">
      <button
        @click="toggleChangelog"
        class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface-dark/50 transition-colors"
      >
        <span class="text-white font-medium">更新日志</span>
        <svg
          :class="[
            'w-5 h-5 text-gray-400 transition-transform',
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
        class="px-6 pb-6 prose prose-invert prose-sm max-w-none"
      >
        <div class="text-gray-400 whitespace-pre-wrap">{{ release.changelog_md }}</div>
      </div>
    </div>

    <!-- Checksums Section -->
    <div class="border-t border-gray-800">
      <button
        @click="toggleChecksums"
        class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface-dark/50 transition-colors"
      >
        <span class="text-white font-medium">文件校验和 (SHA256)</span>
        <svg
          :class="[
            'w-5 h-5 text-gray-400 transition-transform',
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
            class="p-3 bg-black/30 rounded-lg"
          >
            <p class="text-sm text-gray-400 mb-1">{{ artifact.filename }}</p>
            <code class="text-xs text-gray-500 font-mono break-all">
              {{ artifact.checksum_sha256 }}
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
