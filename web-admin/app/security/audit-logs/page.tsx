'use client';

import React, { useState } from 'react';
import { Table, Typography, Card, Space, Button, Tag, Breadcrumb, Row, Col, Statistic, Select, Input, DatePicker, Alert } from 'antd';
import { SafetyCertificateOutlined, WarningOutlined, ExportOutlined, DeleteOutlined, SearchOutlined, UserOutlined, GlobalOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function AuditLogsPage() {
    const [searchText, setSearchText] = useState('');

    const logs = [
        { id: 1, time: '20/12/2024 14:30', user: 'admin@hospital.com', action: 'Login', ip: '192.168.1.100', status: 'success', risk: 'low' },
        { id: 2, time: '20/12/2024 14:25', user: 'doctor@hospital.com', action: 'View Patient Record', ip: '192.168.1.101', status: 'success', risk: 'low' },
        { id: 3, time: '20/12/2024 14:20', user: 'unknown@example.com', action: 'Failed Login (5 attempts)', ip: '45.123.45.67', status: 'failed', risk: 'high' },
        { id: 4, time: '20/12/2024 14:15', user: 'admin@hospital.com', action: 'Delete User', ip: '192.168.1.100', status: 'success', risk: 'medium' },
    ];

    const columns: ColumnsType<any> = [
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
            render: (text) => <Text type="secondary" style={{ fontSize: '12px' }}>{text}</Text>,
        },
        {
            title: 'Người dùng',
            dataIndex: 'user',
            key: 'user',
            render: (text) => (
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'IP Address',
            dataIndex: 'ip',
            key: 'ip',
            render: (text) => <Text code>{text}</Text>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'success' ? 'success' : 'error'}>
                    {status === 'success' ? 'THÀNH CÔNG' : 'THẤT BẠI'}
                </Tag>
            ),
        },
        {
            title: 'Mức độ rủi ro',
            dataIndex: 'risk',
            key: 'risk',
            render: (risk) => (
                <Tag color={risk === 'low' ? 'blue' : risk === 'medium' ? 'orange' : 'red'}>
                    {risk.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Chi tiết',
            key: 'action',
            render: () => <Button type="link" icon={<InfoCircleOutlined />} />,
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>An ninh</Breadcrumb.Item>
                <Breadcrumb.Item>Audit Logs</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Audit Logs</Title>
                    <Text type="secondary">Nhật ký chi tiết các hoạt động và thay đổi trong hệ thống</Text>
                </div>
                <Space>
                    <Button icon={<ExportOutlined />}>Xuất Logs</Button>
                    <Button danger icon={<DeleteOutlined />}>Xóa Logs cũ</Button>
                </Space>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng sự kiện" value={125432} prefix={<SafetyCertificateOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Sự kiện hôm nay" value={1234} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Cảnh báo rủi ro" value={45} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Nguy hiểm (High)" value={8} valueStyle={{ color: '#f5222d' }} prefix={<WarningOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '24px' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Select defaultValue="all" style={{ width: '100%' }}>
                            <Select.Option value="all">Tất cả hành động</Select.Option>
                            <Select.Option value="login">Đăng nhập</Select.Option>
                            <Select.Option value="data">Truy cập dữ liệu</Select.Option>
                            <Select.Option value="admin">Quản trị viên</Select.Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <RangePicker style={{ width: '100%' }} />
                    </Col>
                    <Col span={10}>
                        <Input prefix={<SearchOutlined />} placeholder="Tìm kiếm theo người dùng, IP hoặc hành động..." />
                    </Col>
                </Row>
            </Card>

            <Table
                columns={columns}
                dataSource={logs}
                rowKey="id"
                pagination={{ pageSize: 20 }}
                style={{ marginBottom: '24px' }}
            />

            <Alert
                message="Cảnh báo an ninh"
                description={
                    <div>
                        <Text strong>5 lần đăng nhập thất bại từ IP: 45.123.45.67</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>Thời gian: 20/12/2024 14:20 - Hệ thống nghi ngờ bị tấn công Brute Force.</Text>
                        <div style={{ marginTop: '12px' }}>
                            <Button size="small" danger type="primary">Chặn địa chỉ IP này</Button>
                        </div>
                    </div>
                }
                type="error"
                showIcon
                icon={<WarningOutlined />}
            />
        </div>
    );
}

const Avatar = ({ icon, size, style }: any) => (
    <div style={{
        width: size === 'small' ? '24px' : '32px',
        height: size === 'small' ? '24px' : '32px',
        borderRadius: '50%',
        background: '#f0f2f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
    }}>
        {icon}
    </div>
);
