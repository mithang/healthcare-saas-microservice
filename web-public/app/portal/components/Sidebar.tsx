'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    // Group 1: Tổng quan (All Roles)
    { icon: 'flaticon-web', label: 'Bảng điều khiển', route: '/portal', group: 'Tổng quan' },
    { icon: 'flaticon-stat', label: 'Báo cáo & Thống kê', route: '/portal/reports', group: 'Tổng quan' },

    // Group 2: Khám chữa bệnh (Doctors & Clinics)
    { icon: 'flaticon-calendar', label: 'Lịch hẹn khám', route: '/portal/appointments', group: 'Khám chữa bệnh' },
    { icon: 'flaticon-checklist', label: 'Danh sách khám', route: '/portal/queues', group: 'Khám chữa bệnh' },
    { icon: 'flaticon-stethoscope', label: 'Khám bệnh & Kê đơn', route: '/portal/consultation', group: 'Khám chữa bệnh' },
    { icon: 'flaticon-write', label: 'Hồ sơ bệnh án (EMR)', route: '/portal/emr', group: 'Khám chữa bệnh' },
    { icon: 'flaticon-loupe', label: 'Chỉ định Cận lâm sàng', route: '/portal/lab-orders', group: 'Khám chữa bệnh' },

    // Group 3: Quản lý Nhà thuốc (Pharmacists)
    { icon: 'flaticon-pharmacy', label: 'Kho thuốc', route: '/portal/inventory', group: 'Quản lý Nhà thuốc' },
    { icon: 'flaticon-checklist', label: 'Duyệt đơn thuốc', route: '/portal/prescriptions', group: 'Quản lý Nhà thuốc' },
    { icon: 'flaticon-clock', label: 'Lịch trực dược sĩ', route: '/portal/schedule', group: 'Quản lý Nhà thuốc' },

    // Group 4: Vận hành Cơ sở (Hospitals & Clinics)
    { icon: 'flaticon-health-clinic', label: 'Quản lý Giường bệnh', route: '/portal/beds', group: 'Vận hành Cơ sở' },
    { icon: 'flaticon-doctor', label: 'Quản lý Nhân sự', route: '/portal/staff', group: 'Vận hành Cơ sở' },
    { icon: 'flaticon-injection', label: 'Vật tư & Thiết bị', route: '/portal/equipment', group: 'Vận hành Cơ sở' },
    { icon: 'flaticon-menu', label: 'Quản lý Khoa/Phòng', route: '/portal/departments', group: 'Vận hành Cơ sở' },
    { icon: 'flaticon-award', label: 'Dịch vụ & Bảng giá', route: '/portal/services', group: 'Vận hành Cơ sở' },

    // Group 5: Chăm sóc Khách hàng (All Roles)
    { icon: 'flaticon-chat', label: 'Tư vấn trực tuyến', route: '/portal/chat', group: 'Chăm sóc Khách hàng' },
    { icon: 'flaticon-like', label: 'Đánh giá & Nhận xét', route: '/portal/reviews', group: 'Chăm sóc Khách hàng' },
    { icon: 'flaticon-award-1', label: 'Khách hàng thân thiết', route: '/portal/loyalty', group: 'Chăm sóc Khách hàng' },
    { icon: 'flaticon-mother-with-baby-in-arms', label: 'Dữ liệu Bệnh nhân', route: '/portal/patients', group: 'Chăm sóc Khách hàng' },

    // Group 6: Phát triển Chuyên môn (Professionals)
    { icon: 'flaticon-award', label: 'Đào tạo CME/CPE', route: '/portal/learning', group: 'Phát triển Chuyên môn' },
    { icon: 'flaticon-doctor', label: 'Hồ sơ chuyên môn', route: '/portal/professional', group: 'Phát triển Chuyên môn' },
    { icon: 'flaticon-award-2', label: 'Chứng chỉ hành nghề', route: '/portal/certifications', group: 'Phát triển Chuyên môn' },
    { icon: 'flaticon-checklist', label: 'Việc làm & Tuyển dụng', route: '/portal/jobs', group: 'Phát triển Chuyên môn' },

    // Group 7: Cá nhân
    { icon: 'flaticon-notification', label: 'Thông báo', route: '/portal/notifications', group: 'Cá nhân' },
    { icon: 'flaticon-security', label: 'Cài đặt hệ thống', route: '/portal/settings', group: 'Cá nhân' },
];

export default function Sidebar() {
    const pathname = usePathname();
    let lastGroup = '';

    return (
        <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-screen fixed top-0 left-0 z-40">
            <div className="p-6 flex items-center justify-center border-b border-gray-100 h-[70px]">
                <Link href="/portal" className="text-2xl font-bold text-green-600 flex items-center gap-2">
                    <i className="fi flaticon-medical-symbol"></i>
                    <span>MediPortal</span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.route;
                    const showHeader = item.group !== lastGroup;
                    if (showHeader) lastGroup = item.group;

                    return (
                        <React.Fragment key={item.route}>
                            {showHeader && item.group !== 'Chung' && (
                                <div className="px-4 mt-6 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    {item.group}
                                </div>
                            )}
                            <Link
                                href={item.route}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                                    ? 'bg-green-50 text-green-700 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <i className={`fi ${item.icon} mr-3 text-lg ${isActive ? 'text-green-600' : 'text-gray-400'}`}></i>
                                {item.label}
                            </Link>
                        </React.Fragment>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <Link
                    href="/login"
                    className="flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all"
                >
                    <i className="fi flaticon-logout mr-3 text-lg"></i>
                    Đăng xuất
                </Link>
            </div>
        </aside>
    );
}
