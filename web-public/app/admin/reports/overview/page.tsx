"use client";

import React from 'react';
import StatsCard from '@/components/admin/StatsCard';

export default function OverviewReports() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Báo cáo Tổng quan</h1>
                <p className="text-gray-500 mt-1">Thống kê tổng quan hệ thống</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Tổng doanh thu"
                    value="125.5M"
                    icon="flaticon-money"
                    color="green"
                    trend={{ value: "+12.5%", isPositive: true }}
                />
                <StatsCard
                    title="Đơn hàng"
                    value="3,245"
                    icon="flaticon-shopping-cart"
                    color="blue"
                    trend={{ value: "+8.2%", isPositive: true }}
                />
                <StatsCard
                    title="Người dùng"
                    value="12,580"
                    icon="flaticon-user"
                    color="purple"
                    trend={{ value: "+15.3%", isPositive: true }}
                />
                <StatsCard
                    title="Đối tác"
                    value="156"
                    icon="flaticon-hospital"
                    color="orange"
                    trend={{ value: "+3.1%", isPositive: true }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Doanh thu theo tháng</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        [Biểu đồ doanh thu]
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Đơn hàng theo dịch vụ</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        [Biểu đồ phân bổ]
                    </div>
                </div>
            </div>
        </div>
    );
}
