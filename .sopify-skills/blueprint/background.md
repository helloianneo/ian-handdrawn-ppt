# Background

## 起源

本项目 fork 自 [helloianneo/ian-handdrawn-ppt](https://github.com/helloianneo/ian-handdrawn-ppt)，一个 OpenAI Codex CLI Skill，用于指导 AI Agent 将内容转换为中文手绘技术解释风格的 PPT-style 页面图（PNG）。

## 原仓库核心资产

| 资产 | 路径 | 说明 |
|------|------|------|
| Skill 定义 | `ian-handdrawn-ppt/SKILL.md` | Codex Skill 格式，YAML frontmatter + workflow |
| 视觉 DNA v6 | `ian-handdrawn-ppt/references/visual-dna-v6.md` | 手绘风格系统：近白纸底、细线条、淡彩标记、中文短文字 |
| 叙事规划 | `ian-handdrawn-ppt/references/narrative-planning.md` | 教学/说服/报告/产品/知识卡片 5 种 deck 结构 |
| 页面原型 | `ian-handdrawn-ppt/references/slide-archetypes.md` | 10 种语义版式（封面隐喻、左右对比、流程、矩阵等） |
| Prompt 模板 | `ian-handdrawn-ppt/references/prompt-patterns.md` | 图像生成 prompt 的标准模式 |
| 质量验证 | `ian-handdrawn-ppt/references/output-quality.md` | 输出检查清单 |
| 主题色值 | `ian-handdrawn-ppt/assets/theme-tokens.json` | 颜色、画布比例、文字预算、版式规范 |
| 风格锚定图 | `ian-handdrawn-ppt/assets/reference-*.png` | 手绘风格参考图 |

## 原仓库局限

1. **绑定 Codex CLI** — SKILL.md 格式 + `Use $skill-name` 调用方式是 Codex 专有
2. **无在线文档源支持** — 只能读本地文件（MD/DOCX/PDF/PPTX）
3. **无运行时代码** — 完全依赖宿主 Agent 的原生能力
4. **输出仅 PNG** — 无法生成可编辑的 PPTX/PDF

## 改造动机

- 接入飞书文档作为首个在线文档源（轻量脚本，非框架）
- 重组目录结构，从子目录提升为根级 Skill
- 支持多 AI 宿主的 Skill 分发

## 设计原则

- Skill 为主，脚本辅助
- 不做重型 TS 项目
- 不引入 adapter 框架
- 安装方式保持 `git clone` 或 `npx skills add` 级别的简单

## 约束

- 原仓库 MIT 协议，fork 改造无法律障碍，需保留 NOTICE.md 归属
- 飞书 API 需要应用凭证（App ID / App Secret）
- 手绘图生成仍依赖 AI 图像模型，不可确定性控制
- 中文文字在 AI 生图中仍有错字风险（原仓库已有的已知问题）
