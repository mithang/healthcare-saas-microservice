"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function PartnerPage() {
    return (
        <div className="min-h-screen bg-white pb-20">
            <Banner page="others" />

            {/* Hero Partner */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-primary font-bold bg-blue-50 px-4 py-2 rounded-full uppercase text-sm">Hợp tác cùng phát triển</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Trở thành Đối tác Y tế trong Hệ sinh thái
                        </h1>
                        <p className="text-gray-500 text-lg">
                            Mở rộng mạng lưới khách hàng, tối ưu vận hành và nâng cao uy tín thương hiệu cùng nền tảng Y tế số hàng đầu Việt Nam.
                        </p>

                        <div className="space-y-4">
                            {[
                                'Tiếp cận 1 triệu+ người dùng tiềm năng',
                                'Hệ thống quản lý đặt lịch & hồ sơ bệnh nhân hiện đại',
                                'Hỗ trợ truyền thông & Marketing đa kênh',
                                'Quy trình đối soát, thanh toán minh bạch, nhanh chóng'
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <i className="fi flaticon-check text-green-500 font-bold text-xl"></i>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đăng ký Đối tác</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên Bác sĩ / Cơ sở Y tế</label>
                                <input type="text" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none" placeholder="VD: Phòng khám Đa khoa ABC" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Người liên hệ</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl p-3 outline-none" placeholder="Họ tên" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl p-3 outline-none" placeholder="090..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full border border-gray-200 rounded-xl p-3 outline-none" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Loại hình</label>
                                <select className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                    <option>Phòng khám</option>
                                    <option>Bệnh viện</option>
                                    <option>Nhà thuốc</option>
                                    <option>Bác sĩ tự do</option>
                                    <option>Khác</option>
                                </select>
                            </div>
                            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-primary-dark transition-all mt-2">
                                Gửi đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
