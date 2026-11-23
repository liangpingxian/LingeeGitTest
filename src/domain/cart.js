import { findMenuItem } from '../data/menu.js'

// 购物车领域逻辑（纯函数）：cart 结构为 { [itemId]: qty }

export function addToCart(cart, itemId) {
  return { ...cart, [itemId]: (cart[itemId] || 0) + 1 }
}

export function setCartQty(cart, itemId, qty) {
  if (!Number.isFinite(qty) || qty <= 0) {
    const next = { ...cart }
    delete next[itemId]
    return next
  }
  return { ...cart, [itemId]: Math.floor(qty) }
}

export function removeFromCart(cart, itemId) {
  const next = { ...cart }
  delete next[itemId]
  return next
}

export function cartEntries(cart, menu) {
  return Object.entries(cart)
    .map(([itemId, qty]) => {
      const item = findMenuItem(menu, itemId)
      return item ? { item, qty, subtotal: item.price * qty } : null
    })
    .filter(Boolean)
}

// 合计金额 = Σ 菜品单价 × 数量（R2）
export function cartTotal(cart, menu) {
  return cartEntries(cart, menu).reduce((sum, entry) => sum + entry.subtotal, 0)
}

export function cartCount(cart) {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
}
