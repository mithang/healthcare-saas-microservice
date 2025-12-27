'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Tag, Avatar, Row, Col, Statistic, Breadcrumb, message, Input, Modal } from 'antd';
import { CommentOutlined, CheckOutlined, StopOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, WarningOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import engagementService, { Comment, CommentStats, CommentStatus } from '@/services/engagement.service';

const { Title, Text } = Typography;

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [stats, setStats] = useState<CommentStats>({ pending: 0, spam: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cData, sData] = await Promise.all([
                engagementService.getComments(),
                engagementService.getCommentStats()
            ]);
            setComments(cData);
            setStats(sData);
        } catch (error) {
            console.error('Failed to fetch engagement data:', error);
            message.error('Không thể tải danh sách bình luận');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (id: number, status: CommentStatus) => {
        if (status === 'DELETED') {
            Modal.confirm({
                title: 'Xóa bình luận',
                content: 'Bạn có chắc chắn muốn xóa bình luận này không?',
                okText: 'Xóa',
                okType: 'danger',
                onOk: async () => {
                    try {
                        await engagementService.updateCommentStatus(id, status);
                        message.success('Đã xóa bình luận');
                        fetchData();
                    } catch (error) {
                        message.error('Lỗi khi xóa bình luận');
                    }
                }
            });
            return;
        }

        try {
            await engagementService.updateCommentStatus(id, status);
            message.success(`Đã cập nhật trạng thái: ${status}`);
            fetchData();
        } catch (error) {
            message.error('Lỗi khi cập nhật trạng thái');
        }
    };

    const filteredData = comments.filter(c =>
        c.userName.toLowerCase().includes(searchText.toLowerCase()) ||
        c.content.toLowerCase().includes(searchText.toLowerCase()) ||
        c.postTitle.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<Comment> = [
        {
            title: 'Người dùng',
            dataIndex: 'userName',
            key: 'userName',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{new Date(record.createdAt).toLocaleDateString()}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Nội dung',
            key: 'content',
            render: (_, record) => (
                <div style={{ maxWidth: '400px' }}>
                    <Text>{record.content}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>Trên: <a href="#">{record.postTitle}</a></Text>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'APPROVED' ? 'success' :
                        status === 'PENDING' ? 'processing' :
                            status === 'SPAM' ? 'error' : 'default'
                }>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    {record.status !== 'APPROVED' && (
                        <Button icon={<CheckOutlined />} type="link" style={{ color: '#52c41a' }} onClick={() => handleAction(record.id, 'APPROVED')} />
                    )}
                    {record.status !== 'SPAM' && (
                        <Button icon={<WarningOutlined />} type="link" style={{ color: '#fa8c16' }} onClick={() => handleAction(record.id, 'SPAM')} />
                    )}
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleAction(record.id, 'DELETED')} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Tương tác</Breadcrumb.Item>
                <Breadcrumb.Item>Bình luận</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Bình luận</Title>
                    <Text type="secondary">Quản lý các bình luận và tương tác từ người dùng trên bài viết</Text>
                </div>
                <Button icon={<ReloadOutlined />} onClick={fetchData}>Làm mới</Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <Card size="small">
                        <Statistic title="Chờ duyệt" value={stats.pending} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small">
                        <Statistic title="Báo cáo Spam" value={stats.spam} valueStyle={{ color: '#cf1322' }} prefix={<StopOutlined />} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small">
                        <Statistic title="Tổng bình luận" value={stats.total} prefix={<CommentOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm kiếm người dùng, nội dung, bài viết..."
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

// Re-using user icon
const UserOutlined = () => <span role="img" aria-label="user" className="anticon anticon-user"><svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 566c-45.9 0-89.1-17.9-121.6-50.4S340 439.9 340 394s17.9-89.1 50.4-121.6S466.1 222 512 222s89.1 17.9 121.6 50.4S684 348.1 684 394s-17.9 89.1-50.4 121.6S557.9 566 512 566z"></path></svg></span>;
const ClockCircleOutlined = () => <span role="img" aria-label="clock-circle" className="anticon anticon-clock-circle"><svg viewBox="64 64 896 896" focusable="false" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm120-438.2l-103.4.1v-182c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v200.2c0 2.2.9 4.3 2.5 5.9l120.4 120.4c3.1 3.1 8.2 3.1 11.3 0l11.3-11.3c3.1-3.1 3.1-8.2 0-11.3L632 445.8z"></path></svg></span>;
