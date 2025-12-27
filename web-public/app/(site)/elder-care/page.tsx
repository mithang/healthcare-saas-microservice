"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function ElderCarePage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                {/* Hero */}
                <div className="bg-orange-50 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 mb-16">
                    <div className="md:w-1/2 space-y-6">
                        <span className="text-orange-600 font-bold tracking-wider text-sm uppercase">Chăm sóc người cao tuổi</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Yêu thương & Chăm sóc tận tâm</h1>
                        <p className="text-gray-600 text-lg">Đội ngũ điều dưỡng viên chuyên nghiệp, giàu kinh nghiệm, sẵn sàng hỗ trợ chăm sóc người thân của bạn tại nhà hoặc bệnh viện.</p>
                        <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all">Tìm người chăm sóc</button>
                    </div>
                    <div className="md:w-1/2">
                        <img src="/img/elder-care.png" alt="Elder Care" className="w-full rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'} />
                    </div>
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Chăm sóc tại nhà', icon: 'flaticon-home', price: 'Từ 400.000đ/ngày', desc: 'Hỗ trợ vệ sinh, ăn uống, uống thuốc, trò chuyện tâm tình.' },
                        { title: 'Chăm sóc tại bệnh viện', icon: 'flaticon-hospital-bed', price: 'Từ 500.000đ/ngày', desc: 'Trực 24/24, theo dõi sinh hiệu, hỗ trợ y tế khi cần thiết.' },
                        { title: 'Phục hồi chức năng', icon: 'flaticon-physiotherapy', price: 'Từ 300.000đ/buổi', desc: 'Tập vật lý trị liệu tại nhà cho người sau tai biến, phẫu thuật.' }
                    ].map((s, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
                            <i className={`fi ${s.icon} text-4xl text-orange-500 mb-6 inline-block`}></i>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                            <p className="text-gray-500 mb-6 min-h-[48px]">{s.desc}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <span className="font-bold text-orange-600">{s.price}</span>
                                <button className="text-sm font-bold text-gray-400 hover:text-orange-500">Chi tiết <i className="fi flaticon-right-arrow text-xs ml-1"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
