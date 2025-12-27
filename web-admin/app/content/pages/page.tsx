'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Tooltip } from 'antd';
import { FileTextOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined, GlobalOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import contentService, { StaticPage } from '@/services/content.service';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function StaticPagesManagementPage() {
    const [pages, setPages] = useState<StaticPage[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchPages = async () => {
        setLoading(true);
        try {
            const data = await contentService.getStaticPages();
            setPages(data);
        } catch (error) {
            console.error('Failed to fetch pages:', error);
            message.error('Lỗi khi tải danh sách trang tĩnh');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDelete = (id: number | string, title: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa trang "${title}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteStaticPage(id);
                    message.success('Đã xóa trang thành công');
                    fetchPages();
                } catch (error) {
                    message.error('Lỗi khi xóa trang');
                }
            }
        });
    };

    const filteredData = pages.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<StaticPage> = [
        {
            title: 'Tiêu đề trang',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text strong style={{ fontSize: '15px' }}>{text}</Text>,
        },
        {
            title: 'Đường dẫn (Slug)',
            dataIndex: 'slug',
            key: 'slug',
            render: (slug) => <Tag color="blue">/{slug}</Tag>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (active) => (
                <Tag color={active ? 'success' : 'default'} style={{ fontWeight: 'bold' }}>
                    {active ? 'ĐÃ XUẤT BẢN' : 'BẢN NHÁP'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem trang">
                        <Link href={`/${record.slug}`} target="_blank">
                            <Button icon={<EyeOutlined />} type="link" />
                        </Link>
                    </Tooltip>
                    <Link href={`/admin/content/pages/${record.id}/edit`}>
                        <Button icon={<EditOutlined />} type="link" />
                    </Link>
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id, record.title)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Trang tĩnh</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Trang tĩnh</Title>
                    <Text type="secondary">Quản lý các trang nội dung cố định như Giới thiệu, Chính sách bảo mật, Điều khoản dịch vụ...</Text>
                </div>
                <Link href="/admin/content/pages/create">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Tạo Trang mới
                    </Button>
                </Link>
            </div>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm theo tiêu đề hoặc slug..."
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
