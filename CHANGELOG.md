# Changelog

本文件记录项目的所有重要变更，遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 规范。

## [Unreleased]

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

[Unreleased]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.6.0...HEAD
[1.6.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/liangpingxian/LingeeGitTest/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/liangpingxian/LingeeGitTest/releases/tag/v1.0.0
