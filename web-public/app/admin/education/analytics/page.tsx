"use client";
import React, { useState } from 'react';

export default function EducationAnalyticsPage() {
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [selectedLesson, setSelectedLesson] = useState('all');

    const topLessons = [
        { id: 1, title: 'Cập nhật điều trị Đái tháo đường 2024', views: 2340, likes: 450, comments: 120 },
        { id: 2, title: 'Quản lý Tăng huyết áp ở người cao tuổi', views: 1890, likes: 380, comments: 95 },
        { id: 3, title: 'Dược lâm sàng: Kháng sinh hợp lý', views: 1650, likes: 320, comments: 78 },
        { id: 4, title: 'Chăm sóc bệnh nhân tim mạch', views: 1420, likes: 290, comments: 65 },
        { id: 5, title: 'Dinh dưỡng cho trẻ em', views: 1280, likes: 250, comments: 58 },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Phân tích Đào tạo & Khóa học</h1>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-book"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Tổng khóa học</p>
                    <p className="text-2xl font-bold text-gray-900">48</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-video-camera"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Tổng bài học</p>
                    <p className="text-2xl font-bold text-gray-900">324</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-user-1"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Học viên hoạt động</p>
                    <p className="text-2xl font-bold text-gray-900">1,240</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-star"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Đánh giá TB</p>
                    <p className="text-2xl font-bold text-gray-900">4.7/5</p>
                </div>
            </div>

            {/* Top 10 Lessons */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Top 10 Bài học phổ biến</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">#</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Tên bài học</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Lượt xem</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Lượt thích</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Bình luận</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {topLessons.map((lesson, idx) => (
                                <tr key={lesson.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-bold text-primary">{idx + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{lesson.title}</td>
                                    <td className="px-6 py-4 text-gray-700">{lesson.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-red-500 font-medium">{lesson.likes}</td>
                                    <td className="px-6 py-4 text-blue-500 font-medium">{lesson.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detailed Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Lọc chi tiết theo Khóa học / Bài học</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Chọn khóa học</label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                            <option value="all">Tất cả khóa học</option>
                            <option value="1">CME: Cập nhật Y khoa 2024</option>
                            <option value="2">CPE: Dược lâm sàng nâng cao</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Chọn bài học</label>
                        <select
                            value={selectedLesson}
                            onChange={(e) => setSelectedLesson(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                            <option value="all">Tất cả bài học</option>
                            <option value="1">Bài 1: Giới thiệu</option>
                            <option value="2">Bài 2: Cập nhật điều trị</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-xl">
                        <p className="text-3xl font-bold text-red-600">450</p>
                        <p className="text-sm text-gray-600 mt-1">Lượt thích</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-3xl font-bold text-blue-600">120</p>
                        <p className="text-sm text-gray-600 mt-1">Bình luận</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-xl">
                        <p className="text-3xl font-bold text-yellow-600">4.5</p>
                        <p className="text-sm text-gray-600 mt-1">Đánh giá (1-5 sao)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
