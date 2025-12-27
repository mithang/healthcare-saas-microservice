"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function NotificationsPage() {
    const [selectedType, setSelectedType] = useState('all');

    const notificationTypes = [
        { id: 'students_by_course', name: 'Danh sách học viên theo khóa', icon: 'flaticon-student', color: 'bg-blue-500' },
        { id: 'banner_link', name: 'Banner link theo khóa', icon: 'flaticon-image', color: 'bg-purple-500' },
        { id: 'incomplete_lessons', name: 'Nhắc nhở chưa hoàn thành', icon: 'flaticon-alarm', color: 'bg-yellow-500' },
        { id: 'regional_eval', name: 'Đánh giá theo địa bàn', icon: 'flaticon-location', color: 'bg-green-500' },
        { id: 'top_10_quiz', name: 'Top 10 làm bài nhanh', icon: 'flaticon-trophy', color: 'bg-orange-500' },
        { id: 'first_completer', name: 'Người đầu tiên hoàn thành', icon: 'flaticon-medal', color: 'bg-red-500' },
        { id: 'enrollment_stats', name: 'Thống kê khóa học', icon: 'flaticon-stats', color: 'bg-indigo-500' },
    ];

    const recentNotifications = [
        { id: 1, type: 'students_by_course', title: 'Thông báo khóa CME 2024', course: 'CME 2024', recipients: 450, sent: '2024-12-19 14:30', status: 'Đã gửi' },
        { id: 2, type: 'incomplete_lessons', title: 'Nhắc nhở hoàn thành bài học', course: 'CPE 2024', recipients: 120, sent: '2024-12-19 10:00', status: 'Đã gửi' },
        { id: 3, type: 'top_10_quiz', title: 'Chúc mừng Top 10 nhanh nhất', course: 'CME 2024', recipients: 10, sent: '2024-12-18 16:45', status: 'Đã gửi' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Push Notification</h1>
                    <p className="text-gray-500 text-sm mt-1">Gửi thông báo đến học viên theo nhiều tiêu chí</p>
                </div>
                <Link href="/admin/notifications/send">
                    <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition flex items-center gap-2">
                        <i className="fi flaticon-send"></i> Gửi Notification
                    </button>
                </Link>
            </div>

            {/* Notification Types */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">7 Loại Notification</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {notificationTypes.map((type) => (
                        <div key={type.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                            <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                                <i className={`fi ${type.icon} text-white text-xl`}></i>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{type.name}</h3>
                            <Link href={`/admin/notifications/send?type=${type.id}`}>
                                <button className="text-primary font-bold text-sm hover:underline">
                                    Gửi ngay →
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Lịch sử Gửi gần đây</h2>
                    <Link href="/admin/notifications/history" className="text-primary font-bold hover:underline">
                        Xem tất cả →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Tiêu đề</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Loại</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Khóa học</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Người nhận</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Thời gian</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentNotifications.map((notif) => (
                                <tr key={notif.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{notif.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                                            {notificationTypes.find(t => t.id === notif.type)?.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{notif.course}</td>
                                    <td className="px-6 py-4 text-gray-600">{notif.recipients} người</td>
                                    <td className="px-6 py-4 text-gray-600">{notif.sent}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                            {notif.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng đã gửi</p>
                    <p className="text-3xl font-bold text-gray-900">1,245</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã nhận</p>
                    <p className="text-3xl font-bold text-green-600">1,180</p>
                    <p className="text-xs text-gray-400 mt-1">94.8%</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã mở</p>
                    <p className="text-3xl font-bold text-blue-600">856</p>
                    <p className="text-xs text-gray-400 mt-1">72.5%</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã click</p>
                    <p className="text-3xl font-bold text-purple-600">420</p>
                    <p className="text-xs text-gray-400 mt-1">49.1%</p>
                </div>
            </div>
        </div>
    );
}
