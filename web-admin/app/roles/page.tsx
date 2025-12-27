'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Role {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
}

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [form] = Form.useForm();

    const fetchRoles = () => {
        setLoading(true);
        fetch('http://localhost:3000/roles')
            .then((res) => res.json())
            .then((data) => {
                setRoles(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch roles:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3000/roles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Role created successfully');
                setIsModalOpen(false);
                form.resetFields();
                fetchRoles();
            } else {
                message.error('Failed to create role');
            }
        } catch (error) {
            console.error('Error creating role:', error);
            message.error('An error occurred');
        }
    };

    const handleEdit = async (values: any) => {
        if (!editingRole) return;
        try {
            const response = await fetch(`http://localhost:3000/roles/${editingRole.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Role updated successfully');
                setIsModalOpen(false);
                setEditingRole(null);
                form.resetFields();
                fetchRoles();
            } else {
                message.error('Failed to update role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            message.error('An error occurred');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/roles/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Role deleted successfully');
                fetchRoles();
            } else {
                message.error('Failed to delete role');
            }
        } catch (error) {
            console.error('Error deleting role:', error);
            message.error('An error occurred');
        }
    };

    const openCreateModal = () => {
        setEditingRole(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (role: Role) => {
        setEditingRole(role);
        form.setFieldsValue({
            name: role.name,
            description: role.description,
        });
        setIsModalOpen(true);
    };

    const columns: ColumnsType<Role> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text || '-',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
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
                        title="Delete role"
                        description="Are you sure you want to delete this role?"
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
                        <Title level={2}>Role Management</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                            Create Role
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={roles}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </Space>
            </Card>

            <Modal
                title={editingRole ? 'Edit Role' : 'Create New Role'}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingRole(null);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={editingRole ? handleEdit : handleCreate}
                >
                    <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {editingRole ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
