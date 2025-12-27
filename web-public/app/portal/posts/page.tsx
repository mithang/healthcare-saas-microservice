'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const posts = [
    {
        id: 1,
        title: 'Cách phòng ngừa bệnh tiểu đường hiệu quả',
        category: 'Sống khỏe',
        author: 'Dr. Nguyễn Văn A',
        status: 'published',
        views: 1250,
        date: '12/12/2024',
        thumbnail: '/styles/img/news/news-1.jpg'
    },
    {
        id: 2,
        title: 'Dấu hiệu nhận biết sớm ung thư phổi',
        category: 'Ung thư',
        author: 'Dr. Nguyễn Văn A',
        status: 'pending',
        views: 0,
        date: '15/12/2024',
        thumbnail: '/styles/img/news/news-2.jpg'
    },
    {
        id: 3,
        title: 'Lợi ích của việc chạy bộ mỗi ngày',
        category: 'Thể thao',
        author: 'Dr. Nguyễn Văn A',
        status: 'draft',
        views: 0,
        date: '17/12/2024',
        thumbnail: '/styles/img/news/news-3.jpg'
    }
];

export default function PostsPage() {
    const [filterStatus, setFilterStatus] = useState('all');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
                    <p className="text-gray-500 text-sm mt-1">Danh sách các bài viết y khoa của bạn</p>
                </div>
                <Link
                    href="/portal/posts/create"
                    className="flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-xl shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-green-600/40 transition-all transform hover:-translate-y-0.5"
                >
                    <i className="fi flaticon-add mr-2"></i>
                    Viết bài mới
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-2 overflow-x-auto">
                    {['all', 'published', 'pending', 'draft'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg capitalize whitespace-nowrap transition-colors ${filterStatus === status
                                    ? 'bg-green-50 text-green-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {status === 'all' ? 'Tất cả' :
                                status === 'published' ? 'Đã xuất bản' :
                                    status === 'pending' ? 'Chờ duyệt' : 'Bản nháp'}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <th className="px-6 py-4 font-semibold">Bài viết</th>
                                <th className="px-6 py-4 font-semibold">Chuyên mục</th>
                                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                                <th className="px-6 py-4 font-semibold">Lượt xem</th>
                                <th className="px-6 py-4 font-semibold">Ngày tạo</th>
                                <th className="px-6 py-4 font-semibold text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={post.thumbnail} className="w-16 h-12 rounded-lg object-cover" alt="" />
                                            <div>
                                                <h4 className="font-medium text-gray-900 line-clamp-1 max-w-md">{post.title}</h4>
                                                <p className="text-xs text-gray-500">{post.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{post.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${post.status === 'published' ? 'bg-green-50 text-green-700 border-green-100' :
                                                post.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                            }`}>
                                            {post.status === 'published' ? 'Đã xuất bản' :
                                                post.status === 'pending' ? 'Chờ duyệt' : 'Bản nháp'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{post.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600 mx-2 transition-colors">
                                            <i className="fi flaticon-edit"></i>
                                        </button>
                                        <button className="text-gray-400 hover:text-red-600 mx-2 transition-colors">
                                            <i className="fi flaticon-garbage"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {posts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Chưa có bài viết nào
                    </div>
                )}
            </div>
        </div>
    );
}
