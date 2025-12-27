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
    QuestionCircleOutlined,
    TagOutlined,
    RocketOutlined,
    GiftOutlined,
    ReadOutlined,
    CalendarOutlined,
    FormOutlined,
    RobotOutlined,
    BellOutlined,
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
                    key: '/partners/hospitals',
                    label: <Link href="/partners/hospitals">Bệnh viện</Link>,
                },
                {
                    key: '/partners/clinics',
                    label: <Link href="/partners/clinics">Phòng khám</Link>,
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
                    key: '/partners/patients',
                    label: <Link href="/partners/patients">Bệnh nhân</Link>,
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
                    label: <Link href="/finance/revenue">Doanh thu & Giao dịch</Link>,
                },
                {
                    key: '/finance/withdrawals',
                    label: <Link href="/finance/withdrawals">Yêu cầu Rút tiền</Link>,
                },
                {
                    key: '/finance/commissions',
                    label: <Link href="/finance/commissions">Hoa hồng đối tác</Link>,
                },
                {
                    key: '/payments/gateways',
                    label: <Link href="/payments/gateways">Cổng thanh toán</Link>,
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
            key: '/security',
            icon: <SafetyCertificateOutlined />,
            label: 'An ninh & Bảo mật',
            children: [
                {
                    key: '/security/audit-logs',
                    label: <Link href="/security/audit-logs">Audit Logs</Link>,
                },
                {
                    key: '/security/backup',
                    label: <Link href="/security/backup">Sao lưu & Khôi phục</Link>,
                },
            ],
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt hệ thống',
            children: [
                {
                    key: '/settings/general',
                    label: <Link href="/settings/general">Cài đặt chung</Link>,
                },
            ],
        },
        {
            key: '/notifications',
            icon: <BellOutlined />,
            label: <Link href="/notifications">Thông báo (Push)</Link>,
        },
        {
            key: '/ai',
            icon: <RobotOutlined />,
            label: 'Hệ thống AI',
            children: [
                {
                    key: '/ai/recommendations',
                    label: <Link href="/ai/recommendations">Gợi ý thông minh</Link>,
                },
            ],
        },
        {
            key: '/events',
            icon: <CalendarOutlined />,
            label: 'Sự kiện & Khảo sát',
            children: [
                {
                    key: '/seminars',
                    label: <Link href="/seminars">Hội thảo</Link>,
                },
                {
                    key: '/surveys',
                    label: <Link href="/surveys">Khảo sát</Link>,
                },
            ],
        },
        {
            key: '/education',
            icon: <ReadOutlined />,
            label: 'Giáo dục',
            children: [
                {
                    key: '/education/courses',
                    label: <Link href="/education/courses">Khóa học CME/CPE</Link>,
                },
            ],
        },
        {
            key: '/community',
            icon: <TeamOutlined />,
            label: 'Cộng đồng',
            children: [
                {
                    key: '/community/forum',
                    label: <Link href="/community/forum">Diễn đàn</Link>,
                },
                {
                    key: '/community/qa',
                    label: <Link href="/community/qa">Hỏi đáp (Q&A)</Link>,
                },
            ],
        },
        {
            key: '/marketing',
            icon: <RocketOutlined />,
            label: 'Marketing',
            children: [
                {
                    key: '/marketing/vouchers',
                    label: <Link href="/marketing/vouchers">Voucher</Link>,
                },
                {
                    key: '/marketing/campaigns',
                    label: <Link href="/marketing/campaigns">Chiến dịch</Link>,
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
                    key: '/content/posts',
                    label: <Link href="/content/posts">Tin tức & Bài viết</Link>,
                },
                {
                    key: '/content/categories',
                    label: <Link href="/content/categories">Danh mục</Link>,
                },
                {
                    key: '/content/banners',
                    label: <Link href="/content/banners">Banner quảng cáo</Link>,
                },
                {
                    key: '/content/videos',
                    label: <Link href="/content/videos">Video Management</Link>,
                },
                {
                    key: '/content/pages',
                    label: <Link href="/content/pages">Trang tĩnh</Link>,
                },
                {
                    key: '/content/file-manager',
                    label: <Link href="/content/file-manager">Quản lý tập tin</Link>,
                },
                {
                    key: '/content/comments',
                    label: <Link href="/content/comments">Bình luận</Link>,
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
