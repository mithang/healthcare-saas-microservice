"use client";

import React from 'react';

export default function BannersManagement() {
    const banners = [
        { id: 1, title: 'Banner Trang chủ', position: 'Homepage Hero', status: 'active', clicks: 1250 },
        { id: 2, title: 'Khuyến mãi 40%', position: 'Sidebar', status: 'active', clicks: 850 },
        { id: 3, title: 'Banner Tết', position: 'Homepage Hero', status: 'inactive', clicks: 0 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Banner</h1>
                    <p className="text-gray-500 mt-1">Quản lý banner quảng cáo</p>
                </div>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                    + Tạo banner mới
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {banners.map(banner => (
                    <div key={banner.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="aspect-video bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                            <span className="text-gray-400">Banner Preview</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{banner.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{banner.position}</p>
                        <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${banner.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {banner.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                            </span>
                            <span className="text-sm text-gray-600">{banner.clicks} clicks</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Sửa</button>
                            <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
