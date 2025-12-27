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
    BarChartOutlined,
    DollarOutlined,
    ShoppingCartOutlined,
    TrophyOutlined,
    CommentOutlined,
    VideoCameraOutlined,
    CustomerServiceOutlined,
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
            key: '/identity',
            icon: <UserOutlined />,
            label: 'Danh tính',
            children: [
                {
                    key: '/users',
                    label: <Link href="/users">Người dùng</Link>,
                },
                {
                    key: '/roles',
                    label: <Link href="/roles">Vai trò & Quyền</Link>,
                },
            ],
        },
        {
            key: '/partners',
            icon: <TeamOutlined />,
            label: 'Đối tác',
            children: [
                {
                    key: '/partners/doctors',
                    label: <Link href="/partners/doctors">Bác sĩ</Link>,
                },
                {
                    key: '/partners/pharmacies',
                    label: <Link href="/partners/pharmacies">Nhà thuốc</Link>,
                },
                {
                    key: '/partners/pharmacists',
                    label: <Link href="/partners/pharmacists">Dược sĩ</Link>,
                },
                {
                    key: '/partners/verification',
                    label: <Link href="/partners/verification">Xác minh</Link>,
                },
            ],
        },
        {
            key: '/analytics',
            icon: <BarChartOutlined />,
            label: 'Phân tích',
            children: [
                {
                    key: '/analytics/search',
                    label: <Link href="/analytics/search">Tìm kiếm</Link>,
                },
            ],
        },
        {
            key: '/reports',
            icon: <FileTextOutlined />,
            label: 'Báo cáo',
            children: [
                {
                    key: '/reports/overview',
                    label: <Link href="/reports/overview">Tổng quan</Link>,
                },
            ],
        },
        {
            key: '/finance',
            icon: <DollarOutlined />,
            label: 'Tài chính',
            children: [
                {
                    key: '/finance/revenue',
                    label: <Link href="/finance/revenue">Doanh thu</Link>,
                },
                {
                    key: '/finance/withdrawals',
                    label: <Link href="/finance/withdrawals">Rút tiền</Link>,
                },
            ],
        },
        {
            key: '/orders',
            icon: <ShoppingCartOutlined />,
            label: 'Đơn hàng',
            children: [
                {
                    key: '/orders/pharmacy',
                    label: <Link href="/orders/pharmacy">Đơn thuốc</Link>,
                },
                {
                    key: '/orders/appointments',
                    label: <Link href="/orders/appointments">Lịch khám</Link>,
                },
            ],
        },
        {
            key: '/live',
            icon: <VideoCameraOutlined />,
            label: <Link href="/live">Livestream</Link>,
        },
        {
            key: '/support',
            icon: <CustomerServiceOutlined />,
            label: 'Hỗ trợ',
            children: [
                {
                    key: '/support/chat',
                    label: <Link href="/support/chat">Chat trực tiếp</Link>,
                },
            ],
        },
        {
            key: '/content',
            icon: <FileTextOutlined />,
            label: 'Nội dung',
            children: [
                {
                    key: '/content/news',
                    label: <Link href="/content/news">Tin tức</Link>,
                },
            ],
        },
        {
            key: '/engagement',
            icon: <CommentOutlined />,
            label: 'Tương tác',
            children: [
                {
                    key: '/engagement/comments',
                    label: <Link href="/engagement/comments">Bình luận</Link>,
                },
            ],
        },
        {
            key: '/gamification',
            icon: <TrophyOutlined />,
            label: <Link href="/gamification">Gamification</Link>,
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
