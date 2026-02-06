# Story 1.5: ESLint 配置

Status: done

## Story

As a 开发者,
I want 项目配置 ESLint 9 flat config,
so that 代码风格一致且潜在问题在提交前被发现。

## Acceptance Criteria

1. **AC1**: eslint.config.js 存在并包含:
   - Vue 3 plugin 规则
   - TypeScript plugin 规则
   - 禁止 console.log (warn)
   - 禁止 any 类型 (error)

2. **AC2**: package.json 包含 `lint` 脚本

3. **AC3**: `bun run lint` 扫描 src/ 目录零 error

## Tasks

- [x] Task 1: 安装 ESLint 9 及相关插件
- [x] Task 2: 创建 eslint.config.js (flat config)
- [x] Task 3: 添加 lint 脚本到 package.json
- [x] Task 4: 运行 lint 验证配置正确

## Dev Agent Record


## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED. Task checkboxes corrected, AI model name removed.
