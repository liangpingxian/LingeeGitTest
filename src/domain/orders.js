import { cartEntries } from './cart.js'

// 订单领域逻辑（纯函数）
// 订单结构：{ id, items: [{id, name, price, qty}], total, status: 'pending'|'completed', createdAt }

const ORDER_ID_PREFIX = 'ORD'

// 订单编号：在当前浏览器数据生命周期内单调递增且唯一（R3 / 架构基线）
export function nextOrderId(orders) {
  const maxSeq = orders.reduce((max, order) => {
    const seq = Number(String(order.id || '').slice(ORDER_ID_PREFIX.length + 1))
    return Number.isFinite(seq) && seq > max ? seq : max
  }, 0)
  return `${ORDER_ID_PREFIX}-${String(maxSeq + 1).padStart(4, '0')}`
}

// 提交点单：按提交时刻的菜单生成明细快照（名称、数量、单价），不随后续菜单变化
export function createOrder(orders, cart, menu) {
  const entries = cartEntries(cart, menu)
  if (entries.length === 0) {
    return null
  }
  return {
    id: nextOrderId(orders),
    items: entries.map((entry) => ({
      id: entry.item.id,
      name: entry.item.name,
      price: entry.item.price,
      qty: entry.qty,
    })),
    total: entries.reduce((sum, entry) => sum + entry.subtotal, 0),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
}

// 商家标记完成（R5）：不可变更新，仅目标订单状态变化
export function markOrderCompleted(orders, orderId) {
  const exists = orders.some((order) => order.id === orderId)
  if (!exists) {
    return orders
  }
  return orders.map((order) =>
    order.id === orderId
      ? { ...order, status: 'completed', completedAt: new Date().toISOString() }
      : order
  )
}
