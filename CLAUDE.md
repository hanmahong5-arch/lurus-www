# Lurus WWW - CLAUDE.md

## Overview / 概述
Lurus platform marketing and landing page. Static site served via CDN.

## Tech Stack
- **Framework**: Vue 3.5 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router

## Commands
```bash
# Development
bun install && bun run dev

# Build
bun run build

# Preview
bun run preview
```

---

## BMAD Integration

Part of **Lurus Platform**. Planning managed via BMAD at root level (`../`).

| Resource | Path |
|----------|------|
| Platform config | `../lurus.yaml` |
| Sprint tasks | `../doc/plan.md` |
| PRD (this service) | `../_bmad-output/planning-artifacts/prd-www.md` |
| Architecture | `../_bmad-output/planning-artifacts/architecture.md` |
| All planning artifacts | `../_bmad-output/planning-artifacts/` |

**Sub-process rules / 子进程规则**:
1. Read your assigned story before implementation
2. Write code only within this service directory
3. Do NOT modify `../_bmad-output/` (Orchestrator only)
4. Log progress to `../doc/www/process.md`
