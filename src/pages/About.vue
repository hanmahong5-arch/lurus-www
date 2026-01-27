<script setup lang="ts">
</script>

<template>
  <div class="pt-16">
    <!-- Hero -->
    <section class="py-24 bg-gradient-to-b from-surface-dark to-surface">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">
          关于 Lurus
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          让 AI 开发更简单、更稳定、更高效
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="py-16 bg-surface">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-2xl font-bold text-white mb-4">我们的使命</h2>
            <p class="text-gray-400 leading-relaxed">
              在 AI 技术快速发展的今天，开发者面临着 API 访问不稳定、多模型切换困难、
              成本控制复杂等挑战。Lurus 致力于提供统一、稳定、高效的 AI 模型访问服务，
              让开发者专注于创造价值，而不是解决基础设施问题。
            </p>
          </div>
          <div class="bg-surface-dark rounded-2xl p-8 border border-gray-800">
            <div class="grid grid-cols-2 gap-6 text-center">
              <div>
                <div class="text-3xl font-bold text-primary mb-1">99.9%</div>
                <div class="text-gray-400 text-sm">服务可用性</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary mb-1">10+</div>
                <div class="text-gray-400 text-sm">支持模型</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary mb-1">&lt;100ms</div>
                <div class="text-gray-400 text-sm">平均延迟</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary mb-1">24/7</div>
                <div class="text-gray-400 text-sm">技术支持</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 bg-surface-dark">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">核心价值</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">可靠稳定</h3>
            <p class="text-gray-400 text-sm">
              多节点部署，智能容灾，确保服务 7x24 小时稳定运行
            </p>
          </div>

          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <div class="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">极致性能</h3>
            <p class="text-gray-400 text-sm">
              优化网络路由，就近接入，提供极低延迟的访问体验
            </p>
          </div>

          <div class="bg-surface rounded-xl p-6 border border-gray-800">
            <div class="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">透明定价</h3>
            <p class="text-gray-400 text-sm">
              简单清晰的定价模式，按需付费，没有隐藏费用
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="py-16 bg-surface">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">技术架构</h2>
        <div class="bg-surface-dark rounded-xl p-6 border border-gray-800">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">基础设施</h3>
              <ul class="text-gray-400 space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-primary"></span>
                  Kubernetes (K3s) 容器编排
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-primary"></span>
                  Traefik 网关 + Let's Encrypt TLS
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-primary"></span>
                  PostgreSQL + CNPG 数据库集群
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-primary"></span>
                  NATS JetStream 消息队列
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">监控运维</h3>
              <ul class="text-gray-400 space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-accent"></span>
                  Prometheus + Grafana 监控
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-accent"></span>
                  Loki 日志聚合
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-accent"></span>
                  Jaeger 分布式追踪
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-accent"></span>
                  ArgoCD GitOps 部署
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="py-16 bg-surface-dark">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">联系我们</h2>
        <p class="text-gray-400 mb-8">
          有任何问题或建议？我们很乐意听取你的反馈
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:support@lurus.cn"
            class="px-6 py-3 bg-surface rounded-lg border border-gray-800 hover:border-gray-700 text-white transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@lurus.cn
          </a>
          <a
            href="https://github.com/lurus-ai"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-surface rounded-lg border border-gray-800 hover:border-gray-700 text-white transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://docs.lurus.cn"
            class="px-6 py-3 bg-surface rounded-lg border border-gray-800 hover:border-gray-700 text-white transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            文档
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
