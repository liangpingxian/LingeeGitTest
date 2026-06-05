# 贡献指南

感谢你对本项目的关注！本文档说明如何参与贡献。

## 开发环境准备

### 前提条件

- [Git](https://git-scm.com/) >= 2.30
- [GitHub CLI (`gh`)](https://cli.github.com/) >= 2.0（用于 Issue 和 PR 管理）

### 初始设置

```bash
# 1. Fork 仓库（在 GitHub 页面点击 Fork 按钮）
# 2. 克隆你的 Fork
git clone https://github.com/<your-username>/LingeeGitTest.git
cd LingeeGitTest

# 3. 添加上游仓库
git remote add upstream https://github.com/liangpingxian/LingeeGitTest.git

# 4. 验证远程配置
git remote -v
```

---

## 协作流程

### 第一步：认领 Issue

```bash
# 查看所有待认领的 Issue
gh issue list --state open --search "no:assignee"

# 认领你想要处理的 Issue（将 <编号> 替换为实际 Issue 编号）
gh issue edit <编号> --add-assignee @me --add-label "in progress"
```

> 若没有合适的 Issue，可以先创建一个，描述你打算做的改动，再认领它。项目提供了 Issue 模板（Bug 报告、功能请求），创建时请选择对应模板填写。

### 第二步：同步上游代码

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 第三步：创建功能分支

分支命名格式：`feature/<issue-编号>-<简短描述>`、`fix/<issue-编号>-<简短描述>`、`docs/<issue-编号>-<简短描述>` 或 `refactor/<issue-编号>-<简短描述>`

```bash
git checkout -b feature/42-add-dark-mode
# 或 fix/42-fix-login-redirect
# 或 docs/42-api-guide
# 或 refactor/42-auth-module
```

### 第四步：开发与提交

完成改动后，遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范提交：

```bash
git add <changed-files>
git commit -m "feat: resolve #42 添加深色模式支持"
git push origin feature/42-add-dark-mode
```

#### Commit 类型参考

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 格式调整（不影响逻辑） |
| `refactor` | 重构（不新增功能，不修复 Bug） |
| `test` | 测试相关 |
| `chore` | 构建/工具链/依赖更新 |

### 第五步：发起 Pull Request

项目已配置 Pull Request 模板（`.github/pull_request_template.md`），创建 PR 时 GitHub 会自动加载该模板。请按模板填写变更信息：

```bash
gh pr create --title "feat: 添加深色模式支持"
```

> PR 创建后，请在模板的「关联 Issue」字段中填写 `Closes #<编号>` 以关联对应 Issue，并按模板逐项填写变更信息。

### 第六步：代码审查

- PR 合并前需至少 **1 位** 其他成员 Review 并 Approve
- 审查者请在 24 小时内响应
- 若需要修改，请在原分支上继续提交，PR 会自动更新

---

## 分支命名规范

| 场景 | 格式 | 示例 |
|------|------|------|
| 新功能 | `feature/<编号>-<描述>` | `feature/5-user-profile` |
| Bug 修复 | `fix/<编号>-<描述>` | `fix/12-login-redirect` |
| 文档 | `docs/<编号>-<描述>` | `docs/3-api-guide` |
| 重构 | `refactor/<编号>-<描述>` | `refactor/8-auth-module` |

---

## 问题反馈

发现 Bug 或有改进建议？请[创建 Issue](https://github.com/liangpingxian/LingeeGitTest/issues/new/choose)，说明：
1. 问题描述或改进目标
2. 复现步骤（如是 Bug）
3. 期望行为

---

> 如有疑问，欢迎在 Issue 中留言或联系项目维护者。
