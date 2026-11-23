# 点单小程序 · 实现报告

- 工作项：wi-t1000001
- 阶段：implementation（simple-frontend 路线，inline 执行）
- 需求基线：`docs/wi-t1000001/requirements.md`（sha256:8915fc24774864692e35333d7deebfaecec7d40ae82350d770677409fd4b3a20）
- 架构基线：`docs/wi-t1000001/architecture-baseline.md`（sha256:30919e330458c6abcda5c7507d944d56ce371381505183e64033deb697333170）

## 1. 交付概述

按已批准需求与架构基线，在当前仓库新建了一个可直接运行的点单小程序（React 18 + Vite + Ant Design 5 纯前端单页应用，无服务端）。业务闭环：

- **顾客侧（「点单」视图）**：浏览内置菜单（名称 + 价格）→ 加入点单 / 增减数量 / 移除 → 汇总面板实时显示所选菜品、数量与合计金额 → 提交点单 → 弹窗展示订单确认（唯一订单编号、菜品明细、合计金额）。
- **商家侧（「订单管理」视图）**：订单列表（编号、菜品数、合计金额、状态、提交时间）→ 查看单个订单明细（抽屉）→ 将订单标记为已完成（列表与明细中状态可见变化）。
- **持久化**：订单写入浏览器 `localStorage` 单一键 `orders`（单一 JSON 条目）；页面刷新后两个视图均从该存储恢复数据，满足「会话内含页面刷新可读回」（R4）。

实现依据（root cause）：需求快照的全部行为均为用户界面交互且持久性边界限定为当前使用会话，因此按架构基线选择纯前端本地数据路线，业务规则集中在领域纯函数层，保证可测试与可复核。

## 2. 调用链

```
UI（React 组件）
  OrderingPage（顾客）── add/change/remove → domain/cart.js（纯函数：数量、合计）
                     └─ 提交 → hooks/useOrders.submitOrder → domain/orders.createOrder（编号、明细快照、合计）
  OrdersPage（商家）── 详情/标记完成 → hooks/useOrders.markCompleted → domain/orders.markOrderCompleted
hooks/useOrders.js（state 与持久化同步）
  └─ storage/orders-store.js（load/save/clear）→ window.localStorage（键 orders）
```

关键设计点：

- **业务规则不在组件内散落**：合计金额、订单编号、明细快照、状态流转均为 `src/domain/` 纯函数，组件只做状态编排与展示。
- **订单明细为提交时刻快照**（名称、数量、单价、合计），不随后续菜单数据变化漂移（有单测覆盖）。
- **订单编号单调递增**：从现有订单解析最大序号 +1（`ORD-0001` 起始），在当前浏览器数据生命周期内唯一（有单测覆盖）。
- **不可变更新**：标记完成返回新数组，原数据不被修改（有单测覆盖）。

## 3. 实现范围（文件清单）

| 文件 | 职责 |
| --- | --- |
| `package.json` / `package-lock.json` | 依赖与脚本（dev/build/preview/test） |
| `vite.config.js` | Vite + React 插件、Vitest jsdom 测试环境 |
| `index.html` | SPA 入口（中文 lang） |
| `src/main.jsx` | React 挂载入口 |
| `src/App.jsx` | ConfigProvider（zh_CN、主题 token）、顶部导航、两视图切换 |
| `src/data/menu.js` | 内置示例菜单（8 个菜品，名称 + 整数价格） |
| `src/domain/cart.js` | 购物车领域纯函数（加入/增减/移除/明细/合计/份数） |
| `src/domain/orders.js` | 订单领域纯函数（编号生成、订单创建快照、完成标记） |
| `src/storage/orders-store.js` | localStorage 仓储（读写、容错解析、测试重置入口） |
| `src/hooks/useOrders.js` | 订单 state 与 localStorage 同步（刷新时惰性恢复） |
| `src/pages/OrderingPage.jsx` | 顾客点单界面（菜单、点单汇总、提交与订单确认弹窗） |
| `src/pages/OrdersPage.jsx` | 商家订单界面（列表、明细抽屉、标记完成） |
| `src/styles/global.css` | 布局与视觉样式（参考 antd-workbench 基线：浅色工作区、主色 #315fe8） |
| `tests/cart.test.js` | R2 相关单测（8 例） |
| `tests/orders.test.js` | R3/R5 相关单测（9 例） |
| `tests/orders-store.test.js` | R4 相关单测（7 例） |
| `README.md` | 追加应用运行说明（安装、启动、构建、测试、数据重置） |

## 4. 开发验证证据

在工作区根目录执行，退出码为命令真实退出码：

| 检查 | 命令 | 结果 | 退出码 |
| --- | --- | --- | --- |
| 单元测试 | `npm test`（vitest run，jsdom） | 3 个测试文件、24 个用例全部通过 | 0 |
| 生产构建 | `npm run build`（vite build） | 3033 模块转译成功，产物 `dist/index.html` + assets | 0 |
| 开发服务器健康检查 | `curl http://localhost:5173/` | HTTP 200，返回应用 HTML | 0 |
| 类型检查 | —（不适用） | 项目为纯 JavaScript（JSX），无 TypeScript 配置与独立 typecheck 脚本；构建期 esbuild/rollup 转译覆盖语法与解析检查 | — |

Vitest 输出摘要：

```
 ✓ tests/cart.test.js (8 tests)
 ✓ tests/orders.test.js (9 tests)
 ✓ tests/orders-store.test.js (7 tests)
 Test Files  3 passed (3)
      Tests  24 passed (24)
```

按开发验证边界，本阶段未执行浏览器 E2E / 完整用户流程验收；`http://localhost:5173/` 仅作为应用预览入口，不构成验收证据。

## 5. 需求规则覆盖对照

| 规则 | 实现位置 | 单测证据（已执行） | 浏览器验证（留 QA） |
| --- | --- | --- | --- |
| R1 菜单展示（名称 + 价格） | `src/data/menu.js`、`OrderingPage` 菜单网格 | 数据结构由 cart/orders 单测间接覆盖 | 菜单列表渲染（AC-01） |
| R2 选择与数量、合计即时更新 | `domain/cart.js` + `OrderingPage` 汇总面板 | `tests/cart.test.js`：加入/累加/增减/移除、合计 Σ单价×数量随数量变化、份数统计 | 界面交互与即时刷新（AC-01） |
| R3 提交与订单确认（唯一编号、明细、合计） | `domain/orders.js` + `OrderingPage` 确认弹窗 | `tests/orders.test.js`：编号唯一且单调递增、明细快照与合计一致、快照不受菜单后续变化影响、空车不生成订单 | 提交互动与确认展示（AC-02） |
| R4 订单会话内读回（含刷新） | `storage/orders-store.js` + `useOrders` 惰性恢复 | `tests/orders-store.test.js`：保存后读回一致、模拟刷新读回、完成状态读回、损坏数据容错 | 页面刷新后商家侧可见（AC-02） |
| R5 商家查看与标记完成 | `OrdersPage` + `domain/orders.markOrderCompleted` | `tests/orders.test.js`：状态流转、不可变更新、未知编号安全、重复标记幂等 | 列表/明细/标记交互与状态可见变化（AC-03） |

实现未涉及（按需求基线第 5 节明确未纳入）：在线支付、菜品维护、桌号、会员、优惠券、跨设备/跨用户数据同步、认证鉴权。

## 6. QA 交接信息

- **启动**：工作区根目录 `npm install && npm run dev`；默认地址 `http://localhost:5173/`（端口被占用时 Vite 自动顺延，以终端输出为准）。当前会话已以后台作业启动同一服务，可直接访问。
- **无登录**：应用无认证，两个角色通过顶部导航「点单」（顾客）与「订单管理」（商家）切换。
- **测试数据**：内置示例菜单，无需准备；顾客在「点单」视图提交即产生订单。
- **数据重置**：浏览器开发者工具控制台执行 `localStorage.removeItem('orders')`，刷新页面回到初始空状态。
- **建议验收路径**：
  1. AC-01：进入「点单」，确认菜单含名称与价格；加入至少 2 个菜品、调整其中 1 个数量，核对汇总与合计金额即时更新。
  2. AC-02：提交点单，核对确认弹窗中订单编号、菜品明细（名称、数量、单价）与合计金额与所选一致；刷新页面。
  3. AC-03：切换「订单管理」，确认刷新后订单仍在；查看明细并标记完成，确认列表与明细状态变为「已完成」。
- 应用无随机结果、定时任务或异步外部事件，业务流程为确定性请求-响应式交互，未引入额外的确定性测试控制入口。

## 7. 遗留风险与建议

- 构建产物单 JS chunk 约 1.06 MB（minified；Ant Design 全量引入所致），Vite 输出体积提示。对功能与验收无影响；后续可按需引入组件或代码分割优化。
- 订单编号唯一性的生命周期为「当前浏览器站点数据生命周期」：清空站点数据后从 `ORD-0001` 重新计数，符合架构基线边界（不做跨浏览器/设备唯一）。
- 其余无已知阻塞。
