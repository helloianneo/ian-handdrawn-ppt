# Design

## 架构概览

```
doc-to-sketch (Skill)
├── SKILL.md                    ← 核心 Skill 定义
├── references/                 ← prompt 资产
│   ├── intake.md               (扩展：增加飞书 URL 作为输入类型)
│   ├── narrative-planning.md
│   ├── slide-archetypes.md
│   ├── visual-dna-v6.md
│   ├── output-quality.md
│   └── prompt-patterns.md
├── assets/
│   ├── theme-tokens.json
│   └── reference-style.png
├── scripts/
│   └── feishu_fetch.py         ← 飞书文档 → Markdown 轻量脚本
├── examples/
├── package.json                ← 可选，仅用于 npx skills add 分发
├── README.md
├── LICENSE
└── NOTICE.md
```

**核心思路**：Skill workflow 中增加一个 ingest 分支 —— 如果输入是飞书 URL，先调用 `scripts/feishu_fetch.py` 获取 Markdown，然后走正常的 Skill 流水线。

## 飞书获取脚本设计

### scripts/feishu_fetch.py

**功能**：给定飞书文档 URL → 输出 Markdown 文本

**鉴权**：自建应用 tenant_access_token 模式
- 环境变量：`FEISHU_APP_ID`、`FEISHU_APP_SECRET`
- 运行时获取 token，不持久化

**API 调用链**：
```
1. POST /open-apis/auth/v3/tenant_access_token/internal → token
2. GET /open-apis/docx/v1/documents/{document_id} → 元信息
3. GET /open-apis/docx/v1/documents/{document_id}/blocks → Block 列表（分页）
4. Block 树递归 → Markdown 文本输出
```

**Block → Markdown 映射**：
| 飞书 Block 类型 | Markdown 输出 |
|----------------|---------------|
| heading1-9 | `#` - `#########` |
| text | 段落文本 |
| bullet / ordered | `- ` / `1. ` 列表 |
| code | ` ```lang ... ``` ` |
| image | `![Image](token:xxx)` 占位（不下载二进制） |
| table | Markdown 表格 |
| callout | `> ` 引用块 |
| divider | `---` |

**调用方式**（由 AI agent 在 Skill workflow 内部自动执行，用户不需要手动操作）：
```bash
# AI agent 内部调用（用户不可见）
python3 scripts/feishu_fetch.py "https://xxx.feishu.cn/docx/xxxxx"
```

**调试/开发用途**（仅开发者）：
```bash
# 设置环境变量
export FEISHU_APP_ID=xxx
export FEISHU_APP_SECRET=xxx

# 单独测试脚本
python3 scripts/feishu_fetch.py "https://xxx.feishu.cn/docx/xxxxx"
```

**依赖**：仅 Python 标准库（urllib + json），无外部依赖

## SKILL.md 扩展

在 workflow Step 1 (Ingest material) 中增加飞书分支：

```
1. Ingest material
   - If input is a Feishu/Lark document URL:
     1. Run `python3 scripts/feishu_fetch.py "<url>"` to get Markdown
     2. Parse the Markdown output as the source material
   - If input is a local file: (existing logic)
   - If input is plain text/Markdown: (existing logic)
```

## 多宿主分发

| 宿主 | 安装方式 | Skill 入口 |
|------|----------|-----------|
| Codex CLI | `cp -R` 或 `ln -s` 到 `$CODEX_HOME/skills/` | SKILL.md |
| Claude Code | `npx skills add evidentloop/doc-to-sketch` | SKILL.md |
| 手动 | `git clone` + 按需使用 | SKILL.md |

所有宿主共用同一个 SKILL.md，因为 Skill 格式（YAML frontmatter + Markdown workflow）在 Codex 和 Claude Code 间兼容。

## 技术选型

| 维度 | 选择 | 原因 |
|------|------|------|
| 飞书脚本语言 | Python | 零依赖可行，所有宿主环境都有 Python |
| HTTP | urllib (标准库) | 无外部依赖，仅用标准库 |
| 分发 | npm package.json (可选) | 仅用于 `npx skills add` 路径 |
