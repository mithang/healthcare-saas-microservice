'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message, Popconfirm, Checkbox, Collapse } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Panel } = Collapse;

interface Role {
    id: number;
    name: string;
    permissions?: string[];
    createdAt: string;
}

// Grouped permissions for better organization
const permissionGroups = {
    'User Management': [
        'users.view',
        'users.create',
        'users.edit',
        'users.delete',
    ],
    'Role Management': [
        'roles.view',
        'roles.create',
        'roles.edit',
        'roles.delete',
    ],
    'API Keys': [
        'apikeys.view',
        'apikeys.create',
        'apikeys.delete',
    ],
    'Files': [
        'files.view',
        'files.upload',
        'files.download',
        'files.delete',
    ],
    'Settings': [
        'settings.view',
        'settings.edit',
    ],
    'Search Data': [
        'search.view',
        'search.index',
        'search.delete',
    ],
    'Background Jobs': [
        'jobs.view',
        'jobs.create',
        'jobs.delete',
    ],
    'Audit Logs': [
        'logs.view',
        'logs.export',
    ],
    'Payments': [
        'payments.view',
        'payments.manage',
    ],
    'System': [
        'system.admin',
        'system.config',
    ],
};

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
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
                body: JSON.stringify({
                    ...values,
                    permissions: selectedPermissions,
                }),
            });

            if (response.ok) {
                message.success('Role created successfully');
                setIsModalOpen(false);
                form.resetFields();
                setSelectedPermissions([]);
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
                body: JSON.stringify({
                    ...values,
                    permissions: selectedPermissions,
                }),
            });

            if (response.ok) {
                message.success('Role updated successfully');
                setIsModalOpen(false);
                setEditingRole(null);
                form.resetFields();
                setSelectedPermissions([]);
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
        setSelectedPermissions([]);
        setIsModalOpen(true);
    };

    const openEditModal = (role: Role) => {
        setEditingRole(role);
        form.setFieldsValue({
            name: role.name,
        });
        setSelectedPermissions(role.permissions || []);
        setIsModalOpen(true);
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
        if (checked) {
            setSelectedPermissions([...selectedPermissions, permission]);
        } else {
            setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
        }
    };

    const handleGroupChange = (groupPermissions: string[], checked: boolean) => {
        if (checked) {
            const newPermissions = [...new Set([...selectedPermissions, ...groupPermissions])];
            setSelectedPermissions(newPermissions);
        } else {
            setSelectedPermissions(selectedPermissions.filter(p => !groupPermissions.includes(p)));
        }
    };

    const columns: ColumnsType<Role> = [
        {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Permissions',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions: string[]) => (
                <span>{permissions ? permissions.length : 0} permissions</span>
            ),
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
                        <Title level={2}><SafetyCertificateOutlined /> Role Management</Title>
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
                    setSelectedPermissions([]);
                }}
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={editingRole ? handleEdit : handleCreate}
                >
                    <Form.Item
                        name="name"
                        label="Role Name"
                        rules={[{ required: true, message: 'Please input role name' }]}
                    >
                        <Input placeholder="e.g. Administrator, Doctor, Nurse" />
                    </Form.Item>

                    <Form.Item label="Permissions">
                        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #d9d9d9', padding: '16px', borderRadius: '4px' }}>
                            <Collapse defaultActiveKey={['0']} ghost>
                                {Object.entries(permissionGroups).map(([groupName, permissions], index) => {
                                    const allSelected = permissions.every(p => selectedPermissions.includes(p));
                                    const someSelected = permissions.some(p => selectedPermissions.includes(p));

                                    return (
                                        <Panel
                                            key={index.toString()}
                                            header={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Checkbox
                                                        checked={allSelected}
                                                        indeterminate={someSelected && !allSelected}
                                                        onChange={(e) => handleGroupChange(permissions, e.target.checked)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <strong>{groupName}</strong>
                                                    </Checkbox>
                                                </div>
                                            }
                                        >
                                            <div style={{ paddingLeft: '24px' }}>
                                                {permissions.map((permission) => (
                                                    <div key={permission} style={{ marginBottom: '8px' }}>
                                                        <Checkbox
                                                            checked={selectedPermissions.includes(permission)}
                                                            onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                                                        >
                                                            {permission}
                                                        </Checkbox>
                                                    </div>
                                                ))}
                                            </div>
                                        </Panel>
                                    );
                                })}
                            </Collapse>
                        </div>
                        <div style={{ marginTop: '8px', color: '#666' }}>
                            Selected: {selectedPermissions.length} permissions
                        </div>
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
