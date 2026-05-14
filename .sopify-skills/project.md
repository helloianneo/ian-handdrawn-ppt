# Project Conventions

## 定位

- AI Skill（prompt 工程）+ 轻量辅助脚本
- 不是 TS/Node 项目，不是框架

## 技术栈

- Skill 格式: YAML frontmatter + Markdown（Codex / Claude Code 兼容）
- 辅助脚本: Python 3（零外部依赖，仅标准库）
- 分发: git clone 或 npx skills add

## 目录约定

- `SKILL.md` — Skill 入口
- `references/` — prompt 资产（叙事规划、版式、视觉 DNA 等）
- `assets/` — 主题色值、风格锚定图
- `scripts/` — 辅助脚本（feishu_fetch.py 等）
- `examples/` — 示例 prompt 和效果图

## Git 约定

- commit message: conventional commits (feat/fix/refactor/docs)
- 分支: main + feature branches

## 敏感信息

- 飞书 App ID / App Secret 通过环境变量配置，不入库
- .env.example 提供模板
