"use client";
import React, { useState } from 'react';

export default function SeminarBannersPage() {
    const [showUploadForm, setShowUploadForm] = useState(false);

    const banners = [
        { id: 1, seminarId: 1, seminarTitle: 'Hội thảo Dược lâm sàng 2024', image: '/img/banner-1.jpg', priority: 1 },
        { id: 2, seminarId: 2, seminarTitle: 'Cập nhật Điều trị Tim mạch', image: '/img/banner-2.jpg', priority: 2 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Banner Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Upload và quản lý banner cho các hội thảo</p>
                </div>
                <button
                    onClick={() => setShowUploadForm(true)}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
                >
                    Upload Banner
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                    <div key={banner.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <img src={banner.image} alt={banner.seminarTitle} className="w-full h-48 object-cover" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'} />
                        <div className="p-4">
                            <p className="font-bold text-gray-900 mb-2">{banner.seminarTitle}</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Thứ tự: {banner.priority}</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Sửa</button>
                                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showUploadForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Banner</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chọn Hội thảo</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option>Hội thảo Dược lâm sàng 2024</option>
                                    <option>Cập nhật Điều trị Tim mạch</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Banner Image</label>
                                <input type="file" accept="image/*" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Thứ tự ưu tiên</label>
                                <input type="number" defaultValue={1} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setShowUploadForm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Hủy</button>
                                <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
