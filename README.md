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
├── README.md                               # 项目说明（本文件）
├── LICENSE                                 # MIT 许可证
├── .gitignore                              # Git 忽略规则
├── CONTRIBUTING.md                         # 贡献指南
├── CHANGELOG.md                            # 版本变更历史
├── project-management-template.md          # 项目管理模板（标准版）
├── project-management-template-v2.md       # 项目管理模板（敏捷/迭代版）
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md                   # Bug 报告模板
    │   └── feature_request.md              # 功能请求模板
    └── pull_request_template.md            # Pull Request 模板
```

## 快速开始

### 克隆仓库

```bash
# 1. Fork 仓库（在 GitHub 页面点击 Fork 按钮）
# 2. 克隆你的 Fork
git clone https://github.com/<your-username>/LingeeGitTest.git
cd LingeeGitTest

# 3. 添加上游仓库
git remote add upstream https://github.com/liangpingxian/LingeeGitTest.git
```

### 协作流程

1. **认领 Issue**

   ```bash
   gh issue list --state open --search "no:assignee"
   gh issue edit <编号> --add-assignee @me
   ```

2. **同步上游代码**

   ```bash
   git checkout main
   git fetch upstream
   git merge upstream/main
   ```

3. **创建功能分支**

   ```bash
   git checkout -b feature/<issue-编号>-<简短描述>
   ```

4. **完成开发后提交**

   ```bash
   git add .
   git commit -m "fix: resolve #<编号> <描述>"
   git push origin feature/<issue-编号>-<简短描述>
   ```

5. **发起 Pull Request 并关闭 Issue**

   ```bash
   gh pr create --title "<标题>" --body "Closes #<编号>"
   ```

## 项目管理模板

本仓库提供两套项目管理模板，可根据项目类型选择使用：

- [project-management-template.md](./project-management-template.md) — 标准版，适用于瀑布式/传统项目管理
- [project-management-template-v2.md](./project-management-template-v2.md) — 敏捷/迭代版，适用于 Scrum 等敏捷开发流程

两套模板均涵盖：

- 项目概述与目标
- 团队分工
- 里程碑/迭代计划
- 风险管理
- 沟通计划
- 预算/度量跟踪

## 贡献指南

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)，涵盖：

- 开发环境准备与初始设置
- Issue 认领与分支命名规范
- Commit 信息规范（[Conventional Commits](https://www.conventionalcommits.org/)）
- Pull Request 流程与审查要求

## License

MIT
