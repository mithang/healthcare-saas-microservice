'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Button, Breadcrumb, Table, Tag, Modal, message, Spin, Tooltip, Alert, Row, Col, Statistic, Progress } from 'antd';
import { DatabaseOutlined, CloudUploadOutlined, CloudDownloadOutlined, DeleteOutlined, SyncOutlined, CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import securityService, { Backup } from '@/services/security.service';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

export default function BackupAdminPage() {
    const [backups, setBackups] = useState<Backup[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const fetchBackups = async () => {
        setLoading(true);
        try {
            const data = await securityService.getBackups();
            setBackups(data);
        } catch (error) {
            console.error('Failed to fetch backups:', error);
            message.error('Lỗi khi tải danh sách sao lưu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBackups();
    }, []);

    const handleCreateBackup = async () => {
        setCreating(true);
        try {
            await securityService.createBackup();
            message.success('Đã bắt đầu quá trình sao lưu dữ liệu');
            fetchBackups();
        } catch (error) {
            message.error('Lỗi khi khởi tạo sao lưu');
        } finally {
            setCreating(false);
        }
    };

    const handleRestore = (backup: Backup) => {
        Modal.confirm({
            title: 'Xác nhận khôi phục dữ liệu',
            icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
            content: (
                <div>
                    <p>Bạn sắp khôi phục dữ liệu từ bản sao lưu: <strong>{backup.filename}</strong></p>
                    <p style={{ color: '#ff4d4f' }}><strong>CẢNH BÁO:</strong> Toàn bộ dữ liệu hiện tại sẽ bị ghi đè. Hành động này không thể hoàn tác.</p>
                </div>
            ),
            okText: 'Khôi phục ngay',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await securityService.restoreBackup(backup.id);
                    message.success('Đã bắt đầu quá trình khôi phục dữ liệu');
                } catch (error) {
                    message.error('Lỗi khi khôi phục dữ liệu');
                }
            }
        });
    };

    const handleDelete = (id: number, filename: string) => {
        Modal.confirm({
            title: 'Xóa bản sao lưu',
            content: `Bạn có chắc chắn muốn xóa bản sao lưu "${filename}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await securityService.deleteBackup(id);
                    message.success('Đã xóa bản sao lưu thành công');
                    fetchBackups();
                } catch (error) {
                    message.error('Lỗi khi xóa bản sao lưu');
                }
            }
        });
    };

    const columns: ColumnsType<Backup> = [
        {
            title: 'Tên file',
            dataIndex: 'filename',
            key: 'filename',
            render: (text) => (
                <Space>
                    <DatabaseOutlined style={{ color: '#1890ff' }} />
                    <Text strong>{text}</Text>
                </Space>
            )
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === 'auto' ? 'blue' : 'orange'}>
                    {type === 'auto' ? 'Tự động' : 'Thủ công'}
                </Tag>
            )
        },
        {
            title: 'Thời điểm tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const config: any = {
                    completed: { color: 'success', text: 'Thành công', icon: <CheckCircleOutlined /> },
                    failed: { color: 'error', text: 'Lỗi', icon: <ExclamationCircleOutlined /> },
                    processing: { color: 'processing', text: 'Đang xử lý', icon: <SyncOutlined spin /> }
                };
                const item = config[status] || config.completed;
                return <Tag icon={item.icon} color={item.color}>{item.text.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Khôi phục dữ liệu">
                        <Button
                            type="primary"
                            size="small"
                            icon={<CloudUploadOutlined />}
                            onClick={() => handleRestore(record)}
                            disabled={record.status !== 'completed'}
                        >
                            Restore
                        </Button>
                    </Tooltip>
                    <Tooltip title="Tải xuống">
                        <Button
                            size="small"
                            icon={<CloudDownloadOutlined />}
                            disabled={record.status !== 'completed'}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="text"
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id, record.filename)}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>An ninh & Bảo mật</Breadcrumb.Item>
                <Breadcrumb.Item>Backup & Recovery</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Sao lưu & Khôi phục</Title>
                    <Text type="secondary">Quản lý kho lưu trữ dữ liệu hệ thống và các điểm khôi phục</Text>
                </div>
                <Button
                    type="primary"
                    icon={<CloudUploadOutlined />}
                    size="large"
                    onClick={handleCreateBackup}
                    loading={creating}
                >
                    Tạo bản sao lưu mới
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: '24px' }}>
                <Col span={10}>
                    <Card title="Trạng thái hệ thống" style={{ height: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <div>
                                <Text type="secondary">Sao lưu gần nhất</Text>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                    <HistoryOutlined style={{ color: '#1890ff' }} />
                                    <Text strong>2 giờ trước (24/10/2023 14:25)</Text>
                                </div>
                            </div>
                            <div>
                                <Text type="secondary">Dung lượng ổ đĩa sử dụng</Text>
                                <Progress percent={65} status="active" strokeColor="#52c41a" />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                    <Text type="secondary">130 GB đã dùng</Text>
                                    <Text type="secondary">Tổng 200 GB</Text>
                                </div>
                            </div>
                            <Alert
                                message="Thông tin sao lưu"
                                description="Hệ thống tự động sao lưu vào 00:00 mỗi ngày. Các bản sao lưu sẽ được lưu trữ trong 30 ngày."
                                type="info"
                                showIcon
                            />
                        </Space>
                    </Card>
                </Col>
                <Col span={14}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Tổng số bản sao lưu"
                                    value={backups.length}
                                    prefix={<DatabaseOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Dung lượng kho lưu trữ"
                                    value={4.8}
                                    suffix="GB"
                                    prefix={<HistoryOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Tỷ lệ thành công"
                                    value={98.5}
                                    suffix="%"
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<CheckCircleOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Bản sao lưu thủ công"
                                    value={backups.filter(b => b.type === 'manual').length}
                                    prefix={<SyncOutlined />}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Card title="Danh sách các bản sao lưu">
                <Table
                    columns={columns}
                    dataSource={backups}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 8 }}
                />
            </Card>
        </div>
    );
}
