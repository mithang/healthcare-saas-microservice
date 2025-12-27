"use client";

import React from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

// Mock Doctors
const ONLINE_DOCTORS = [
    { id: 1, name: 'ThS.BS Nguyễn Thị Mai', speciality: 'Nhi khoa', hospital: 'BV Nhi Đồng 1', price: 200000, avatar: '/img/doctor/doc-1.jpg', rating: 4.9, status: 'online' },
    { id: 2, name: 'BS.CKI Trần Văn Hùng', speciality: 'Tim mạch', hospital: 'Viện Tim TP.HCM', price: 300000, avatar: '/img/doctor/doc-2.jpg', rating: 4.8, status: 'busy' },
    { id: 3, name: 'TS.BS Lê Thu Hà', speciality: 'Da liễu', hospital: 'Da Liễu TP.HCM', price: 250000, avatar: '/img/doctor/doc-3.jpg', rating: 5.0, status: 'online' },
    { id: 4, name: 'BS.CKII Phạm Văn Dũng', speciality: 'Tâm lý', hospital: 'BV Tâm Thần', price: 500000, avatar: '/img/doctor/doc-4.jpg', rating: 4.7, status: 'offline' },
];

export default function TelemedicinePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold inline-block backdrop-blur-sm">
                                <i className="fi flaticon-video-camera mr-2"></i> Tư vấn sức khỏe từ xa
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                Bác sĩ ơi,<br />
                                Khám bệnh Online ngay tại nhà
                            </h1>
                            <p className="text-blue-100 text-lg">
                                Kết nối trực tiếp với các chuyên gia y tế hàng đầu qua Video Call.
                                Tiết kiệm thời gian, an toàn và hiệu quả.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <button className="bg-white text-blue-700 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                                    Đặt lịch ngay
                                </button>
                                <button className="bg-transparent border border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors">
                                    Tìm hiểu thêm
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <img src="/img/telehealth-hero.png" alt="Telemedicine" className="w-full max-w-md drop-shadow-2xl animate-float" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-2.jpg'} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">

                {/* How it works */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Quy trình khám từ xa</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Đơn giản, nhanh chóng chỉ với 3 bước</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

                    {[
                        { step: 1, title: 'Chọn Bác sĩ & Đặt lịch', desc: 'Tìm kiếm bác sĩ theo chuyên khoa và chọn khung giờ phù hợp.', icon: 'flaticon-search' },
                        { step: 2, title: 'Thanh toán phí khám', desc: 'Thanh toán trực tuyến an toàn qua thẻ hoặc ví điện tử.', icon: 'flaticon-credit-card' },
                        { step: 3, title: 'Kết nối qua Video', desc: 'Đăng nhập vào giờ hẹn và bắt đầu cuộc gọi tư vấn với bác sĩ.', icon: 'flaticon-video-camera' }
                    ].map((item) => (
                        <div key={item.step} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow group">
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors relative border-4 border-white shadow-sm">
                                <i className={`fi ${item.icon} text-4xl text-blue-600`}></i>
                                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-md">
                                    {item.step}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Doctor List */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-3">Bác sĩ trực tuyến</h2>
                    <Link href="/search?type=doctor" className="text-primary font-bold hover:underline">Xem tất cả</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ONLINE_DOCTORS.map(doc => (
                        <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                            <div className="p-6 text-center border-b border-gray-50">
                                <div className="relative inline-block mb-4">
                                    <img src={doc.avatar} alt={doc.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 group-hover:border-primary transition-colors" />
                                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${doc.status === 'online' ? 'bg-green-500' : doc.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                                        }`}></div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{doc.name}</h3>
                                <div className="text-xs text-blue-600 font-bold bg-blue-50 inline-block px-2 py-1 rounded mb-2">{doc.speciality}</div>
                                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                                    <i className="fi flaticon-hospital text-xs"></i> {doc.hospital}
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 flex items-center justify-between">
                                <div className="text-left">
                                    <span className="text-xs text-gray-500 block">Phí tư vấn</span>
                                    <span className="font-bold text-gray-900">{doc.price.toLocaleString()}đ</span>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-white text-primary shadow-sm hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                                    <i className="fi flaticon-video-camera"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Platform Benefits */}
                <div className="mt-20 bg-indigo-900 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">Tại sao chọn khám từ xa?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="flex gap-4">
                                <i className="fi flaticon-shield text-4xl text-green-400"></i>
                                <div>
                                    <h4 className="font-bold text-xl mb-2">An toàn tuyệt đối</h4>
                                    <p className="text-indigo-200">Tránh lây nhiễm chéo, bảo mật thông tin cá nhân và hồ sơ bệnh án.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <i className="fi flaticon-clock text-4xl text-yellow-400"></i>
                                <div>
                                    <h4 className="font-bold text-xl mb-2">Tiết kiệm thời gian</h4>
                                    <p className="text-indigo-200">Không cần di chuyển, chờ đợi. Khám đúng giờ hẹn đã đặt.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <i className="fi flaticon-piggy-bank text-4xl text-pink-400"></i>
                                <div>
                                    <h4 className="font-bold text-xl mb-2">Chi phí hợp lý</h4>
                                    <p className="text-indigo-200">Phí khám minh bạch, thường thấp hơn khám trực tiếp tại bệnh viện.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
