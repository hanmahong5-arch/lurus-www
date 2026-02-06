# Story 1.7: 环境变量管理

Status: done

## Story

As a 开发者,
I want 项目有清晰的环境变量管理体系,
so that 我可以在不同环境（开发/生产）使用不同配置，且不暴露敏感信息。

## Acceptance Criteria

1. **AC1**: 以下文件存在:
   - `.env` (默认值，committed)
   - `.env.production` (生产值，committed)
   - `.gitignore` 包含 `.env.local`

2. **AC2**: `src/env.d.ts` 声明 ImportMetaEnv 类型

3. **AC3**: 所有环境变量使用 `VITE_` 前缀

## Tasks

- [x] Task 1: 更新 .gitignore（保留 .env.local，移除 .env）
- [x] Task 2: 创建 .env 默认配置
- [x] Task 3: 创建 .env.production 生产配置
- [x] Task 4: 创建 src/env.d.ts 类型声明

## Dev Agent Record


## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED. Task checkboxes corrected, AI model name removed.
