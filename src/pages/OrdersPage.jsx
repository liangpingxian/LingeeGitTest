import React, { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Drawer,
  Empty,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { CheckOutlined, EyeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Text } = Typography

const STATUS_META = {
  pending: { text: '未完成', color: 'gold', badge: 'warning' },
  completed: { text: '已完成', color: 'success', badge: 'success' },
}

const DETAIL_COLUMNS = [
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

export default function OrdersPage({ orders, onMarkCompleted }) {
  const [detailId, setDetailId] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()

  const detailOrder = useMemo(
    () => orders.find((order) => order.id === detailId) || null,
    [orders, detailId]
  )

  const handleMarkCompleted = (orderId) => {
    onMarkCompleted(orderId)
    messageApi.success(`订单 ${orderId} 已标记为已完成`)
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      render: (value, record) => (
        <Button
          type="link"
          className="order-link"
          onClick={() => setDetailId(record.id)}
        >
          {value}
        </Button>
      ),
    },
    {
      title: '菜品数',
      key: 'itemCount',
      width: 90,
      align: 'center',
      render: (_, record) => record.items.reduce((sum, item) => sum + item.qty, 0),
    },
    {
      title: '合计金额',
      key: 'total',
      width: 110,
      render: (_, record) => <strong>¥{record.total}</strong>,
    },
    {
      title: '状态',
      key: 'status',
      width: 110,
      render: (_, record) => {
        const meta = STATUS_META[record.status] || STATUS_META.pending
        return <Tag color={meta.color}>{meta.text}</Tag>
      },
    },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 170,
      render: (value) => <Text type="secondary">{formatTime(value)}</Text>,
    },
    {
      title: '操作',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => setDetailId(record.id)}>
            详情
          </Button>
          {record.status === 'pending' && (
            <Popconfirm
              title="确认将该订单标记为已完成？"
              okText="标记完成"
              cancelText="取消"
              onConfirm={() => handleMarkCompleted(record.id)}
            >
              <Button type="primary" icon={<CheckOutlined />}>
                标记完成
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div className="orders-page">
      {contextHolder}
      <div className="page-heading">
        <div>
          <div className="eyebrow">ORDERS</div>
          <h1>订单管理</h1>
          <p>查看顾客提交的订单明细，并将订单标记为已完成。</p>
        </div>
        <Badge
          count={orders.filter((order) => order.status === 'pending').length}
          title="未完成订单数"
          color="#315fe8"
          offset={[-4, 4]}
        >
          <span className="pending-label">未完成订单</span>
        </Badge>
      </div>

      <Card styles={{ body: { padding: 0 } }}>
        {orders.length === 0 ? (
          <div className="orders-empty">
            <Empty description="暂无订单，顾客提交点单后将显示在这里" />
          </div>
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={orders}
            pagination={false}
          />
        )}
      </Card>

      <Drawer
        open={detailOrder !== null}
        title={detailOrder ? `订单明细 · ${detailOrder.id}` : ''}
        onClose={() => setDetailId(null)}
        width={420}
        footer={null}
      >
        {detailOrder && (
          <div className="order-detail">
            <div className="order-detail-meta">
              <Space direction="vertical" size={4}>
                <Space>
                  <span className="muted">状态：</span>
                  <Tag color={STATUS_META[detailOrder.status].color}>
                    {STATUS_META[detailOrder.status].text}
                  </Tag>
                </Space>
                <span className="muted">提交时间：{formatTime(detailOrder.createdAt)}</span>
              </Space>
            </div>
            <Table
              size="small"
              pagination={false}
              columns={DETAIL_COLUMNS}
              dataSource={detailOrder.items}
              rowKey="id"
            />
            <div className="cart-total">
              <span>合计金额</span>
              <strong>¥{detailOrder.total}</strong>
            </div>
            {detailOrder.status === 'pending' && (
              <Popconfirm
                title="确认将该订单标记为已完成？"
                okText="标记完成"
                cancelText="取消"
                onConfirm={() => handleMarkCompleted(detailOrder.id)}
              >
                <Button type="primary" block icon={<CheckOutlined />}>
                  标记为已完成
                </Button>
              </Popconfirm>
            )}
          </div>
        )}
      </Drawer>
    </div>
  )
}

function formatTime(iso) {
  if (!iso) {
    return '—'
  }
  return dayjs(iso).format('YYYY-MM-DD HH:mm:ss')
}
