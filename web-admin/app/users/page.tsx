'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message, Popconfirm, Select, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface User {
    id: number;
    userId: string;
    email: string;
    name: string | null;
    phone?: string;
    address?: string;
    department?: string;
    position?: string;
    roleId?: number;
    isActive?: boolean;
    createdAt: string;
}

interface Role {
    id: number;
    name: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form] = Form.useForm();

    const fetchUsers = () => {
        setLoading(true);
        fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch users:', err);
                setLoading(false);
            });
    };

    const fetchRoles = () => {
        fetch('http://localhost:3000/roles')
            .then((res) => res.json())
            .then((data) => setRoles(data))
            .catch((err) => console.error('Failed to fetch roles:', err));
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    isActive: values.isActive !== undefined ? values.isActive : true,
                }),
            });

            if (response.ok) {
                message.success('User created successfully');
                setIsModalOpen(false);
                form.resetFields();
                fetchUsers();
            } else {
                message.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            message.error('An error occurred');
        }
    };

    const handleEdit = async (values: any) => {
        if (!editingUser) return;
        try {
            const response = await fetch(`http://localhost:3000/users/${editingUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('User updated successfully');
                setIsModalOpen(false);
                setEditingUser(null);
                form.resetFields();
                fetchUsers();
            } else {
                message.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            message.error('An error occurred');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('User deleted successfully');
                fetchUsers();
            } else {
                message.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('An error occurred');
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

    const columns: ColumnsType<User> = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => text || '-',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (text) => text || '-',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: (text) => text || '-',
        },
        {
            title: 'Role',
            dataIndex: 'roleId',
            key: 'roleId',
            render: (roleId) => {
                const role = roles.find(r => r.id === roleId);
                return role ? role.name : '-';
            },
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete user"
                        description="Are you sure you want to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={2}><UserOutlined /> User Management</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                            Create User
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={users}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </Space>
            </Card>

            <Modal
                title={editingUser ? 'Edit User' : 'Create New User'}
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
                >
                    <Form.Item
                        name="userId"
                        label="User ID"
                        rules={[{ required: true, message: 'Please input user ID' }]}
                    >
                        <Input placeholder="e.g. USR001" disabled={!!editingUser} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input placeholder="user@example.com" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input name' }]}
                    >
                        <Input placeholder="John Doe" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                    >
                        <Input placeholder="+84 123 456 789" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                    >
                        <Input.TextArea rows={2} placeholder="Full address" />
                    </Form.Item>
                    <Form.Item
                        name="department"
                        label="Department"
                    >
                        <Select placeholder="Select department" allowClear>
                            <Option value="IT">IT</Option>
                            <Option value="HR">HR</Option>
                            <Option value="Finance">Finance</Option>
                            <Option value="Operations">Operations</Option>
                            <Option value="Medical">Medical</Option>
                            <Option value="Nursing">Nursing</Option>
                            <Option value="Pharmacy">Pharmacy</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="position"
                        label="Position"
                    >
                        <Input placeholder="e.g. Senior Developer, Nurse, Doctor" />
                    </Form.Item>
                    <Form.Item
                        name="roleId"
                        label="Role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select placeholder="Select role" loading={roles.length === 0}>
                            {roles.map((role) => (
                                <Option key={role.id} value={role.id}>
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="isActive"
                        label="Active Status"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                    {!editingUser && (
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input password' }]}
                        >
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {editingUser ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
