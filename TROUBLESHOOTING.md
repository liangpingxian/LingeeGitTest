# Git 常见错误排查指南

本文档覆盖协作开发中最常见的 Git 问题及解决方法，示例命令均可直接复制执行。

---

## 1. Merge Conflict（合并冲突）

**现象**：执行 `git merge` 或 `git pull` 后提示 `CONFLICT`，文件中出现 `<<<<<<<` 标记。

**解决步骤**：

```bash
# 1. 查看冲突文件列表
git status

# 2. 打开冲突文件，手动编辑，保留正确内容
#    冲突区域格式：
#    <<<<<<< HEAD
#    （当前分支内容）
#    =======
#    （合并进来的内容）
#    >>>>>>> feature/xxx

# 3. 解决后暂存文件
git add <冲突文件>

# 4. 完成合并提交
git commit -m "fix: resolve merge conflict in <文件名>"

# 如需放弃本次合并，回到合并前状态：
git merge --abort
```

---

## 2. Detached HEAD（游离 HEAD）

**现象**：执行 `git checkout <commit-hash>` 或 `git checkout <tag>` 后，提示 `You are in 'detached HEAD' state`。

**解决步骤**：

```bash
# 方法一：直接切回目标分支（放弃游离状态下的改动）
git checkout main

# 方法二：将游离状态的提交保存为新分支（保留改动）
git checkout -b fix/my-detached-work

# 随后正常 push 即可
git push origin fix/my-detached-work
```

---

## 3. Push Rejected（推送被拒绝）

**现象**：`git push` 提示 `rejected ... non-fast-forward` 或 `Updates were rejected`。

**原因**：远端分支有本地没有的提交。

**解决步骤**：

```bash
# 1. 先拉取远端最新代码并变基（推荐，保持线性历史）
git pull --rebase origin main

# 如有冲突，解决后继续：
git add <冲突文件>
git rebase --continue

# 2. 再次推送
git push origin main

# 注意：除非明确知道后果，不要使用 --force 强推共享分支
```

---

## 4. 误删分支恢复

**现象**：执行 `git branch -D <branch>` 后发现删错了。

**解决步骤**：

```bash
# 1. 找到被删分支最后一次提交的 hash
git reflog | head -20
# 输出示例：
# abc1234 HEAD@{3}: checkout: moving from feature/xxx to main

# 2. 用该 hash 重建分支
git checkout -b feature/xxx abc1234

# 3. 如果已推送到远端，也可直接从远端恢复
git checkout -b feature/xxx origin/feature/xxx
```

---

## 5. .gitignore 不生效

**现象**：在 `.gitignore` 中添加了规则，但对应文件仍被 Git 追踪。

**原因**：文件已经被 Git 追踪（已在版本库中），`.gitignore` 只对未追踪的文件生效。

**解决步骤**：

```bash
# 1. 从 Git 索引中移除（不删除本地文件）
git rm --cached <文件或目录>
# 目录需加 -r：
git rm -r --cached <目录>

# 2. 提交变更
git add .gitignore
git commit -m "chore: stop tracking <文件名>"

# 3. 验证
git status   # 对应文件应不再出现在追踪列表中
```

---

## 参考资源

- [Git 官方文档](https://git-scm.com/doc)
- [CONTRIBUTING.md](./CONTRIBUTING.md) — 本仓库贡献规范
- [README.md](./README.md) — 项目概览与常用命令速查
