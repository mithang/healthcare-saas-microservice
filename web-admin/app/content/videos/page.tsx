'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Button, Breadcrumb, Row, Col, Tag, Modal, message, Empty, Spin, Tooltip } from 'antd';
import { VideoCameraOutlined, PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleFilled, UserOutlined, CalendarOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import contentService, { Video } from '@/services/content.service';
import Link from 'next/link';

const { Title, Text } = Typography;
const { Meta } = Card;

export default function VideosManagementPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const data = await contentService.getVideos();
            setVideos(data);
        } catch (error) {
            console.error('Failed to fetch videos:', error);
            message.error('Lỗi khi tải danh sách video');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleDelete = (id: number | string, title: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa video "${title}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteVideo(id);
                    message.success('Đã xóa video thành công');
                    fetchVideos();
                } catch (error) {
                    message.error('Lỗi khi xóa video');
                }
            }
        });
    };

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Video</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Video nội bộ</Title>
                    <Text type="secondary">Quản lý kho video hướng dẫn, giới thiệu và tư vấn sức khỏe trên hệ thống</Text>
                </div>
                <Link href="/admin/content/videos/create">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Upload Video mới
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    <Spin size="large" tip="Đang tải dữ liệu..." />
                </div>
            ) : videos.length === 0 ? (
                <Card style={{ padding: '60px 0' }}>
                    <Empty description="Chưa có video nào được tải lên" />
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Link href="/admin/content/videos/create">
                            <Button type="primary">Tải lên ngay</Button>
                        </Link>
                    </div>
                </Card>
            ) : (
                <Row gutter={[24, 24]}>
                    {videos.map((video) => (
                        <Col xs={24} sm={12} lg={8} key={video.id}>
                            <Card
                                hoverable
                                bodyStyle={{ padding: '20px' }}
                                cover={
                                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative', backgroundColor: '#000' }}>
                                        <img
                                            alt={video.title}
                                            src={video.thumbnail || 'https://via.placeholder.com/800x450?text=Video+Thumbnail'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <PlayCircleFilled style={{ fontSize: '48px', color: '#fff', opacity: 0.8 }} />
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                                            <Tag color="rgba(0,0,0,0.6)" style={{ border: 'none', color: '#fff' }}>
                                                {video.duration || '00:00'}
                                            </Tag>
                                        </div>
                                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                            <Tag color={video.isActive ? 'success' : 'default'} style={{ fontWeight: 'bold' }}>
                                                {video.isActive ? 'ĐÃ XUẤT BẢN' : 'TẠM ẨN'}
                                            </Tag>
                                        </div>
                                    </div>
                                }
                                actions={[
                                    <Tooltip title="Xem video">
                                        <EyeOutlined key="view" />
                                    </Tooltip>,
                                    <Tooltip title="Chỉnh sửa">
                                        <Link href={`/admin/content/videos/${video.id}/edit`}>
                                            <EditOutlined key="edit" />
                                        </Link>
                                    </Tooltip>,
                                    <Tooltip title="Xóa">
                                        <DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} onClick={() => handleDelete(video.id, video.title)} />
                                    </Tooltip>
                                ]}
                            >
                                <Meta
                                    title={<Text strong style={{ fontSize: '16px' }}>{video.title}</Text>}
                                    description={
                                        <Space direction="vertical" size={4} style={{ width: '100%', marginTop: '8px' }}>
                                            <Space size="small">
                                                <UserOutlined style={{ fontSize: '12px' }} />
                                                <Text type="secondary" style={{ fontSize: '12px' }}>Tác giả: {video.author}</Text>
                                            </Space>
                                            <Space size="small">
                                                <CalendarOutlined style={{ fontSize: '12px' }} />
                                                <Text type="secondary" style={{ fontSize: '12px' }}>Ngày: {video.date}</Text>
                                            </Space>
                                        </Space>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
