'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message, Popconfirm, Select, Switch, Tag, Row, Col, Statistic, Avatar, Breadcrumb, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, TeamOutlined, CheckCircleOutlined, StopOutlined, SearchOutlined, FilterOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import userService, { User } from '@/services/user.service';
import roleService, { Role } from '@/services/role.service';

const { Title, Text } = Typography;
const { Option } = Select;

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersData, rolesData] = await Promise.all([
                userService.getUsers(),
                roleService.getRoles()
            ]);
            setUsers(usersData);
            setRoles(rolesData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            message.error('Lỗi khi tải dữ liệu người dùng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            await userService.createUser({
                ...values,
                isActive: values.isActive !== undefined ? values.isActive : true,
            });
            message.success('Đã tạo người dùng mới thành công');
            setIsModalOpen(false);
            form.resetFields();
            fetchData();
        } catch (error) {
            console.error('Error creating user:', error);
            message.error('Lỗi khi tạo người dùng');
        }
    };

    const handleEdit = async (values: any) => {
        if (!editingUser) return;
        try {
            await userService.updateUser(editingUser.id, values);
            message.success('Đã cập nhật thông tin người dùng');
            setIsModalOpen(false);
            setEditingUser(null);
            form.resetFields();
            fetchData();
        } catch (error) {
            console.error('Error updating user:', error);
            message.error('Lỗi khi cập nhật người dùng');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await userService.deleteUser(id);
            message.success('Đã xóa người dùng thành công');
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Lỗi khi xóa người dùng');
        }
    };

    const openCreateModal = () => {
        setEditingUser(null);
        form.resetFields();
        form.setFieldsValue({ isActive: true });
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        form.setFieldsValue({
            userId: user.userId,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
            department: user.department,
            position: user.position,
            roleId: user.roleId,
            isActive: user.isActive !== undefined ? user.isActive : true,
        });
        setIsModalOpen(true);
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchText.toLowerCase())
    );

    const stats = {
        total: users.length,
        active: users.filter(u => u.isActive).length,
        inactive: users.filter(u => !u.isActive).length,
        admins: users.filter(u => u.roleId === 1).length,
    };

    const columns: ColumnsType<User> = [
        {
            title: 'Người dùng',
            key: 'user',
            render: (_, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} src={null} style={{ backgroundColor: record.isActive ? '#1890ff' : '#bfbfbf' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{record.name || 'N/A'}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.userId}</Text>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Liên hệ',
            key: 'contact',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Space size="small">
                        <MailOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                        <Text style={{ fontSize: '13px' }}>{record.email}</Text>
                    </Space>
                    {record.phone && (
                        <Space size="small">
                            <PhoneOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                            <Text style={{ fontSize: '13px' }}>{record.phone}</Text>
                        </Space>
                    )}
                </Space>
            ),
        },
        {
            title: 'Phòng ban / Chức vụ',
            key: 'position',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: '13px' }}>{record.department || '-'}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{record.position || '-'}</Text>
                </Space>
            ),
        },
        {
            title: 'Vai trò',
            dataIndex: 'roleId',
            key: 'roleId',
            render: (roleId) => {
                const role = roles.find(r => r.id === roleId);
                return role ? <Tag color="blue">{role.name}</Tag> : <Text type="secondary">-</Text>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (
                <Tag color={isActive ? 'success' : 'error'} style={{ borderRadius: '10px' }}>
                    {isActive ? 'HOẠT ĐỘNG' : 'ĐÃ KHÓA'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="text"
                            icon={<EditOutlined style={{ color: '#1890ff' }} />}
                            onClick={() => openEditModal(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Xóa người dùng"
                        description={`Bạn có chắc muốn xóa nhân sự "${record.name}"?`}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okType="danger"
                    >
                        <Tooltip title="Xóa">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý nhân sự</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản trị viên & Nhân sự</Title>
                    <Text type="secondary">Quản lý tài khoản truy cập hệ thống quản trị và phân quyền phòng ban</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={openCreateModal}>
                    Thêm nhân sự mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Tổng số nhân sự" value={stats.total} prefix={<TeamOutlined style={{ color: '#1890ff' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Đang hoạt động" value={stats.active} prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Đã khóa" value={stats.inactive} prefix={<StopOutlined style={{ color: '#ff4d4f' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Quản trị viên" value={stats.admins} prefix={<UserOutlined style={{ color: '#722ed1' }} />} />
                    </Card>
                </Col>
            </Row>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Input
                        placeholder="Tìm kiếm theo tên, email, mã nhân sự..."
                        prefix={<SearchOutlined />}
                        style={{ width: 400 }}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Space>
                        <Button icon={<FilterOutlined />}>Bộ lọc</Button>
                        <Button type="dashed" icon={<PlusOutlined />} onClick={() => fetchData()}>Làm mới</Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10, showSizeChanger: true }}
                />
            </Card>

            <Modal
                title={editingUser ? 'Chỉnh sửa nhân sự' : 'Thêm nhân sự mới'}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingUser(null);
                    form.resetFields();
                }}
                footer={null}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={editingUser ? handleEdit : handleCreate}
                    initialValues={{ isActive: true }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="userId"
                                label="Mã nhân sự"
                                rules={[{ required: true, message: 'Vui lòng nhập mã nhân sự' }]}
                            >
                                <Input placeholder="ví dụ: NV001" disabled={!!editingUser} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Địa chỉ Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không hợp lệ' }
                                ]}
                            >
                                <Input placeholder="nhanvien@healthcare.com" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                            >
                                <Input placeholder="Nguyễn Văn A" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                            >
                                <Input placeholder="0901234567" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                    >
                        <Input.TextArea rows={2} placeholder="Nhập địa chỉ tạm trú/thường trú" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="department"
                                label="Phòng ban"
                            >
                                <Select placeholder="Chọn phòng ban" allowClear>
                                    <Option value="IT">Công nghệ thông tin (IT)</Option>
                                    <Option value="HR">Nhân sự (HR)</Option>
                                    <Option value="Finance">Tài chính (Finance)</Option>
                                    <Option value="Operations">Vận hành (Operations)</Option>
                                    <Option value="Medical">Y tế (Medical)</Option>
                                    <Option value="Nursing">Điều dưỡng (Nursing)</Option>
                                    <Option value="Pharmacy">Dược phẩm (Pharmacy)</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="position"
                                label="Chức vụ"
                            >
                                <Input placeholder="ví dụ: Trưởng phòng, Chuyên viên..." />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="roleId"
                                label="Vai trò / Quyền hạn"
                                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                            >
                                <Select placeholder="Chọn vai trò" loading={roles.length === 0}>
                                    {roles.map((role) => (
                                        <Option key={role.id} value={role.id}>
                                            {role.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="isActive"
                                label="Trạng thái kích hoạt"
                                valuePropName="checked"
                            >
                                <Switch checkedChildren="HOẠT ĐỘNG" unCheckedChildren="ĐÃ KHÓA" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {!editingUser && (
                        <Form.Item
                            name="password"
                            label="Mật khẩu khởi tạo"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password placeholder="Tối thiểu 6 ký tự" />
                        </Form.Item>
                    )}

                    <div style={{ textAlign: 'right', marginTop: '16px' }}>
                        <Space>
                            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" style={{ padding: '0 32px' }}>
                                {editingUser ? 'Cập nhật' : 'Tạo mới'}
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
