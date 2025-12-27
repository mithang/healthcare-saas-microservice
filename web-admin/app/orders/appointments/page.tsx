'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Modal, Row, Col, Statistic, Avatar } from 'antd';
import { CalendarOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UserOutlined, MedicineBoxOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import bookingService, { Appointment } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const data = await bookingService.getAppointments();
            setAppointments(data);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
            message.error('Không thể tải danh sách lịch hẹn');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xóa lịch hẹn',
            content: 'Bạn có chắc chắn muốn xóa lịch hẹn này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.deleteAppointment(id);
                    message.success('Đã xóa lịch hẹn');
                    fetchAppointments();
                } catch (error) {
                    message.error('Lỗi khi xóa lịch hẹn');
                }
            }
        });
    };

    const filteredData = appointments.filter(item =>
        item.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.doctorName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.patientPhone.includes(searchText)
    );

    const columns: ColumnsType<Appointment> = [
        {
            title: 'Bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.patientPhone}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctorName',
            key: 'doctorName',
            render: (text) => (
                <Space>
                    <Avatar icon={<MedicineBoxOutlined />} style={{ backgroundColor: '#1890ff' }} />
                    <Text strong style={{ color: '#1890ff' }}>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => (
                <div>
                    <Space>
                        <CalendarOutlined style={{ color: '#1890ff' }} />
                        <Text strong>{text}</Text>
                    </Space>
                    <br />
                    <Space>
                        <ClockCircleOutlined style={{ color: '#faad14' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.time}</Text>
                    </Space>
                </div>
            ),
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'completed' ? 'success' : status === 'pending' ? 'orange' : status === 'cancelled' ? 'error' : 'processing'}>
                    {(status || 'processing').toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} type="link">Xem</Button>
                    <Button icon={<EditOutlined />} type="link">Sửa</Button>
                    <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
                <Breadcrumb.Item>Đặt lịch khám</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Đặt lịch khám</Title>
                    <Text type="secondary">Theo dõi và quản lý các cuộc hẹn giữa bệnh nhân và bác sĩ</Text>
                </div>
                <Space>
                    <Button icon={<CalendarOutlined />} size="large" onClick={() => message.info('Tính năng đang phát triển')}>
                        Xem Lịch
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => message.info('Tính năng đang phát triển')}>
                        Đặt lịch mới
                    </Button>
                </Space>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng lịch hẹn" value={appointments.length} prefix={<CalendarOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Chờ khám" value={appointments.filter(a => a.status === 'pending').length} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hoàn tất" value={appointments.filter(a => a.status === 'completed').length} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Dịch vụ phổ biến" value="Khám nhi" valueStyle={{ fontSize: '16px' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Tìm kiếm bệnh nhân, bác sĩ..."
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
