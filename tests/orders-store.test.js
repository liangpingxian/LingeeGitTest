import { afterEach, describe, expect, it } from 'vitest'
import { MENU_ITEMS } from '../src/data/menu.js'
import { addToCart } from '../src/domain/cart.js'
import { createOrder, markOrderCompleted } from '../src/domain/orders.js'
import {
  clearOrders,
  loadOrders,
  saveOrders,
} from '../src/storage/orders-store.js'

const menu = MENU_ITEMS

function submittedOrder() {
  const cart = addToCart(addToCart({}, 'm01'), 'm07')
  return createOrder([], cart, menu)
}

afterEach(() => {
  clearOrders()
})

describe('订单 localStorage 读写（R4：会话内含页面刷新可读回）', () => {
  it('保存后可读回同一订单：编号、明细、合计金额与状态一致', () => {
    const order = submittedOrder()
    saveOrders([order])
    const loaded = loadOrders()
    expect(loaded).toEqual([order])
    expect(loaded[0].id).toBe('ORD-0001')
    expect(loaded[0].items).toEqual([
      { id: 'm01', name: '葱油拌面', price: 18, qty: 1 },
      { id: 'm07', name: '冰镇柠檬茶', price: 12, qty: 1 },
    ])
    expect(loaded[0].total).toBe(30)
  })

  it('模拟页面刷新：同一浏览器上下文内重新加载仍可读回', () => {
    const order = submittedOrder()
    saveOrders([order])
    // 模拟刷新后重新初始化（jsdom 同一 localStorage 实例）
    const reloaded = loadOrders()
    expect(reloaded).toHaveLength(1)
    expect(reloaded[0].id).toBe(order.id)
  })

  it('未写入任何数据时返回空列表', () => {
    expect(loadOrders()).toEqual([])
  })

  it('标记完成后的状态持久化，刷新后仍读回已完成', () => {
    const order = submittedOrder()
    const completed = markOrderCompleted([order], order.id)
    saveOrders(completed)
    const loaded = loadOrders()
    expect(loaded[0].status).toBe('completed')
  })

  it('数据损坏（非法 JSON）时返回空列表而不抛错', () => {
    window.localStorage.setItem('orders', '{broken json')
    expect(loadOrders()).toEqual([])
  })

  it('存储内容不是数组时返回空列表', () => {
    window.localStorage.setItem('orders', JSON.stringify({ not: 'array' }))
    expect(loadOrders()).toEqual([])
  })

  it('列表中结构不完整的条目被过滤', () => {
    const order = submittedOrder()
    saveOrders([order, null, { id: 123 }, { id: 'ORD-0002' }])
    const loaded = loadOrders()
    expect(loaded).toEqual([order])
  })
})
