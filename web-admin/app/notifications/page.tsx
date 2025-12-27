'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Row, Col, Statistic, List, Avatar, Badge, Tooltip } from 'antd';
import { NotificationOutlined, SendOutlined, HistoryOutlined, TeamOutlined, TrophyOutlined, MedallionOutlined, GlobalOutlined, BarChartOutlined, MessageOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

export default function NotificationsPage() {
    const notificationTypes = [
        { id: 'students_by_course', name: 'Học viên theo khóa', icon: <TeamOutlined />, color: '#1890ff', desc: 'Gửi cho toàn bộ học viên trong khóa học cụ thể.' },
        { id: 'incomplete_lessons', name: 'Nhắc nhở học tập', icon: <ClockCircleOutlined />, color: '#faad14', desc: 'Nhắc nhở các học viên chưa hoàn thành bài học.' },
        { id: 'top_10_quiz', name: 'Vinh danh Top 10', icon: <TrophyOutlined />, color: '#f5222d', desc: 'Chúc mừng 10 học viên hoàn thành bài thi sớm nhất.' },
        { id: 'regional_eval', name: 'Đánh giá địa bàn', icon: <GlobalOutlined />, color: '#52c41a', desc: 'Thông báo đánh giá cho học viên theo khu vực.' },
    ];

    const recentNotifications = [
        { id: 1, type: 'students_by_course', title: 'Thông báo khóa CME 2024', course: 'CME 2024', recipients: 450, sent: '2024-12-19 14:30', status: 'SENT' },
        { id: 2, type: 'incomplete_lessons', title: 'Nhắc nhở hoàn thành bài học', course: 'CPE 2024', recipients: 120, sent: '2024-12-19 10:00', status: 'SENT' },
        { id: 3, type: 'top_10_quiz', title: 'Chúc mừng Top 10 nhanh nhất', course: 'CME 2024', recipients: 10, sent: '2024-12-18 16:45', status: 'SENT' },
    ];

    const columns: ColumnsType<any> = [
        {
            title: 'Tiêu đề thông báo',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type) => {
                const typeInfo = notificationTypes.find(t => t.id === type);
                return <Tag color="blue">{typeInfo?.name || type}</Tag>;
            },
        },
        {
            title: 'Khóa học',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Người nhận',
            dataIndex: 'recipients',
            key: 'recipients',
            render: (val) => <Badge count={val} overflowCount={999} style={{ backgroundColor: '#52c41a' }} />,
        },
        {
            title: 'Thời gian',
            dataIndex: 'sent',
            key: 'sent',
            render: (val) => <Text type="secondary" style={{ fontSize: '12px' }}>{val}</Text>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: () => <Tag color="success">ĐÃ GỬI</Tag>,
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Push Notifications</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Push Notification</Title>
                    <Text type="secondary">Gửi và theo dõi các thông báo đẩy đến người dùng và học viên</Text>
                </div>
                <Button type="primary" icon={<SendOutlined />} size="large">
                    Gửi Notification mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng đã gửi" value={1245} prefix={<NotificationOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ nhận" value={94.8} suffix="%" valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ mở" value={72.5} suffix="%" valueStyle={{ color: '#1890ff' }} prefix={<MessageOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ Click" value={49.1} suffix="%" valueStyle={{ color: '#722ed1' }} prefix={<BarChartOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Title level={4} style={{ marginBottom: '16px' }}>Mẫu thông báo phổ biến</Title>
            <Row gutter={16} style={{ marginBottom: '32px' }}>
                {notificationTypes.map((type) => (
                    <Col span={6} key={type.id}>
                        <Card hoverable className="notif-type-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <Avatar shape="rounded" size="large" icon={type.icon} style={{ backgroundColor: type.color }} />
                                <Text strong>{type.name}</Text>
                            </div>
                            <Text type="secondary" style={{ fontSize: '12px', display: 'block', height: '40px' }}>{type.desc}</Text>
                            <Button type="link" style={{ padding: 0, marginTop: '8px' }}>Gửi ngay →</Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card
                title={
                    <Space>
                        <HistoryOutlined />
                        <span>Lịch sử gửi gần đây</span>
                    </Space>
                }
                extra={<Button type="link">Xem tất cả →</Button>}
                bodyStyle={{ padding: 0 }}
            >
                <Table
                    columns={columns}
                    dataSource={recentNotifications}
                    rowKey="id"
                    pagination={false}
                />
            </Card>
        </div>
    );
}

// Custom CSS for MedallionOutlined if not in antd
const MedallionOutlined = () => <TrophyOutlined style={{ color: '#ff4d4f' }} />;
