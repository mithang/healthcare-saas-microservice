'use client';

import React from 'react';
import { Typography, Card, Space, Button, Breadcrumb, Row, Col, List, Avatar, Tag, Tooltip, Dropdown, Menu } from 'antd';
import { FolderOpenFilled, FileFilled, FileImageFilled, FilePdfFilled, FileExcelFilled, PlayCircleFilled, UploadOutlined, MoreOutlined, SearchOutlined, FolderOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function FileManagerPage() {
    const folders = [
        { name: 'Uploads', count: 120, color: '#faad14' },
        { name: 'Images', count: 450, color: '#1890ff' },
        { name: 'Documents', count: 85, color: '#52c41a' },
        { name: 'Videos', count: 32, color: '#f5222d' },
    ];

    const files = [
        { name: 'banner_tet_2024.jpg', size: '2.5 MB', type: 'image', date: '19/12/2024' },
        { name: 'huong_dan_su_dung.pdf', size: '1.2 MB', type: 'doc', date: '18/12/2024' },
        { name: 'avatar_default.png', size: '150 KB', type: 'image', date: '18/12/2024' },
        { name: 'video_gioi_thieu.mp4', size: '25 MB', type: 'video', date: '17/12/2024' },
        { name: 'bao_cao_thang_11.xlsx', size: '45 KB', type: 'sheet', date: '16/12/2024' },
    ];

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image': return <FileImageFilled style={{ color: '#722ed1' }} />;
            case 'video': return <PlayCircleFilled style={{ color: '#f5222d' }} />;
            case 'doc': return <FilePdfFilled style={{ color: '#1890ff' }} />;
            case 'sheet': return <FileExcelFilled style={{ color: '#52c41a' }} />;
            default: return <FileFilled style={{ color: '#8c8c8c' }} />;
        }
    };

    const menuItems = [
        { key: 'download', label: 'Tải xuống' },
        { key: 'rename', label: 'Đổi tên' },
        { key: 'delete', label: 'Xóa', danger: true },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý tập tin</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý tập tin (Media)</Title>
                    <Text type="secondary">Lưu trữ và quản lý tất cả hình ảnh, tài liệu và video được tải lên hệ thống</Text>
                </div>
                <Space>
                    <Button icon={<SearchOutlined />}>Tìm kiếm</Button>
                    <Button type="primary" icon={<UploadOutlined />} size="large">
                        Tải tập tin lên
                    </Button>
                </Space>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
                {folders.map((folder, idx) => (
                    <Col xs={12} sm={6} key={idx}>
                        <Card hoverable bodyStyle={{ padding: '20px' }}>
                            <Space size="large">
                                <FolderOpenFilled style={{ fontSize: '40px', color: folder.color }} />
                                <div>
                                    <Text strong style={{ fontSize: '16px', display: 'block' }}>{folder.name}</Text>
                                    <Text type="secondary">{folder.count} tệp tin</Text>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card title="Tập tin gần đây" bodyStyle={{ padding: '0px' }}>
                <List
                    dataSource={files}
                    renderItem={(item) => (
                        <List.Item
                            style={{ padding: '12px 24px' }}
                            actions={[
                                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                                    <Button type="text" icon={<MoreOutlined />} />
                                </Dropdown>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        shape="square"
                                        size="large"
                                        icon={getFileIcon(item.type)}
                                        style={{ backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    />
                                }
                                title={<Text strong>{item.name}</Text>}
                                description={
                                    <Space size="middle">
                                        <Text type="secondary" style={{ fontSize: '12px' }}>Kích thước: {item.size}</Text>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>Ngày tải lên: {item.date}</Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}
