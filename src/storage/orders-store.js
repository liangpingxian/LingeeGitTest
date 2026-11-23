// 订单仓储：浏览器 localStorage 单一 JSON 条目（键 orders）
// 持久边界（R4 / 架构基线）：同一浏览器会话内刷新或重新打开后仍可读回

const STORAGE_KEY = 'orders'

export function loadOrders() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter(
      (order) => order && typeof order === 'object' && typeof order.id === 'string' && Array.isArray(order.items)
    )
  } catch {
    return []
  }
}

export function saveOrders(orders) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

// 清空订单数据：测试与验收场景重置用，不作为业务功能入口
export function clearOrders() {
  window.localStorage.removeItem(STORAGE_KEY)
}
