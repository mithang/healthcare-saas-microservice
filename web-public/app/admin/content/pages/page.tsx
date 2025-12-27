"use client";

import React from 'react';
import Link from 'next/link';

export default function PagesManagement() {
    const pages = [
        { id: 1, title: 'Giới thiệu', slug: '/about', status: 'published', updated: '15/12/2024' },
        { id: 2, title: 'Liên hệ', slug: '/contact', status: 'published', updated: '14/12/2024' },
        { id: 3, title: 'Điều khoản', slug: '/terms', status: 'draft', updated: '13/12/2024' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Trang tĩnh</h1>
                    <p className="text-gray-500 mt-1">Tổng: {pages.length} trang</p>
                </div>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                    + Tạo trang mới
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Tiêu đề</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Slug</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Cập nhật</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(page => (
                            <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{page.title}</td>
                                <td className="px-6 py-4 text-gray-600">{page.slug}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {page.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{page.updated}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-800"><i className="fi flaticon-eye"></i></button>
                                        <button className="text-green-600 hover:text-green-800"><i className="fi flaticon-edit"></i></button>
                                        <button className="text-red-600 hover:text-red-800"><i className="fi flaticon-delete"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
