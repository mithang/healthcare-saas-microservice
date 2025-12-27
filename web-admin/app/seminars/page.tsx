'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Row, Col, Statistic, Progress, Modal, List } from 'antd';
import { CalendarOutlined, PlusOutlined, EnvironmentOutlined, UsergroupAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined, PictureOutlined, TeamOutlined, QrcodeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import seminarService, { Seminar } from '@/services/seminar.service';

const { Title, Text } = Typography;

export default function SeminarsPage() {
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchSeminars = async () => {
        setLoading(true);
        try {
            const data = await seminarService.getSeminars();
            setSeminars(data);
        } catch (error) {
            console.error('Failed to fetch seminars:', error);
            // Fallback mock
            setSeminars([
                { id: 1, title: 'Hội nghị Tim mạch khu vực phía Nam', date: '2024-12-20', location: 'TT Hội nghị Gem Center', capacity: 500, registrations: 380, status: 'published' },
                { id: 2, title: 'Tập huấn Chăm sóc bệnh nhân tiểu đường', date: '2025-01-15', location: 'BV Đại học Y Dược', capacity: 100, registrations: 45, status: 'draft' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeminars();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa hội thảo',
            content: 'Bạn có chắc chắn muốn xóa hội thảo này không?',
            okText: 'Xóa',
            okType: 'danger',
            onOk: async () => {
                try {
                    await seminarService.deleteSeminar(id);
                    message.success('Đã xóa hội thảo');
                    fetchSeminars();
                } catch (error) {
                    message.error('Lỗi khi xóa hội thảo');
                }
            }
        });
    };

    const handleCreate = async () => {
        try {
            await seminarService.createSeminar({
                title: 'Hội thảo mới ' + new Date().toLocaleTimeString(),
                date: new Date().toISOString().split('T')[0],
                location: 'Địa điểm mặc định',
                capacity: 100,
                status: 'draft'
            });
            message.success('Đã tạo hội thảo nháp');
            fetchSeminars();
        } catch (error) {
            message.error('Lỗi khi tạo hội thảo');
        }
    };

    const filteredData = seminars.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<Seminar> = [
        {
            title: 'Hội thảo',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text strong style={{ fontSize: '15px' }}>{text}</Text>,
        },
        {
            title: 'Thời gian & Địa điểm',
            key: 'info',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Space size="small">
                        <CalendarOutlined style={{ color: '#1890ff' }} />
                        <Text>{record.date}</Text>
                    </Space>
                    <Space size="small">
                        <EnvironmentOutlined style={{ color: '#faad14' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.location}</Text>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Đăng ký',
            key: 'registrations',
            render: (_, record) => (
                <div style={{ width: '120px' }}>
                    <Space style={{ fontSize: '12px', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
                        <Text strong>{record.registrations}/{record.capacity}</Text>
                        <Text type="secondary">{Math.round((record.registrations / record.capacity) * 100)}%</Text>
                    </Space>
                    <Progress percent={Math.round((record.registrations / record.capacity) * 100)} size="small" showInfo={false} strokeColor="#1890ff" />
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'published' ? 'success' : 'orange'}>
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
                <Breadcrumb.Item>Sự kiện</Breadcrumb.Item>
                <Breadcrumb.Item>Hội thảo (Seminars)</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Hội thảo</Title>
                    <Text type="secondary">Tổ chức và quản lý các sự kiện, hội thảo chuyên môn</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreate}>
                    Tạo Hội thảo mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng Hội thảo" value={seminars.length} prefix={<CalendarOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Sắp diễn ra" value={seminars.filter(s => new Date(s.date) > new Date()).length} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng đăng ký" value={seminars.reduce((sum, s) => sum + s.registrations, 0)} prefix={<UsergroupAddOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã kết thúc" value={seminars.filter(s => new Date(s.date) < new Date()).length} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={18}>
                    <Card style={{ marginBottom: '16px' }}>
                        <Input
                            placeholder="Tìm theo tiêu đề hoặc địa điểm..."
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
                </Col>
                <Col span={6}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Card title="Phím tắt quản lý" size="small">
                            <List
                                size="small"
                                dataSource={[
                                    { icon: <PictureOutlined />, label: 'Quản lý Banner', count: 12 },
                                    { icon: <TeamOutlined />, label: 'Quản lý Diễn giả', count: 45 },
                                    { icon: <QrcodeOutlined />, label: 'Hệ thống Check-in', count: 1205 },
                                ]}
                                renderItem={item => (
                                    <List.Item extra={<Text type="secondary">{item.count}</Text>} style={{ cursor: 'pointer' }}>
                                        <Space>
                                            {item.icon}
                                            <Text>{item.label}</Text>
                                        </Space>
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
