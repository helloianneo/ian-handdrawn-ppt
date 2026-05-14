# Tasks — 飞书集成 + Skill 重组

## Phase 0: 根级 Skill 重组

| ID | 任务 | 依赖 | 文件数 |
|----|------|------|--------|
| T0-1 | git mv ian-handdrawn-ppt/SKILL.md → SKILL.md | - | 1 |
| T0-2 | git mv ian-handdrawn-ppt/references/ → references/ | - | 6 |
| T0-3 | git mv ian-handdrawn-ppt/assets/ → assets/ | - | 2 |
| T0-4 | 删除空的 ian-handdrawn-ppt/ | T0-1,T0-2,T0-3 | 0 |
| T0-5 | .gitignore 追加 .env, __pycache__ | - | 1 |
| T0-6 | 创建 .env.example | - | 1 |

**验收标准：**
- 根目录存在 `SKILL.md`、`references/`、`assets/`
- 旧 `ian-handdrawn-ppt/` 不再作为安装入口
- examples 和 README 中的路径全部更新

## Phase 1: SKILL.md 改造

| ID | 任务 | 依赖 | 文件数 |
|----|------|------|--------|
| T1-1 | YAML frontmatter: name → doc-to-sketch, description 更新 | T0-1 | 1 |
| T1-2 | Resource Map 路径修正 (去掉 ian-handdrawn-ppt/ 前缀) | T0-2,T0-3 | 1 |
| T1-3 | Workflow Step 1 增加飞书 URL ingest 分支 | - | 1 |
| T1-4 | intake.md 增加飞书文档 URL 作为 Accepted Input | T0-2 | 1 |
| T1-5 | 去掉 Ian 品牌绑定措辞 | - | 1 |

**验收标准：**
- Skill 名称与仓库名一致 (doc-to-sketch)
- Workflow 明确支持 Feishu URL 分支
- Resource Map 不再引用旧子目录路径
- 根级 SKILL.md 可直接安装并跑现有 examples

## Phase 2: Skill 内部飞书文档获取能力

**目标**：为 doc-to-sketch Skill 提供内部飞书文档获取能力，使用户可以直接给飞书 URL + 出图指令，Skill 内部自动完成"读取文档 → 转 Markdown → 进入出图 workflow"。

**产品形态**：用户安装 Skill 后，直接说"用这个飞书文档帮我出图"，不需要手动跑脚本或预处理。脚本是 Skill workflow 的内部执行器，由 AI agent 自动调用。

**参考方法**：仅参考外部成熟实践的能力边界与坑点清单。代码、注释、CLI 参数、错误文案均基于飞书官方 API 文档和本项目自身需求独立设计，不做同构重写。

### 支持范围

- tenant_access_token 鉴权（应用级）
- 环境变量配置（FEISHU_APP_ID / FEISHU_APP_SECRET）
- docx 文档读取（Block API）
- blocks 分页获取（has_more + page_token）
- block tree 递归遍历（children blocks）
- Markdown 输出（核心 8 类 block）
- 基础错误处理（缺配置、无权限、文档不存在、token 失效）

### 明确不做

- OAuth 用户登录 / 浏览器回调
- token 本地文件持久化
- 多维表格 (Bitable)
- 评论 (Comments)
- 电子表格 (Spreadsheet)
- 画板 (Board) / 文本绘图 (Diagram) 深度支持
- 图片二进制下载落地（仅输出 token 占位）
- 任何内置凭证 / 关闭 SSL 校验
- retry / 指数退避（首版不做）

### 任务拆分

| ID | 任务 | 依赖 | 说明 |
|----|------|------|------|
| T2-1 | 更新 design.md 约束 + 创建 scripts/ 骨架 | T0-5 | 确认 design.md 的实现原则/认证体验/URL 矩阵/输出契约已就绪；创建 scripts/feishu_fetch.py 骨架（argparse + main）；脚本定位为 Skill 内部执行器 |
| T2-2 | 最小客户端：env 配置 + tenant token 获取 + request wrapper | T2-1 | 仅 urllib，无外部依赖；env 变量读取；tenant_access_token 获取；统一 HTTP 请求方法 |
| T2-3 | 文档抓取：URL 解析 + blocks 分页 + children 递归 | T2-2 | 从 URL 提取 document_id；GET /docx/v1/documents/{id}/blocks 分页闭环；子 block 递归获取 |
| T2-4 | Markdown 渲染：核心 8 类 block 输出 | T2-3 | heading (H1-H9) / text / bullet / ordered / code / callout / divider / table；其余 block 类型输出占位注释 |
| T2-5 | 错误模型 + E2E 验证 | T2-4 | 5 类错误覆盖；至少 1 篇真实飞书 docx 文档端到端跑通（从 Skill prompt 到 slide blueprint） |

**预估代码量**：500-700 行单文件 Python 脚本。

### 验收标准

**功能验收：**
- 能读取 1 篇真实飞书 docx 文档并输出 Markdown
- 输出覆盖标题、正文、有序/无序列表、代码块、callout、分割线、表格
- 支持 blocks 分页（has_more + page_token 闭环）
- 支持嵌套 block（如 table → table_row → table_cell → text）

**错误模型验收（5 类）：**
- 缺少环境变量 → 明确提示设置 FEISHU_APP_ID / FEISHU_APP_SECRET
- 401 token 失效 → 提示 token 过期
- 403 无权限 → 提示需要 docx:document:readonly 权限
- 404 文档不存在 → 提示 document_id 无效
- 不支持的 URL 类型 → 提示当前只支持 docx 文档

**安全验收：**
- 不包含任何内置凭证
- 不关闭 SSL 校验
- 不写入本地 token 文件
- 输出 Markdown 足够稳定，可直接喂给现有 Skill prompt 流程

**端到端验收（E2E）：**
- 安装 Skill 后，直接给飞书 URL + 出图指令（如"用这个文档帮我出图"），Skill 内部自动完成读取 → 转 Markdown → 进入出图 workflow
- 不需要用户手动跑脚本或做任何预处理
- 至少 1 篇真实飞书 docx 文档能产出 slide blueprint（到达 narrative planning 阶段）

## Phase 3: 文档与分发

| ID | 任务 | 依赖 | 文件数 |
|----|------|------|--------|
| T3-1 | package.json (可选，用于 npx skills add) | - | 1 |
| T3-2 | README.md 全重写 | T1-*,T2-* | 1 |
| T3-3 | examples/prompts.md 更新 (增加飞书示例) | T2-* | 1 |
| T3-4 | NOTICE.md / LICENSE 最终检查 | - | 0 |

**验收标准：**
- README 与当前能力一致，不夸大未实现特性
- examples 包含 1 个飞书输入示例 prompt
- NOTICE / LICENSE 归属说明完整

## 总计

- **4 个 Phase**
- **~19 个任务**（Phase 2 从 4 任务扩展为 5 任务）
- **~15 个文件变更**
- 核心交付: Phase 0-2（Skill 重组 + SKILL 改造 + 飞书文档读取最小子集）
- Phase 2 预估代码量: 500-700 行单文件 Python
