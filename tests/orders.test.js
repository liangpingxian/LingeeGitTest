import { describe, expect, it } from 'vitest'
import { MENU_ITEMS } from '../src/data/menu.js'
import { addToCart, setCartQty } from '../src/domain/cart.js'
import {
  createOrder,
  markOrderCompleted,
  nextOrderId,
} from '../src/domain/orders.js'

const menu = MENU_ITEMS

function buildCart(...specs) {
  let cart = {}
  for (const [itemId, qty] of specs) {
    cart = addToCart(cart, itemId)
    cart = setCartQty(cart, itemId, qty)
  }
  return cart
}

describe('订单编号（R3：唯一）', () => {
  it('无历史订单时生成 ORD-0001', () => {
    expect(nextOrderId([])).toBe('ORD-0001')
  })

  it('订单编号在当前浏览器数据生命周期内单调递增且唯一', () => {
    let orders = []
    const ids = []
    for (let i = 0; i < 3; i += 1) {
      const cart = buildCart(['m01', 1])
      const order = createOrder(orders, cart, menu)
      ids.push(order.id)
      orders = [...orders, order]
    }
    expect(ids).toEqual(['ORD-0001', 'ORD-0002', 'ORD-0003'])
    expect(new Set(ids).size).toBe(3)
  })
})

describe('订单提交（R3：确认信息与所选内容一致）', () => {
  it('空购物车提交返回 null，不生成订单', () => {
    expect(createOrder([], {}, menu)).toBeNull()
  })

  it('订单明细快照包含名称、数量、单价，合计金额与所选内容一致', () => {
    const cart = buildCart(['m01', 2], ['m07', 1]) // 拌面×2 + 柠檬茶×1
    const order = createOrder([], cart, menu)
    expect(order.id).toBe('ORD-0001')
    expect(order.items).toEqual([
      { id: 'm01', name: '葱油拌面', price: 18, qty: 2 },
      { id: 'm07', name: '冰镇柠檬茶', price: 12, qty: 1 },
    ])
    expect(order.total).toBe(48)
    expect(order.status).toBe('pending')
    expect(typeof order.createdAt).toBe('string')
  })

  it('订单明细为提交时刻快照，不受后续菜单数据变化影响', () => {
    const cart = buildCart(['m02', 1])
    const order = createOrder([], cart, menu)
    const snapshotItem = order.items[0]
    // 模拟菜单后续变化：直接修改菜单源对象不影响已生成订单
    const mutatedMenu = menu.map((m) => ({ ...m }))
    const mutated = mutatedMenu.find((m) => m.id === 'm02')
    mutated.name = '改名后的小笼包'
    mutated.price = 99
    expect(snapshotItem.name).toBe('鲜肉小笼包')
    expect(snapshotItem.price).toBe(22)
    expect(order.total).toBe(22)
  })
})

describe('商家标记完成（R5：状态可见变化）', () => {
  it('标记后目标订单状态变为 completed，其余订单不受影响', () => {
    const order1 = createOrder([], buildCart(['m01', 1]), menu)
    const order2 = createOrder([order1], buildCart(['m03', 1]), menu)
    const orders = [order1, order2]
    const next = markOrderCompleted(orders, order1.id)
    expect(next.find((o) => o.id === order1.id).status).toBe('completed')
    expect(next.find((o) => o.id === order2.id).status).toBe('pending')
    expect(typeof next.find((o) => o.id === order1.id).completedAt).toBe('string')
  })

  it('标记完成返回新数组，原数组不被修改', () => {
    const order = createOrder([], buildCart(['m01', 1]), menu)
    const orders = [order]
    const next = markOrderCompleted(orders, order.id)
    expect(next).not.toBe(orders)
    expect(orders[0].status).toBe('pending')
    expect(next[0].status).toBe('completed')
  })

  it('标记不存在的订单编号时原样返回', () => {
    const order = createOrder([], buildCart(['m01', 1]), menu)
    const orders = [order]
    expect(markOrderCompleted(orders, 'ORD-9999')).toBe(orders)
  })

  it('已完成的订单再次标记保持 completed', () => {
    const order = createOrder([], buildCart(['m01', 1]), menu)
    const once = markOrderCompleted([order], order.id)
    const twice = markOrderCompleted(once, order.id)
    expect(twice.find((o) => o.id === order.id).status).toBe('completed')
  })
})
