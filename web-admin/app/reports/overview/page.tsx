'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Statistic, Breadcrumb, message, Spin } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, UserOutlined, ShopOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import reportService, { SystemOverview } from '@/services/report.service';

const { Title, Text } = Typography;

export default function OverviewReportsPage() {
    const [overview, setOverview] = useState<SystemOverview | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await reportService.getOverview();
            setOverview(data);
        } catch (error) {
            console.error('Failed to fetch overview:', error);
            message.error('Không thể tải dữ liệu tổng quan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <Spin size="large" tip="Đang tải báo cáo tổng quan..." />
        </div>
    );

    if (!overview) return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <Text type="danger">Không có dữ liệu tổng quan.</Text>
        </div>
    );

    const formatRevenue = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        return value.toLocaleString();
    };

    const isPositive = (trend: string) => trend.startsWith('+');

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
                <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Báo cáo Tổng quan</Title>
                <Text type="secondary">Thống kê hiệu suất toàn hệ thống</Text>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Tổng doanh thu"
                            value={formatRevenue(overview.totalRevenue)}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type={isPositive(overview.revenueTrend) ? 'success' : 'danger'}>
                                {isPositive(overview.revenueTrend) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                {overview.revenueTrend} so với tháng trước
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Tổng đơn hàng"
                            value={overview.totalOrders}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type={isPositive(overview.ordersTrend) ? 'success' : 'danger'}>
                                {isPositive(overview.ordersTrend) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                {overview.ordersTrend} so với tháng trước
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Người dùng"
                            value={overview.totalUsers}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type={isPositive(overview.usersTrend) ? 'success' : 'danger'}>
                                {isPositive(overview.usersTrend) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                {overview.usersTrend} mới
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Đối tác"
                            value={overview.totalPartners}
                            prefix={<ShopOutlined />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type={isPositive(overview.partnersTrend) ? 'success' : 'danger'}>
                                {isPositive(overview.partnersTrend) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                {overview.partnersTrend} mới
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Doanh thu theo tháng">
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: '8px' }}>
                            <Text type="secondary">[Biểu đồ doanh thu thực tế]</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Đơn hàng theo dịch vụ">
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: '8px' }}>
                            <Text type="secondary">[Biểu đồ phân bổ đơn hàng]</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
