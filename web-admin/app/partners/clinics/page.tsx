'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Tooltip } from 'antd';
import { HomeOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EnvironmentOutlined, PhoneOutlined, StarOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import partnerService, { Clinic } from '@/services/partner.service';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function ClinicsManagementPage() {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchClinics = async () => {
        setLoading(true);
        try {
            const data = await partnerService.getClinics();
            setClinics(data);
        } catch (error) {
            console.error('Failed to fetch clinics:', error);
            message.error('Lỗi khi tải danh sách phòng khám');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClinics();
    }, []);

    const handleDelete = (id: any, name: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa phòng khám "${name}" không? Hành động này không thể hoàn tác.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await partnerService.deleteClinic(id);
                    message.success('Đã xóa phòng khám thành công');
                    fetchClinics();
                } catch (error) {
                    message.error('Lỗi khi xóa phòng khám');
                }
            }
        });
    };

    const filteredData = clinics.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.address.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<Clinic> = [
        {
            title: 'Phòng khám',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong style={{ fontSize: '15px' }}>{text}</Text>
                    <Space size="small">
                        <EnvironmentOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.address}</Text>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Liên hệ',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => (
                <Space>
                    <PhoneOutlined style={{ color: '#1890ff' }} />
                    <Text>{text || 'N/A'}</Text>
                </Space>
            ),
        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialties',
            key: 'specialties',
            render: (specialties: string[]) => (
                <Space wrap size={[0, 4]}>
                    {specialties?.slice(0, 2).map((s, i) => (
                        <Tag key={i} color="blue">{s}</Tag>
                    ))}
                    {specialties?.length > 2 && (
                        <Tooltip title={specialties.slice(2).join(', ')}>
                            <Tag>+{specialties.length - 2}</Tag>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (val) => (
                <Space>
                    <StarOutlined style={{ color: '#faad14' }} />
                    <Text strong>{val || 0}</Text>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isVerified',
            key: 'isVerified',
            render: (verified) => (
                <Tag icon={verified ? <CheckCircleOutlined /> : <StopOutlined />} color={verified ? 'success' : 'default'}>
                    {verified ? 'ĐÃ XÁC MINH' : 'CHƯA XÁC MINH'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Link href={`/partners/clinics/${record.id}/edit`}>
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
                <Breadcrumb.Item>Phòng khám</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Phòng khám</Title>
                    <Text type="secondary">Quản lý danh sách, thông tin và trạng thái xác thực của các phòng khám đối tác</Text>
                </div>
                <Link href="/partners/clinics/create">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Thêm phòng khám mới
                    </Button>
                </Link>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng phòng khám" value={clinics.length} prefix={<HomeOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã xác minh" value={clinics.filter(c => c.isVerified).length} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Trung bình đánh giá" value={4.5} suffix="/ 5" prefix={<StarOutlined style={{ color: '#faad14' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Chuyên khoa tập trung" value="Nha khoa" valueStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm theo tên phòng khám hoặc địa chỉ..."
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
        </div>
    );
}
