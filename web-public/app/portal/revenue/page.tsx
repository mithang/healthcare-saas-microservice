"use client";
import React from 'react';

export default function RevenuePortalPage() {
    const stats = [
        { label: 'Doanh thu tháng này', value: '45,000,000 ₫', change: '+12%', icon: 'flaticon-money', color: 'bg-green-500' },
        { label: 'Số lượt khám', value: '156', change: '+8%', icon: 'flaticon-user', color: 'bg-blue-500' },
        { label: 'Thu nhập trung bình', value: '288,462 ₫', change: '+5%', icon: 'flaticon-chart', color: 'bg-purple-500' },
        { label: 'Chờ thanh toán', value: '2,500,000 ₫', change: '-', icon: 'flaticon-pending', color: 'bg-orange-500' },
    ];

    const transactions = [
        { date: '20/12/2024', patient: 'Nguyễn Văn A', service: 'Khám bệnh', amount: 300000, status: 'paid' },
        { date: '19/12/2024', patient: 'Trần Thị B', service: 'Tái khám', amount: 200000, status: 'paid' },
        { date: '18/12/2024', patient: 'Lê Văn C', service: 'Video call', amount: 250000, status: 'pending' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Doanh thu & Thống kê</h1>
                    <p className="text-gray-500 text-sm mt-1">Theo dõi thu nhập và phân tích</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">
                        Xuất báo cáo
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                        Tạo hóa đơn
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Doanh thu 12 tháng</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                    {[35, 42, 38, 45, 50, 48, 52, 55, 58, 54, 60, 45].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition cursor-pointer" style={{ height: `${height}%` }}></div>
                            <span className="text-xs text-gray-500 mt-2">T{i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Giao dịch gần đây</h3>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Bệnh nhân</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Dịch vụ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Số tiền</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions.map((tx, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-600">{tx.date}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{tx.patient}</td>
                                <td className="px-6 py-4 text-gray-600">{tx.service}</td>
                                <td className="px-6 py-4 font-bold text-green-600">{tx.amount.toLocaleString()} ₫</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {tx.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
