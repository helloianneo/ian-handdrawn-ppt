# Background — 飞书集成 + Skill 重组

## 改造范围

将 `evidentloop/doc-to-sketch`（fork 自 `helloianneo/ian-handdrawn-ppt`）从 Codex 绑定的子目录 Skill 改造为：
1. 根级 Skill 结构（去掉 ian-handdrawn-ppt/ 子目录嵌套）
2. 支持飞书文档 URL 作为输入（轻量 Python 脚本）
3. Codex / Claude Code 均可安装使用

## 不变量

- 视觉 DNA v6（手绘风格系统）保持不变
- 10 种 slide archetype 保持不变
- 叙事规划逻辑保持不变
- Skill 为主的轻量定位不变
- MIT 协议 + 原作者归属保持不变

## 风险项

| 风险 | 影响 | 缓解 |
|------|------|------|
| 飞书 API Block 结构变更 | 脚本失效 | 版本化 API 调用，文档注明兼容版本 |
| Python 脚本在某些宿主环境不可用 | 飞书功能不可用 | Skill workflow 中标注为可选分支，本地文件输入始终可用 |
| 中文文字渲染质量不可控 | 原有已知问题 | 沿用原仓库的降级策略 |
