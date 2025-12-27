'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic } from 'antd';
import { ShoppingCartOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UserOutlined, ShopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import bookingService, { PharmacyOrder } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function PharmacyOrdersPage() {
    const [orders, setOrders] = useState<PharmacyOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await bookingService.getPharmacyOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            message.error('Không thể tải danh sách đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa đơn hàng',
            content: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.deletePharmacyOrder(id);
                    message.success('Đã xóa đơn hàng');
                    fetchOrders();
                } catch (error) {
                    message.error('Lỗi khi xóa đơn hàng');
                }
            }
        });
    };

    const filteredData = orders.filter(item =>
        item.code.toLowerCase().includes(searchText.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.customerPhone.includes(searchText)
    );

    const columns: ColumnsType<PharmacyOrder> = [
        {
            title: 'Mã đơn',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <Text strong style={{ color: '#1890ff' }}>{text}</Text>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            render: (text, record) => (
                <Space>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserOutlined />
                    </div>
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.customerPhone}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Nhà thuốc',
            dataIndex: 'pharmacy',
            key: 'pharmacy',
            render: (text) => (
                <Space>
                    <ShopOutlined />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Số món',
            dataIndex: 'itemsCount',
            key: 'itemsCount',
            render: (val) => <Tag color="blue">{val} món</Tag>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (val: number) => <Text strong style={{ color: '#3f8600' }}>{val.toLocaleString()} đ</Text>,
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'completed' ? 'success' : status === 'pending' ? 'orange' : status === 'cancelled' ? 'error' : 'processing'}>
                    {(status || 'processing').toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} type="link">Xem</Button>
                    <Button icon={<EditOutlined />} type="link">Sửa</Button>
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
                <Breadcrumb.Item>Đơn thuốc</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Đơn thuốc</Title>
                    <Text type="secondary">Quản lý và theo dõi các đơn hàng dược phẩm</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => message.info('Tính năng đang phát triển')}>
                    Tạo đơn mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng đơn hàng" value={orders.length} prefix={<ShoppingCartOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đang chờ" value={orders.filter(o => o.status === 'pending').length} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hoàn tất" value={orders.filter(o => o.status === 'completed').length} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Doanh thu" value={orders.reduce((sum, o) => sum + o.totalAmount, 0)} suffix="đ" />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm kiếm mã đơn, khách hàng, số điện thoại..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 400 }}
                    allowClear
                />
            </Card>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
}
