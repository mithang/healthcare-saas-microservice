"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ForumTopicDetail() {
    const params = useParams<{ id: string }>();
    const topic = {
        id: params.id,
        title: 'Cách phòng ngừa bệnh tim mạch',
        author: 'Nguyễn Văn A',
        category: 'Sức khỏe',
        content: 'Nội dung bài viết về cách phòng ngừa bệnh tim mạch...',
        replies: 45,
        views: 1250,
        likes: 89,
        createdDate: '15/12/2024 10:30',
        lastActivity: '19/12/2024 14:20',
        status: 'approved',
        tags: ['tim mạch', 'phòng ngừa', 'sức khỏe'],
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
                    <p className="text-gray-500 mt-1">Đăng bởi {topic.author} • {topic.createdDate}</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl">Duyệt</button>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt xem</p>
                    <h3 className="text-3xl font-bold text-gray-900">{topic.views}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trả lời</p>
                    <h3 className="text-3xl font-bold text-blue-600">{topic.replies}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt thích</p>
                    <h3 className="text-3xl font-bold text-red-600">{topic.likes}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={topic.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Danh mục</p><p className="font-medium text-gray-900">{topic.category}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Hoạt động cuối</p><p className="font-medium text-gray-900">{topic.lastActivity}</p></div>
                    <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 mb-2">Tags</p>
                        <div className="flex gap-2">
                            {topic.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Nội dung</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700">{topic.content}</p>
                </div>
            </div>
        </div>
    );
}
