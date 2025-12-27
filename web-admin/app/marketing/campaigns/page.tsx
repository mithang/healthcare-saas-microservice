'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Progress, List, Avatar } from 'antd';
import { RocketOutlined, PlusOutlined, DeleteOutlined, PlayCircleOutlined, SendOutlined, EyeOutlined, BarChartOutlined, MailOutlined, NotificationOutlined, MessageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import marketingService, { Campaign } from '@/services/marketing.service';

const { Title, Text } = Typography;

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const data = await marketingService.getCampaigns();
            setCampaigns(data);
        } catch (error) {
            console.error('Failed to fetch campaigns:', error);
            message.error('Không thể tải danh sách chiến dịch');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa chiến dịch',
            content: 'Bạn có chắc chắn muốn xóa chiến dịch marketing này không?',
            okText: 'Xóa',
            okType: 'danger',
            onOk: async () => {
                try {
                    await marketingService.deleteCampaign(id);
                    message.success('Đã xóa chiến dịch');
                    fetchCampaigns();
                } catch (error) {
                    message.error('Lỗi khi xóa chiến dịch');
                }
            }
        });
    };

    const handleRun = async (id: number) => {
        try {
            await marketingService.updateCampaign(id, { status: 'active' });
            message.success('Đã bắt đầu chạy chiến dịch');
            fetchCampaigns();
        } catch (error) {
            message.error('Lỗi khi chạy chiến dịch');
        }
    };

    const handleCreate = async () => {
        try {
            await marketingService.createCampaign({
                name: 'Chiến dịch Mới ' + new Date().toLocaleTimeString(),
                type: 'Email',
                status: 'draft',
                sent: 0,
                opened: 0,
                clicked: 0,
                budget: '1,000,000 ₫'
            });
            message.success('Đã tạo chiến dịch nháp');
            fetchCampaigns();
        } catch (error) {
            message.error('Lỗi khi tạo chiến dịch');
        }
    };

    const totalSent = campaigns.reduce((acc, curr) => acc + curr.sent, 0);
    const totalOpened = campaigns.reduce((acc, curr) => acc + curr.opened, 0);
    const avgOpenRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;

    const columns: ColumnsType<Campaign> = [
        {
            title: 'Tên chiến dịch',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Space>
                    {type === 'Email' ? <MailOutlined /> : type === 'SMS' ? <MessageOutlined /> : <NotificationOutlined />}
                    <Tag color="blue">{type}</Tag>
                </Space>
            ),
        },
        {
            title: 'Đã gửi',
            dataIndex: 'sent',
            key: 'sent',
            render: (val) => val.toLocaleString(),
        },
        {
            title: 'Hiệu quả',
            key: 'performance',
            render: (_, record) => {
                const openRate = record.sent > 0 ? Math.round((record.opened / record.sent) * 100) : 0;
                return (
                    <div style={{ width: '150px' }}>
                        <Space style={{ fontSize: '11px', color: '#8c8c8c', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
                            <span>Mở: {record.opened}</span>
                            <span>{openRate}%</span>
                        </Space>
                        <Progress percent={openRate} size="small" showInfo={false} strokeColor={openRate > 50 ? '#52c41a' : '#1890ff'} />
                    </div>
                );
            },
        },
        {
            title: 'Ngân sách',
            dataIndex: 'budget',
            key: 'budget',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'processing' : status === 'completed' ? 'success' : 'default'}>
                    {status === 'active' ? 'ĐANG CHẠY' : status === 'completed' ? 'HOÀN THÀNH' : 'NHÁP'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    {record.status === 'draft' && (
                        <Button icon={<PlayCircleOutlined />} type="link" onClick={() => handleRun(record.id)}>Chạy</Button>
                    )}
                    <Button icon={<BarChartOutlined />} type="link" />
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Marketing</Breadcrumb.Item>
                <Breadcrumb.Item>Chiến dịch</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chiến dịch Marketing</Title>
                    <Text type="secondary">Triển khai và theo dõi hiệu quả các chiến dịch tiếp cận khách hàng</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreate}>
                    Tạo chiến dịch
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng chiến dịch" value={campaigns.length} prefix={<RocketOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đang chạy" value={campaigns.filter(c => c.status === 'active').length} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã gửi" value={totalSent} prefix={<SendOutlined />} suffix="lượt" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ mở TB" value={avgOpenRate} precision={1} valueStyle={{ color: '#3f8600' }} suffix="%" />
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={18}>
                    <Card title="Danh sách chiến dịch" bodyStyle={{ padding: 0 }}>
                        <Table
                            columns={columns}
                            dataSource={campaigns}
                            rowKey="id"
                            loading={loading}
                            pagination={{ pageSize: 10 }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Card title="Hiệu quả theo kênh" size="small">
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Text strong>Email</Text>
                                    <Text type="secondary">38%</Text>
                                </div>
                                <Progress percent={38} strokeColor="#1890ff" />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Text strong>SMS</Text>
                                    <Text type="secondary">62%</Text>
                                </div>
                                <Progress percent={62} strokeColor="#52c41a" />
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Text strong>Push</Text>
                                    <Text type="secondary">45%</Text>
                                </div>
                                <Progress percent={45} strokeColor="#722ed1" />
                            </div>
                        </Card>

                        <Card title="ROI Chiến dịch" size="small">
                            <List
                                size="small"
                                dataSource={[
                                    { name: 'Khuyến mãi Tết', roi: 350 },
                                    { name: 'Khám miễn phí', roi: 153 },
                                    { name: 'Telemedicine', roi: 340 },
                                ]}
                                renderItem={item => (
                                    <List.Item extra={<Text strong style={{ color: '#52c41a' }}>+{item.roi}%</Text>}>
                                        <Text style={{ fontSize: '13px' }}>{item.name}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}
