'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Select, Tag, Avatar, message, Modal, Form, Row, Col, Statistic, Breadcrumb } from 'antd';
import { ShopOutlined, PlusOutlined, SearchOutlined, EditOutlined, CheckCircleOutlined, InfoCircleOutlined, StarFilled, TrophyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import partnerService, { Pharmacy } from '@/services/partner.service';
import { MEMBER_RANKS } from '@/types/pharmacy';

const { Title, Text } = Typography;
const { Option } = Select;

export default function PharmaciesPage() {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [rankFilter, setRankFilter] = useState('all');
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const stats = {
        total: pharmacies.length,
        active: pharmacies.filter(p => p.status === 'active').length,
        pending: pharmacies.filter(p => p.status === 'pending').length,
        gpp: pharmacies.filter(p => !!p.gppNumber).length,
        platinumPlus: pharmacies.filter(p => ['platinum', 'diamond'].includes(p.memberRank || '')).length
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await partnerService.getPharmacies();
            setPharmacies(data);
        } catch (error) {
            console.error('Failed to fetch pharmacies:', error);
            message.error('Không thể tải danh sách nhà thuốc');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id: number) => {
        try {
            await partnerService.updatePharmacy(id, { isVerified: true, status: 'active' });
            message.success('Đã duyệt nhà thuốc');
            fetchData();
        } catch (error) {
            message.error('Lỗi khi duyệt nhà thuốc');
        }
    };

    const handleEdit = (pharmacy: Pharmacy) => {
        setSelectedPharmacy(pharmacy);
        form.setFieldsValue({
            ...pharmacy,
            createdAt: pharmacy.createdAt ? new Date(pharmacy.createdAt).toLocaleDateString() : '---'
        });
        setIsModalOpen(true);
    };

    const onFinish = async (values: any) => {
        if (!selectedPharmacy) return;
        try {
            await partnerService.updatePharmacy(selectedPharmacy.id, values);
            message.success('Cập nhật thành công');
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            message.error('Lỗi khi cập nhật nhà thuốc');
        }
    };

    const filteredData = pharmacies.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) ||
            p.phone.includes(searchText);
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        const matchesRank = rankFilter === 'all' || p.memberRank === rankFilter;
        return matchesSearch && matchesStatus && matchesRank;
    });

    const columns: ColumnsType<Pharmacy> = [
        {
            title: 'Nhà thuốc',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<ShopOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.phone}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Chủ sở hữu',
            dataIndex: 'outletOwner',
            key: 'outletOwner',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
        },
        {
            title: 'GPP',
            dataIndex: 'gppNumber',
            key: 'gppNumber',
            render: (gpp) => gpp ? (
                <div>
                    <Tag color="success">CÓ GPP</Tag>
                    <div style={{ fontSize: '11px', color: '#666' }}>{gpp}</div>
                </div>
            ) : <Tag color="default">CHƯA CẬP NHẬT</Tag>,
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
                const rankInfo = MEMBER_RANKS[(rank as any) || 'bronze'];
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
                <Breadcrumb.Item>Nhà thuốc</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Nhà thuốc</Title>
                    <Text type="secondary">Quản lý thông tin và xác minh nhà thuốc</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => message.info('Tính năng đang phát triển')}>
                    Thêm nhà thuốc
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={4.8} style={{ width: '20%' }}>
                    <Card size="small">
                        <Statistic title="Tổng nhà thuốc" value={stats.total} prefix={<ShopOutlined />} />
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
                        <Statistic title="Có GPP" value={stats.gpp} valueStyle={{ color: '#722ed1' }} prefix={<TrophyOutlined />} />
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
                    <Select defaultValue="all" style={{ width: 150 }} onChange={setStatusFilter}>
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="active">Hoạt động</Option>
                        <Option value="pending">Chờ duyệt</Option>
                        <Option value="inactive">Tạm dừng</Option>
                    </Select>
                    <Select defaultValue="all" style={{ width: 150 }} onChange={setRankFilter}>
                        <Option value="all">Tất cả hạng</Option>
                        <Option value="diamond">Diamond</Option>
                        <Option value="platinum">Platinum</Option>
                        <Option value="gold">Gold</Option>
                        <Option value="silver">Silver</Option>
                        <Option value="bronze">Bronze</Option>
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
                title="Chi tiết Nhà thuốc"
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
                            <Form.Item name="name" label="Tên nhà thuốc">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="outletOwner" label="Chủ sở hữu">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="phone" label="Số điện thoại">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="createdAt" label="Ngày tạo">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="address" label="Địa chỉ đầy đủ">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="gppNumber" label="Số GPP">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Hình ảnh GPP">
                                <div style={{ height: '100px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9', borderRadius: '8px' }}>
                                    <Text type="secondary">Xem ảnh GPP</Text>
                                </div>
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
                        <Col span={24}>
                            <Form.Item name="status" label="Trạng thái">
                                <Select>
                                    <Option value="active">Hoạt động</Option>
                                    <Option value="inactive">Tạm dừng</Option>
                                    <Option value="pending">Chờ duyệt</Option>
                                    <Option value="suspended">Đình chỉ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}
