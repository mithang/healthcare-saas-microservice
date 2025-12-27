'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar, Space } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    KeyOutlined,
    FileTextOutlined,
    FileOutlined,
    CreditCardOutlined,
    SettingOutlined,
    SearchOutlined,
    ClockCircleOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        router.push('/login');
    };

    const menuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: <Link href="/">Dashboard</Link>,
        },
        {
            key: '/users',
            icon: <TeamOutlined />,
            label: <Link href="/users">Users</Link>,
        },
        {
            key: '/roles',
            icon: <SafetyCertificateOutlined />,
            label: <Link href="/roles">Roles & Permissions</Link>,
        },
        {
            key: '/apikeys',
            icon: <KeyOutlined />,
            label: <Link href="/apikeys">API Keys</Link>,
        },
        {
            key: '/files',
            icon: <FileOutlined />,
            label: <Link href="/files">Files</Link>,
        },
        {
            key: '/logs',
            icon: <FileTextOutlined />,
            label: <Link href="/logs">System Logs</Link>,
        },
        {
            key: '/subscriptions',
            icon: <CreditCardOutlined />,
            label: <Link href="/subscriptions">Subscription</Link>,
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: <Link href="/settings">Settings</Link>,
        },
        {
            key: '/search',
            icon: <SearchOutlined />,
            label: <Link href="/search">Search Data</Link>,
        },
        {
            key: '/jobs',
            icon: <ClockCircleOutlined />,
            label: <Link href="/jobs">Background Jobs</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Dropdown menu={{ items: [{ key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout }] }}>
                        <Space style={{ cursor: 'pointer' }}>
                            <Avatar icon={<UserOutlined />} />
                            <span>Admin User</span>
                        </Space>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
