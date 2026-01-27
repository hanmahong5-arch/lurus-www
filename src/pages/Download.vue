<script setup lang="ts">
import DownloadSection from '../components/Download/DownloadSection.vue'
</script>

<template>
  <div class="pt-16">
    <!-- Page Header -->
    <section class="py-16 bg-surface-dark">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
          下载中心
        </h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          获取 CodeSwitch 客户端，支持 Windows、macOS 和 Linux
        </p>
      </div>
    </section>

    <!-- Download Section -->
    <DownloadSection />

    <!-- Installation Guide -->
    <section class="py-16 bg-surface-dark">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          安装指南
        </h2>

        <div class="space-y-8">
          <!-- Windows -->
          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-9.91.09V5.79L20 3zm0 18l-9.91-1.82V13l9.91.09V21zM3 13l6 .09v6.72l-6-1.06V13z"/>
              </svg>
              Windows 安装
            </h3>
            <ol class="text-gray-400 space-y-2 list-decimal list-inside">
              <li>下载 <code class="text-primary">codeswitch-win-x64.exe</code> 安装包</li>
              <li>双击运行安装程序，按照向导完成安装</li>
              <li>安装完成后，从开始菜单启动 CodeSwitch</li>
              <li>在设置中输入你的 API Token 即可开始使用</li>
            </ol>
          </div>

          <!-- macOS -->
          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              macOS 安装
            </h3>
            <ol class="text-gray-400 space-y-2 list-decimal list-inside">
              <li>下载对应芯片版本的 <code class="text-primary">.dmg</code> 文件</li>
              <li>双击打开 DMG 文件</li>
              <li>将 CodeSwitch 拖入 Applications 文件夹</li>
              <li>首次运行时，右键点击应用选择"打开"以绕过 Gatekeeper</li>
              <li>在设置中输入你的 API Token 即可开始使用</li>
            </ol>
          </div>

          <!-- Linux -->
          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/>
              </svg>
              Linux 安装
            </h3>
            <ol class="text-gray-400 space-y-2 list-decimal list-inside">
              <li>下载 <code class="text-primary">codeswitch-linux-x64.tar.gz</code></li>
              <li>
                解压文件：
                <code class="block mt-1 p-2 bg-black/30 rounded text-sm">tar -xzf codeswitch-linux-x64.tar.gz</code>
              </li>
              <li>
                运行安装脚本或直接启动：
                <code class="block mt-1 p-2 bg-black/30 rounded text-sm">./codeswitch</code>
              </li>
              <li>在设置中输入你的 API Token 即可开始使用</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- CLI Usage -->
    <section class="py-16 bg-surface">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          命令行工具配置
        </h2>

        <div class="bg-surface-dark rounded-xl p-6 border border-gray-800">
          <p class="text-gray-400 mb-4">
            CodeSwitch 启动后会在本地提供代理服务，你可以配置各种 AI 开发工具使用它：
          </p>

          <div class="space-y-6">
            <!-- Claude Code -->
            <div>
              <h4 class="text-white font-medium mb-2">Claude Code</h4>
              <code class="block p-3 bg-black/30 rounded text-sm text-gray-300">
                export ANTHROPIC_BASE_URL=http://localhost:18100<br>
                export ANTHROPIC_API_KEY=sk-your-token
              </code>
            </div>

            <!-- OpenAI -->
            <div>
              <h4 class="text-white font-medium mb-2">OpenAI SDK / ChatGPT CLI</h4>
              <code class="block p-3 bg-black/30 rounded text-sm text-gray-300">
                export OPENAI_BASE_URL=http://localhost:18100/v1<br>
                export OPENAI_API_KEY=sk-your-token
              </code>
            </div>

            <!-- Gemini -->
            <div>
              <h4 class="text-white font-medium mb-2">Gemini CLI</h4>
              <code class="block p-3 bg-black/30 rounded text-sm text-gray-300">
                export GEMINI_API_BASE=http://localhost:18100<br>
                export GEMINI_API_KEY=sk-your-token
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
