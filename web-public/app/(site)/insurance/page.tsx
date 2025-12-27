"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function InsurancePage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Bảo hiểm Sức khỏe</h1>
                    <p className="text-gray-500 text-lg">Bảo vệ tài chính - An tâm điều trị. So sánh và lựa chọn gói bảo hiểm phù hợp nhất.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { name: 'Cơ bản', price: '1.200.000đ', color: 'blue', features: ['Nội trú: 100tr/năm', 'Ngoại trú: Không', 'Tai nạn: 20tr', 'Nha khoa: Không'] },
                        { name: 'Tiêu chuẩn', price: '3.500.000đ', color: 'green', popular: true, features: ['Nội trú: 300tr/năm', 'Ngoại trú: 6tr/năm', 'Tai nạn: 50tr', 'Nha khoa: 2tr/năm'] },
                        { name: 'Cao cấp', price: '8.900.000đ', color: 'purple', features: ['Nội trú: 1 tỷ/năm', 'Ngoại trú: 20tr/năm', 'Tai nạn: 100tr', 'Thai sản: 20tr'] }
                    ].map((pkg, idx) => (
                        <div key={idx} className={`bg-white rounded-3xl p-8 border hover:shadow-xl transition-all relative ${pkg.popular ? 'border-green-500 shadow-lg scale-105 z-10' : 'border-gray-100 shadow-sm'}`}>
                            {pkg.popular && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                                    Khuyên dùng
                                </span>
                            )}
                            <h3 className={`text-xl font-bold text-${pkg.color}-600 mb-2`}>{pkg.name}</h3>
                            <div className="text-3xl font-extrabold text-gray-900 mb-1">{pkg.price}</div>
                            <div className="text-sm text-gray-500 mb-8">/ người / năm</div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <i className="fi flaticon-check text-green-500 font-bold"></i>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3.5 rounded-xl font-bold transition-all ${pkg.popular
                                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/30'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}>
                                Đăng ký tư vấn
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
