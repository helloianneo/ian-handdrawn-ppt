# Design — 飞书集成 + Skill 重组

## 实现原则

1. **官方 API + 自有规格**：代码、CLI 参数、错误文案、目录组织，均基于[飞书开放平台官方文档](https://open.feishu.cn/document/)和本项目自身产品目标独立设计。仅参考外部实践的能力边界与坑点清单，不做同构重写。
2. **Prompt ingestion 优先**：输出目标是给出图 workflow 喂结构化内容，不是文档保真备份。图片转占位、表格保留 Markdown 结构、不支持的 block 走可预期降级。
3. **文档卫生**：对外文档（README、NOTICE、代码注释、commit message）中不写"参考某实现"。内部只保留官方 API 链接和自有设计结论。

## 认证体验

**首版定义**：首次配置凭证后直接贴链接使用。

| 步骤 | 用户动作 | 频率 |
|------|---------|------|
| 1. 创建飞书自建应用 | 在 open.feishu.cn 创建应用，获取 APP_ID / APP_SECRET | 一次性 |
| 2. 开通权限 | docx:document:readonly | 一次性 |
| 3. 设置环境变量 | `export FEISHU_APP_ID=xxx` / `export FEISHU_APP_SECRET=xxx` | 每个终端会话 |
| 4. 使用 Skill | 给飞书文档 URL + 出图指令 | 每次 |

**不是零配置**。首次需要 ~10 分钟配置飞书应用和环境变量，之后直接用。后续版本可考虑一次性授权流（OAuth），但首版不做。

## URL 支持矩阵

**首版支持：**

| URL 形态 | 示例 | 支持状态 |
|----------|------|---------|
| 标准文档 URL | `https://xxx.feishu.cn/docx/AbCdEfGhIj` | ✅ 首版支持 |
| 带查询参数 | `https://xxx.feishu.cn/docx/AbCdEfGhIj?from=xxx` | ✅ 首版支持（忽略参数） |
| Lark 域名 | `https://xxx.lark.suite.com/docx/AbCdEfGhIj` | ✅ 首版支持 |

**首版不支持（明确报错）：**

| URL 形态 | 示例 | 说明 |
|----------|------|------|
| 知识库节点 URL | `https://xxx.feishu.cn/wiki/AbCdEfGhIj` | 需额外 API 获取 document_id，后续可考虑 |
| 旧版文档 (doc) | `https://xxx.feishu.cn/docs/AbCdEfGhIj` | 旧版 API，不在 Block API 范围 |
| 电子表格 / 多维表格 | `https://xxx.feishu.cn/sheets/...` / `.../base/...` | 非文档类型 |
| 任意其他 URL | - | 统一提示"当前只支持 docx 文档 URL" |

## 输出契约

**输出目标**：为 doc-to-sketch 出图 workflow 提供稳定的结构化 Markdown 输入。

**输出不是**：文档的完整保真备份。

| 内容类型 | 输出策略 |
|---------|---------|
| 标题 (H1-H9) | 完整保留层级和文本 |
| 正文段落 | 完整保留 |
| 有序/无序列表 | 保留结构和文本 |
| 代码块 | 保留语言标签和代码内容 |
| Callout / 提示框 | 转为 blockquote |
| 分割线 | `---` |
| 表格 | 保留 Markdown 表格结构 |
| 图片 | 输出 `![Image](token:xxx)` 占位，不下载二进制 |
| 不支持的 block | `<!-- unsupported block_type: N -->` 注释降级 |

**稳定性要求**：输出 Markdown 可直接喂给 SKILL.md workflow Step 1 的 ingest 分支，不需要人工二次编辑。

## 目录重组

**当前 → 目标：**

```
当前:                          目标:
.                              .
├── ian-handdrawn-ppt/         ├── SKILL.md           ← 提升到根级
│   ├── SKILL.md               ├── references/        ← 提升到根级
│   ├── references/            │   ├── intake.md      (扩展飞书输入)
│   │   └── *.md               │   └── *.md
│   └── assets/                ├── assets/            ← 提升到根级
│       ├── theme-tokens.json  │   ├── theme-tokens.json
│       └── reference-*.png    │   └── reference-*.png
├── examples/                  ├── scripts/           ← 新增
│   ├── images/                │   └── feishu_fetch.py
│   └── prompts.md             ├── examples/
│                              ├── package.json       ← 可选分发
│                              ├── .env.example       ← 新增
│                              ├── README.md
│                              ├── LICENSE
│                              └── NOTICE.md
```

## feishu_fetch.py 设计

### Scope / Non-Goals

**支持范围（最小通用子集）**：
- tenant_access_token 鉴权（应用级，从环境变量读取）
- docx 文档 URL → document_id 提取
- Block API 分页获取 + block tree 递归
- 核心 8 类 Block → Markdown 渲染
- 5 类基础错误处理

**明确不做（Non-Goals）**：
- OAuth 用户登录 / 浏览器回调 / token 持久化
- Bitable / 评论 / 电子表格 / 画板
- 图片二进制下载落地
- 内置凭证 / SSL 关闭 / retry 重试

### 架构

**单文件 Python 脚本**（~500-700 行），无外部依赖（仅 urllib + json）。

```
feishu_fetch.py
├── FeishuClient          # 最小客户端
│   ├── __init__()        # 从 env 读取 APP_ID/APP_SECRET
│   ├── _get_token()      # tenant_access_token 获取
│   └── _request()        # 统一 HTTP 请求（带 token header）
├── DocumentFetcher       # 文档抓取
│   ├── parse_url()       # URL → document_id
│   ├── fetch_blocks()    # 分页获取所有 blocks
│   └── _fetch_children() # 递归获取子 blocks
├── MarkdownRenderer      # Markdown 渲染
│   ├── render()          # block tree → Markdown 字符串
│   └── _render_block()   # 单 block 渲染（按 block_type 分派）
└── main()                # argparse 入口
```

### Block 类型支持

| Block Type | 常量值 | Markdown 输出 | 优先级 |
|-----------|--------|--------------|--------|
| PAGE | 1 | (容器，递归子 block) | P0 |
| TEXT | 2 | 段落文本 | P0 |
| H1-H9 | 3-11 | `# ` ~ `######### ` | P0 |
| BULLET | 12 | `- ` | P0 |
| ORDERED | 13 | `1. ` | P0 |
| CODE | 14 | ` ```lang ``` ` | P0 |
| CALLOUT | 19 | `> 💡 ` | P0 |
| DIVIDER | 22 | `---` | P0 |
| TABLE | 25 | Markdown 表格（递归 row/cell） | P0 |
| TABLE_CELL | - | (容器，递归子 block) | P0 |
| IMAGE | 27 | `![Image](token:xxx)` 占位 | P1 |
| 其他 | - | `<!-- unsupported block_type: N -->` | 降级 |

### 错误模型

```
错误类型          → 用户可见信息
─────────────────────────────────────────────
缺少环境变量      → "请设置 FEISHU_APP_ID 和 FEISHU_APP_SECRET"
401 token 失效   → "Token 已过期，请检查 APP_ID/APP_SECRET"
403 无权限        → "需要 docx:document:readonly 权限"
404 文档不存在    → "文档 ID 无效或已被删除"
不支持的 URL 类型 → "当前只支持 docx 文档 URL"
```

## SKILL.md 修改点

1. YAML frontmatter: `name: doc-to-sketch`
2. description: 增加飞书文档源描述
3. Resource Map: 路径从 `ian-handdrawn-ppt/references/` 改为 `references/`
4. Workflow Step 1 (Ingest): 增加飞书 URL 分支
5. 去掉 Ian 品牌绑定的措辞

## 执行顺序

```
Phase 0: 目录重组 (git mv + cleanup)
    ↓
Phase 1: SKILL.md 改造 (扩展 workflow)
    ↓
Phase 2: feishu_fetch.py (核心交付)
    ↓
Phase 3: 分发与文档 (README + package.json)
```
