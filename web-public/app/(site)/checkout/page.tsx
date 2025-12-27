"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('vnpay');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCheckout = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Họ và tên *" className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary" />
                                <input type="text" placeholder="Số điện thoại *" className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary" />
                                <input type="email" placeholder="Email" className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary md:col-span-2" />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Địa chỉ nhận hàng</h3>
                            <div className="space-y-4">
                                <input type="text" placeholder="Địa chỉ cụ thể *" className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary" />
                                <div className="grid grid-cols-3 gap-4">
                                    <select className="border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>Hà Nội</option>
                                    </select>
                                    <select className="border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                        <option>Quận/Huyện</option>
                                    </select>
                                    <select className="border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                        <option>Phường/Xã</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Phương thức thanh toán</h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'vnpay', name: 'VNPay', icon: '💳' },
                                    { id: 'momo', name: 'Ví MoMo', icon: '📱' },
                                    { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: '💵' }
                                ].map(method => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5"
                                        />
                                        <span className="text-2xl">{method.icon}</span>
                                        <span className="font-bold text-gray-900">{method.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Đơn hàng</h3>
                            <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Gói khám tổng quát</span>
                                    <span className="font-bold">1.500.000đ</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Paracetamol x2</span>
                                    <span className="font-bold">90.000đ</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Xét nghiệm tổng quát</span>
                                    <span className="font-bold">1.200.000đ</span>
                                </div>
                            </div>
                            <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    <span className="font-bold">2.790.000đ</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-bold text-green-600">Miễn phí</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                                <span>Tổng cộng</span>
                                <span className="text-primary">2.790.000đ</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all"
                            >
                                Xác nhận thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl p-8 max-w-md text-center animate-scale-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi flaticon-check text-4xl text-green-600"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h3>
                        <p className="text-gray-500 mb-6">Chúng tôi sẽ liên hệ xác nhận trong vòng 15 phút.</p>
                        <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-colors">
                            Xem đơn hàng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
