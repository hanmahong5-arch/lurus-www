# Story 1.4: CI 质量门配置

Status: done

## Story

As a 开发者,
I want CI pipeline 包含完整的质量检查阶段,
so that 每次提交都经过类型检查、lint、测试和性能验证，确保代码质量。

## Acceptance Criteria

1. **AC1**: .github/workflows/build-www.yaml 包含以下阶段:
   - tsc --noEmit (类型检查)
   - eslint --max-warnings=0
   - vitest run --coverage
   - vite build + bundle size check
   - playwright test
   - Lighthouse CI (Performance ≥ 90)
   - Docker build + push

2. **AC2**: 任一阶段失败则整个 pipeline 失败

3. **AC3**: scripts/ 目录包含:
   - lighthouserc.js
   - check-bundle-size.js

## Tasks

- [x] Task 1: 创建 .github/workflows/build-www.yaml
- [x] Task 2: 创建 scripts/check-bundle-size.js
- [x] Task 3: 创建 lighthouserc.js
- [x] Task 4: 验证 workflow 语法

## Dev Agent Record


## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED. Task checkboxes corrected, AI model name removed.
