"use client";

import React from 'react';

export default function VideosManagement() {
    const videos = [
        { id: 1, title: 'Hướng dẫn đặt khám online', duration: '5:30', views: 2500, status: 'published' },
        { id: 2, title: 'Phòng ngừa COVID-19', duration: '8:15', views: 5200, status: 'published' },
        { id: 3, title: 'Chăm sóc sức khỏe tim mạch', duration: '10:00', views: 1800, status: 'draft' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Video</h1>
                    <p className="text-gray-500 mt-1">Tổng: {videos.length} video</p>
                </div>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                    + Upload video mới
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map(video => (
                    <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="aspect-video bg-gray-900 flex items-center justify-center">
                            <i className="fi flaticon-play text-6xl text-white opacity-50"></i>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2">{video.title}</h3>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <span>⏱️ {video.duration}</span>
                                <span>👁️ {video.views}</span>
                            </div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${video.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {video.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                            </span>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Sửa</button>
                                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
