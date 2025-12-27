"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const SERVICES = [
    { name: 'Khám & Tư vấn', price: '200.000đ', icon: 'flaticon-tooth' },
    { name: 'Lấy cao răng', price: '300.000đ', icon: 'flaticon-dental-care' },
    { name: 'Tẩy trắng răng', price: '1.500.000đ', icon: 'flaticon-teeth-whitening' },
    { name: 'Niềng răng Invisalign', price: 'Từ 50tr', icon: 'flaticon-braces' },
];

export default function DentalPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Nha Khoa Thẩm mỹ</h1>
                    <p className="text-blue-100">Nụ cười rạng rỡ - Tự tin mỗi ngày</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((s, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <i className={`fi ${s.icon} text-5xl text-blue-500 mb-4 inline-block`}></i>
                            <h3 className="font-bold text-gray-900 mb-2">{s.name}</h3>
                            <div className="text-xl font-bold text-primary mb-4">{s.price}</div>
                            <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-xl hover:bg-blue-600">Đặt lịch</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
