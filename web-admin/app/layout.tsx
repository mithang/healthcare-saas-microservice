'use client';
import './globals.css';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const menuItems = [
    {
        group: 'Tổng quan',
        icon: 'flaticon-dashboard',
        items: [
            { label: 'Dashboard', href: '/admin', icon: 'flaticon-chart' }
        ]
    },
    {
        group: 'Quản lý Nội dung',
        icon: 'flaticon-document',
        items: [
            { label: 'Bài viết', href: '/admin/content/posts', icon: 'flaticon-newspaper' },
            { label: 'Chuyên mục', href: '/admin/content/categories', icon: 'flaticon-list' },
            { label: 'Trang tĩnh', href: '/admin/content/pages', icon: 'flaticon-page' },
            { label: 'Banner', href: '/admin/content/banners', icon: 'flaticon-image' },
            { label: 'Video', href: '/admin/content/videos', icon: 'flaticon-video' },
            { label: 'Tìm kiếm nhiều nhất', href: '/admin/content/top-searches', icon: 'flaticon-search' },
        ]
    },
    {
        group: 'Quản lý Người dùng',
        icon: 'flaticon-user',
        items: [
            { label: 'Quản trị viên', href: '/admin/users/admins', icon: 'flaticon-admin' },
            { label: 'Phân quyền', href: '/admin/users/roles', icon: 'flaticon-shield' },
        ]
    },
    {
        group: 'Quản lý Đối tác',
        icon: 'flaticon-hospital',
        items: [
            { label: 'Bệnh nhân', href: '/admin/partners/patients', icon: 'flaticon-patient' },
            { label: 'Bác sĩ', href: '/admin/partners/doctors', icon: 'flaticon-doctor' },
            { label: 'Bệnh viện', href: '/admin/partners/hospitals', icon: 'flaticon-building' },
            { label: 'Phòng khám', href: '/admin/partners/clinics', icon: 'flaticon-clinic' },
            { label: 'Nhà thuốc', href: '/admin/partners/pharmacies', icon: 'flaticon-pharmacy' },
            { label: 'Duyệt hồ sơ', href: '/admin/verify', icon: 'flaticon-checked' },
            { label: 'Chờ duyệt', href: '/admin/partners/pending', icon: 'flaticon-hourglass' },
        ]
    },
    {
        group: 'Đào tạo & CME',
        icon: 'flaticon-diploma',
        items: [
            { label: 'Khóa học CME/CPE', href: '/admin/education/courses', icon: 'flaticon-book' },
            { label: 'Quản lý học viên', href: '/admin/education/enrollments', icon: 'flaticon-student' },
            { label: 'Import Học viên', href: '/admin/education/import', icon: 'flaticon-upload' },
            { label: 'Giảng viên', href: '/admin/education/lecturers', icon: 'flaticon-user-1' },
            { label: 'Phân tích & Thống kê', href: '/admin/education/analytics', icon: 'flaticon-stats' },
            { label: 'Trắc nghiệm', href: '/admin/education/quizzes', icon: 'flaticon-list' },
            { label: 'Kết quả Trắc nghiệm', href: '/admin/education/quizzes/results', icon: 'flaticon-checked' },
            { label: 'Khảo sát', href: '/admin/surveys', icon: 'flaticon-edit' },
        ]
    },
    {
        group: 'Báo cáo & Phân tích',
        icon: 'flaticon-stats',
        items: [
            { label: 'Phân tích Người dùng', href: '/admin/reports/users', icon: 'flaticon-user-1' },
            { label: 'Tiến độ Học tập', href: '/admin/reports/progress', icon: 'flaticon-book' },
            { label: 'KPI Khóa học', href: '/admin/reports/kpi', icon: 'flaticon-diploma' },
            { label: 'Xuất Báo cáo', href: '/admin/reports/export', icon: 'flaticon-download' },
        ]
    },
    {
        group: 'Push Notification',
        icon: 'flaticon-bell',
        items: [
            { label: 'Quản lý Notification', href: '/admin/notifications', icon: 'flaticon-notification' },
            { label: 'Gửi Notification', href: '/admin/notifications/send', icon: 'flaticon-send' },
            { label: 'Lịch sử', href: '/admin/notifications/history', icon: 'flaticon-history' },
        ]
    },
    {
        group: 'Hội thảo Offline',
        icon: 'flaticon-presentation',
        items: [
            { label: 'Quản lý Hội thảo', href: '/admin/seminars', icon: 'flaticon-event' },
            { label: 'Banner', href: '/admin/seminars/banners', icon: 'flaticon-image' },
            { label: 'Diễn giả', href: '/admin/seminars/speakers', icon: 'flaticon-user' },
            { label: 'Phiên hội thảo', href: '/admin/seminars/sessions', icon: 'flaticon-calendar' },
            { label: 'Check-in', href: '/admin/seminars/checkin', icon: 'flaticon-checked' },
            { label: 'Mời tham dự', href: '/admin/seminars/invitations', icon: 'flaticon-send' },
        ]
    },
    {
        group: 'Truyền thông & Sự kiện',
        icon: 'flaticon-video-camera',
        items: [
            { label: 'Livestream', href: '/admin/live', icon: 'flaticon-play-button' },
            { label: 'Quản lý Bình luận', href: '/admin/engagement/comments', icon: 'flaticon-comment' },
        ]
    },
    {
        group: 'Quản lý Đơn hàng',
        icon: 'flaticon-shopping-cart',
        items: [
            { label: 'Đặt khám', href: '/admin/orders/appointments', icon: 'flaticon-calendar' },
            { label: 'Mua thuốc', href: '/admin/orders/pharmacy', icon: 'flaticon-pill' },
            { label: 'Xét nghiệm', href: '/admin/orders/lab-tests', icon: 'flaticon-flask' },
            { label: 'Hoàn tiền', href: '/admin/orders/refunds', icon: 'flaticon-refund' },
        ]
    },
    {
        group: 'Tài chính',
        icon: 'flaticon-money',
        items: [
            { label: 'Doanh thu', href: '/admin/finance/revenue', icon: 'flaticon-chart-line' },
            { label: 'Hoa hồng', href: '/admin/finance/commissions', icon: 'flaticon-percentage' },
            { label: 'Rút tiền', href: '/admin/finance/withdrawals', icon: 'flaticon-withdraw' },
            { label: 'Báo cáo', href: '/admin/finance/reports', icon: 'flaticon-report' },
        ]
    },
    {
        group: 'Marketing',
        icon: 'flaticon-megaphone',
        items: [
            { label: 'Khuyến mãi', href: '/admin/marketing/promotions', icon: 'flaticon-discount' },
            { label: 'Voucher', href: '/admin/marketing/vouchers', icon: 'flaticon-ticket' },
            { label: 'Email', href: '/admin/marketing/emails', icon: 'flaticon-email' },
            { label: 'Push Notification', href: '/admin/marketing/push-notifications', icon: 'flaticon-bell' },
        ]
    },
    {
        group: 'Cộng đồng',
        icon: 'flaticon-community',
        items: [
            { label: 'Diễn đàn', href: '/admin/community/forum', icon: 'flaticon-forum' },
            { label: 'Hỏi đáp', href: '/admin/community/qa', icon: 'flaticon-question' },
            { label: 'Nhóm hỗ trợ', href: '/admin/community/support-groups', icon: 'flaticon-group' },
            { label: 'Kiểm duyệt', href: '/admin/community/moderation', icon: 'flaticon-moderation' },
        ]
    },
    {
        group: 'Báo cáo',
        icon: 'flaticon-bar-chart',
        items: [
            { label: 'Tổng quan', href: '/admin/reports/overview', icon: 'flaticon-dashboard' },
            { label: 'Người dùng', href: '/admin/reports/users', icon: 'flaticon-users' },
            { label: 'Doanh thu', href: '/admin/reports/revenue', icon: 'flaticon-money' },
            { label: 'Xuất dữ liệu', href: '/admin/reports/export', icon: 'flaticon-download' },
        ]
    },
    {
        group: 'Cài đặt',
        icon: 'flaticon-settings',
        items: [
            { label: 'Cài đặt chung', href: '/admin/settings/general', icon: 'flaticon-gear' },
            { label: 'Email/SMS', href: '/admin/settings/notifications', icon: 'flaticon-notification' },
            { label: 'Thanh toán', href: '/admin/settings/payment', icon: 'flaticon-credit-card' },
            { label: 'SEO', href: '/admin/settings/seo', icon: 'flaticon-seo' },
            { label: 'Backup', href: '/admin/settings/backup', icon: 'flaticon-backup' },
        ]
    },
];

function MenuGroup({ group, icon, items, pathname }: any) {
    const isActive = items.some((item: any) => pathname === item.href || pathname.startsWith(item.href + '/'));
    const [isOpen, setIsOpen] = useState(isActive);

    React.useEffect(() => {
        if (isActive) setIsOpen(true);
    }, [isActive]);

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2 transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-sm">{icon === 'flaticon-dashboard' ? '📊' :
                        icon === 'flaticon-document' ? '📄' :
                            icon === 'flaticon-user' ? '👥' :
                                icon === 'flaticon-hospital' ? '🏥' :
                                    icon === 'flaticon-shopping-cart' ? '🛒' :
                                        icon === 'flaticon-money' ? '💰' :
                                            icon === 'flaticon-megaphone' ? '📢' :
                                                icon === 'flaticon-community' ? '👨‍👩‍👧‍👦' :
                                                    icon === 'flaticon-bar-chart' ? '📈' :
                                                        icon === 'flaticon-settings' ? '⚙️' : '📌'}</span>
                    <span className="font-bold text-xs uppercase tracking-wider">{group}</span>
                </div>
                <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="mt-1 space-y-1">
                    {items.map((item: any, idx: number) => {
                        const isItemActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                className={`flex items-center px-4 py-2.5 ml-4 rounded-lg transition-all ${isItemActive
                                    ? 'bg-primary text-white font-bold'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    // Default values if user data is not available
    const userName = user?.name || 'Admin User';
    const userRole = (user as any)?.role === 'super_admin' || user?.roleId === 1 ? 'Super Admin' : (typeof (user as any)?.role === 'object' ? ((user as any)?.role as any)?.name : (user as any)?.role) || 'Admin';

    // If it's an auth page, render without the admin layout (sidebar/header)
    if (pathname?.startsWith('/auth')) {
        return (
            <ProtectedRoute redirectTo="/auth/login">
                {children}
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute redirectTo="/auth/login">
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <aside className="w-72 bg-gray-900 text-white flex-shrink-0 overflow-y-auto">
                    <div className="p-6 border-b border-gray-800">
                        <h1 className="text-2xl font-bold">CMS Admin</h1>
                        <p className="text-gray-400 text-sm mt-1">Healthcare Platform</p>
                    </div>

                    <nav className="p-4">
                        {menuItems.map((menu, idx) => (
                            <MenuGroup key={idx} {...menu} pathname={pathname} />
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Bar */}
                    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
                        <div className="flex items-center gap-4">
                            <button className="relative">
                                <i className="fi flaticon-bell text-xl text-gray-600"></i>
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                    {userName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{userName}</p>
                                    <p className="text-xs text-gray-500">{userRole}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body className={inter.className}>
                <AuthProvider>
                    <AdminLayoutContent>{children}</AdminLayoutContent>
                </AuthProvider>
            </body>
        </html>
    );
}
