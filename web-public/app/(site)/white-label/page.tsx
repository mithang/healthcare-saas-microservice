"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function WhiteLabelPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">White-label Platform</h1>
                    <p className="text-gray-300 text-lg">Nền tảng Y tế với thương hiệu của bạn</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Tùy biến hoàn toàn</h2>
                        <ul className="space-y-4">
                            {[
                                'Logo & Màu sắc thương hiệu',
                                'Tên miền riêng (yourbrand.com)',
                                'Giao diện tùy chỉnh',
                                'Email & SMS với tên công ty',
                                'App iOS/Android riêng'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fi flaticon-check text-white text-sm"></i>
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đăng ký Tư vấn</h3>
                        <form className="space-y-4">
                            <input type="text" placeholder="Tên công ty" className="w-full border border-gray-200 rounded-xl p-3 outline-none" />
                            <input type="email" placeholder="Email" className="w-full border border-gray-200 rounded-xl p-3 outline-none" />
                            <input type="text" placeholder="Số điện thoại" className="w-full border border-gray-200 rounded-xl p-3 outline-none" />
                            <textarea placeholder="Nhu cầu của bạn" rows={4} className="w-full border border-gray-200 rounded-xl p-3 outline-none"></textarea>
                            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark">
                                Gửi yêu cầu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
