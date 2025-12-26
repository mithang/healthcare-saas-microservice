'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Tag, DatePicker, Button, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Log {
    id: number;
    level: string;
    message: string;
    category: string;
    timestamp: string;
}

const columns: ColumnsType<Log> = [
    {
        title: 'Time',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text) => new Date(text).toLocaleString(),
        width: 200,
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        render: (level) => {
            let color = 'blue';
            if (level === 'ERROR') color = 'red';
            if (level === 'WARN') color = 'orange';
            if (level === 'INFO') color = 'green';
            return <Tag color={color}>{level}</Tag>;
        },
        width: 100,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        width: 150,
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
    },
];

export default function LogsPage() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterForm] = Form.useForm();

    const fetchLogs = (filters: any = {}) => {
        setLoading(true);
        // Convert filters to query string
        const query = new URLSearchParams(filters).toString();
        fetch(`http://localhost:3000/logs?${query}`)
            .then((res) => res.json())
            .then((data) => {
                setLogs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch logs:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleFilter = (values: any) => {
        const filters: any = {};
        if (values.level) filters.level = values.level;
        if (values.category) filters.category = values.category;
        // Date range handling could be added here
        fetchLogs(filters);
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={2}>System Logs</Title>

                    <Form form={filterForm} layout="inline" onFinish={handleFilter} style={{ marginBottom: 16 }}>
                        <Form.Item name="level">
                            <Select placeholder="Select Level" style={{ width: 120 }} allowClear>
                                <Select.Option value="INFO">INFO</Select.Option>
                                <Select.Option value="WARN">WARN</Select.Option>
                                <Select.Option value="ERROR">ERROR</Select.Option>
                                <Select.Option value="DEBUG">DEBUG</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="category">
                            <Input placeholder="Category" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Filter</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => { filterForm.resetFields(); fetchLogs(); }}>Reset</Button>
                        </Form.Item>
                    </Form>

                    <Table
                        columns={columns}
                        dataSource={logs}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 20 }}
                        scroll={{ y: 600 }}
                    />
                </Space>
            </Card>
        </div>
    );
}
