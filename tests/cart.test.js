import { describe, expect, it } from 'vitest'
import { MENU_ITEMS } from '../src/data/menu.js'
import {
  addToCart,
  cartCount,
  cartEntries,
  cartTotal,
  removeFromCart,
  setCartQty,
} from '../src/domain/cart.js'

const menu = MENU_ITEMS
const noodle = menu.find((m) => m.id === 'm01') // 葱油拌面 ¥18
const tea = menu.find((m) => m.id === 'm07') // 冰镇柠檬茶 ¥12

describe('购物车：选择与数量（R2）', () => {
  it('addToCart 将新菜品加入点单，数量为 1', () => {
    const cart = addToCart({}, noodle.id)
    expect(cart).toEqual({ [noodle.id]: 1 })
  })

  it('addToCart 对已选菜品数量累加', () => {
    let cart = addToCart({}, noodle.id)
    cart = addToCart(cart, noodle.id)
    expect(cart[noodle.id]).toBe(2)
  })

  it('setCartQty 支持增减数量，数量减到 0 时移除该菜品', () => {
    let cart = addToCart({}, noodle.id)
    cart = addToCart(cart, noodle.id)
    cart = setCartQty(cart, noodle.id, 3)
    expect(cart[noodle.id]).toBe(3)
    cart = setCartQty(cart, noodle.id, 1)
    expect(cart[noodle.id]).toBe(1)
    cart = setCartQty(cart, noodle.id, 0)
    expect(cart).toEqual({})
    cart = setCartQty(cart, noodle.id, -2)
    expect(cart).toEqual({})
  })

  it('removeFromCart 移除指定菜品', () => {
    let cart = addToCart({}, noodle.id)
    cart = addToCart(cart, tea.id)
    cart = removeFromCart(cart, noodle.id)
    expect(cart).toEqual({ [tea.id]: 1 })
  })

  it('cartEntries 返回菜品、数量与小计', () => {
    let cart = addToCart({}, noodle.id)
    cart = addToCart(cart, noodle.id)
    cart = addToCart(cart, tea.id)
    const entries = cartEntries(cart, menu)
    expect(entries).toHaveLength(2)
    const noodleEntry = entries.find((e) => e.item.id === noodle.id)
    expect(noodleEntry.qty).toBe(2)
    expect(noodleEntry.subtotal).toBe(36)
  })

  it('cartTotal 合计金额 = 各菜品单价 × 数量之和，随数量调整变化', () => {
    let cart = addToCart({}, noodle.id) // ¥18
    cart = addToCart(cart, noodle.id) // ×2 = ¥36
    cart = addToCart(cart, tea.id) // ¥12
    expect(cartTotal(cart, menu)).toBe(48)
    cart = setCartQty(cart, noodle.id, 3) // ¥54 + ¥12
    expect(cartTotal(cart, menu)).toBe(66)
  })

  it('cartTotal 忽略菜单中不存在的菜品条目', () => {
    const cart = { 'unknown-item': 5 }
    expect(cartTotal(cart, menu)).toBe(0)
  })

  it('cartCount 统计所选菜品总份数', () => {
    let cart = addToCart({}, noodle.id)
    cart = addToCart(cart, noodle.id)
    cart = addToCart(cart, tea.id)
    expect(cartCount(cart)).toBe(3)
  })
})
