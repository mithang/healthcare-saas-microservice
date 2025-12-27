'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Select, Tag, Avatar, message, Modal, Form, Row, Col, Statistic, Breadcrumb } from 'antd';
import { UserOutlined, PlusOutlined, SearchOutlined, EditOutlined, CheckCircleOutlined, InfoCircleOutlined, StarFilled, IdcardOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import partnerService, { Pharmacist } from '@/services/partner.service';
import { MEMBER_RANKS } from '@/types/pharmacy';

const { Title, Text } = Typography;
const { Option } = Select;

export default function PharmacistsPage() {
    const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [specialistFilter, setSpecialistFilter] = useState('all');
    const [selectedPharmacist, setSelectedPharmacist] = useState<Pharmacist | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const stats = {
        total: pharmacists.length,
        active: pharmacists.filter(p => p.status === 'active').length,
        pending: pharmacists.filter(p => p.status === 'pending').length,
        verified: pharmacists.filter(p => p.isVerified).length,
        platinumPlus: pharmacists.filter(p => ['platinum', 'diamond'].includes(p.memberRank || '')).length
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await partnerService.getPharmacists();
            setPharmacists(data);
        } catch (error) {
            console.error('Failed to fetch pharmacists:', error);
            message.error('Không thể tải danh sách dược sĩ');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id: number) => {
        try {
            await partnerService.updatePharmacist(id, { isVerified: true, status: 'active' });
            message.success('Đã duyệt dược sĩ');
            fetchData();
        } catch (error) {
            message.error('Lỗi khi duyệt dược sĩ');
        }
    };

    const handleEdit = (pharmacist: Pharmacist) => {
        setSelectedPharmacist(pharmacist);
        form.setFieldsValue({
            ...pharmacist,
            createdAt: pharmacist.createdAt ? new Date(pharmacist.createdAt).toLocaleDateString() : '---'
        });
        setIsModalOpen(true);
    };

    const onFinish = async (values: any) => {
        if (!selectedPharmacist) return;
        try {
            await partnerService.updatePharmacist(selectedPharmacist.id, values);
            message.success('Cập nhật thành công');
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            message.error('Lỗi khi cập nhật dược sĩ');
        }
    };

    const filteredData = pharmacists.filter(p => {
        const matchesSearch = p.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            p.phoneNumber.includes(searchText);
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        const matchesSpecialist = specialistFilter === 'all' || p.specialistly === specialistFilter;
        return matchesSearch && matchesStatus && matchesSpecialist;
    });

    const specialists = Array.from(new Set(pharmacists.map(p => p.specialistly).filter(Boolean)));

    const columns: ColumnsType<Pharmacist> = [
        {
            title: 'Dược sĩ',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.phoneNumber}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Chuyên môn',
            dataIndex: 'specialistly',
            key: 'specialistly',
            render: (text) => text ? <Tag color="purple">{text}</Tag> : '---',
        },
        {
            title: 'Vị trí',
            dataIndex: 'career',
            key: 'career',
            render: (text) => <Text strong>{text || '---'}</Text>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
        },
        {
            title: 'Điểm CME',
            dataIndex: 'pointsCMEOnline',
            key: 'pointsCMEOnline',
            render: (points) => <Text strong style={{ color: '#1890ff' }}>{(points || 0).toLocaleString()}</Text>,
        },
        {
            title: 'Hạng',
            dataIndex: 'memberRank',
            key: 'memberRank',
            render: (rank) => {
                const rankInfo = (MEMBER_RANKS as any)[(rank as any) || 'bronze'];
                return (
                    <Space>
                        <span style={{ fontSize: '18px' }}>{rankInfo.icon}</span>
                        <Text strong style={{ color: rankInfo.color, fontSize: '11px' }}>{rank?.toUpperCase()}</Text>
                    </Space>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'success' : status === 'pending' ? 'orange' : 'default'} style={{ borderRadius: '10px' }}>
                    {status === 'active' ? 'HOẠT ĐỘNG' : status === 'pending' ? 'CHỜ DUYỆT' : 'TẠM DỪNG'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>Xem</Button>
                    {record.status === 'pending' && (
                        <Button type="primary" size="small" ghost onClick={() => handleVerify(record.id)}>Duyệt</Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Đối tác</Breadcrumb.Item>
                <Breadcrumb.Item>Dược sĩ</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Dược sĩ</Title>
                    <Text type="secondary">Quản lý thông tin và xác minh dược sĩ</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => message.info('Tính năng đang phát triển')}>
                    Thêm dược sĩ
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={4.8} style={{ width: '20%' }}>
                    <Card size="small">
                        <Statistic title="Tổng dược sĩ" value={stats.total} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col span={4.8} style={{ width: '20%' }}>
                    <Card size="small">
                        <Statistic title="Đang hoạt động" value={stats.active} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={4.8} style={{ width: '20%' }}>
                    <Card size="small">
                        <Statistic title="Chờ xác minh" value={stats.pending} valueStyle={{ color: '#faad14' }} prefix={<InfoCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={4.8} style={{ width: '20%' }}>
                    <Card size="small">
                        <Statistic title="Đã xác minh" value={stats.verified} valueStyle={{ color: '#722ed1' }} prefix={<IdcardOutlined />} />
                    </Card>
                </Col>
                <Col span={4.8} style={{ width: '20%' }}>
                    <Card size="small">
                        <Statistic title="Platinum+" value={stats.platinumPlus} valueStyle={{ color: '#cf1322' }} prefix={<StarFilled />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Space wrap>
                    <Input
                        placeholder="Tìm kiếm theo tên hoặc SDT..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />
                    <Select defaultValue="all" style={{ width: 170 }} onChange={setStatusFilter}>
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="active">Hoạt động</Option>
                        <Option value="pending">Chờ duyệt</Option>
                        <Option value="inactive">Tạm dừng</Option>
                    </Select>
                    <Select defaultValue="all" style={{ width: 170 }} onChange={setSpecialistFilter}>
                        <Option value="all">Tất cả chuyên môn</Option>
                        {specialists.map(s => <Option key={s} value={s}>{s}</Option>)}
                    </Select>
                </Space>
            </Card>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title="Chi tiết Dược sĩ"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={800}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>Đóng</Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>Lưu thay đổi</Button>
                ]}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="fullName" label="Họ và tên">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="phoneNumber" label="Số điện thoại">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="specialistly" label="Chuyên môn">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="career" label="Vị trí/Nghề nghiệp">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="address" label="Địa chỉ đầy đủ">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="pointsCMEOnline" label="Điểm CME Online">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="memberRank" label="Hạng thành viên">
                                <Select>
                                    <Option value="bronze">Bronze</Option>
                                    <Option value="silver">Silver</Option>
                                    <Option value="gold">Gold</Option>
                                    <Option value="platinum">Platinum</Option>
                                    <Option value="diamond">Diamond</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="createdAt" label="Ngày tạo">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="status" label="Trạng thái">
                                <Select>
                                    <Option value="active">Hoạt động</Option>
                                    <Option value="inactive">Tạm dừng</Option>
                                    <Option value="pending">Chờ duyệt</Option>
                                    <Option value="suspended">Đình chỉ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="dynamicLink" label="Dynamic Link">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}
