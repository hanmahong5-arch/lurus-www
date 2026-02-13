# Development Process Log

跨 Session 交接的极简变更摘要。每条目 ≤ 15 行。

---

## 2026-02-10: BMAD Code Review 全流程 ✅

执行完整代码审查并修复所有关键问题。Story 3.3 (Primary CTA Button) 完成。

**安全修复**（3 个关键问题）：
- Navbar + PricingCards 外部链接添加 `rel="noopener noreferrer"`（防止 window.opener XSS）

**技术债务解决**（15+ 硬编码实例）：
- 创建 `src/constants/downloads.ts`, `src/constants/ui.ts`, `src/config/pricing.ts`
- 提取 Pricing.vue 内联组件为独立 Vue SFC（FaqItem, CheckIcon, MinusIcon）

**验证结果**：
- `bun run test` → 94/94 PASS（+12 新测试来自 Story 3.3）
- `bun run lint` → PASS（0 警告）
- TypeScript 严格检查 → PASS

**产出物**：3 份审查报告（review-report, security-fixes, tech-debt-resolution）
**状态**：✅ 生产就绪（Epic 2 全部完成，Epic 3 进行中 3/6）

---

## 2026-02-10: Story 3.4 开发文档创建

为 Epic 3 下一个 Story (次级 CTA 按钮) 创建详细开发文档。

**Story 内容**：
- SecondaryButton 组件：透明背景 + ochre 边框，视觉权重低于 Primary
- 集成到 HeroSection（主 CTA 旁边）
- Subtle hover 动效（bg-ochre/10），无 debounce（比 Primary 更轻量）

**文档结构**：AC、Tasks、设计规范、测试策略、实现计划、参考文档
**状态更新**：sprint-status.yaml 中 3-4 标记为 ready-for-dev

---

## 2026-02-11: 下载页面发布系统前端实现

实现完整的发布下载管理系统（前端部分），待后端 API 就绪后可直接启用。

**核心组件**：
- `src/types/release.ts` - 完整类型定义（Release, Artifact, Platform, Arch）
- `src/composables/useReleases.ts` - API 集成（fetch/download/utilities）
- `src/components/Download/PlatformIcon.vue` - 平台图标组件
- `src/components/Download/ReleaseCard.vue` - 发布卡片（下载、Changelog、校验和）
- `src/pages/Download.vue` - 重写完整下载页面（产品过滤、分页、状态处理）

**开发体验**：
- Mock 数据支持（`src/data/mockReleases.ts`）- 开发模式自动启用
- 完整测试覆盖：122 单元测试 PASS，E2E 测试已创建

**验证结果**：
- `bun run test` → 122/122 PASS（新增 20 测试）
- `bun run build` → PASS，Bundle < 150KB gzip ✅
- 类型检查 → PASS（无错误）

**API 集成（待后端）**：
- GET /api/v1/releases（列表+分页+过滤）
- GET /api/v1/releases/latest/:product（更新检查）
- GET /releases/:id/download/:artifact（302 重定向到 MinIO）

**文档**：`doc/download-system-implementation.md` 包含完整实现说明、API 规格、数据库设计
**状态**：⏳ 前端完成，待后端 API + MinIO + DB

---

## 2026-02-11: SSO Phase 1 前端实现（Cookie-based）

实现跨产品登录前端支持，主站可显示登录状态并跨域调用 api.lurus.cn 会话检查。

**核心实现**：
- `src/composables/useAuth.ts` - 会话管理（checkSession/login/logout），使用 credentials: 'include' 支持跨域 Cookie
- `src/components/Layout/Navbar.vue` - 登录状态展示（已登录显示用户名+头像，未登录显示登录/注册按钮）
- `src/data/navItems.ts` - 添加 getLoginUrl/getRegisterUrl 支持 redirect_url 参数

**用户体验**：
- 页面加载时自动检查会话状态（调用 GET /api/v1/auth/session）
- 已登录用户：Navbar 显示用户信息（用户名、头像）+ 退出按钮
- 未登录用户：Navbar 显示"登录"和"开始使用"按钮
- 点击登录跳转到 api.lurus.cn/login?redirect_url=<当前页面>，登录后返回原页面

**验证结果**：
- `bun run test` → 138/138 PASS（新增 10 测试）
- `bun run build` → PASS，Bundle < 150KB gzip ✅
- TypeScript 严格检查 → PASS（无错误）

**待后端配合**：
- lurus-api Session Domain 配置（Domain=".lurus.cn"）
- lurus-api 新增 GET /api/v1/auth/session 端点
- lurus-api CORS 配置允许 www.lurus.cn 跨域请求
- lurus-api OAuth redirect_url 参数支持

**状态**：⏳ 前端完成,待后端 API 修改

---

## 2026-02-13: Story 3.5 — CTABar 中间 CTA 条 ✅

实现可复用 CTABar 组件并集成到 Platform Overview 和 Portal 区段。Epic 3 全部完成。

**验证结果**：
- `bun run test` → 8/8 CTABar 测试 PASS
- `bun run build` → PASS (1.40s)
- 安全: 外部链接正确配置 target="_blank"
- a11y: 强制 ariaLabel (TypeScript interface)

**状态**：Epic 3 (6/6 stories) → done
