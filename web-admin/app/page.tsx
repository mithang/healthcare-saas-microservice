'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Space, List, Tag } from 'antd';
import { UserOutlined, SafetyCertificateOutlined, EuroCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    roles: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          fetch('http://localhost:3000/users'),
          fetch('http://localhost:3000/roles')
        ]);

        const users = await usersRes.json();
        const roles = await rolesRes.json();

        setStats({
          users: Array.isArray(users) ? users.length : 0,
          roles: Array.isArray(roles) ? roles.length : 0,
        });
      } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '0px' }}>
      <Title level={2}>Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Users"
              value={loading ? '...' : stats.users}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Link href="/users">View all users</Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Active Roles"
              value={loading ? '...' : stats.roles}
              prefix={<SafetyCertificateOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
            <Link href="/roles">Manage roles</Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="System Status"
              value="Healthy"
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#096dd9' }}
            />
            <Link href="/logs">Check logs</Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Revenue"
              value={199.99}
              prefix={<EuroCircleOutlined />}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              suffix="USD"
            />
            <Link href="/subscriptions">View details</Link>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Quick Actions">
            <Space size="large">
              <Link href="/users"><Tag color="blue">Primary</Tag> Add User</Link>
              <Link href="/apikeys"><Tag color="green">Action</Tag> Generate API Key</Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
