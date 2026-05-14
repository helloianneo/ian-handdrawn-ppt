# doc-to-sketch Blueprint

> Skill-first：把文档内容转换为中文手绘技术解释风格 PPT-style 页面图

## 项目状态

| 维度 | 当前状态 |
|------|----------|
| 阶段 | Skill 重组 + 飞书集成 |
| 定位 | AI Skill（prompt 工程）+ 轻量辅助脚本 |
| 核心资产 | 完整的手绘视觉 DNA、叙事规划、prompt 模板（来自 fork 上游） |
| 输入能力 | 本地文件（MD/DOCX/PDF/PPTX）已支持；飞书文档 URL 开发中 |
| 宿主支持 | Codex CLI（当前可用）/ Claude Code（计划支持） |

## 当前目标

1. 将 fork 得到的单体 Codex Skill 重组为根级、可分发的通用 Skill
2. 增加飞书文档 URL 输入能力（轻量脚本辅助）
3. 为多宿主安装和使用打基础
4. 保留原有中文手绘技术解释图的视觉与叙事优势

## 设计原则

- **Skill 为主**：核心价值在 prompt 资产和 workflow，不是代码框架
- **脚本辅助**：飞书获取等能力用轻量脚本实现，由 AI agent 调用
- **不做脚手架**：不引入重型 TS 项目、不搞 adapter 框架

## 非目标

- 不做可编辑 PPTX 生成器
- 不做复杂后端
- 不做重型 adapter 框架
- 不做统一内容中间层
- 不做独立的飞书数据访问工具（脚本是 Skill 内部执行器，不是用户直接使用的工具）

## 长期方向

- 支持更多在线文档源（Notion 等）
- 探索更多 AI 宿主绑定
- 保持轻量分发（git clone / npx skills add）

## 阅读入口

- [background.md](background.md) — 项目背景与上下文
- [design.md](design.md) — 技术设计
- [tasks.md](tasks.md) — 全局任务追踪
