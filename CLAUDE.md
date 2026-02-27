# lurus-www

公司官网 + 营销落地页。Vue 3.5 SPA，静态构建后由 nginx 服务，通过 nginx 反代 `/api/*` 到 `api.lurus.cn`。

| 项 | 值 |
|---|---|
| URL | `https://www.lurus.cn`（`lurus.cn` 301 重定向至此） |
| Namespace | `lurus-www` |
| Image | `ghcr.io/hanmahong5-arch/lurus-www:main` |
| Dev port | `3001` |
| E2E base URL | `http://localhost:4173`（`bun run preview`） |

## Tech Stack

- Vue 3.5 + TypeScript + vue-router 4
- Vite 6 (build) / Vitest 4 (unit) / Playwright 1.58 (e2e)
- Tailwind CSS 4 (PostCSS plugin，注意：需要 `style-src 'unsafe-inline'` — 已在 CSP 中接受此风险)
- Bun（包管理 + 脚本运行器）
- nginx:alpine（生产服务器，多阶段 Docker 构建）

## Directory Structure

```
lurus-www/
├── src/
│   ├── pages/          # 页面组件 (Home, About, Pricing, Download, Solutions, Privacy, Terms, AuthCallback)
│   ├── components/     # 功能组件（按页面分子目录：Hero, Chat, Features, Portal, Products, CTAs…）
│   ├── composables/    # Vue composables (useAuth, useAIChat, useChatApi, useTracking, useReleases…)
│   ├── config/         # oidc.ts, pricing.ts（读取 env vars）
│   ├── constants/      # downloads.ts, ui.ts（无魔法数字）
│   ├── data/           # 静态数据文件（navItems, products, portalLinks, platformCapabilities…）
│   ├── services/       # api.ts（subscription plans, downloads API client）
│   ├── types/          # TypeScript 类型定义
│   └── utils/          # pkce.ts, clipboard.ts, portalDrag.ts
├── e2e/                # Playwright e2e 测试 (home.spec.ts, download.spec.ts)
├── deploy/
│   ├── nginx.conf      # 生产 nginx 配置（安全头、缓存策略、/api/ 反代）
│   └── k8s/            # K8s manifests (deployment, service, ingress, pdb, kustomization)
├── scripts/            # check-links.ts（链接健康检查）
├── Dockerfile          # node:20-alpine build → nginx:alpine serve
└── _bmad-output/       # BMAD 产物
```

## Commands

```bash
# 开发
bun install
bun run dev            # http://localhost:3001，/api/* 自动代理到 api.lurus.cn

# 构建
bun run build          # 输出到 dist/

# 单元测试
bun run test:unit      # vitest run（一次性）
bun run test:unit:watch  # vitest watch 模式

# E2E 测试（需先 build）
bun run test:e2e       # playwright test（自动启动 preview server）
bun run test:e2e:ui    # playwright UI 模式

# 其他
bun run lint           # eslint src/
bun run check-links    # 检查外链健康状态（tsx scripts/check-links.ts）
bun run preview        # vite preview，http://localhost:4173
```

## Environment Variables

构建时注入（`VITE_` 前缀，打包进静态资源，不含敏感值）：

| Variable | Default | 说明 |
|---|---|---|
| `VITE_API_URL` | `https://api.lurus.cn` | API base URL（含 tracking endpoint） |
| `VITE_ZITADEL_ISSUER` | `https://auth.lurus.cn` | Zitadel OIDC issuer |
| `VITE_ZITADEL_CLIENT_ID` | `""` | OIDC public client ID |
| `VITE_ZITADEL_REDIRECT_URI` | `{origin}/auth/callback` | OIDC callback URL |
| `VITE_ZITADEL_POST_LOGOUT_URI` | `{origin}` | 登出后跳转 |
| `VITE_CHAT_ENABLED` | — | `"true"` 启用 AI Chat（条件加载，独立 chunk） |
| `VITE_DEMO_API_KEY` | — | Chat demo 模式 API key |
| `VITE_ANALYTICS_ENABLED` | — | `"true"` 启用事件追踪（sendBeacon 批量上报） |
| `VITE_ICP_NUMBER` | — | 页脚 ICP 备案号 |

> 本地开发可创建 `.env.local` 覆盖（已 gitignore）。

## Key Patterns

- **Auth**: OIDC Authorization Code + PKCE，纯前端实现（`useAuth` composable），token 存 sessionStorage，自动 60s 提前刷新。
- **Chat chunk**: `Chat/` 组件 + 相关 composables 单独打包为 `chat` chunk（ADR-013），`VITE_CHAT_ENABLED` 控制是否加载。
- **静态数据集中管理**: `src/data/` 是单一数据源，禁止在组件内硬编码内容。
- **路径别名**: `@` → `src/`（vite + vitest 均配置）。
- **下载文件**: 生产环境挂载 hostPath `/opt/releases` → 容器 `/opt/releases`，nginx 通过 `/releases/` location 服务。

## BMAD

| Resource | Path |
|---|---|
| PRD | `./_bmad-output/planning-artifacts/prd.md` |
| Epics | `./_bmad-output/planning-artifacts/epics.md` |
| Architecture | `./_bmad-output/planning-artifacts/architecture.md` |
| UX Design | `./_bmad-output/planning-artifacts/ux-design-specification.md` |
| Product Brief | `./_bmad-output/planning-artifacts/product-brief.md` |
| Sprint Status | `./_bmad-output/sprint-status.yaml` |
| Stories | `./_bmad-output/implementation-artifacts/stories/` |
| Code Review | `./_bmad-output/code-review/` |
