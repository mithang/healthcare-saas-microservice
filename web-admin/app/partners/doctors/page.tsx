'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Select, Tag, Avatar, message, Breadcrumb } from 'antd';
import { UserOutlined, PlusOutlined, SearchOutlined, EditOutlined, StarFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import partnerService, { Doctor } from '@/services/partner.service';
import Link from 'next/link';

const { Title, Text } = Typography;
const { Option } = Select;

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('all');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const data = await partnerService.getDoctors();
            setDoctors(data);
        } catch (error) {
            console.error('Failed to fetch doctors:', error);
            message.error('Không thể tải danh sách bác sĩ');
        } finally {
            setLoading(false);
        }
    };

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
            (doctor.hospital || '').toLowerCase().includes(searchText.toLowerCase());
        const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;
        return matchesSearch && matchesSpecialty;
    });

    const columns: ColumnsType<Doctor> = [
        {
            title: 'Bác sĩ',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} src={(record as any).avatar} />
                    <Link href={`/partners/doctors/${record.id}`}>
                        <Text strong>{text}</Text>
                    </Link>
                </Space>
            ),
        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialty',
            key: 'specialty',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Bệnh viện',
            dataIndex: 'hospital',
            key: 'hospital',
            render: (text) => text || <Text type="secondary">Tự do</Text>,
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <Space size={4}>
                    <StarFilled style={{ color: '#fadb14' }} />
                    <Text strong>{rating || 'N/A'}</Text>
                </Space>
            ),
        },
        {
            title: 'Xác thực',
            dataIndex: 'isVerified',
            key: 'isVerified',
            render: (isVerified) => (
                <Tag color={isVerified ? 'success' : 'default'}>
                    {isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" icon={<EditOutlined />}>Sửa</Button>
                </Space>
            ),
        },
    ];

    const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

    return (
        <div style={{ padding: '0 0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Đối tác</Breadcrumb.Item>
                <Breadcrumb.Item>Bác sĩ</Breadcrumb.Item>
            </Breadcrumb>

            <Card title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0 }}>Quản lý Bác sĩ</Title>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Thêm bác sĩ mới
                    </Button>
                </div>
            }>
                <Space style={{ marginBottom: 16 }} wrap>
                    <Input
                        placeholder="Tìm kiếm bác sĩ, bệnh viện..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        defaultValue="all"
                        style={{ width: 200 }}
                        onChange={value => setSpecialtyFilter(value)}
                    >
                        <Option value="all">Tất cả chuyên khoa</Option>
                        {specialties.map(s => (
                            <Option key={s} value={s}>{s}</Option>
                        ))}
                    </Select>
                    <Text type="secondary">Tổng số: {filteredDoctors.length}</Text>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredDoctors}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10, showSizeChanger: true }}
                />
            </Card>
        </div>
    );
}
