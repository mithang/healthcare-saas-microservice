"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const PACKAGES = [
    { name: 'Gói Cơ bản', employees: 'Đến 50 NV', price: '5.000.000đ/năm', features: ['Khám định kỳ 1 lần/năm', 'Xét nghiệm cơ bản', 'Tư vấn sức khỏe online'] },
    { name: 'Gói Tiêu chuẩn', employees: '50-200 NV', price: '15.000.000đ/năm', features: ['Khám định kỳ 2 lần/năm', 'Xét nghiệm tổng quát', 'Tư vấn dinh dưỡng', 'Tiêm phòng'] },
    { name: 'Gói Cao cấp', employees: 'Trên 200 NV', price: 'Liên hệ', features: ['Khám định kỳ 4 lần/năm', 'Xét nghiệm chuyên sâu', 'Bác sĩ riêng', 'Ưu tiên khẩn cấp'] },
];

export default function CorporatePage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Gói Doanh nghiệp</h1>
                    <p className="text-indigo-100 text-lg">Chăm sóc sức khỏe toàn diện cho đội ngũ nhân viên</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PACKAGES.map((pkg, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border-2 border-gray-100 hover:border-primary transition-all">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                            <p className="text-gray-500 mb-6">{pkg.employees}</p>
                            <div className="text-3xl font-bold text-primary mb-8">{pkg.price}</div>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-700">
                                        <i className="fi flaticon-check text-green-500"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark">
                                Liên hệ tư vấn
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
