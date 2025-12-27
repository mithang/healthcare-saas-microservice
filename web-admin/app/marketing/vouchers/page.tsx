'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Progress } from 'antd';
import { GiftOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RocketOutlined, ClockCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import marketingService, { Voucher } from '@/services/marketing.service';

const { Title, Text } = Typography;

export default function VouchersPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchVouchers = async () => {
        setLoading(true);
        try {
            const data = await marketingService.getVouchers();
            setVouchers(data);
        } catch (error) {
            console.error('Failed to fetch vouchers:', error);
            message.error('Không thể tải danh sách khuyến mãi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa Voucher',
            content: 'Bạn có chắc chắn muốn xóa mã giảm giá này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await marketingService.deleteVoucher(id);
                    message.success('Đã xóa voucher');
                    fetchVouchers();
                } catch (error) {
                    message.error('Lỗi khi xóa voucher');
                }
            }
        });
    };

    const handleCreate = async () => {
        try {
            await marketingService.createVoucher({
                code: 'HEALTH' + Math.floor(Math.random() * 1000),
                name: 'KM Sức khỏe ' + new Date().toLocaleTimeString(),
                discount: '50.000 ₫',
                minOrder: '200.000 ₫',
                used: 0,
                maxUses: 100,
                expiry: '31/12/2025',
                status: 'published'
            });
            message.success('Đã tạo voucher mới');
            fetchVouchers();
        } catch (error) {
            message.error('Lỗi khi tạo voucher');
        }
    };

    const filteredData = vouchers.filter(item =>
        item.code.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<Voucher> = [
        {
            title: 'Mã Voucher',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px', fontWeight: 'bold' }}>{text}</Tag>,
        },
        {
            title: 'Chương trình',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            render: (text) => <Text style={{ color: '#cf1322', fontWeight: 'bold' }}>{text}</Text>,
        },
        {
            title: 'Đơn tối thiểu',
            dataIndex: 'minOrder',
            key: 'minOrder',
        },
        {
            title: 'Sử dụng',
            key: 'usage',
            render: (_, record) => (
                <div style={{ width: '120px' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{record.used}/{record.maxUses}</Text>
                    <Progress percent={Math.round((record.used / record.maxUses) * 100)} size="small" status="active" />
                </div>
            ),
        },
        {
            title: 'Hạn dùng',
            dataIndex: 'expiry',
            key: 'expiry',
            render: (text) => (
                <Space>
                    <ClockCircleOutlined style={{ color: '#faad14' }} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'published' ? 'success' : 'default'}>
                    {(status || 'DRAFT').toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} type="link" />
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Marketing</Breadcrumb.Item>
                <Breadcrumb.Item>Mã giảm giá (Vouchers)</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Voucher</Title>
                    <Text type="secondary">Tạo và quản lý các mã khuyến mãi cho khách hàng</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreate}>
                    Tạo Voucher mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng Voucher" value={vouchers.length} prefix={<GiftOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đang chạy" value={vouchers.filter(v => v.status === 'published').length} valueStyle={{ color: '#3f8600' }} prefix={<RocketOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã dùng" value={vouchers.reduce((sum, v) => sum + v.used, 0)} prefix={<PercentageOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hết hạn" value={0} valueStyle={{ color: '#cf1322' }} prefix={<ClockCircleOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm kiếm theo mã hoặc tên chương trình..."
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
                pagination={{ pageSize: 15 }}
            />
        </div>
    );
}
