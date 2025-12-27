'use client';

import React, { useState } from 'react';
import { Table, Typography, Card, Space, Button, Tag, Avatar, Row, Col, Statistic, Breadcrumb, Tabs, message } from 'antd';
import { IdcardOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, WarningOutlined, EyeOutlined, CheckOutlined, StopOutlined, TrophyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

export default function VerificationPage() {
    const [activeTab, setActiveTab] = useState('doctors');

    const verifications = [
        { id: 1, name: 'BS. Nguyễn Văn A', specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', license: 'BS-12345', status: 'pending', date: '20/12/2024' },
        { id: 2, name: 'BS. Trần Thị B', specialty: 'Nhi khoa', hospital: 'BV Nhi Đồng 1', license: 'BS-23456', status: 'pending', date: '19/12/2024' },
        { id: 3, name: 'BS. Lê Văn C', specialty: 'Da liễu', hospital: 'PK Đa khoa', license: 'BS-34567', status: 'verified', date: '18/12/2024' },
    ];

    const columns: ColumnsType<any> = [
        {
            title: 'Đối tác',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<IdcardOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.specialty} • {record.hospital}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Số chứng chỉ',
            dataIndex: 'license',
            key: 'license',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'pending' ? 'orange' : status === 'verified' ? 'success' : 'error'} icon={
                    status === 'pending' ? <ClockCircleOutlined /> : status === 'verified' ? <CheckCircleOutlined /> : <CloseCircleOutlined />
                }>
                    {status === 'pending' ? 'Chờ xác minh' : status === 'verified' ? 'Đã xác minh' : 'Từ chối'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} type="link">Xem tài liệu</Button>
                    {record.status === 'pending' && (
                        <>
                            <Button icon={<CheckOutlined />} type="link" style={{ color: '#52c41a' }} onClick={() => message.success('Đã phê duyệt')}>Duyệt</Button>
                            <Button icon={<StopOutlined />} type="link" danger onClick={() => message.error('Đã từ chối')}>Từ chối</Button>
                        </>
                    )}
                    {record.status === 'verified' && (
                        <Button icon={<TrophyOutlined />} type="link" style={{ color: '#722ed1' }}>Cấp badge</Button>
                    )}
                </Space>
            ),
        },
    ];

    const tabItems = [
        {
            key: 'doctors',
            label: 'Bác sĩ',
            children: <Table columns={columns} dataSource={verifications} rowKey="id" />
        },
        {
            key: 'pharmacies',
            label: 'Nhà thuốc',
            children: <Table columns={columns} dataSource={[]} locale={{ emptyText: 'Không có yêu cầu xác minh nhà thuốc' }} />
        },
        {
            key: 'pharmacists',
            label: 'Dược sĩ',
            children: <Table columns={columns} dataSource={[]} locale={{ emptyText: 'Không có yêu cầu xác minh dược sĩ' }} />
        }
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Đối tác</Breadcrumb.Item>
                <Breadcrumb.Item>Xác minh</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Xác minh Đối tác</Title>
                <Text type="secondary">Kiểm tra và xác minh chứng chỉ hành nghề của bác sĩ và cơ sở y tế</Text>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Chờ xác minh" value={45} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã xác minh" value={1234} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Từ chối" value={12} valueStyle={{ color: '#cf1322' }} prefix={<CloseCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hết hạn" value={8} valueStyle={{ color: '#d48806' }} prefix={<WarningOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card>
                <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
            </Card>
        </div>
    );
}
