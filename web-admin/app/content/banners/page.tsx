'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Button, Breadcrumb, message, Modal, Row, Col, Tag, Tooltip, Empty, Spin } from 'antd';
import { PictureOutlined, PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, StopOutlined, EyeOutlined } from '@ant-design/icons';
import contentService, { Banner } from '@/services/content.service';
import Link from 'next/link';

const { Title, Text } = Typography;
const { Meta } = Card;

export default function BannersManagementPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const data = await contentService.getBanners();
            setBanners(data);
        } catch (error) {
            console.error('Failed to fetch banners:', error);
            message.error('Lỗi khi tải danh sách banner');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleDelete = (id: number | string, title: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa banner "${title}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteBanner(id);
                    message.success('Đã xóa banner thành công');
                    fetchBanners();
                } catch (error) {
                    message.error('Lỗi khi xóa banner');
                }
            }
        });
    };

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Banner quảng cáo</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Banner</Title>
                    <Text type="secondary">Cấu hình các banner quảng cáo và hình ảnh trình chiếu trên toàn hệ thống</Text>
                </div>
                <Link href="/admin/content/banners/create">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Tạo Banner mới
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    <Spin size="large" tip="Đang tải dữ liệu..." />
                </div>
            ) : banners.length === 0 ? (
                <Card style={{ padding: '60px 0' }}>
                    <Empty description="Chưa có banner nào được tạo" />
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Link href="/admin/content/banners/create">
                            <Button type="primary">Tạo ngay</Button>
                        </Link>
                    </div>
                </Card>
            ) : (
                <Row gutter={[24, 24]}>
                    {banners.map((banner) => (
                        <Col xs={24} sm={12} lg={8} key={banner.id}>
                            <Card
                                hoverable
                                cover={
                                    <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                                        <img
                                            alt={banner.title}
                                            src={banner.image || 'https://via.placeholder.com/800x450?text=Banner+Image'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                            <Tag color={banner.isActive ? 'success' : 'default'} style={{ fontWeight: 'bold' }}>
                                                {banner.isActive ? 'ĐANG HOẠT ĐỘNG' : 'TẠM NGƯNG'}
                                            </Tag>
                                        </div>
                                    </div>
                                }
                                actions={[
                                    <Tooltip title="Xem chi tiết">
                                        <EyeOutlined key="view" />
                                    </Tooltip>,
                                    <Tooltip title="Chỉnh sửa">
                                        <Link href={`/admin/content/banners/${banner.id}/edit`}>
                                            <EditOutlined key="edit" />
                                        </Link>
                                    </Tooltip>,
                                    <Tooltip title="Xóa">
                                        <DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} onClick={() => handleDelete(banner.id, banner.title)} />
                                    </Tooltip>
                                ]}
                            >
                                <Meta
                                    title={<Text strong style={{ fontSize: '16px' }}>{banner.title}</Text>}
                                    description={
                                        <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                            <Tag color="cyan">{banner.position || 'Trang chủ'}</Tag>
                                            <Text type="secondary" ellipsis={{ tooltip: banner.link }}>
                                                Link: {banner.link || 'Không có'}
                                            </Text>
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
