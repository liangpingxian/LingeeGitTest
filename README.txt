# LingeeGitTest

多人协作 Git 项目，用于团队开发流程练习与协作规范落地。

## 项目简介

本仓库用于实践多人协作 Git 工作流，包括：

- 分支管理与合并策略
- Issue 认领与追踪
- Pull Request 审查流程
- 项目管理模板的使用

## 目录结构

```
LingeeGitTest/
├── README.md                              # 项目说明（本文件）
├── project-management-template.md         # 项目管理模板（通用版）
└── agile-project-management-template.md   # 项目管理模板（敏捷版）
```

## 快速开始

### 克隆仓库

```bash
git clone https://github.com/liangpingxian/LingeeGitTest.git
cd LingeeGitTest
```

### 协作流程

1. **认领 Issue**

   ```bash
   gh issue list --state open --search "no:assignee"
   gh issue edit <编号> --add-assignee @me
   ```

2. **创建功能分支**

   ```bash
   git checkout -b feature/<issue-编号>-<简短描述>
   ```

3. **完成开发后提交**

   ```bash
   git add .
   git commit -m "fix: resolve #<编号> <描述>"
   git push origin feature/<issue-编号>-<简短描述>
   ```

4. **发起 Pull Request 并关闭 Issue**

   ```bash
   gh pr create --title "<标题>" --body "Closes #<编号>"
   ```

## 项目管理模板

本项目提供两套项目管理模板，可根据团队工作方式选择使用：

- [通用项目管理模板](./project-management-template.md)：适用于传统瀑布式或混合式项目，涵盖项目概述、团队分工、里程碑计划、风险管理、沟通计划、预算跟踪等。
- [敏捷项目管理模板](./agile-project-management-template.md)：适用于 Scrum/敏捷团队，涵盖产品待办列表、Sprint 计划、燃尽图、Sprint 评审与回顾、技术债务追踪等。

## 贡献指南

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)，涵盖：

- 开发环境准备与初始设置
- Issue 认领与分支命名规范
- Commit 信息规范（[Conventional Commits](https://www.conventionalcommits.org/)）
- Pull Request 流程与审查要求

## License

MIT
