"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailPage() {
    const params = useParams<{ id: string }>();
    const [order] = useState({
        id: params.id,
        date: '2024-12-18 14:30',
        status: 'Pending',
        items: [
            { name: 'Paracetamol 500mg (Hộp 100 viên)', quantity: 2, price: 45000 },
            { name: 'Vitamin C 1000mg', quantity: 1, price: 120000 },
        ],
        subtotal: 210000,
        shipping: 30000,
        total: 240000,
        address: {
            name: 'Nguyen Van A',
            phone: '0909123456',
            address: '123 Nguyen Trai, P.Ben Thanh, Q.1, TP.HCM'
        },
        payment: 'VNPay',
        timeline: [
            { time: '2024-12-18 14:30', event: 'Đơn hàng đã được tạo', status: 'done' },
            { time: '2024-12-18 15:00', event: 'Đã xác nhận đơn hàng', status: 'done' },
            { time: '', event: 'Đang chuẩn bị hàng', status: 'current' },
            { time: '', event: 'Đang giao hàng', status: 'pending' },
            { time: '', event: 'Đã giao hàng', status: 'pending' },
        ]
    });

    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleCancel = () => {
        setShowCancelModal(false);
        alert('Đơn hàng đã được hủy');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Chi tiết Đơn hàng #{order.id}</h1>
                    <p className="text-gray-500 text-sm mt-1">Đặt ngày {order.date}</p>
                </div>
                <Link href="/portal/orders" className="text-primary font-bold hover:underline">
                    ← Quay lại
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Sản phẩm</h3>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()}đ</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Tạm tính</span>
                                <span className="font-bold">{order.subtotal.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Phí vận chuyển</span>
                                <span className="font-bold">{order.shipping.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                <span>Tổng cộng</span>
                                <span className="text-primary">{order.total.toLocaleString()}đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Tiến trình đơn hàng</h3>
                        <div className="space-y-4">
                            {order.timeline.map((step, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status === 'done' ? 'bg-green-500 text-white' :
                                                step.status === 'current' ? 'bg-blue-500 text-white' :
                                                    'bg-gray-200 text-gray-400'
                                            }`}>
                                            {step.status === 'done' ? '✓' : idx + 1}
                                        </div>
                                        {idx < order.timeline.length - 1 && (
                                            <div className={`w-0.5 h-12 ${step.status === 'done' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                        )}
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <p className={`font-medium ${step.status === 'current' ? 'text-blue-600' : 'text-gray-900'}`}>
                                            {step.event}
                                        </p>
                                        {step.time && <p className="text-xs text-gray-500 mt-1">{step.time}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Địa chỉ nhận hàng</h3>
                        <div className="space-y-2 text-sm">
                            <p className="font-bold text-gray-900">{order.address.name}</p>
                            <p className="text-gray-600">{order.address.phone}</p>
                            <p className="text-gray-600">{order.address.address}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Thanh toán</h3>
                        <p className="text-sm text-gray-600">{order.payment}</p>
                    </div>

                    {order.status === 'Pending' && (
                        <button
                            onClick={() => setShowCancelModal(true)}
                            className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition"
                        >
                            Hủy đơn hàng
                        </button>
                    )}
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận hủy đơn</h3>
                        <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn hủy đơn hàng #{order.id}?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600"
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
