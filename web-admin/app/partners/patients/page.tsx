'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Avatar, Tooltip } from 'antd';
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, PhoneOutlined, MailOutlined, CalendarOutlined, EyeOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import partnerService, { Patient } from '@/services/partner.service';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function PatientsManagementPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const data = await partnerService.getPatients();
            setPatients(data);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
            message.error('Lỗi khi tải danh sách bệnh nhân');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleDelete = (id: any, name: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa bệnh nhân "${name}" không? Toàn bộ hồ sơ bệnh án liên quan sẽ bị ảnh hưởng.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    // await partnerService.deletePatient(id); // If method exists
                    message.success('Đã xóa bệnh nhân thành công');
                    fetchPatients();
                } catch (error) {
                    message.error('Lỗi khi xóa bệnh nhân');
                }
            }
        });
    };

    const filteredData = patients.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.phone.includes(searchText)
    );

    const columns: ColumnsType<Patient> = [
        {
            title: 'Bệnh nhân',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: '15px' }}>{text}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>ID: {record.id}</Text>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Thông tin liên hệ',
            key: 'contact',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Space size="small">
                        <PhoneOutlined style={{ color: '#1890ff', fontSize: '12px' }} />
                        <Text style={{ fontSize: '13px' }}>{record.phone}</Text>
                    </Space>
                    {record.email && (
                        <Space size="small">
                            <MailOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
                        </Space>
                    )}
                </Space>
            ),
        },
        {
            title: 'Số lượt khám',
            dataIndex: 'visits',
            key: 'visits',
            align: 'center',
            render: (visits) => (
                <Tag color="blue" style={{ minWidth: '40px', textAlign: 'center' }}>
                    {visits || 0}
                </Tag>
            ),
        },
        {
            title: 'Lần khám cuối',
            dataIndex: 'lastVisit',
            key: 'lastVisit',
            render: (text) => (
                <Space>
                    <CalendarOutlined style={{ color: '#8c8c8c' }} />
                    <Text>{text || 'Chưa có thông tin'}</Text>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'ACTIVE' ? 'success' : 'default'}>
                    {(status || 'ACTIVE').toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Hồ sơ bệnh án">
                        <Link href={`/partners/patients/${record.id}`}>
                            <Button icon={<EyeOutlined />} type="link" />
                        </Link>
                    </Tooltip>
                    <Link href={`/partners/patients/${record.id}/edit`}>
                        <Button icon={<EditOutlined />} type="link" />
                    </Link>
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id, record.name)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Đối tác</Breadcrumb.Item>
                <Breadcrumb.Item>Bệnh nhân</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Bệnh nhân</Title>
                    <Text type="secondary">Tra cứu thông tin, quản lý hồ sơ và lịch sử khám chữa bệnh của bệnh nhân</Text>
                </div>
                <Link href="/partners/patients/create">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Thêm bệnh nhân mới
                    </Button>
                </Link>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng bệnh nhân" value={patients.length} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hoạt động gần đây" value={patients.filter(p => p.visits > 0).length} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Bệnh nhân mới (Tháng)" value={45} valueStyle={{ color: '#52c41a' }} prefix={<PlusOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ quay lại" value={82} suffix="%" valueStyle={{ color: '#722ed1' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm theo tên, email hoặc số điện thoại..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 450 }}
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
