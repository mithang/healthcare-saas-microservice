"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminSeminarsPage() {
    const [filter, setFilter] = useState('all');

    const seminars = [
        {
            id: 1,
            title: 'Hội thảo Dược lâm sàng 2024',
            date: '2024-12-25',
            location: 'Khách sạn Rex, TP.HCM',
            registrations: 245,
            capacity: 300,
            status: 'published',
        },
        {
            id: 2,
            title: 'Cập nhật Điều trị Tim mạch',
            date: '2025-01-15',
            location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
            registrations: 180,
            capacity: 250,
            status: 'published',
        },
        {
            id: 3,
            title: 'Hội thảo Kháng sinh Hợp lý',
            date: '2025-02-10',
            location: 'Bệnh viện Đại học Y Dược, TP.HCM',
            registrations: 120,
            capacity: 200,
            status: 'draft',
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Tạo và quản lý các hội thảo offline</p>
                </div>
                <Link href="/admin/seminars/create">
                    <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition flex items-center gap-2">
                        <i className="fi flaticon-add"></i> Tạo Hội thảo
                    </button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng hội thảo</p>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã xuất bản</p>
                    <p className="text-3xl font-bold text-green-600">2</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng đăng ký</p>
                    <p className="text-3xl font-bold text-blue-600">545</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Sắp diễn ra</p>
                    <p className="text-3xl font-bold text-purple-600">2</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {[
                    { key: 'all', label: 'Tất cả' },
                    { key: 'published', label: 'Đã xuất bản' },
                    { key: 'draft', label: 'Nháp' },
                    { key: 'upcoming', label: 'Sắp diễn ra' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 rounded-xl font-bold transition ${filter === tab.key
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-100'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Seminars Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Hội thảo</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Ngày</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Địa điểm</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Đăng ký</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {seminars.map((seminar) => (
                                <tr key={seminar.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{seminar.title}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{seminar.date}</td>
                                    <td className="px-6 py-4 text-gray-600">{seminar.location}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-gray-900">{seminar.registrations}/{seminar.capacity}</p>
                                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${(seminar.registrations / seminar.capacity) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${seminar.status === 'published'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {seminar.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link href={`/admin/seminars/${seminar.id}/edit`}>
                                                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-bold">
                                                    Sửa
                                                </button>
                                            </Link>
                                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-bold">
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/seminars/banners">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-image text-purple-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Quản lý Banner</p>
                    </div>
                </Link>
                <Link href="/admin/seminars/speakers">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-user text-blue-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Diễn giả</p>
                    </div>
                </Link>
                <Link href="/admin/seminars/sessions">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-calendar text-green-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Phiên hội thảo</p>
                    </div>
                </Link>
                <Link href="/admin/seminars/checkin">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-checked text-orange-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Check-in</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
