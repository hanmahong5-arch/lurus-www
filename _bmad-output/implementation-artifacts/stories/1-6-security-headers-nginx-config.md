# Story 1.6: 安全头与 Nginx 配置

Status: done

## Story

As a 运维人员,
I want Nginx 配置包含完整的安全响应头,
so that 网站符合安全最佳实践，防止 XSS、点击劫持等攻击。

## Acceptance Criteria

1. **AC1**: deploy/nginx.conf 包含以下 header:
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
   - `Content-Security-Policy` (完整策略)
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
   - `Cross-Origin-Opener-Policy: same-origin`

2. **AC2**: gzip 压缩启用 (level 6)

3. **AC3**: 资产缓存策略正确配置:
   - 带 hash 资产: `Cache-Control: public, max-age=31536000, immutable`
   - index.html: `Cache-Control: no-cache`

4. **AC4**: SPA fallback: `try_files $uri $uri/ /index.html`

## Tasks

- [x] Task 1: 创建 deploy/ 目录 (已存在)
- [x] Task 2: 创建 deploy/nginx.conf 完整配置
- [x] Task 3: 更新 Dockerfile 引用新配置

## Dev Agent Record


## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED. Task checkboxes corrected, AI model name removed.
