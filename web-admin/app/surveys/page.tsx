'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Row, Col, Statistic, Modal, Tooltip } from 'antd';
import { FormOutlined, PlusOutlined, BarChartOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ClockCircleOutlined, MessageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import surveyService, { Survey } from '@/services/survey.service';

const { Title, Text } = Typography;

export default function SurveysPage() {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchSurveys = async () => {
        setLoading(true);
        try {
            const data = await surveyService.getSurveys();
            setSurveys(data);
        } catch (error) {
            console.error('Failed to fetch surveys:', error);
            // Fallback mock
            setSurveys([
                { id: 1, title: 'Khảo sát mức độ hài lòng về dịch vụ khám bệnh', description: 'Đánh giá chất lượng dịch vụ và thái độ phục vụ của nhân viên y tế.', status: 'ACTIVE', createdAt: new Date().toISOString(), _count: { responses: 1256 } },
                { id: 2, title: 'Khảo sát nhu cầu tiêm chủng vaccine cúm', description: 'Thu thập ý kiến về nhu cầu và thời gian tiêm chủng phù hợp.', status: 'DRAFT', createdAt: new Date().toISOString(), _count: { responses: 0 } }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveys();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa khảo sát',
            content: 'Bạn có chắc chắn muốn xóa bài khảo sát này không? Tất cả dữ liệu phản hồi liên quan sẽ bị mất.',
            okText: 'Xóa',
            okType: 'danger',
            onOk: async () => {
                try {
                    await surveyService.deleteSurvey(id);
                    message.success('Đã xóa khảo sát');
                    fetchSurveys();
                } catch (error) {
                    message.error('Lỗi khi xóa khảo sát');
                }
            }
        });
    };

    const filteredData = surveys.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const getStatusTag = (status: string) => {
        switch (status) {
            case 'ACTIVE': return <Tag color="success">ĐANG CHẠY</Tag>;
            case 'DRAFT': return <Tag color="default">BẢN NHÁP</Tag>;
            case 'CLOSED': return <Tag color="error">ĐÃ ĐÓNG</Tag>;
            default: return <Tag>{status}</Tag>;
        }
    };

    const columns: ColumnsType<Survey> = [
        {
            title: 'Tên khảo sát',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div style={{ maxWidth: '450px' }}>
                    <Text strong style={{ fontSize: '15px', display: 'block' }}>{text}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }} ellipsis>{record.description}</Text>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusTag(status),
        },
        {
            title: 'Phản hồi',
            key: 'responses',
            render: (_, record) => (
                <Space>
                    <MessageOutlined style={{ color: '#1890ff' }} />
                    <Text strong>{record._count?.responses || 0}</Text>
                </Space>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (val) => (
                <Space>
                    <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                    <Text type="secondary">{new Date(val).toLocaleDateString()}</Text>
                </Space>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem báo cáo">
                        <Button icon={<BarChartOutlined />} type="link" />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button icon={<EditOutlined />} type="link" />
                    </Tooltip>
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Sự kiện</Breadcrumb.Item>
                <Breadcrumb.Item>Khảo sát ý kiến (Surveys)</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Khảo sát</Title>
                    <Text type="secondary">Thiết kế và thu thập ý kiến đóng góp từ người dùng và đối tác</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Tạo khảo sát mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng khảo sát" value={surveys.length} prefix={<FormOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đang chạy" value={surveys.filter(s => s.status === 'ACTIVE').length} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng phản hồi" value={surveys.reduce((sum, s) => sum + (s._count?.responses || 0), 0)} prefix={<MessageOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ hoàn thành" value={87.5} suffix="%" valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm theo tên khảo sát..."
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
