'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Tag, Breadcrumb, message, Modal, Row, Col, Statistic } from 'antd';
import { WalletOutlined, PlusOutlined, EyeOutlined, CheckOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, BankOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import financeService, { Withdrawal } from '@/services/finance.service';

const { Title, Text } = Typography;

export default function WithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWithdrawals = async () => {
        setLoading(true);
        try {
            const data = await financeService.getWithdrawals();
            setWithdrawals(data);
        } catch (error) {
            console.error('Failed to fetch withdrawals:', error);
            message.error('Không thể tải danh sách rút tiền');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const handleVerify = async (id: number) => {
        Modal.confirm({
            title: 'Duyệt yêu cầu rút tiền',
            content: 'Bạn có chắc chắn muốn duyệt yêu cầu rút tiền này không?',
            okText: 'Duyệt',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await financeService.updateWithdrawal(id, {
                        status: 'approved',
                        processedDate: new Date().toISOString()
                    });
                    message.success('Đã duyệt yêu cầu rút tiền');
                    fetchWithdrawals();
                } catch (error) {
                    message.error('Lỗi khi duyệt yêu cầu');
                }
            }
        });
    };

    const handleCreate = async () => {
        try {
            await financeService.createWithdrawal({
                transactionId: 'TRX-' + Math.floor(Math.random() * 1000000),
                partnerName: 'Đối tác mới ' + new Date().toLocaleTimeString(),
                partnerType: 'Clinic',
                amount: 2000000,
                bankName: 'Vietcombank',
                accountName: 'NGUYEN VAN TEST',
                accountNumber: '1234567890',
                status: 'pending'
            });
            message.success('Đã tạo yêu cầu rút tiền mẫu');
            fetchWithdrawals();
        } catch (error) {
            message.error('Lỗi khi tạo yêu cầu');
        }
    };

    const columns: ColumnsType<Withdrawal> = [
        {
            title: 'Đối tác',
            dataIndex: 'partnerName',
            key: 'partnerName',
            render: (text, record) => (
                <Space>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<BankOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Tag color="cyan">{record.partnerType}</Tag>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (val: number) => <Text strong style={{ color: '#cf1322' }}>{val.toLocaleString()} đ</Text>,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Ngân hàng',
            key: 'bank',
            render: (_, record) => (
                <div>
                    <Text strong>{record.bankName}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>{record.accountNumber}</Text>
                </div>
            ),
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'requestDate',
            key: 'requestDate',
            render: (val: string) => <span>{new Date(val).toLocaleDateString('vi-VN')}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'approved' ? 'success' : status === 'pending' ? 'orange' : 'error'} icon={
                    status === 'approved' ? <CheckCircleOutlined /> : status === 'pending' ? <ClockCircleOutlined /> : <CloseCircleOutlined />
                }>
                    {status === 'approved' ? 'Đã duyệt' : status === 'pending' ? 'Chờ xử lý' : 'Từ chối'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} type="link">Chi tiết</Button>
                    {record.status === 'pending' && (
                        <Button icon={<CheckOutlined />} type="link" style={{ color: '#52c41a' }} onClick={() => handleVerify(record.id)}>Duyệt</Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Tài chính</Breadcrumb.Item>
                <Breadcrumb.Item>Rút tiền</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Rút tiền</Title>
                    <Text type="secondary">Xử lý các yêu cầu rút tiền từ đối tác (Bác sĩ, Nhà thuốc, Phòng khám)</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreate}>
                    Tạo yêu cầu mẫu
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Chờ xử lý" value={withdrawals.filter(w => w.status === 'pending').length} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đã duyệt" value={withdrawals.filter(w => w.status === 'approved').length} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng tiền rút" value={withdrawals.reduce((sum, w) => sum + w.amount, 0)} suffix="đ" prefix={<WalletOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Đối tác đã rút" value={new Set(withdrawals.map(w => w.partnerName)).size} prefix={<BankOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card>
                <Table
                    columns={columns}
                    dataSource={withdrawals}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
}

// Simple Avatar placeholder for now
const Avatar = ({ style, icon }: { style?: React.CSSProperties, icon?: React.ReactNode }) => (
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', ...style }}>
        {icon}
    </div>
);
