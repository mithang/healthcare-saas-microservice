"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function PharmacyOrderDetail() {
    const params = useParams<{ id: string }>();
    const order = {
        id: params.id,
        orderCode: 'PH10025',
        customerName: 'Nguyễn Văn A',
        customerPhone: '0901234567',
        pharmacy: 'Nhà thuốc ABC',
        items: [
            { name: 'Paracetamol 500mg', quantity: 2, price: '50.000đ', total: '100.000đ' },
            { name: 'Vitamin C 1000mg', quantity: 1, price: '150.000đ', total: '150.000đ' },
        ],
        subtotal: '250.000đ',
        shippingFee: '30.000đ',
        total: '280.000đ',
        orderDate: '19/12/2024 10:30',
        deliveryAddress: '123 Đường ABC, Quận 1, TP.HCM',
        status: 'processing',
        notes: 'Giao hàng giờ hành chính',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Đơn mua thuốc #{order.orderCode}</h1>
                <p className="text-gray-500 mt-1">Ngày đặt: {order.orderDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Tổng tiền</p>
                    <h3 className="text-3xl font-bold text-green-600">{order.total}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Số mặt hàng</p>
                    <h3 className="text-3xl font-bold text-gray-900">{order.items.length}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={order.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin khách hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Tên khách hàng</p><p className="font-medium text-gray-900">{order.customerName}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Số điện thoại</p><p className="font-medium text-gray-900">{order.customerPhone}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Địa chỉ giao hàng</p><p className="font-medium text-gray-900">{order.deliveryAddress}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Ghi chú</p><p className="font-medium text-gray-900">{order.notes}</p></div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Chi tiết đơn hàng</h2>
                <div className="space-y-3">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Số lượng: {item.quantity} x {item.price}</p>
                            </div>
                            <p className="font-bold text-gray-900">{item.total}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">Tạm tính</span><span className="font-medium">{order.subtotal}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Phí vận chuyển</span><span className="font-medium">{order.shippingFee}</span></div>
                    <div className="flex justify-between text-lg"><span className="font-bold text-gray-900">Tổng cộng</span><span className="font-bold text-green-600">{order.total}</span></div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl">Xác nhận đơn</button>
                <button className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">In đơn hàng</button>
                <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Hủy đơn</button>
            </div>
        </div>
    );
}
