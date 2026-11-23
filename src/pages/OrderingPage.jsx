import React, { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Empty,
  InputNumber,
  Modal,
  Result,
  Space,
  Table,
  Typography,
  message,
} from 'antd'
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { MENU_ITEMS } from '../data/menu.js'
import {
  addToCart,
  cartEntries,
  cartTotal,
  removeFromCart,
  setCartQty,
} from '../domain/cart.js'

const { Text } = Typography

const CONFIRM_COLUMNS = [
  { title: '菜品名称', dataIndex: 'name', key: 'name' },
  { title: '数量', dataIndex: 'qty', key: 'qty', width: 80, align: 'center' },
  { title: '单价', dataIndex: 'price', key: 'price', width: 100, render: (v) => `¥${v}` },
  {
    title: '小计',
    key: 'subtotal',
    width: 100,
    render: (_, record) => `¥${record.price * record.qty}`,
  },
]

export default function OrderingPage({ onSubmit }) {
  const [cart, setCart] = useState({})
  const [confirmedOrder, setConfirmedOrder] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()

  const menu = MENU_ITEMS
  const entries = useMemo(() => cartEntries(cart, menu), [cart, menu])
  const total = useMemo(() => cartTotal(cart, menu), [cart, menu])

  const handleSubmit = () => {
    if (entries.length === 0) {
      return
    }
    const order = onSubmit(cart, menu)
    if (!order) {
      messageApi.warning('请先选择菜品')
      return
    }
    setConfirmedOrder(order)
  }

  const handleContinue = () => {
    setConfirmedOrder(null)
    setCart({})
  }

  return (
    <div className="ordering-page">
      {contextHolder}
      <div className="page-heading">
        <div>
          <div className="eyebrow">ORDERING</div>
          <h1>开始点单</h1>
          <p>浏览菜单，选择菜品并提交点单。</p>
        </div>
      </div>

      <div className="ordering-layout">
        <div className="menu-pane">
          <Card
            title="菜单"
            extra={<Text type="secondary">共 {menu.length} 个菜品</Text>}
            styles={{ body: { padding: 16 } }}
          >
            <div className="menu-grid">
              {menu.map((item) => {
                const qty = cart[item.id] || 0
                return (
                  <div className="menu-item" key={item.id}>
                    <div className="menu-item-info">
                      <strong>{item.name}</strong>
                      <span className="menu-item-price">¥{item.price}</span>
                    </div>
                    {qty === 0 ? (
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setCart(addToCart(cart, item.id))}
                      >
                        加入点单
                      </Button>
                    ) : (
                      <Space size={4}>
                        <Button
                          aria-label={`减少 ${item.name} 数量`}
                          onClick={() => setCart(setCartQty(cart, item.id, qty - 1))}
                        >
                          −
                        </Button>
                        <span className="cart-qty">{qty}</span>
                        <Button
                          aria-label={`增加 ${item.name} 数量`}
                          onClick={() => setCart(setCartQty(cart, item.id, qty + 1))}
                        >
                          +
                        </Button>
                        <Button
                          type="text"
                          danger
                          onClick={() => setCart(removeFromCart(cart, item.id))}
                        >
                          移除
                        </Button>
                      </Space>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div className="cart-pane">
          <Card
            title={
              <Space>
                <ShoppingCartOutlined />
                <span>我的点单</span>
                {entries.length > 0 && <Badge count={entries.length} color="#315fe8" />}
              </Space>
            }
            styles={{ body: { padding: 16 } }}
          >
            {entries.length === 0 ? (
              <Empty description="尚未选择菜品" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <div className="cart-list">
                {entries.map((entry) => (
                  <div className="cart-row" key={entry.item.id}>
                    <div className="cart-row-info">
                      <strong>{entry.item.name}</strong>
                      <span className="muted">¥{entry.item.price} × {entry.qty}</span>
                    </div>
                    <div className="cart-row-actions">
                      <InputNumber
                        min={1}
                        max={99}
                        value={entry.qty}
                        aria-label={`调整 ${entry.item.name} 数量`}
                        onChange={(value) =>
                          setCart(setCartQty(cart, entry.item.id, value))
                        }
                      />
                      <Button
                        type="text"
                        danger
                        onClick={() => setCart(removeFromCart(cart, entry.item.id))}
                      >
                        移除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="cart-total">
              <span>合计金额</span>
              <strong>¥{total}</strong>
            </div>
            <Button
              type="primary"
              block
              size="large"
              disabled={entries.length === 0}
              onClick={handleSubmit}
            >
              提交点单
            </Button>
          </Card>
        </div>
      </div>

      <Modal
        open={confirmedOrder !== null}
        title="点单已提交"
        okText="继续点单"
        onOk={handleContinue}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        maskClosable={false}
      >
        {confirmedOrder && (
          <div className="order-confirm">
            <Result
              status="success"
              title={`订单编号：${confirmedOrder.id}`}
              subTitle={`合计金额 ¥${confirmedOrder.total}`}
            />
            <Table
              size="small"
              pagination={false}
              columns={CONFIRM_COLUMNS}
              dataSource={confirmedOrder.items}
              rowKey="id"
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
