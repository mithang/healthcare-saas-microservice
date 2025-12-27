"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

export default function AmbulancePage() {
    const [emergency, setEmergency] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />

            {/* Emergency Hero */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <i className="fi flaticon-ambulance text-6xl"></i>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Xe Cứu thương Khẩn cấp</h1>
                    <p className="text-red-100 text-lg mb-8">Phản ứng nhanh 24/7 - Đội ngũ y tế chuyên nghiệp</p>
                    <button
                        onClick={() => setEmergency(true)}
                        className="bg-white text-red-600 font-bold px-12 py-4 rounded-xl text-xl hover:bg-red-50 transition-all shadow-2xl animate-bounce"
                    >
                        🚨 GỌI CẤP CỨU NGAY
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Service Types */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: 'Cấp cứu Khẩn cấp', price: 'Miễn phí tư vấn', icon: 'flaticon-siren', color: 'red' },
                        { title: 'Chuyển viện', price: 'Từ 500.000đ', icon: 'flaticon-hospital', color: 'blue' },
                        { title: 'Đưa đón Khám bệnh', price: 'Từ 300.000đ', icon: 'flaticon-wheelchair', color: 'green' }
                    ].map((service, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all">
                            <div className={`w-20 h-20 bg-${service.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                                <i className={`fi ${service.icon} text-4xl text-${service.color}-600`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-primary font-bold text-lg mb-6">{service.price}</p>
                            <button className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                                Đặt xe
                            </button>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tại sao chọn chúng tôi?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { icon: 'flaticon-clock', title: 'Phản ứng < 5 phút', desc: 'Xe cấp cứu có mặt trong vòng 5-10 phút tại nội thành' },
                            { icon: 'flaticon-doctor', title: 'Bác sĩ đi kèm', desc: 'Đội ngũ y bác sĩ chuyên khoa cấp cứu giàu kinh nghiệm' },
                            { icon: 'flaticon-heart-rate', title: 'Trang bị hiện đại', desc: 'Máy thở, máy sốc tim, thuốc cấp cứu đầy đủ' },
                            { icon: 'flaticon-gps', title: 'Theo dõi GPS', desc: 'Xem vị trí xe cứu thương real-time trên app' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className={`fi ${item.icon} text-2xl text-red-600`}></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Emergency Modal */}
            {emergency && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scale-up">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <i className="fi flaticon-phone-call text-4xl text-red-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Đang kết nối...</h3>
                            <p className="text-gray-500">Vui lòng giữ máy</p>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-600">Hotline Cấp cứu</span>
                                <span className="font-bold text-red-600">115</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-600">Tổng đài Hỗ trợ</span>
                                <span className="font-bold text-primary">1900 xxxx</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setEmergency(false)}
                            className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
