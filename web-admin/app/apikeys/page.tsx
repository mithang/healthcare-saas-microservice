'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface ApiKey {
    id: number;
    name: string;
    key: string;
    isActive: boolean;
    createdAt: string;
}

const columns: ColumnsType<ApiKey> = [
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
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
        render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
    },
    {
        title: 'Status',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (active) => (
            <Tag color={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</Tag>
        ),
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => new Date(text).toLocaleString(),
    },
];

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // TODO: Get real userId from auth context
    const demoUserId = '5e8a9122-3f22-4c82-9a93-0161ec0094ff';

    const fetchApiKeys = () => {
        setLoading(true);
        fetch(`http://localhost:3000/apikeys?userId=${demoUserId}`)
            .then((res) => res.json())
            .then((data) => {
                setApiKeys(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch api keys:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3000/apikeys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, userId: demoUserId }),
            });

            if (response.ok) {
                message.success('API Key created successfully');
                setIsModalOpen(false);
                form.resetFields();
                fetchApiKeys();
            } else {
                message.error('Failed to create API Key');
            }
        } catch (error) {
            console.error('Error creating API Key:', error);
            message.error('An error occurred');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={2}>API Keys</Title>
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>Generate New Key</Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={apiKeys}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </Space>
            </Card>

            <Modal
                title="Generate New API Key"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item name="name" label="Key Name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. My Website Integration" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Generate
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
