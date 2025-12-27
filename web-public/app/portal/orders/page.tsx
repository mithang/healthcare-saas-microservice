"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function OrderHistoryPage() {
    const [orders] = useState([
        { id: 'ORD001', date: '2024-12-18', items: 3, total: 2790000, status: 'Delivered' },
        { id: 'ORD002', date: '2024-12-15', items: 1, total: 450000, status: 'Pending' },
        { id: 'ORD003', date: '2024-12-10', items: 5, total: 1250000, status: 'Cancelled' },
        { id: 'ORD004', date: '2024-12-05', items: 2, total: 890000, status: 'Delivered' },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'Delivered': return 'Đã giao';
            case 'Pending': return 'Đang xử lý';
            case 'Cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Lịch sử Đơn hàng</h1>
                <p className="text-gray-500 text-sm mt-1">Quản lý và theo dõi các đơn hàng của bạn</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Mã đơn</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày đặt</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Sản phẩm</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Tổng tiền</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{order.date}</td>
                                <td className="px-6 py-4 text-gray-700">{order.items} sản phẩm</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{order.total.toLocaleString()}đ</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/portal/orders/${order.id}`}>
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Xem chi tiết">
                                                <i className="fi flaticon-eye"></i>
                                            </button>
                                        </Link>
                                        {order.status === 'Pending' && (
                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Hủy đơn">
                                                <i className="fi flaticon-close"></i>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
