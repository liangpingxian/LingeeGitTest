# Changelog

本文件记录项目的所有重要变更，遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 规范。

## [Unreleased]

## [2.9.0] - 2026-06-05

### 修复

- 在 PR 模板检查清单中新增 `CHANGELOG.md` 更新检查项，与 `CONTRIBUTING.md` 第四步的明确要求保持一致

## [2.8.0] - 2026-06-05

### 修复

- 在 `README.md` 协作流程中补充缺失的第七步「加入贡献者名单」，与 `CONTRIBUTING.md` 保持一致
- 将 PR 模板检查清单中的模糊表述「遵循文档规范」替换为明确的 `Conventional Commits` 引用
- 修正 Bug 报告模板环境信息中「浏览器/工具版本」为「Git/工具版本」，适配 Git 工作流项目定位
- 清理 `.gitignore` 中冗余的 `.env.local` 条目（已被 `.env.*` 通配符覆盖）

## [2.7.0] - 2026-06-05

### 修复

- 在 `CONTRIBUTING.md` 协作流程末尾新增「第七步：加入贡献者名单」，提示贡献者在 PR 合并后将自己添加到 `CONTRIBUTORS.md`，解决贡献者按指南操作后不知需维护名单的问题

## [2.6.0] - 2026-06-05

### 新增

- 新增 `CONTRIBUTORS.md` 贡献者名单文件，列出项目贡献者信息
- 在 `README.md` 目录结构中添加对 `CONTRIBUTORS.md` 的引用

### 修复

- 修正 `README.md` 常用命令速查表 commit 示例使用 `#N`（无尖括号）与其余占位符 `<N>` 格式不一致的问题，统一改为 `#<N>`
- 恢复 `CHANGELOG.md` 中被意外删除的 v2.5.0 版本记录及其比较链接
- 将 `CODE_OF_CONDUCT.md` 归属部分的 3 处裸 URL 转换为 Markdown 链接格式，与文件其余部分保持一致

## [2.5.0] - 2026-06-05

### 修复

- 在 `CONTRIBUTING.md` 开头补充对 `CODE_OF_CONDUCT.md` 的引用，提示贡献者参与前须遵守行为准则
- 在 `CONTRIBUTING.md` 第四步「开发与提交」中补充提示，要求贡献者在 `CHANGELOG.md` 的 `[Unreleased]` 段落记录变更

## [2.4.0] - 2026-06-05

### 修复

- 修正 `README.md` 协作流程第 4 步及「常用命令速查」表中 commit 示例使用 `fix:` 类型与 `CONTRIBUTING.md` 使用 `feat:` 不一致的问题，统一改为 `feat:`

## [2.3.0] - 2026-06-05

### 修复

- 补充 `README.md` 协作流程缺少的「第六步：代码审查」，与 `CONTRIBUTING.md` 第六步保持一致
- 修正 `README.md` 协作流程 Step 4 使用 `git add .` 与 CONTRIBUTING.md 不一致的问题，改为 `git add <changed-files>` 避免误提交无关文件
- 补充 `README.md` 协作流程 Step 3 缺少的 `fix/` 分支命名示例，与 CONTRIBUTING.md 分支命名规范保持一致

## [2.2.0] - 2026-06-05

### 修复

- 修正 `README.md` 协作流程第5步标题「发起 Pull Request 并关闭 Issue」表述误导，改为「发起 Pull Request」，与 CONTRIBUTING.md 保持一致，并补充说明 Issue 在 PR 合并后自动关闭

## [2.1.0] - 2026-06-05

### 修复

- 修正 `project-management-template.md` 和 `project-management-template-v2.md` 的最后更新日期为 2026-06-05，与 CHANGELOG v2.0.0 发布日期保持一致

## [2.0.0] - 2026-06-05

### 新增

- 添加 `CODE_OF_CONDUCT.md` 行为准则文件（基于 Contributor Covenant v2.1 中文版），为多人协作提供行为规范
- 更新 `README.md` 目录结构和新增「行为准则」章节，指向 `CODE_OF_CONDUCT.md`

## [1.9.0] - 2026-06-05

### 修复

- 修正 `README.md` 和 `CONTRIBUTING.md` 中 Issue 认领命令缺少 `--add-label "in progress"` 参数的问题，使文档与标准协作流程保持一致
- 修正 `CONTRIBUTING.md` 问题反馈链接指向空白 Issue 表单，改为指向模板选择页面 `/issues/new/choose`，与项目 Issue 模板引导保持一致

## [1.8.0] - 2026-06-05

### 修复

- 修正 `CONTRIBUTING.md` 第五步 `gh pr create` 命令使用 `--body` 参数覆盖 PR 模板的问题，改为省略 `--body` 让 GitHub 自动加载模板
- 补充 `.github/` 目录及其模板文件（Bug 报告、功能请求 Issue 模板和 PR 模板），使仓库实际文件与 `README.md` 目录结构描述一致
- 修正 `README.md` 协作流程第 5 步 `gh pr create` 命令使用 `--body` 参数覆盖 PR 模板的问题，改为省略 `--body` 让 GitHub 自动加载模板
- 移除 Issue 模板中无效的 `assignees: ''` 字段，避免空字符串导致 GitHub 模板解析异常

## [1.7.0] - 2026-06-04

### 修复

- 在 `.gitignore` 中添加 `.env`、`.env.local`、`.env.*` 等环境变量文件的忽略规则，防止敏感信息被误提交

## [1.6.0] - 2026-06-04

### 修复

- 修正 `CONTRIBUTING.md` PR 示例与项目 PR 模板（`.github/pull_request_template.md`）格式不一致的问题
- 在 `CONTRIBUTING.md` 创建 Issue 部分补充 Issue 模板（Bug 报告、功能请求）的使用引导
- 在 `README.md` 快速开始中补充 PR 模板的提示说明
- 修正 `README.md` 快速开始未配置 upstream 远程仓库，导致协作流程中 `git fetch upstream` 失败的问题
- 在 `README.md` 协作流程中补充「同步上游代码」步骤，与 `CONTRIBUTING.md` 保持一致

## [1.5.0] - 2026-06-04

### 修复

- 将 `README.txt` 重命名为 `README.md`，使 GitHub 正确渲染 Markdown 格式
- 移除 `.gitignore` 中 `*~` 的重复条目
- 添加 `.gitignore` 文件，排除常见系统/编辑器临时文件
- 添加 `LICENSE` 文件（MIT），与 README 中的声明一致

## [1.4.0] - 2026-06-04

### 修复

- 修正 `project-management-template-v2.md` 内部版本号与文件名不一致问题（v1.0 → v2.0）

## [1.3.0] - 2026-06-04

### 修复

- 修正 `README.txt` 目录结构描述与实际文件不一致的问题

## [1.2.0] - 2026-06-04

### 新增

- 新增敏捷/迭代版项目管理模板 `project-management-template-v2.md`

## [1.1.0] - 2026-06-03

### 新增

- 新增 GitHub Issue 模板（Bug 报告、功能请求）
- 新增 GitHub Pull Request 模板
- 将 README.md 内容迁移至 `README.txt`

## [1.0.0] - 2026-06-03

### 新增

- 初始化项目，添加 `README.md`
- 添加 `CONTRIBUTING.md` 贡献指南
- 添加标准版项目管理模板 `project-management-template.md`

[Unreleased]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.9.0...HEAD
[2.9.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.8.0...v2.9.0
[2.8.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.7.0...v2.8.0
[2.7.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.6.0...v2.7.0
[2.6.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.9.0...v2.0.0
[1.9.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/liangpingxian/LingeeGitTest/releases/tag/v1.0.0
