'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Avatar } from 'antd';
import { MessageOutlined, PlusOutlined, EyeOutlined, DeleteOutlined, SearchOutlined, UserOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import communityService, { ForumTopic } from '@/services/community.service';

const { Title, Text } = Typography;

export default function ForumPage() {
    const [topics, setTopics] = useState<ForumTopic[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchTopics = async () => {
        setLoading(true);
        try {
            const data = await communityService.getForumTopics();
            setTopics(data);
        } catch (error) {
            console.error('Failed to fetch forum topics:', error);
            message.error('Không thể tải danh sách thảo luận');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa chủ đề',
            content: 'Bạn có chắc chắn muốn xóa chủ đề thảo luận này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteForumTopic(id);
                    message.success('Đã xóa chủ đề');
                    fetchTopics();
                } catch (error) {
                    message.error('Lỗi khi xóa chủ đề');
                }
            }
        });
    };

    const filteredData = topics.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.authorName.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<ForumTopic> = [
        {
            title: 'Chủ đề',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div style={{ maxWidth: '400px' }}>
                    <Text strong style={{ display: 'block', fontSize: '15px' }}>{text}</Text>
                    <Space size="small" style={{ marginTop: '4px' }}>
                        <Tag icon={<FolderOutlined />} color="blue">{record.category}</Tag>
                        {record.views > 1000 && <Tag icon={<FireOutlined />} color="volcano">Hot</Tag>}
                    </Space>
                </div>
            ),
        },
        {
            title: 'Tác giả',
            dataIndex: 'authorName',
            key: 'authorName',
            render: (text) => (
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Tương tác',
            key: 'engagement',
            render: (_, record) => (
                <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {record._count?.replies || 0} phản hồi
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {record.views.toLocaleString()} lượt xem
                    </Text>
                </div>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (val: string) => <Text type="secondary">{new Date(val).toLocaleDateString()}</Text>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'published' ? 'success' : 'orange'}>
                    {(status || 'PENDING').toUpperCase()}
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
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Diễn đàn</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Diễn đàn</Title>
                    <Text type="secondary">Điều hành các chủ đề thảo luận và tương tác cộng đồng</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Tạo chủ đề mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng bài viết" value={topics.length} prefix={<MessageOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Lượt xem" value={topics.reduce((sum, t) => sum + t.views, 0)} prefix={<EyeOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Phản hồi" value={topics.reduce((sum, t) => sum + (t._count?.replies || 0), 0)} prefix={<MessageOutlined style={{ color: '#52c41a' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hot Topics" value={topics.filter(t => t.views > 500).length} prefix={<FireOutlined style={{ color: '#ff4d4f' }} />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
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
