'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface User {
    id: number;
    userId: string;
    email: string;
    name: string | null;
    createdAt: string;
}

const columns: ColumnsType<User> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => text || '-',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => new Date(text).toLocaleString(),
    },
];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={2}>User Management</Title>
                    <Table
                        columns={columns}
                        dataSource={users}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </Space>
            </Card>
        </div>
    );
}
