'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Tooltip } from 'antd';
import { MedicineBoxOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EnvironmentOutlined, PhoneOutlined, StarOutlined, CheckCircleOutlined, StopOutlined, BankOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import partnerService, { Hospital } from '@/services/partner.service';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function HospitalsManagementPage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchHospitals = async () => {
        setLoading(true);
        try {
            const data = await partnerService.getHospitals();
            setHospitals(data);
        } catch (error) {
            console.error('Failed to fetch hospitals:', error);
            message.error('Lỗi khi tải danh sách bệnh viện');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const handleDelete = (id: any, name: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa bệnh viện "${name}" không? Hành động này không thể hoàn tác.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await partnerService.deleteHospital(id);
                    message.success('Đã xóa bệnh viện thành công');
                    fetchHospitals();
                } catch (error) {
                    message.error('Lỗi khi xóa bệnh viện');
                }
            }
        });
    };

    const filteredData = hospitals.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.address.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<Hospital> = [
        {
            title: 'Bệnh viện',
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
            title: 'Khoa chuyên môn',
            dataIndex: 'departments',
            key: 'departments',
            render: (departments: string[]) => (
                <Space wrap size={[0, 4]}>
                    {departments?.slice(0, 2).map((d, i) => (
                        <Tag key={i} color="purple">{d}</Tag>
                    ))}
                    {departments?.length > 2 && (
                        <Tooltip title={departments.slice(2).join(', ')}>
                            <Tag>+{departments.length - 2}</Tag>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: 'Quy mô',
            dataIndex: 'beds',
            key: 'beds',
            render: (beds) => (
                <Space>
                    <BankOutlined style={{ color: '#fa541c' }} />
                    <Text>{beds || 0} giường</Text>
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
                    <Link href={`/partners/hospitals/${record.id}/edit`}>
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
                <Breadcrumb.Item>Bệnh viện</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Bệnh viện</Title>
                    <Text type="secondary">Quản lý các bệnh viện đa khoa và chuyên khoa trong mạng lưới</Text>
                </div>
                <Link href="/partners/hospitals/create">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Thêm bệnh viện mới
                    </Button>
                </Link>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng bệnh viện" value={hospitals.length} prefix={<MedicineBoxOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã xác minh" value={hospitals.filter(h => h.isVerified).length} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng số giường" value={hospitals.reduce((sum, h) => sum + (h.beds || 0), 0)} prefix={<BankOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Rating trung bình" value={4.7} suffix="/ 5" prefix={<StarOutlined style={{ color: '#faad14' }} />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm theo tên bệnh viện hoặc địa chỉ..."
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
