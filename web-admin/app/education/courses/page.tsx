'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Row, Col, Statistic, Avatar, Tooltip } from 'antd';
import { ReadOutlined, PlusOutlined, EditOutlined, EyeOutlined, SearchOutlined, BookOutlined, UsergroupAddOutlined, TrophyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { educationService, Course } from '@/services/education.service';

const { Title, Text } = Typography;

export default function EducationCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await educationService.getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            // Fallback mock
            setCourses([
                { id: 'CME-001', code: 'CME001', name: 'Kỹ thuật chẩn đoán hình ảnh nâng cao', provider: 'BV Chợ Rẫy', type: 'CME', credits: 24, price: 5000000, students: 45, status: 'published', lecturerId: 'LEC001' },
                { id: 'CME-002', code: 'CPE002', name: 'Quản lý an toàn người bệnh', provider: 'ĐH Y Dược', type: 'CPE', credits: 12, price: 0, students: 120, status: 'published', lecturerId: 'LEC002' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const filteredData = courses.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<Course> = [
        {
            title: 'Mã & Tên khóa học',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space align="start">
                    <Avatar shape="square" size={48} icon={<BookOutlined />} style={{ backgroundColor: '#f0f2f5', color: '#1890ff' }} />
                    <div>
                        <Text strong style={{ fontSize: '15px', display: 'block' }}>{text}</Text>
                        <Space split={<Text type="secondary">|</Text>}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.id}</Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.provider}</Text>
                        </Space>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Loại hình',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === 'CME' ? 'blue' : 'purple'}>
                    {type}
                </Tag>
            ),
        },
        {
            title: 'Tín chỉ',
            dataIndex: 'credits',
            key: 'credits',
            render: (val) => <Text strong>{val} giờ</Text>,
        },
        {
            title: 'Học phí',
            dataIndex: 'price',
            key: 'price',
            render: (val) => (
                <Text style={{ color: val === 0 ? '#52c41a' : '#262626', fontWeight: 'bold' }}>
                    {val === 0 ? 'Miễn phí' : val.toLocaleString() + ' đ'}
                </Text>
            ),
        },
        {
            title: 'Học viên',
            dataIndex: 'students',
            key: 'students',
            render: (val) => (
                <Tooltip title="Sức chứa tối đa: 200">
                    <Space>
                        <UsergroupAddOutlined />
                        <Text>{val || 0} / 200</Text>
                    </Space>
                </Tooltip>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'published' ? 'success' : 'default'}>
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
                    <Button icon={<EyeOutlined />} type="link" />
                    <Button icon={<EditOutlined />} type="link" />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Khóa học CME/CPE</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Đào tạo & Tập huấn (CME/CPE)</Title>
                    <Text type="secondary">Quản lý chương trình giáo dục y khoa liên tục và cấp chứng chỉ</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Tạo khóa học mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Khóa học" value={courses.length} prefix={<ReadOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng tín chỉ" value={courses.reduce((sum, c) => sum + c.credits, 0)} suffix="giờ" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Học viên" value={courses.reduce((sum, c) => sum + (c.students || 0), 0)} prefix={<UsergroupAddOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Chứng chỉ cấp" value={156} prefix={<TrophyOutlined style={{ color: '#faad14' }} />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm tên khóa học, đơn vị tổ chức..."
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
                pagination={{ pageSize: 15 }}
            />
        </div>
    );
}
