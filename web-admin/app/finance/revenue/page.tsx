'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Tag, Row, Col, Statistic, Breadcrumb, message } from 'antd';
import { DollarOutlined, LineChartOutlined, PercentageOutlined, WalletOutlined, PlusOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import financeService, { Revenue } from '@/services/finance.service';

const { Title, Text } = Typography;

export default function RevenuePage() {
    const [revenueData, setRevenueData] = useState<Revenue[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRevenue = async () => {
        setLoading(true);
        try {
            const data = await financeService.getRevenue();
            setRevenueData(data);
        } catch (error) {
            console.error('Failed to fetch revenue:', error);
            message.error('Không thể tải dữ liệu doanh thu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenue();
    }, []);

    const totalAmount = revenueData.reduce((acc, curr) => acc + curr.amount, 0);
    const totalFee = revenueData.reduce((acc, curr) => acc + curr.fee, 0);
    const totalNet = revenueData.reduce((acc, curr) => acc + curr.net, 0);

    const handleCreateRevenue = async () => {
        try {
            await financeService.createRevenue({
                type: 'Đặt khám',
                details: 'Khám bệnh nhi khoa',
                amount: 500000,
                fee: 50000,
                net: 450000,
                status: 'Done'
            });
            message.success('Đã ghi nhận doanh thu mới');
            fetchRevenue();
        } catch (error) {
            message.error('Lỗi khi tạo doanh thu');
        }
    };

    const columns: ColumnsType<Revenue> = [
        {
            title: 'Thời gian',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (val: string) => <span>{new Date(val).toLocaleString('vi-VN')}</span>,
            sorter: (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Chi tiết',
            dataIndex: 'details',
            key: 'details',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (val: number) => <Text strong style={{ color: '#3f8600' }}>{val.toLocaleString()} đ</Text>,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (val: string) => (
                <Tag color={val === 'Done' ? 'success' : 'orange'} icon={val === 'Done' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}>
                    {val === 'Done' ? 'Hoàn tất' : 'Đang xử lý'}
                </Tag>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Tài chính</Breadcrumb.Item>
                <Breadcrumb.Item>Doanh thu</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Doanh thu</Title>
                    <Text type="secondary">Theo dõi các giao dịch và dòng tiền trong hệ thống</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreateRevenue}>
                    Ghi nhận doanh thu
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng doanh thu" value={totalAmount} suffix="đ" prefix={<DollarOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Thực nhận (Net)" value={totalNet} suffix="đ" valueStyle={{ color: '#3f8600' }} prefix={<LineChartOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Phí hệ thống" value={totalFee} suffix="đ" valueStyle={{ color: '#fa8c16' }} prefix={<PercentageOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Số giao dịch" value={revenueData.length} prefix={<WalletOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card>
                <Table
                    columns={columns}
                    dataSource={revenueData}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
}
