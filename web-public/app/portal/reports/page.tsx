"use client";
import React, { useState } from 'react';
import { RevenueStats, TopProduct, MOCK_REVENUE_DATA, MOCK_TOP_PRODUCTS } from '@/types/report';

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState('7days');

    // Mock summary stats
    const stats: RevenueStats = {
        totalRevenue: 132000000,
        totalOrders: 387,
        averageOrderValue: 341000,
        growth: 12.5
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
                    <p className="text-gray-500 text-sm mt-1">Tổng quan hoạt động kinh doanh</p>
                </div>
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-700"
                >
                    <option value="today">Hôm nay</option>
                    <option value="7days">7 ngày qua</option>
                    <option value="30days">30 ngày qua</option>
                    <option value="month">Tháng này</option>
                    <option value="year">Năm nay</option>
                </select>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-2">Doanh thu</p>
                    <p className="text-3xl font-bold text-blue-600 mb-1">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue)}
                    </p>
                    <div className="flex items-center text-xs font-bold text-green-600">
                        <span>↗ {stats.growth}%</span>
                        <span className="text-gray-400 font-normal ml-1">vs kỳ trước</span>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-2">Tổng đơn hàng</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalOrders}</p>
                    <div className="flex items-center text-xs font-bold text-green-600">
                        <span>↗ 8.2%</span>
                        <span className="text-gray-400 font-normal ml-1">vs kỳ trước</span>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-2">Giá trị TB đơn</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.averageOrderValue)}
                    </p>
                    <div className="flex items-center text-xs font-bold text-red-600">
                        <span>↘ 1.5%</span>
                        <span className="text-gray-400 font-normal ml-1">vs kỳ trước</span>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-2">Khách hàng mới</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">124</p>
                    <div className="flex items-center text-xs font-bold text-green-600">
                        <span>↗ 15%</span>
                        <span className="text-gray-400 font-normal ml-1">vs kỳ trước</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart (Simplified Visual) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Biểu đồ doanh thu</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {MOCK_REVENUE_DATA.map((data, index) => {
                            const maxRevenue = Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue));
                            const heightPercentage = (data.revenue / maxRevenue) * 100;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center group">
                                    <div className="relative w-full flex justify-center">
                                        <div
                                            className="w-4/5 bg-blue-500 rounded-t-lg transition-all group-hover:bg-blue-600 relative"
                                            style={{ height: `${heightPercentage}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.revenue)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 font-medium">{data.date}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Sản phẩm bán chạy</h3>
                        <a href="#" className="text-sm text-blue-600 font-bold hover:underline">Xem tất cả</a>
                    </div>
                    <div className="space-y-4">
                        {MOCK_TOP_PRODUCTS.map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                            index === 1 ? 'bg-gray-100 text-gray-700' :
                                                index === 2 ? 'bg-orange-100 text-orange-700' : 'text-gray-500'
                                        }`}>
                                        {index + 1}
                                    </span>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500">{product.quantitySold} đã bán</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm text-gray-900">
                                        {new Intl.NumberFormat('vi-VN', { notation: "compact", compactDisplay: "short" }).format(product.revenue)}
                                    </p>
                                    <span className={`text-xs ${product.trend === 'up' ? 'text-green-500' :
                                            product.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                                        }`}>
                                        {product.trend === 'up' ? '↗' : product.trend === 'down' ? '↘' : '→'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activity Placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Đơn hàng #DH-2024-{100 + i} hoàn tất</p>
                                    <p className="text-xs text-gray-500">2 giờ trước</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts Placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Cảnh báo hệ thống</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                            <span className="text-red-500 mt-0.5">⚠️</span>
                            <div>
                                <p className="text-sm font-bold text-red-700">Sắp hết hàng: Panadol Extra</p>
                                <p className="text-xs text-red-600">Còn lại 15 hộp trong kho</p>
                            </div>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-xl flex items-start gap-3">
                            <span className="text-yellow-500 mt-0.5">📅</span>
                            <div>
                                <p className="text-sm font-bold text-yellow-700">Lô thuốc sắp hết hạn</p>
                                <p className="text-xs text-yellow-600">Batch #LOT123 hết hạn trong 30 ngày</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
