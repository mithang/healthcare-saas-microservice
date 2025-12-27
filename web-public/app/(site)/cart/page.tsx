"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

const MOCK_CART = [
    { id: 1, type: 'package', name: 'Gói khám sức khỏe tổng quát Cơ bản', price: 1500000, quantity: 1, image: '/img/packages/general-basic.jpg' },
    { id: 2, type: 'medicine', name: 'Paracetamol 500mg (Hộp 100 viên)', price: 45000, quantity: 2, image: '/img/medicine-1.jpg' },
    { id: 3, type: 'labtest', name: 'Xét nghiệm Tổng quát', price: 1200000, quantity: 1, image: '/img/lab-test.jpg' },
];

export default function CartPage() {
    const [items, setItems] = useState(MOCK_CART);

    const updateQuantity = (id: number, delta: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 500000 ? 0 : 30000;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

                {items.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi flaticon-shopping-cart text-4xl text-gray-300"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h3>
                        <p className="text-gray-500 mb-6">Hãy thêm sản phẩm/dịch vụ vào giỏ hàng để tiếp tục.</p>
                        <Link href="/packages" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-colors">
                            Khám phá gói khám
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                                        onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">
                                                    {item.type === 'package' ? 'Gói khám' : item.type === 'medicine' ? 'Thuốc' : 'Xét nghiệm'}
                                                </span>
                                                <h3 className="font-bold text-gray-900 mt-2">{item.name}</h3>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <i className="fi flaticon-delete"></i>
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-gray-600"
                                                >
                                                    -
                                                </button>
                                                <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-gray-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-primary">{(item.price * item.quantity).toLocaleString()}đ</div>
                                                {item.quantity > 1 && <div className="text-xs text-gray-400">{item.price.toLocaleString()}đ/sp</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h3>
                                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính ({items.length} sản phẩm)</span>
                                        <span className="font-bold">{subtotal.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển</span>
                                        <span className="font-bold">{shipping === 0 ? 'Miễn phí' : shipping.toLocaleString() + 'đ'}</span>
                                    </div>
                                    {shipping === 0 && (
                                        <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                                            🎉 Miễn phí ship cho đơn trên 500k
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                                    <span>Tổng cộng</span>
                                    <span className="text-primary">{total.toLocaleString()}đ</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="block w-full bg-primary text-white text-center font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all mb-3"
                                >
                                    Tiến hành thanh toán
                                </Link>
                                <Link
                                    href="/packages"
                                    className="block w-full text-center text-gray-600 font-bold py-2 hover:text-primary transition-colors"
                                >
                                    Tiếp tục mua hàng
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
