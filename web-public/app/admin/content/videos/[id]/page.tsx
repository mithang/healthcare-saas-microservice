"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function VideoDetail() {
    const params = useParams<{ id: string }>();
    const video = {
        id: params.id,
        title: '10 Bài tập Yoga cho người mới bắt đầu',
        videoUrl: 'https://youtube.com/watch?v=example',
        thumbnail: '/img/yoga-thumb.jpg',
        category: 'Bài tập',
        duration: 15,
        description: 'Video hướng dẫn 10 bài tập yoga cơ bản dành cho người mới bắt đầu',
        tags: 'yoga, sức khỏe, thể dục',
        views: 5420,
        likes: 342,
        publishedDate: '10/12/2024',
        status: 'published',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{video.title}</h1>
                <div className="flex gap-3">
                    <Link href={`/admin/content/videos/${video.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video Player: {video.videoUrl}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt xem</p>
                    <h3 className="text-3xl font-bold text-gray-900">{video.views}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt thích</p>
                    <h3 className="text-3xl font-bold text-red-600">{video.likes}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Thời lượng</p>
                    <h3 className="text-3xl font-bold text-blue-600">{video.duration} phút</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={video.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="space-y-4">
                    <div><p className="text-sm text-gray-500 mb-1">Danh mục</p><p className="font-medium text-gray-900">{video.category}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Ngày xuất bản</p><p className="font-medium text-gray-900">{video.publishedDate}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Tags</p><p className="font-medium text-gray-900">{video.tags}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Mô tả</p><p className="text-gray-700">{video.description}</p></div>
                </div>
            </div>
        </div>
    );
}
