import React, { useState } from 'react'
import { ConfigProvider, Layout, Menu } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  ShoppingCartOutlined,
  OrderedListOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import OrderingPage from './pages/OrderingPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import { useOrders } from './hooks/useOrders.js'

const { Header, Content } = Layout

const NAV_ITEMS = [
  { key: 'ordering', icon: <ShoppingCartOutlined />, label: '点单' },
  { key: 'orders', icon: <OrderedListOutlined />, label: '订单管理' },
]

export default function App() {
  const [view, setView] = useState('ordering')
  const { orders, submitOrder, markCompleted } = useOrders()

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#315fe8',
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
          colorText: '#202b3a',
          colorBgLayout: '#f4f6fa',
          controlHeight: 36,
          fontSize: 14,
        },
      }}
    >
      <Layout className="app-shell">
        <Header className="app-header">
          <div className="app-brand">
            <span className="app-brand-icon">
              <ShopOutlined />
            </span>
            <span className="app-brand-text">
              <strong>点单小程序</strong>
              <span>ORDERING</span>
            </span>
          </div>
          <Menu
            mode="horizontal"
            selectedKeys={[view]}
            items={NAV_ITEMS}
            onClick={({ key }) => setView(key)}
            className="app-nav"
          />
        </Header>
        <Content className="app-content">
          {view === 'ordering' ? (
            <OrderingPage menuSource={undefined} onSubmit={submitOrder} orderCount={orders.length} />
          ) : (
            <OrdersPage orders={orders} onMarkCompleted={markCompleted} />
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  )
}
