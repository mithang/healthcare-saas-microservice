'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Role {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
}

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
];

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={2}>Role Management</Title>
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>Create Role</Button>
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
                title="Create New Role"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
