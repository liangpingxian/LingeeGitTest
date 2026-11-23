import { useCallback, useState } from 'react'
import { createOrder, markOrderCompleted } from '../domain/orders.js'
import { loadOrders, saveOrders } from '../storage/orders-store.js'

// 订单数据入口：state 与 localStorage 同步读写
// 刷新页面时通过 useState 惰性初始化从 localStorage 读回（R4）
export function useOrders() {
  const [orders, setOrders] = useState(() => loadOrders())

  // 提交点单：写入 state 并持久化，返回新订单供确认展示（R3）
  const submitOrder = useCallback(
    (cart, menu) => {
      const order = createOrder(orders, cart, menu)
      if (!order) {
        return null
      }
      const next = [...orders, order]
      setOrders(next)
      saveOrders(next)
      return order
    },
    [orders]
  )

  // 商家标记完成（R5）
  const markCompleted = useCallback(
    (orderId) => {
      const next = markOrderCompleted(orders, orderId)
      setOrders(next)
      saveOrders(next)
      return next
    },
    [orders]
  )

  return { orders, submitOrder, markCompleted }
}
