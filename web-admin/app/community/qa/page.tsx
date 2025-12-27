'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Avatar } from 'antd';
import { QuestionCircleOutlined, PlusOutlined, EyeOutlined, CheckOutlined, DeleteOutlined, SearchOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import communityService, { QAQuestion } from '@/services/community.service';

const { Title, Text } = Typography;

export default function QAPage() {
    const [questions, setQuestions] = useState<QAQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const data = await communityService.getQAQuestions();
            setQuestions(data);
        } catch (error) {
            console.error('Failed to fetch QA questions:', error);
            message.error('Không thể tải danh sách câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleApprove = async (id: number) => {
        try {
            await communityService.updateQAQuestion(id, { status: 'approved' });
            message.success('Đã duyệt câu hỏi');
            fetchQuestions();
        } catch (error) {
            message.error('Lỗi khi duyệt câu hỏi');
        }
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa câu hỏi',
            content: 'Bạn có chắc chắn muốn xóa câu hỏi này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteQAQuestion(id);
                    message.success('Đã xóa câu hỏi');
                    fetchQuestions();
                } catch (error) {
                    message.error('Lỗi khi xóa câu hỏi');
                }
            }
        });
    };

    const filteredData = questions.filter(item =>
        item.question.toLowerCase().includes(searchText.toLowerCase()) ||
        item.askedByName.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<QAQuestion> = [
        {
            title: 'Câu hỏi',
            dataIndex: 'question',
            key: 'question',
            render: (text) => (
                <div style={{ maxWidth: '400px' }}>
                    <Text strong style={{ fontSize: '15px' }}>{text}</Text>
                </div>
            ),
        },
        {
            title: 'Người hỏi',
            dataIndex: 'askedByName',
            key: 'askedByName',
            render: (text) => (
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Tag color="cyan">{text}</Tag>,
        },
        {
            title: 'Tương tác',
            key: 'engagement',
            render: (_, record) => (
                <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {record._count?.answers || 0} câu trả lời
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {record.views.toLocaleString()} lượt xem
                    </Text>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'approved' ? 'success' : 'orange'}>
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
                    {record.status !== 'approved' && (
                        <Button icon={<CheckOutlined />} type="link" style={{ color: '#52c41a' }} onClick={() => handleApprove(record.id)} />
                    )}
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Hỏi đáp (Q&A)</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Hỏi đáp</Title>
                    <Text type="secondary">Quản lý và giải đáp thắc mắc từ người dùng</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Tạo câu hỏi mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng câu hỏi" value={questions.length} prefix={<QuestionCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Chờ duyệt" value={questions.filter(q => q.status !== 'approved').length} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Lượt xem" value={questions.reduce((sum, q) => sum + q.views, 0)} prefix={<EyeOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Trợ giúp" value={questions.reduce((sum, q) => sum + (q._count?.answers || 0), 0)} prefix={<MessageOutlined style={{ color: '#1890ff' }} />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm kiếm câu hỏi hoặc người hỏi..."
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
