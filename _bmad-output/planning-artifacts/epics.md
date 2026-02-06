---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments: ['prd.md', 'architecture.md', 'ux-design-specification.md']
status: complete
---

# lurus-www - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for lurus-www, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: 访客可通过固定顶部导航栏导航至任意主要区段
- FR2: 访客可展开下拉菜单浏览产品和资源链接列表
- FR3: 访客可从导航栏直接跳转至外部文档站点
- FR4: 访客可通过导航链接或 URL 锚点直达门户区段
- FR5: 访客可通过导航栏活动指示器识别当前所在区段
- FR6: 移动端访客可通过汉堡菜单访问全部导航选项
- FR7: 访客可通过隐藏的 Skip Link 跳至主内容区（无障碍）
- FR8: 访客可在导航栏和页脚看到品牌 Logo
- FR9: 访客可感知全站一致的手绘美学设计语言
- FR10: 访客可在终极 CTA 区段看到品牌标语
- FR11: 访客可在页脚看到 ICP 备案号（法规合规）
- FR12: 访客可一键复制 Hero 区段中的可执行 API 命令
- FR13: 访客可查看语法高亮的代码示例
- FR14: 访客可浏览 6 张平台能力卡片
- FR15: 访客可查看仪表盘预览或代码展示区块
- FR16: 访客可查看基础设施亮点摘要
- FR17: 系统在 API 不可达时展示降级状态（预录响应 + 状态提示）
- FR18: 系统在需认证的代码示例上标注"需 API Key"
- FR19: 访客可通过分类产品卡片浏览产品生态
- FR20: 访客可在每张产品卡片中查看截图或代码示例
- FR21: 访客可阅读每个产品的用例描述
- FR22: 访客可从产品卡片跳转至对应产品域名
- FR23: 访客可在产品区附近看到量化统计数字
- FR24: 访客可按 6 个分类浏览门户链接
- FR25: 访客可点击门户链接访问外部工具和资源
- FR26: 回访用户可通过书签/URL 在 3 秒内到达门户区段
- FR27: 系统在锚点直达门户时跳过滚动触发动效
- FR28: 访客可从专设区段导航至 3 个快速入口（API 文档、门户、GuShen）
- FR29: 访客可通过右下角浮动按钮打开 AI Chat 面板
- FR30: 访客可输入问题并接收流式 AI 回复
- FR31: 访客可从预设快捷提示开始对话
- FR32: 系统在 Chat 后端不可用时展示优雅降级提示
- FR33: 访客可点击主 CTA 按钮跳转至 API Key 注册页
- FR34: 访客可通过次级按钮访问联系页面或文档
- FR35: 访客在浏览过程中遇到中间 CTA 条可提前转化
- FR36: 访客可从导航栏访问 GitHub 仓库链接
- FR37: 系统在 GitHub Star 数超过阈值时显示数字徽标
- FR38: 访客可从页脚访问社交媒体链接（GitHub、Discord）
- FR39: 管理员可通过编辑集中数据文件更新网站内容
- FR40: 管理员可在部署前本地预览内容变更
- FR41: 管理员可通过自动化脚本检查外部链接健康状态
- FR42: 管理员可通过数据目录索引找到所有可配置内容位置
- FR43: 系统通过轻量信标追踪 CTA 点击事件
- FR44: 系统通过轻量信标追踪 AI Chat 打开事件
- FR45: 系统通过轻量信标追踪门户链接点击事件

### NonFunctional Requirements

**Performance:**
- NFR-P1: 滚动动画帧率 ≥ 60fps（requestAnimationFrame 驱动）
- NFR-P2: 一键复制操作延迟 < 100ms
- NFR-P3: Chat Panel 打开动画 ≤ 300ms（CSS transition，GPU 加速）
- NFR-P4: 图片懒加载不得导致可见区域内 CLS 增量
- NFR-P5: 首次有意义绘制不得被第三方资源阻塞

**Security:**
- NFR-S1: 全站 HTTPS 强制 + HSTS header
- NFR-S2: 所有用户可见文案 XSS 转义
- NFR-S3: Content-Security-Policy header
- NFR-S4: 外部链接使用 rel="noopener noreferrer"
- NFR-S5: 无敏感信息存储于客户端
- NFR-S6: curl 示例中不硬编码 API Key
- NFR-S7: 安全响应头（X-Frame-Options + X-Content-Type-Options + Referrer-Policy）
- NFR-S8: 依赖安全（bun.lockb 锁定 + CI 依赖审计）

**Accessibility:**
- NFR-A1: 自动化无障碍扫描通过（axe-core 零 critical/serious violations）
- NFR-A2: 所有可交互元素 focus 顺序符合视觉阅读顺序
- NFR-A3: Chat 流式消息使用 aria-live="polite"
- NFR-A4: 颜色不作为唯一信息传达手段

**Integration Resilience:**
- NFR-I1: api.lurus.cn 不可达时，静态内容正常展示
- NFR-I2: Chat 后端不可达时，显示降级提示
- NFR-I3: 外部产品链接不可达时，链接仍可点击
- NFR-I4: Google Fonts CDN 不可达时，降级为系统字体
- NFR-I5: GitHub Stars API 获取失败时静默降级
- NFR-I6: OG 图片自托管

**Build & Deploy:**
- NFR-B1: bun run build 零警告
- NFR-B2: TypeScript strict mode 编译通过
- NFR-B3: JS bundle ≤ 150KB gzip，CSS bundle ≤ 30KB gzip
- NFR-B4: Lighthouse CI Performance ≥ 90
- NFR-B5: 部署后自动验证首页 HTTP 200
- NFR-B6: 构建时间 ≤ 60s
- NFR-B7: CDN 缓存策略正确配置

### Additional Requirements

**From Architecture:**
- Brownfield 项目，基于现有 Vue 3.5 + Tailwind CSS 4 项目
- ADR-006/007: 数据集中化到 src/data/ + TypeScript 类型安全
- ADR-008: Nginx 安全头配置（CSP + HSTS + COOP + X-Frame-Options）
- ADR-009: GitHub Stars API 运行时 fetch + 静态回退值
- ADR-010: 外部 API 统一三态降级模式（loading → ready | unavailable）
- ADR-011: 测试策略（Vitest 4.x + Playwright 1.58 + @axe-core/playwright）
- ADR-012: 组件 a11y 接口规范（交互组件 props 必须包含 ariaLabel）
- ADR-013: Bundle 分块策略（vendor / chat / app）
- ADR-014: CI 质量门（7 阶段 pipeline）
- ADR-015: 环境变量管理（.env / .env.local / .env.production）
- ADR-016: Nginx 生产配置（gzip + 缓存 + SPA fallback）
- 字体自托管（WOFF2 子集到 public/fonts/）
- Chat defineAsyncComponent 懒加载

**From UX Design:**
- 响应式设计（4 断点：< 640px / 640-1024px / 1024-1440px / > 1440px）
- 动效系统（CSS transition，reveal-fade-up，hover-breathe，click-elastic）
- prefers-reduced-motion: reduce 全局禁用动画
- WCAG 2.1 AA 无障碍标准
- Caveat 手绘字体 + Inter/Noto Sans SC 正文字体
- Cream/Ink/Ochre 色彩体系
- Fibonacci 间距系统

### FR Coverage Map

| FR | Epic | 描述 |
|----|------|------|
| FR1 | Epic 2 | 导航栏导航 |
| FR2 | Epic 2 | 下拉菜单 |
| FR3 | Epic 2 | 文档站点跳转 |
| FR4 | Epic 2 | 门户锚点直达 |
| FR5 | Epic 2 | 区段活动指示器 |
| FR6 | Epic 2 | 移动端汉堡菜单 |
| FR7 | Epic 2 | Skip Link 无障碍 |
| FR8 | Epic 2 | 品牌 Logo |
| FR9 | Epic 2 | 手绘美学 |
| FR10 | Epic 2 | 品牌标语 |
| FR11 | Epic 2 | ICP 备案号 |
| FR12 | Epic 3 | 一键复制命令 |
| FR13 | Epic 3 | 语法高亮代码 |
| FR14 | Epic 5 | 平台能力卡片 |
| FR15 | Epic 5 | 仪表盘预览 |
| FR16 | Epic 5 | 基础设施亮点 |
| FR17 | Epic 5 | API 降级状态 |
| FR18 | Epic 5 | 认证标注 |
| FR19 | Epic 6 | 产品卡片 |
| FR20 | Epic 6 | 产品截图/代码 |
| FR21 | Epic 6 | 用例描述 |
| FR22 | Epic 6 | 产品域名跳转 |
| FR23 | Epic 6 | 统计数字 |
| FR24 | Epic 7 | 门户分类浏览 |
| FR25 | Epic 7 | 门户链接点击 |
| FR26 | Epic 7 | 回访快速到达 |
| FR27 | Epic 7 | 跳过滚动动效 |
| FR28 | Epic 7 | 快速入口 |
| FR29 | Epic 4 | Chat 浮动按钮 |
| FR30 | Epic 4 | 流式 AI 回复 |
| FR31 | Epic 4 | 快捷提示 |
| FR32 | Epic 4 | Chat 降级提示 |
| FR33 | Epic 3 | 主 CTA 按钮 |
| FR34 | Epic 3 | 次级按钮 |
| FR35 | Epic 3 | 中间 CTA 条 |
| FR36 | Epic 2 | GitHub 链接 |
| FR37 | Epic 2 | Stars 徽标 |
| FR38 | Epic 2 | 社交媒体链接 |
| FR39 | Epic 1 | 集中数据文件 |
| FR40 | Epic 1 | 本地预览 |
| FR41 | Epic 1 | 链接健康检查 |
| FR42 | Epic 1 | 数据目录索引 |
| FR43 | Epic 8 | CTA 点击追踪 |
| FR44 | Epic 8 | Chat 打开追踪 |
| FR45 | Epic 8 | 门户链接追踪 |

## Epic List

### Epic 1: 项目基础设施与质量保障
管理员可高效维护内容，开发有完善的质量保障体系，包括测试、CI 和安全配置。
**FRs covered:** FR39, FR40, FR41, FR42
**NFRs covered:** NFR-B1~B7, NFR-S1~S8
**ADRs:** ADR-006/007, ADR-011, ADR-014, ADR-015, ADR-008/016

### Epic 2: 导航与品牌框架 (Wave 1)
用户可通过导航栏访问网站各区段，体验一致的手绘品牌美学，包括 Logo、配色和字体。
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR10, FR11, FR36, FR37, FR38

### Epic 3: Hero 与技术信任 (Wave 1)
开发者可在 Hero 区段看到可执行的 curl 命令，一键复制验证 API 能力，建立技术信任并转化。
**FRs covered:** FR12, FR13, FR33, FR34, FR35

### Epic 4: AI Chat 体验 (Wave 1 Conditional)
用户可通过右下角浮动按钮打开 AI Chat 面板，获取即时帮助，系统在后端不可用时优雅降级。
**FRs covered:** FR29, FR30, FR31, FR32

### Epic 5: 平台能力展示 (Wave 2)
用户可浏览平台的 6 项核心能力、代码示例和基础设施亮点，系统在 API 不可达时展示降级状态。
**FRs covered:** FR14, FR15, FR16, FR17, FR18

### Epic 6: 产品生态发现 (Wave 2)
用户可通过产品卡片探索全栈产品生态系统，查看截图和用例描述，跳转至各产品域名。
**FRs covered:** FR19, FR20, FR21, FR22, FR23

### Epic 7: 门户与快速访问 (Wave 2)
用户可按分类浏览 48 个门户链接，回访用户可通过书签/URL 在 3 秒内到达门户区段。
**FRs covered:** FR24, FR25, FR26, FR27, FR28

### Epic 8: 分析与度量
系统通过轻量信标追踪 CTA 点击、Chat 打开和门户链接点击事件，支持数据驱动优化。
**FRs covered:** FR43, FR44, FR45

---

## Epic 1: 项目基础设施与质量保障

管理员可高效维护内容，开发有完善的质量保障体系，包括测试、CI 和安全配置。

### Story 1.1: 数据文件集中化

As a 管理员,
I want 所有网站内容数据集中存放在 src/data/ 目录,
So that 我可以通过编辑单一位置的文件来更新网站内容，无需搜索散落在组件中的硬编码数据。

**Acceptance Criteria:**

**Given** 项目中存在硬编码的导航菜单、产品列表、外部重定向等数据
**When** 开发者完成数据集中化重构
**Then** 以下数据文件存在于 src/data/ 目录:
- navItems.ts (导航菜单项)
- products.ts (产品列表)
- stats.ts (统计数字)
- externalRoutes.ts (外部重定向映射)
- chatModels.ts (Chat 模型选项)
- portalLinks.ts (已存在，保持不变)
**And** 所有组件通过 import 使用这些数据文件，不再有内联硬编码
**And** main.ts 中的重定向逻辑使用 externalRoutes.ts
**And** useAIChat 中的模型列表使用 chatModels.ts

**Given** src/data/ 目录存在
**When** 管理员查看该目录
**Then** 存在 README.md 索引文件，列出所有数据文件及其用途

**FRs:** FR39, FR42
**ADRs:** ADR-006

---

### Story 1.2: TypeScript 类型定义

As a 开发者,
I want 所有数据文件有对应的 TypeScript 接口定义,
So that 我在修改数据时可以获得类型检查和自动补全，避免运行时错误。

**Acceptance Criteria:**

**Given** src/data/ 目录中存在数据文件
**When** 开发者完成类型定义
**Then** src/types/ 目录包含以下类型文件:
- navigation.ts (NavItem, DropdownMenu 接口)
- products.ts (Product, ProductCategory 接口)
- common.ts (共享接口如 AriaProps)
**And** 每个数据文件使用 `as const satisfies readonly Type[]` 模式
**And** 所有数据文件导入使用 `import type { ... }`
**And** `tsc --noEmit` 零错误

**Given** 类型定义完成
**When** 开发者修改数据文件时输入错误的字段类型
**Then** TypeScript 编译器报错

**ADRs:** ADR-007

---

### Story 1.3: 测试基础设施配置

As a 开发者,
I want 项目配置好 Vitest 和 Playwright 测试框架,
So that 我可以编写和运行单元测试、组件测试和 E2E 测试。

**Acceptance Criteria:**

**Given** 项目当前无测试配置
**When** 开发者完成测试基础设施配置
**Then** 以下配置文件存在:
- vitest.config.ts (Vitest 配置，含 @vue/test-utils)
- playwright.config.ts (Playwright 配置，webServer 指向 vite preview)
**And** package.json 包含测试脚本:
- `test:unit` 运行 Vitest
- `test:e2e` 运行 Playwright
- `test` 运行所有测试
**And** 依赖已安装: vitest, @vue/test-utils, playwright, @axe-core/playwright

**Given** 测试配置完成
**When** 运行 `bun run test:unit`
**Then** Vitest 成功启动（即使没有测试文件）

**Given** 测试配置完成
**When** 运行 `bun run test:e2e`
**Then** Playwright 成功启动并打开浏览器

**ADRs:** ADR-011
**NFRs:** NFR-A1

---

### Story 1.4: CI 质量门配置

As a 开发者,
I want CI pipeline 包含完整的质量检查阶段,
So that 每次提交都经过类型检查、lint、测试和性能验证，确保代码质量。

**Acceptance Criteria:**

**Given** 项目当前 CI 仅有 Docker build
**When** 开发者完成 CI 配置更新
**Then** .github/workflows/build-www.yaml 包含以下阶段:
1. tsc --noEmit (零错误)
2. eslint --max-warnings=0
3. vitest run --coverage
4. vite build + bundle size check (JS < 150KB, CSS < 30KB gzip)
5. playwright test
6. Lighthouse CI (Performance ≥ 90)
7. Docker build + push
**And** 任一阶段失败则整个 pipeline 失败

**Given** CI 配置完成
**When** 提交代码触发 CI
**Then** 可在 GitHub Actions 界面看到所有阶段执行结果

**Given** bundle size 超过限制
**When** CI 运行 bundle size check
**Then** pipeline 失败并显示超标信息

**Given** CI 支持脚本
**When** 检查 scripts/ 目录
**Then** 存在 lighthouserc.js (Lighthouse CI 配置)
**And** 存在 check-bundle-size.js (bundle 体积校验脚本)

**FRs:** FR40
**ADRs:** ADR-014
**NFRs:** NFR-B1, NFR-B2, NFR-B3, NFR-B4, NFR-B6

---

### Story 1.5: ESLint 配置

As a 开发者,
I want 项目配置 ESLint 9 flat config,
So that 代码风格一致且潜在问题在提交前被发现。

**Acceptance Criteria:**

**Given** 项目当前无 ESLint 配置
**When** 开发者完成 ESLint 配置
**Then** eslint.config.js 存在并包含:
- Vue 3 plugin 规则
- TypeScript plugin 规则
- 禁止 console.log (warn)
- 禁止 any 类型 (error)
**And** package.json 包含 `lint` 脚本

**Given** ESLint 配置完成
**When** 运行 `bun run lint`
**Then** 扫描 src/ 目录所有 .ts 和 .vue 文件
**And** 零 error（可有 warning）

---

### Story 1.6: 安全头与 Nginx 配置

As a 运维人员,
I want Nginx 配置包含完整的安全响应头,
So that 网站符合安全最佳实践，防止 XSS、点击劫持等攻击。

**Acceptance Criteria:**

**Given** 当前 Nginx 配置缺少部分安全头
**When** 开发者更新 deploy/nginx.conf
**Then** 配置包含以下 header:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.lurus.cn; font-src 'self'; frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Cross-Origin-Opener-Policy: same-origin`
**And** gzip 压缩启用 (level 6)
**And** 带 hash 资产 `Cache-Control: public, max-age=31536000, immutable`
**And** index.html `Cache-Control: no-cache`
**And** SPA fallback `try_files $uri $uri/ /index.html`

**Given** Nginx 配置更新
**When** 部署后检查响应头
**Then** 所有安全头正确返回

**ADRs:** ADR-008, ADR-016
**NFRs:** NFR-S1, NFR-S3, NFR-S7, NFR-B7

---

### Story 1.7: 环境变量管理

As a 开发者,
I want 项目有清晰的环境变量管理体系,
So that 我可以在不同环境（开发/生产）使用不同配置，且不暴露敏感信息。

**Acceptance Criteria:**

**Given** 项目需要管理 API URL 和 Chat 开关等配置
**When** 开发者完成环境变量配置
**Then** 以下文件存在:
- .env (默认值，committed)
- .env.production (生产值，committed，无敏感信息)
- .gitignore 包含 .env.local
**And** src/env.d.ts 声明 ImportMetaEnv 类型:
```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_CHAT_ENABLED: string
}
```
**And** 所有环境变量使用 VITE_ 前缀

**Given** 环境变量配置完成
**When** 在代码中使用 `import.meta.env.VITE_API_URL`
**Then** TypeScript 正确推断类型

**ADRs:** ADR-015

---

### Story 1.8: 链接健康检查脚本

As a 管理员,
I want 有自动化脚本检查所有外部链接的可达性,
So that 我可以定期发现失效链接并及时修复。

**Acceptance Criteria:**

**Given** 网站包含多个外部链接（门户 48 个 + 产品卡 + 社交链接）
**When** 开发者创建链接检查脚本
**Then** scripts/check-links.ts 存在
**And** 脚本从 src/data/ 提取所有外部 URL
**And** 对每个 URL 发送 HEAD 请求检查可达性
**And** 输出报告列出失效链接

**Given** 链接检查脚本存在
**When** 运行 `bun run check-links`
**Then** 脚本执行并输出检查结果
**And** 失效链接以红色标记
**And** 脚本返回非零退出码（如有失效链接）

**FRs:** FR41

---

### Story 1.9: XSS 防护与内容安全

As a 开发者,
I want 确保所有用户可见内容经过 XSS 转义,
So that 网站免受注入攻击。

**Acceptance Criteria:**

**Given** 项目中有动态内容渲染
**When** 检查所有 Vue 模板
**Then** 所有数据绑定使用 v-text 或 {{ }} 模板语法
**And** 禁止使用 v-html（除非内容为受信常量且有注释说明）

**Given** 代码审查
**When** PR 提交
**Then** Code review checklist 包含 XSS 检查项
**And** 任何 v-html 使用需显式批准

**Given** src/data/ 中的静态数据
**When** 渲染到页面
**Then** 通过 Vue 模板自动转义

**NFRs:** NFR-S2

---

### Story 1.10: SEO 基础文件

As a 运维人员,
I want 网站包含基础 SEO 文件,
So that 搜索引擎可以正确索引网站。

**Acceptance Criteria:**

**Given** 项目构建完成
**When** 检查 public/ 目录
**Then** 存在 sitemap.xml，包含主要页面 URL
**And** 存在 robots.txt，允许所有爬虫并引用 sitemap

**Given** robots.txt
**When** 检查内容
**Then** 包含 `User-agent: *`
**And** 包含 `Allow: /`
**And** 包含 `Sitemap: https://lurus.cn/sitemap.xml`

**Given** sitemap.xml
**When** 检查内容
**Then** 包含首页 URL
**And** 格式符合 sitemap 协议规范

---

## Epic 2: 导航与品牌框架 (Wave 1)

用户可通过导航栏访问网站各区段，体验一致的手绘品牌美学，包括 Logo、配色和字体。

### Story 2.1: 字体自托管

As a 访客,
I want 页面字体快速加载无闪烁,
So that 我可以获得流畅的阅读体验。

**Acceptance Criteria:**

**Given** 项目当前使用 Google Fonts CDN
**When** 开发者完成字体自托管
**Then** public/fonts/ 目录包含 WOFF2 字体文件:
- Caveat (手绘标题)
- Inter (英文正文)
- Noto Sans SC (中文正文)

**Given** 字体文件存在
**When** 检查 CSS
**Then** @font-face 声明使用本地路径
**And** font-display: swap 确保文字先显示

**Given** 字体加载
**When** 检查 index.html
**Then** 关键字体使用 `<link rel="preload">`

**Given** Google Fonts CDN 不可用
**When** 页面加载
**Then** 页面正常渲染，使用本地字体
**And** 无外部 fonts.googleapis.com 请求

**FRs:** FR9
**NFRs:** NFR-I4, NFR-P5

---

### Story 2.2: Navbar 基础结构与 Logo

As a 访客,
I want 看到固定在顶部的导航栏和品牌 Logo,
So that 我可以随时访问网站的主要区段，并识别这是 Lurus 品牌。

**Acceptance Criteria:**

**Given** 访客打开网站
**When** 页面加载完成
**Then** 导航栏固定在视口顶部 (position: fixed)
**And** 左侧显示 Lurus Logo (Caveat 字体)
**And** 导航栏初始状态为透明背景

**Given** 访客向下滚动页面
**When** 滚动距离 > 0
**Then** 导航栏背景变为 `bg-cream-50/90 backdrop-blur-sm shadow-sm`

**Given** 导航栏渲染完成
**When** 检查 HTML 结构
**Then** 使用语义化 `<header>` 和 `<nav>` 标签
**And** Logo 是可点击的链接，指向首页

**FRs:** FR1, FR8

---

### Story 2.3: 下拉菜单系统

As a 访客,
I want 展开导航栏的下拉菜单查看产品和资源链接,
So that 我可以快速找到并访问感兴趣的内容。

**Acceptance Criteria:**

**Given** 导航栏包含 Products 和 Resources 菜单项
**When** 访客 hover 或 click Products
**Then** 展开下拉菜单显示: API Gateway, GuShen, Switch, Webmail, Docs
**And** 每个菜单项可点击跳转

**Given** 导航栏包含 Resources 菜单项
**When** 访客 hover 或 click Resources
**Then** 展开下拉菜单显示: Portal, Docs
**And** Portal 项点击后滚动至 #portal 锚点

**Given** 下拉菜单展开
**When** 访客点击菜单外部区域
**Then** 下拉菜单关闭

**Given** 下拉菜单展开
**When** 按 Escape 键
**Then** 下拉菜单关闭
**And** 焦点返回触发元素

**Given** 导航菜单数据
**When** 检查数据来源
**Then** 菜单项从 src/data/navItems.ts 读取，非硬编码

**FRs:** FR2, FR3

---

### Story 2.4: 区段活动指示器

As a 访客,
I want 导航栏高亮显示当前所在区段,
So that 我知道自己在页面的哪个位置。

**Acceptance Criteria:**

**Given** 页面包含多个区段 (Hero, Platform, Products, Portal 等)
**When** 访客滚动页面
**Then** IntersectionObserver 检测当前可见区段
**And** 对应的导航项显示活动状态 (`border-b-2 border-ochre`)

**Given** 多个区段同时可见
**When** 计算当前区段
**Then** 取占据视口比例最大的区段作为当前区段

**Given** 访客快速滚动
**When** 区段切换
**Then** 指示器平滑过渡，无闪烁

**Given** useScrollReveal composable
**When** 检查实现
**Then** 复用现有 composable 或扩展其功能

**FRs:** FR5

---

### Story 2.5: 移动端汉堡菜单

As a 移动端访客,
I want 通过汉堡菜单访问全部导航选项,
So that 我可以在小屏幕上方便地导航网站。

**Acceptance Criteria:**

**Given** 视口宽度 < 768px
**When** 页面渲染
**Then** 隐藏桌面导航项，显示汉堡菜单图标

**Given** 移动端显示汉堡图标
**When** 访客点击汉堡图标
**Then** 全屏覆盖导航菜单滑入
**And** 显示所有导航项（含下拉菜单内容展开）
**And** 背景遮罩覆盖页面内容

**Given** 移动端菜单展开
**When** 访客点击任意导航链接
**Then** 菜单关闭
**And** 页面滚动至对应区段

**Given** 移动端菜单展开
**When** 访客点击遮罩或关闭按钮
**Then** 菜单关闭

**Given** 移动端菜单
**When** 检查触控目标
**Then** 所有可点击元素 ≥ 44×44px

**FRs:** FR6

---

### Story 2.6: Skip Link 无障碍

As a 使用屏幕阅读器的访客,
I want 通过 Skip Link 跳过导航直接到达主内容,
So that 我不必每次都听完所有导航链接。

**Acceptance Criteria:**

**Given** 页面加载完成
**When** 用户按 Tab 键
**Then** 第一个获得焦点的元素是 Skip Link
**And** Skip Link 在获得焦点前视觉隐藏

**Given** Skip Link 获得焦点
**When** 检查可见性
**Then** Skip Link 变为可见（位于视口左上角）
**And** 显示文本"跳至主内容"

**Given** Skip Link 可见
**When** 用户按 Enter 或点击
**Then** 焦点移至 `<main id="main-content">` 元素
**And** 页面滚动至主内容起始位置

**Given** Skip Link 实现
**When** 检查 HTML
**Then** 使用 `<a href="#main-content">` 实现

**FRs:** FR7
**NFRs:** NFR-A2

---

### Story 2.7: 门户锚点导航

As a 回访用户,
I want 通过 URL 锚点或导航链接直达门户区段,
So that 我可以快速访问常用的门户链接。

**Acceptance Criteria:**

**Given** 访客访问 lurus.cn#portal
**When** 页面加载完成
**Then** 页面自动滚动至门户区段
**And** 滚动过程中跳过所有 scroll-triggered 动效

**Given** 访客点击 Resources > Portal
**When** 导航执行
**Then** 平滑滚动至 #portal 锚点
**And** URL 更新为 #portal

**Given** 门户区段
**When** 检查 HTML
**Then** 存在 `id="portal"` 属性

**Given** 锚点直达
**When** 检查动效
**Then** useScrollReveal 识别锚点导航并跳过动效触发

**FRs:** FR4, FR27

---

### Story 2.8: GitHub Stars 集成

As a 访客,
I want 在导航栏看到 GitHub 链接和 Star 数量,
So that 我可以访问开源仓库并了解项目受欢迎程度。

**Acceptance Criteria:**

**Given** 导航栏右侧
**When** 页面渲染
**Then** 显示 GitHub 图标链接
**And** 点击在新标签页打开 GitHub 仓库

**Given** GitHub Stars API 调用成功且 stars ≥ 500
**When** 数据返回
**Then** 在 GitHub 图标旁显示 stars 数字徽标

**Given** GitHub Stars < 500
**When** 数据返回
**Then** 仅显示图标，不显示数字

**Given** GitHub API 调用失败或超时 (5s)
**When** 错误发生
**Then** 静默降级，仅显示图标链接
**And** 不显示错误信息

**Given** GitHub Stars 数据
**When** 检查缓存
**Then** 使用 sessionStorage 缓存 1 小时
**And** 缓存期内不重复请求

**Given** useGitHubStars composable
**When** 检查实现
**Then** 新建 composable 实现上述逻辑

**FRs:** FR36, FR37
**ADRs:** ADR-009
**NFRs:** NFR-I5

---

### Story 2.9: Footer 基础结构

As a 访客,
I want 在页脚看到网站地图、品牌信息和社交链接,
So that 我可以找到更多资源并通过社交渠道联系。

**Acceptance Criteria:**

**Given** 页面滚动至底部
**When** Footer 可见
**Then** 显示 3 列链接结构:
- Products: API Gateway, GuShen, Switch, Webmail, Docs
- Developers: API 文档, 状态页, GitHub
- Company: 关于, 定价, 联系

**Given** Footer 渲染
**When** 检查底部区域
**Then** 显示 Lurus Logo (Caveat 签名风格)
**And** 显示 GitHub 和 Discord 社交链接图标
**And** 显示 ICP 备案号

**Given** 社交链接
**When** 访客点击
**Then** 在新标签页打开
**And** 链接包含 `rel="noopener noreferrer"`

**Given** Footer 数据
**When** 检查来源
**Then** 链接数据从 src/data/ 读取

**Given** 语义化 HTML
**When** 检查结构
**Then** 使用 `<footer>` 标签

**FRs:** FR8, FR11, FR38
**NFRs:** NFR-S4, NFR-I6

---

### Story 2.10: OG 图片自托管

As a 运维人员,
I want OG 社交分享图片自托管,
So that 社交平台分享不依赖外部 CDN。

**Acceptance Criteria:**

**Given** 网站需要社交分享预览
**When** 检查 OG meta 标签
**Then** og:image 指向自托管 URL (lurus.cn/og-image.png)

**Given** public/ 目录
**When** 检查资产
**Then** 存在 og-image.png (1200x630px)
**And** 图片展示品牌 Logo 和标语

**Given** 社交平台抓取
**When** 访问 og:image URL
**Then** 返回 200 状态码
**And** Content-Type: image/png

**NFRs:** NFR-I6

---

### Story 2.11: ReducedMotion 支持

As a 对动效敏感的访客,
I want 系统尊重我的 prefers-reduced-motion 设置,
So that 我不会因动画而感到不适。

**Acceptance Criteria:**

**Given** 用户系统设置 prefers-reduced-motion: reduce
**When** 页面加载
**Then** 所有 CSS 动画和过渡禁用或缩短至瞬时
**And** scroll-triggered 动效直接显示元素，无动画

**Given** useScrollReveal composable
**When** 检测到 reduced-motion 偏好
**Then** 跳过所有 reveal 动画
**And** 元素直接显示

**Given** CSS 层面
**When** 检查样式
**Then** 使用 `@media (prefers-reduced-motion: reduce)` 全局禁用动画
**And** transition-duration 设为 0ms

**Given** JavaScript 动画
**When** 检查实现
**Then** 使用 window.matchMedia('(prefers-reduced-motion: reduce)') 检测
**And** 在动画逻辑中跳过动效

**NFRs:** NFR-A4
**UX:** prefers-reduced-motion: reduce 全局禁用动画

---

## Epic 3: Hero 与技术信任 (Wave 1)

开发者可在 Hero 区段看到可执行的 curl 命令，一键复制验证 API 能力，建立技术信任并转化。

### Story 3.1: CodeShowcase 组件

As a 开发者访客,
I want 看到语法高亮的 curl 命令并一键复制,
So that 我可以立即在终端验证 API 能力。

**Acceptance Criteria:**

**Given** CodeShowcase 组件渲染
**When** 显示 curl 命令
**Then** 使用深色背景 + CSS-only 语法着色
**And** 关键词 (curl, https, Bearer) 有不同颜色高亮
**And** 无 Prism.js 或其他语法高亮库依赖

**Given** CodeShowcase 显示命令
**When** 访客点击复制按钮
**Then** 命令文本复制到剪贴板
**And** 按钮显示"已复制"反馈 (copy-flash 动效)
**And** 复制操作延迟 < 100ms

**Given** 复制功能
**When** 检查实现
**Then** 使用 navigator.clipboard.writeText API
**And** 封装在 src/utils/clipboard.ts

**Given** navigator.clipboard 不可用 (HTTP 或旧浏览器)
**When** 复制操作执行
**Then** 回退到 document.execCommand('copy')
**And** 显示相同的"已复制"反馈

**Given** Hero 区的 curl 命令
**When** 检查端点
**Then** 默认使用 `curl https://api.lurus.cn/v1/models` (免认证端点)
**And** 如使用需认证端点，显示"需 API Key"标注

**Given** CodeShowcase props
**When** 检查接口
**Then** 支持 `code: string`, `language: string`, `showLineNumbers?: boolean`, `ariaLabel: string`

**FRs:** FR12, FR13, FR18
**NFRs:** NFR-P2
**ADRs:** ADR-012 (ariaLabel)

---

### Story 3.2: Hero 双列布局

As a 访客,
I want 看到清晰的首屏布局，左侧是价值主张，右侧是技术演示,
So that 我可以在 3 秒内理解 Lurus 是什么并看到它的能力。

**Acceptance Criteria:**

**Given** 访客打开首页
**When** Hero 区段渲染
**Then** 显示双列布局:
- 左侧: 主标题 (phi-3xl/68px) + 副标题 (phi-lg) + CTA 按钮
- 右侧: 技术演示区 (CodeShowcase 或 ChatPreview)

**Given** 桌面视口 (≥ 1024px)
**When** Hero 渲染
**Then** 左右两列并排，比例约 50:50

**Given** 移动视口 (< 768px)
**When** Hero 渲染
**Then** 堆叠布局，标题在上，演示区在下
**And** 主标题缩小至 phi-2xl

**Given** Hero 主标题
**When** 检查内容
**Then** 标题传达"统一 AI 网关"定位
**And** 副标题说明 OpenAI 兼容 + 50+ 模型

**Given** HeroSection 组件
**When** 检查结构
**Then** 右侧使用 slot 或条件渲染，可接受不同内容组件

---

### Story 3.3: 主 CTA 按钮

As a 开发者访客,
I want 点击主 CTA 按钮跳转到 API Key 注册页,
So that 我可以获取 API Key 开始使用服务。

**Acceptance Criteria:**

**Given** Hero 区段渲染
**When** 查看 CTA 按钮
**Then** 显示主 CTA 按钮，文本为"获取 API Key"
**And** 使用 Primary 样式 (ochre 背景)

**Given** 访客点击主 CTA
**When** 点击事件触发
**Then** 跳转至 api.lurus.cn 注册页
**And** 在新标签页打开

**Given** CTA 按钮
**When** 检查样式
**Then** hover 状态有 hover-breathe 动效
**And** 点击有 click-elastic 反馈

**Given** CTA 按钮
**When** 检查无障碍
**Then** 有明确的 ariaLabel prop
**And** 焦点状态有 focus-ring 样式

**Given** CTA 按钮
**When** 用户快速连续点击
**Then** 防抖处理，300ms 内只触发一次跳转
**And** 防止重复打开多个标签页

**FRs:** FR33
**ADRs:** ADR-012 (ariaLabel)

---

### Story 3.4: 次级 CTA 按钮

As a 访客,
I want 通过次级按钮访问文档或联系页面,
So that 我可以了解更多信息或寻求帮助。

**Acceptance Criteria:**

**Given** Hero 区段或 Final CTA 区段
**When** 查看按钮组
**Then** 主 CTA 旁边显示次级按钮
**And** 次级按钮使用 Secondary 样式 (边框/ghost 样式)

**Given** 次级按钮
**When** 检查可能的文案
**Then** 可配置为"查看文档"、"联系我们"等
**And** 点击跳转对应页面

**Given** 次级按钮样式
**When** hover
**Then** 有视觉反馈但比主按钮更subtle

**FRs:** FR34

---

### Story 3.5: 中间 CTA 条

As a 访客,
I want 在浏览过程中看到轻量 CTA 提示,
So that 我可以在感兴趣时立即转化，不必滚动到页尾。

**Acceptance Criteria:**

**Given** Platform Overview 区段底部
**When** 区段渲染完成
**Then** 显示轻量 CTA 条
**And** 文案如"想了解更多？[获取 API Key] · [查看文档]"
**And** 背景为 `bg-cream-100`

**Given** Portal 区段底部
**When** 区段渲染完成
**Then** 显示轻量 CTA 条
**And** 文案如"需要 API 访问？[获取 API Key]"

**Given** CTA 条组件
**When** 检查复用性
**Then** 创建可复用的 CTABar 组件
**And** 支持 props: `message: string`, `primaryCta: {text, href}`, `secondaryCta?: {text, href}`

**Given** CTA 条
**When** 检查样式
**Then** 与主内容视觉区分
**And** 按钮使用小号样式

**FRs:** FR35

---

### Story 3.6: Final CTA 区段

As a 访客,
I want 在页面底部看到品牌标语和行动号召,
So that 我在浏览完内容后可以采取下一步行动。

**Acceptance Criteria:**

**Given** 访客滚动至页面底部 (Footer 之前)
**When** Final CTA 区段可见
**Then** 显示品牌标语 (Caveat 字体, phi-2xl)
**And** 标语如"全栈自建，匠心品质。"

**Given** Final CTA 区段
**When** 查看按钮
**Then** 显示双按钮:
- [获取 API Key] (Primary)
- [联系我们] (Secondary)

**Given** Final CTA 区段
**When** 检查布局
**Then** 内容居中
**And** 上下有大面积留白 (fib-7 间距)

**Given** Final CTA 区段
**When** 检查语义
**Then** 使用 `<section>` 标签
**And** 有 `aria-label="行动号召"`

**FRs:** FR10, FR33, FR34

---

## Epic 4: AI Chat 体验 (Wave 1 Conditional)

用户可通过右下角浮动按钮打开 AI Chat 面板，获取即时帮助，系统在后端不可用时优雅降级。

### Story 4.1: Chat 条件加载架构

As a 开发者,
I want Chat 组件通过环境变量控制是否加载,
So that 在 Chat 后端未就绪时可以完全排除 Chat 功能，不影响发布。

**Acceptance Criteria:**

**Given** .env 文件中定义 VITE_CHAT_ENABLED
**When** VITE_CHAT_ENABLED=false
**Then** Chat 相关组件不加载、不渲染
**And** bundle 中不包含 Chat 代码 (tree-shaking)

**Given** VITE_CHAT_ENABLED=true
**When** 页面加载
**Then** Chat 组件通过 defineAsyncComponent 懒加载
**And** Chat 代码打包到独立 chunk (约 25-35KB gzip)

**Given** App.vue 中的 Chat 组件
**When** 检查实现
**Then** 使用条件渲染: `v-if="isChatEnabled"`
**And** 使用 defineAsyncComponent 包装

**Given** Chat chunk
**When** 检查 vite.config.ts
**Then** manualChunks 配置将 components/Chat/* 打包为 'chat' chunk

**ADRs:** ADR-001, ADR-013

---

### Story 4.2: ChatFloatingTrigger 组件

As a 访客,
I want 在页面右下角看到 Chat 浮动按钮,
So that 我可以随时打开 AI Chat 获取帮助。

**Acceptance Criteria:**

**Given** 页面加载且 VITE_CHAT_ENABLED=true
**When** 访客滚动离开 Hero 区段
**Then** 右下角出现 Chat 浮动按钮 (IntersectionObserver 检测)
**And** 按钮使用 ochre 背景 + Chat 图标

**Given** 访客在 Hero 区段
**When** Hero 在视口中
**Then** 浮动按钮隐藏 (Hero 右侧已有 ChatPreview)

**Given** 浮动按钮可见
**When** hover
**Then** 显示 hover-breathe 动效

**Given** 浮动按钮
**When** 访客点击
**Then** 触发 Chat Panel 展开
**And** 按钮变为关闭图标

**Given** 移动端视口 (< 768px)
**When** 页面渲染
**Then** 浮动按钮是 Chat 的唯一入口 (ChatPreview 隐藏)
**And** 按钮位置适配移动端 (底部安全距离)

**Given** 浮动按钮
**When** 检查无障碍
**Then** props 包含 ariaLabel="打开 AI 对话"
**And** 可通过 Tab 键聚焦

**FRs:** FR29
**ADRs:** ADR-012 (ariaLabel)

---

### Story 4.3: ChatPreview 组件

As a 访客,
I want 在 Hero 右侧看到 Chat 预览卡,
So that 我可以直观了解 AI Chat 功能并快速开始对话。

**Acceptance Criteria:**

**Given** Hero 区段渲染且 Chat 可用
**When** ChatPreview 显示
**Then** 显示品牌图标 + "Lurus AI 对话" 标题
**And** 显示 2-3 个 Quick Prompts 预览
**And** 显示"开始对话"按钮

**Given** ChatPreview "开始对话"按钮
**When** 访客点击
**Then** 触发 Chat Panel 展开
**And** 焦点移至 Chat 输入框

**Given** Chat 后端不可用
**When** ChatPreview 渲染
**Then** 显示 unavailable 状态
**And** 展示产品截图轮播或静态演示
**And** 按钮文案变为"即将开放"

**Given** 移动端视口 (< 768px)
**When** Hero 渲染
**Then** ChatPreview 隐藏
**And** 用户通过 ChatFloatingTrigger 访问 Chat

**Given** ChatPreview 组件
**When** 检查 props
**Then** 接收来自 useAIChat 的状态 (isAvailable, quickPrompts)

**FRs:** FR29, FR31
**NFRs:** NFR-I2

---

### Story 4.4: Chat 快捷提示

As a 访客,
I want 看到预设的快捷提示,
So that 我可以快速开始对话而不必想问什么问题。

**Acceptance Criteria:**

**Given** Chat Panel 打开且无历史消息
**When** 面板渲染
**Then** 显示 3-5 个 Quick Prompts 按钮
**And** 示例: "Lurus API 如何计费？"、"如何接入 50+ AI 模型？"

**Given** Quick Prompts 显示
**When** 访客点击某个 Prompt
**Then** 该 Prompt 文本自动填入输入框
**And** 自动发送消息

**Given** Chat 有历史消息
**When** 面板打开
**Then** Quick Prompts 隐藏或收起
**And** 显示历史消息

**Given** Quick Prompts 数据
**When** 检查来源
**Then** 从 src/data/chatPrompts.ts 读取
**And** 支持配置化修改

**FRs:** FR31

---

### Story 4.5: Chat 降级处理

As a 访客,
I want 在 Chat 后端不可用时看到友好提示,
So that 我知道服务暂时不可用而不是遇到错误。

**Acceptance Criteria:**

**Given** Chat API 调用失败或超时 (30s)
**When** 错误发生
**Then** 显示友好提示"AI 对话暂时不可用，请稍后再试"
**And** 不显示技术错误信息或堆栈

**Given** 网络断开
**When** useNetworkStatus 检测到离线
**Then** Chat 输入框禁用
**And** 显示"网络已断开"提示

**Given** Chat 后端持续不可用
**When** 多次重试失败 (3 次指数退避)
**Then** 停止重试
**And** 提供"查看文档"替代入口

**Given** ChatPreview unavailable 状态
**When** 渲染
**Then** 显示静态内容 (截图或预录对话演示)
**And** 不显示错误状态

**Given** useChatApi composable
**When** 检查实现
**Then** 30s 超时 + 3 次重试 + 指数退避 (现有逻辑保持)

**FRs:** FR32
**NFRs:** NFR-I2
**ADRs:** ADR-010

---

### Story 4.6: Chat 流式响应与无障碍

As a 访客,
I want 看到 AI 回复逐字流式显示,
So that 我可以更快开始阅读响应内容。

**Acceptance Criteria:**

**Given** 访客发送消息
**When** AI 开始响应
**Then** 回复内容逐字/逐块流式显示
**And** 显示打字指示器 (ChatTypingIndicator)

**Given** 流式响应进行中
**When** 检查性能
**Then** 渲染不阻塞 UI
**And** 滚动自动跟随最新内容

**Given** 流式响应
**When** 检查无障碍
**Then** 消息容器有 aria-live="polite"
**And** 不打断屏幕阅读器当前朗读内容

**Given** Chat Panel 打开
**When** 检查动画
**Then** 展开动画 ≤ 300ms (CSS transition)
**And** 使用 GPU 加速 (transform + opacity)

**Given** Chat Panel 打开
**When** 检查焦点管理
**Then** 焦点 trap 在面板内
**And** 按 Escape 关闭面板

**FRs:** FR30
**NFRs:** NFR-P3, NFR-A3

---

## Epic 5: 平台能力展示 (Wave 2)

用户可浏览平台的 6 项核心能力、代码示例和基础设施亮点，系统在 API 不可达时展示降级状态。

### Story 5.1: 平台能力卡片网格

As a 访客,
I want 浏览 6 张平台能力卡片,
So that 我可以了解 Lurus API Gateway 的核心功能。

**Acceptance Criteria:**

**Given** Platform Overview 区段渲染
**When** 访客查看能力展示
**Then** 显示 6 个能力图标卡:
- 50+ 模型
- 负载均衡
- 自动回退
- 响应缓存
- 实时监控
- OpenAI 兼容

**Given** 能力卡片
**When** 检查布局
**Then** 桌面端 3×2 或 2×3 网格
**And** 移动端单列堆叠

**Given** 能力卡片
**When** 检查样式
**Then** 使用 card-sketchy 容器
**And** 每卡含图标 + 标题 + 一句描述

**Given** 能力卡片
**When** hover
**Then** 显示 hover-breathe 微动效

**Given** 区段
**When** 检查 Badge
**Then** 顶部显示 "AI Gateway" 标签

**FRs:** FR14

---

### Story 5.2: 代码示例展示

As a 开发者访客,
I want 看到完整的 curl 请求和响应示例,
So that 我可以了解 API 的使用方式和返回格式。

**Acceptance Criteria:**

**Given** Platform Overview 区段
**When** 代码展示区渲染
**Then** 显示 CodeShowcase 组件
**And** 包含完整 curl 请求示例
**And** 包含 JSON 响应示例

**Given** 代码示例
**When** 检查内容
**Then** 请求示例展示典型 API 调用
**And** 响应示例展示模型列表或 chat completion 格式

**Given** 代码示例
**When** 需要认证的端点
**Then** 显示"需 API Key"标注 (FR18)

**Given** 代码示例布局
**When** 桌面端
**Then** 与能力卡片并列 (左卡片右代码 或 上卡片下代码)

**FRs:** FR13, FR18

---

### Story 5.3: 仪表盘预览

As a 访客,
I want 看到 Lurus 控制台的仪表盘预览,
So that 我可以了解监控和管理界面的样子。

**Acceptance Criteria:**

**Given** Platform Overview 区段
**When** 仪表盘预览区渲染
**Then** 显示 Dashboard 截图 (card-sketchy 容器)
**And** 截图展示关键监控指标

**Given** Dashboard 截图不可用
**When** 资产缺失
**Then** 降级为 CodeShowcase 代码块
**And** 展示 API 响应示例

**Given** 预览图片
**When** 检查加载
**Then** 使用 lazy loading
**And** 有 placeholder 防止 CLS

**FRs:** FR15
**NFRs:** NFR-P4

---

### Story 5.4: 基础设施亮点

As a 访客,
I want 了解平台的基础设施规模,
So that 我可以对服务的稳定性和专业性有信心。

**Acceptance Criteria:**

**Given** Platform Overview 区段下半部
**When** 基础设施亮点渲染
**Then** 显示 4 个亮点条目:
- K8s 集群 (5 节点)
- GitOps 流水线
- 开源 (如实描述)
- 混合云架构

**Given** 亮点条目
**When** 检查样式
**Then** 轻量化展示: icon + 一行描述
**And** 横向排列 (桌面 4 列，移动堆叠)
**And** 不使用重型卡片

**Given** Platform Overview 区段
**When** 检查底部
**Then** 显示轻量 CTA 条 (Story 3.5)

**FRs:** FR16

---

### Story 5.5: API 降级状态

As a 访客,
I want 在 API 不可达时仍能看到产品能力,
So that 我的浏览体验不会因后端问题而中断。

**Acceptance Criteria:**

**Given** api.lurus.cn 不可达
**When** 页面加载
**Then** 所有静态内容正常显示
**And** CodeShowcase 显示预录响应示例
**And** 显示"服务维护中"状态提示

**Given** API 降级状态
**When** 检查视觉
**Then** 状态提示使用中性色调
**And** 不显示错误红色或 panic 信息

**Given** 降级内容
**When** 检查数据
**Then** 预录响应存储在 src/data/ 中
**And** 与实际 API 响应格式一致

**FRs:** FR17
**NFRs:** NFR-I1
**ADRs:** ADR-010

---

## Epic 6: 产品生态发现 (Wave 2)

用户可通过产品卡片探索全栈产品生态系统，查看截图和用例描述，跳转至各产品域名。

### Story 6.1: 产品主卡与架构图

As a 访客,
I want 看到产品生态的全景概览,
So that 我可以理解 Lurus 的全栈自建规模。

**Acceptance Criteria:**

**Given** Products 区段渲染
**When** 主卡显示
**Then** 全宽卡片展示"全栈自建，从 AI 网关到量化交易到企业邮件"
**And** 包含平台架构插图 (可选)

**Given** 区段
**When** 检查 Badge
**Then** 顶部显示 "Product Ecosystem" 标签

**Given** 主卡
**When** 检查布局
**Then** 横跨全宽
**And** 下方是 2×2 产品子卡网格

**FRs:** FR19

---

### Story 6.2: 产品子卡组件

As a 访客,
I want 通过产品卡片了解每个产品,
So that 我可以找到感兴趣的产品并深入了解。

**Acceptance Criteria:**

**Given** Products 区段
**When** 子卡网格渲染
**Then** 显示 4 张产品卡:
- API Gateway (赭金标识)
- GuShen 量化 (鼠尾草绿标识)
- Webmail 邮件 (产品色标识)
- Switch 桌面 (赤陶橙标识)

**Given** 每张产品卡
**When** 检查内容
**Then** 包含: 产品色标识 + 截图或代码块 + 标题 + use case 一句描述 + CTA 按钮

**Given** 产品卡 CTA
**When** 访客点击
**Then** 在新标签页打开对应产品域名
**And** 链接包含 rel="noopener noreferrer"

**Given** 产品卡
**When** hover
**Then** 显示 hover-breathe 效果

**Given** 产品卡布局
**When** 桌面端
**Then** 2×2 网格
**When** 移动端
**Then** 单列堆叠

**FRs:** FR19, FR21, FR22
**NFRs:** NFR-S4

---

### Story 6.3: 产品截图与降级

As a 访客,
I want 在产品卡中看到真实截图,
So that 我可以预览产品界面建立信任。

**Acceptance Criteria:**

**Given** GuShen 产品卡
**When** 截图可用
**Then** 显示策略编辑器截图
**And** 截图展示自然语言输入界面

**Given** GuShen 截图不可用
**When** 降级
**Then** 显示策略代码片段
**And** 配合自然语言描述文案

**Given** API Gateway 产品卡
**When** 渲染
**Then** 显示 CodeShowcase curl 示例
**And** 描述"3 行代码接入 50+ AI 模型"

**Given** Webmail/Switch 产品卡
**When** 截图不可用
**Then** 显示功能列表或配置代码片段

**Given** 产品截图
**When** 检查加载
**Then** lazy loading + WebP 格式
**And** 有 placeholder 防止 CLS

**FRs:** FR20
**NFRs:** NFR-P4

---

### Story 6.4: 统计数字展示

As a 访客,
I want 在产品区附近看到量化统计数字,
So that 我可以对平台规模有直观认识。

**Acceptance Criteria:**

**Given** Products 区段附近
**When** Stats 展示
**Then** 显示关键统计数字:
- 50+ AI 模型
- 680+ 测试用例
- 其他相关指标

**Given** 统计数字
**When** 检查来源
**Then** 从 src/data/stats.ts 读取

**Given** 统计数字
**When** 检查样式
**Then** 作为信任锚点，与产品卡视觉关联
**And** Wave 1 无计数动画，Wave 2 可选添加

**Given** StatsCounter 组件
**When** 检查复用性
**Then** 提取自 Home.vue 现有实现

**FRs:** FR23

---

## Epic 7: 门户与快速访问 (Wave 2)

用户可按分类浏览 48 个门户链接，回访用户可通过书签/URL 在 3 秒内到达门户区段。

### Story 7.1: 门户分类浏览

As a 访客,
I want 按分类浏览门户链接,
So that 我可以快速找到需要的工具或资源。

**Acceptance Criteria:**

**Given** Portal 区段渲染 (id="portal")
**When** 门户预览卡显示
**Then** 展示 6 个分类标签
**And** 每个分类下显示代表性链接

**Given** 门户预览卡
**When** 检查样式
**Then** 使用 card-sketchy 大卡
**And** 可选 3D 微倾斜效果 (参照 Mastra Book tilt)

**Given** 门户链接总数
**When** 检查
**Then** 支持展示全部 48 个链接
**And** 可折叠/展开完整列表

**Given** "探索全部"按钮
**When** 访客点击
**Then** 展开完整链接列表
**Or** 跳转到专门的门户页面

**FRs:** FR24

---

### Story 7.2: 门户链接交互

As a 访客,
I want 点击门户链接访问外部资源,
So that 我可以快速到达需要的工具。

**Acceptance Criteria:**

**Given** 门户链接
**When** 访客点击
**Then** 在新标签页打开外部 URL
**And** 链接包含 rel="noopener noreferrer"

**Given** 门户链接
**When** hover
**Then** 显示视觉反馈
**And** 可选显示链接描述 tooltip

**Given** 门户链接数据
**When** 检查来源
**Then** 从 src/data/portalLinks.ts 读取 (已存在)

**Given** 门户链接
**When** 检查无障碍
**Then** 有明确的链接文本
**And** 新标签页打开有 aria 提示

**FRs:** FR25
**NFRs:** NFR-S4

---

### Story 7.3: 回访快速到达

As a 回访用户,
I want 通过书签直接到达门户区段,
So that 我每天第一个页面可以快速访问常用工具。

**Acceptance Criteria:**

**Given** 回访用户访问 lurus.cn#portal
**When** 页面加载
**Then** ≤ 3 秒内滚动至门户区段
**And** 门户区段在视口中完全可见

**Given** 锚点直达
**When** 滚动发生
**Then** 跳过所有 scroll-triggered 动效 (FR27)
**And** 无动画延迟

**Given** useScrollReveal
**When** 检测到 hash 导航
**Then** 标记为锚点直达模式
**And** 所有 .reveal-* 元素直接显示

**Given** 门户区段性能
**When** Wave 2 新增区段
**Then** 回归测试确保 #portal 跳转速度不受影响

**FRs:** FR26, FR27

---

### Story 7.4: AI Chat 门户预览

As a 访客,
I want 在门户区段看到 AI Chat 预览,
So that 我可以通过对话快速定位链接。

**Acceptance Criteria:**

**Given** Portal 区段
**When** 布局渲染
**Then** 门户卡 60% + Chat 预览卡 40% (桌面端)
**And** 移动端堆叠

**Given** AI Chat 预览卡
**When** 显示
**Then** 品牌图标 + "Lurus AI 对话"
**And** Quick Prompts 预览
**And** "开始对话" CTA

**Given** "开始对话"按钮
**When** 访客点击
**Then** 触发 ChatFloatingTrigger 展开 Chat Panel

**Given** Portal 区段底部
**When** 渲染
**Then** 显示轻量 CTA 条 "需要 API 访问？[获取 API Key]"

**FRs:** FR28

---

### Story 7.5: Getting Started 快速入口

As a 访客,
I want 从专设区段导航至核心入口,
So that 我可以快速开始使用 Lurus。

**Acceptance Criteria:**

**Given** Getting Started 区段渲染
**When** 显示
**Then** 标题"开始使用 Lurus"
**And** 3 个图标链接按钮:
- API 文档 (→ docs.lurus.cn)
- 门户链接 (→ #portal)
- GuShen 量化 (→ gushen.lurus.cn)

**Given** 外部链接按钮
**When** 访客点击
**Then** 在新标签页打开

**Given** 内部锚点按钮 (#portal)
**When** 访客点击
**Then** 平滑滚动至门户区段

**Given** 按钮布局
**When** 渲染
**Then** 居中排列
**And** 间距 fib-4

**FRs:** FR28

---

## Epic 8: 分析与度量

系统通过轻量信标追踪 CTA 点击、Chat 打开和门户链接点击事件，支持数据驱动优化。

### Story 8.1: 事件追踪基础设施

As a 产品经理,
I want 追踪关键用户行为事件,
So that 我可以分析用户转化漏斗并优化体验。

**Acceptance Criteria:**

**Given** useTracking composable (已存在)
**When** 检查功能
**Then** 支持 sendBeacon API 发送事件
**And** 事件发送不阻塞用户交互

**Given** 事件数据
**When** 发送
**Then** 包含: eventName, timestamp, 页面 URL
**And** 不包含个人身份信息

**Given** sendBeacon 失败
**When** 发送出错
**Then** 静默失败，不影响用户体验
**And** 不显示错误信息

**Given** 追踪端点
**When** 检查配置
**Then** 发送至 /api/track (Nginx 代理至 lurus-api)

**NFRs:** NFR-S5

---

### Story 8.2: 核心事件埋点

As a 产品经理,
I want 追踪 3 个核心事件,
So that 我可以衡量关键转化指标。

**Acceptance Criteria:**

**Given** 主 CTA 按钮 ("获取 API Key")
**When** 访客点击
**Then** 触发 `cta_click` 事件
**And** 事件包含 button_location (hero/final/cta_bar)

**Given** Chat 浮动按钮或 ChatPreview "开始对话"
**When** 访客点击打开 Chat
**Then** 触发 `chat_open` 事件

**Given** 门户链接
**When** 访客点击任意门户链接
**Then** 触发 `portal_link_click` 事件
**And** 事件包含 link_category, link_name

**Given** 事件触发
**When** 检查实现
**Then** 在对应组件的 click handler 中调用 useTracking

**Given** 埋点覆盖
**When** 验证
**Then** 3 个事件均可在开发者工具 Network 面板看到 sendBeacon 请求

**FRs:** FR43, FR44, FR45
