'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Button, Breadcrumb, Row, Col, Statistic, Tag, Form, Input, Select, message, Spin, Divider, Tooltip } from 'antd';
import { CreditCardOutlined, PlusOutlined, SettingOutlined, HistoryOutlined, CheckCircleOutlined, SyncOutlined, TransactionOutlined, DollarOutlined, PercentageOutlined } from '@ant-design/icons';
import paymentService, { PaymentGateway, PaymentConfig } from '@/services/payment.service';

const { Title, Text } = Typography;
const { Option } = Select;

export default function PaymentGatewaysPage() {
    const [gateways, setGateways] = useState<PaymentGateway[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState<PaymentConfig | null>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [gatewaysData, statsData, configData] = await Promise.all([
                paymentService.getGateways(),
                paymentService.getGatewaysStats(),
                paymentService.getGlobalConfig()
            ]);
            setGateways(gatewaysData);
            setStats(statsData);
            setConfig(configData);
            form.setFieldsValue(configData);
        } catch (error) {
            console.error('Failed to fetch payment data:', error);
            message.error('Lỗi khi tải dữ liệu thanh toán');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveConfig = async (values: any) => {
        try {
            await paymentService.updateGlobalConfig(values);
            message.success('Đã lưu cấu hình thành công');
        } catch (error) {
            message.error('Lỗi khi lưu cấu hình');
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Tài chính</Breadcrumb.Item>
                <Breadcrumb.Item>Cổng thanh toán</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Cổng Thanh toán</Title>
                    <Text type="secondary">Quản lý và cấu hình các phương thức thanh toán trên hệ thống</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Thêm cổng mới
                </Button>
            </div>

            {/* Stats Row */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card bordered={false} className="stat-card">
                        <Statistic
                            title="Tổng giao dịch"
                            value={stats?.totalTransactions}
                            prefix={<TransactionOutlined style={{ color: '#1890ff' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="stat-card">
                        <Statistic
                            title="Tổng doanh thu"
                            value={stats?.totalRevenue}
                            suffix="₫"
                            precision={0}
                            prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="stat-card">
                        <Statistic
                            title="Phí trung bình"
                            value={stats?.avgFee}
                            prefix={<PercentageOutlined style={{ color: '#fa8c16' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="stat-card">
                        <Statistic
                            title="Cổng hoạt động"
                            value={stats?.activeCount}
                            suffix={`/ ${stats?.totalCount}`}
                            prefix={<CheckCircleOutlined style={{ color: '#722ed1' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Gateways Grid */}
            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                {gateways.map((gateway) => (
                    <Col xs={24} md={8} key={gateway.id}>
                        <Card
                            hoverable
                            actions={[
                                <Tooltip title="Cấu hình chi tiết" key="config">
                                    <SettingOutlined />
                                </Tooltip>,
                                <Tooltip title="Lịch sử giao dịch" key="history">
                                    <HistoryOutlined />
                                </Tooltip>
                            ]}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: '#f5f5f5',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#595959'
                                }}>
                                    {gateway.name.charAt(0)}
                                </div>
                                <Tag color={gateway.status === 'active' ? 'success' : 'default'} style={{ borderRadius: '10px', padding: '0 10px' }}>
                                    {gateway.status === 'active' ? 'HOẠT ĐỘNG' : 'TẠM DỪNG'}
                                </Tag>
                            </div>
                            <Title level={4} style={{ marginBottom: '16px' }}>{gateway.name}</Title>

                            <div style={{ marginBottom: '16px' }}>
                                <Row style={{ marginBottom: '8px' }}>
                                    <Col span={12}><Text type="secondary">Giao dịch:</Text></Col>
                                    <Col span={12} style={{ textAlign: 'right' }}><Text strong>{gateway.transactions.toLocaleString()}</Text></Col>
                                </Row>
                                <Row style={{ marginBottom: '8px' }}>
                                    <Col span={12}><Text type="secondary">Doanh thu:</Text></Col>
                                    <Col span={12} style={{ textAlign: 'right' }}><Text strong style={{ color: '#52c41a' }}>{gateway.revenue.toLocaleString()} ₫</Text></Col>
                                </Row>
                                <Row>
                                    <Col span={12}><Text type="secondary">Tỷ lệ phí:</Text></Col>
                                    <Col span={12} style={{ textAlign: 'right' }}><Text strong style={{ color: '#fa8c16' }}>{gateway.fee}</Text></Col>
                                </Row>
                            </div>

                            <Space style={{ width: '100%' }}>
                                <Button block style={{ flex: 1 }}>Cấu hình</Button>
                                <Button block style={{ flex: 1 }} type="dashed">Xem Logs</Button>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Global Configuration */}
            <Card title={<Space><SettingOutlined /> <Text strong>Cấu hình chung hệ thống</Text></Space>}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSaveConfig}
                >
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="defaultMethod"
                                label="Phương thức thanh toán mặc định"
                            >
                                <Select size="large">
                                    {gateways.map(g => (
                                        <Option key={g.name} value={g.name}>{g.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="timeout"
                                label="Thời gian chờ giao dịch (giây)"
                            >
                                <Input type="number" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="webhookUrl"
                                label="Endpoint Webhook (Server-to-Server)"
                            >
                                <Input size="large" placeholder="https://..." />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="returnUrl"
                                label="URL Phản hồi (Client Redirect)"
                            >
                                <Input size="large" placeholder="https://..." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Space>
                        <Button type="primary" htmlType="submit" size="large" style={{ padding: '0 32px' }}>
                            Lưu cấu hình
                        </Button>
                        <Button size="large" icon={<SyncOutlined />}>
                            Kiểm tra kết nối (Test Connection)
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
}
