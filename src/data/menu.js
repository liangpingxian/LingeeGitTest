// 内置示例菜单：名称 + 价格（单位：元，整数存储避免浮点误差）
// 来源：需求基线第 3 节「菜单数据」——内置示例菜单，不提供维护界面
export const MENU_ITEMS = [
  { id: 'm01', name: '葱油拌面', price: 18 },
  { id: 'm02', name: '鲜肉小笼包', price: 22 },
  { id: 'm03', name: '招牌牛肉面', price: 32 },
  { id: 'm04', name: '黄金咖喱鸡饭', price: 28 },
  { id: 'm05', name: '梅菜扣肉饭', price: 26 },
  { id: 'm06', name: '上汤云吞', price: 20 },
  { id: 'm07', name: '冰镇柠檬茶', price: 12 },
  { id: 'm08', name: '杨枝甘露', price: 15 },
]

export function findMenuItem(menu, itemId) {
  return menu.find((item) => item.id === itemId) || null
}
