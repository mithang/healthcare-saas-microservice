'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Avatar, Badge as AntBadge, Row, Col, Statistic, Breadcrumb, Select, message, Modal } from 'antd';
import { FileTextOutlined, PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import contentService, { Post } from '@/services/content.service';

const { Title, Text } = Typography;
const { Option } = Select;

export default function NewsPage() {
    const [allNews, setAllNews] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await contentService.getPosts();
            setAllNews(data);
        } catch (error) {
            console.error('Failed to fetch news:', error);
            message.error('Không thể tải danh sách bài viết');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = (id: number | string) => {
        Modal.confirm({
            title: 'Xóa bài viết',
            content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deletePost(id);
                    message.success('Đã xóa bài viết');
                    fetchNews();
                } catch (error) {
                    message.error('Lỗi khi xóa bài viết');
                }
            }
        });
    };

    const categories = Array.from(new Set(allNews.map((n) => n.category))).filter((c): c is string => !!c);

    const filteredData = allNews.filter((news) => {
        const matchesSearch = news.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || news.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || (statusFilter === 'published' ? news.isActive : !news.isActive);
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const columns: ColumnsType<Post> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Space>
                    <Avatar shape="square" size={48} src={record.thumbnail} icon={<FileTextOutlined />} />
                    <div style={{ maxWidth: '400px' }}>
                        <Text strong style={{ display: 'block' }}>{text}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.author}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (
                <Tag color={isActive ? 'success' : 'default'}>
                    {isActive ? 'ĐÃ XUẤT BẢN' : 'TẠM ẨN'}
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
                    <Button icon={<MessageOutlined />} type="link" />
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Tin tức</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Tin tức</Title>
                    <Text type="secondary">Quản lý bài viết, tin tức và nội dung trên hệ thống</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Tạo tin tức mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng bài viết" value={allNews.length} prefix={<FileTextOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã xuất bản" value={allNews.filter(n => n.isActive).length} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Danh mục" value={categories.length} prefix={<Tag color="blue" />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tác giả" value={new Set(allNews.map(n => n.author)).size} prefix={<UserOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Space wrap>
                    <Input
                        placeholder="Tìm kiếm theo tiêu đề..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select defaultValue="all" style={{ width: 180 }} onChange={setCategoryFilter}>
                        <Option value="all">Tất cả danh mục</Option>
                        {categories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
                    </Select>
                    <Select defaultValue="all" style={{ width: 180 }} onChange={setStatusFilter}>
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="published">Đã xuất bản</Option>
                        <Option value="draft">Tạm ẩn</Option>
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
        </div>
    );
}
