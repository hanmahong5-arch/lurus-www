# Story 1.8: 链接健康检查脚本

Status: done

## Story

As a 管理员,
I want 有自动化脚本检查所有外部链接的可达性,
so that 我可以定期发现失效链接并及时修复。

## Acceptance Criteria

1. **AC1**: `scripts/check-links.ts` 存在
2. **AC2**: 脚本从 `src/data/` 提取所有外部 URL（portalLinks、products、navItems）
3. **AC3**: 对每个 URL 发送 HEAD 请求检查可达性
4. **AC4**: 输出报告列出失效链接（红色标记）
5. **AC5**: 失效链接时返回非零退出码

## Tasks

- [x] Task 1: 创建 scripts/check-links.ts
- [x] Task 2: 添加 check-links 脚本到 package.json
- [x] Task 3: 测试脚本执行（55 URLs checked）

## Dev Agent Record


## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED. Task checkboxes corrected, AI model name removed.
