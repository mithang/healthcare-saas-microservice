"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Video } from '@/services/content.service';

export default function VideosManagement() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        try {
            const data = await contentService.getVideos();
            setVideos(data);
        } catch (error) {
            console.error('Failed to fetch videos', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleDelete = async (id: number | string) => {
        if (confirm('Bạn có chắc chắn muốn xóa video này?')) {
            try {
                await contentService.deleteVideo(id);
                fetchVideos();
                alert('Xóa thành công!');
            } catch (error) {
                alert('Xóa thất bại');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Video</h1>
                    <p className="text-gray-500 mt-1">Tổng cộng: {videos.length} video trong hệ thống</p>
                </div>
                <Link href="/admin/content/videos/create" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                    + Upload video mới
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                    <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col">
                        <div className="aspect-video bg-gray-900 relative overflow-hidden flex-shrink-0">
                            <img src={video.thumbnail || '/img/placeholder.png'} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 transform group-hover:scale-110 transition-all">
                                    ▶️
                                </span>
                            </div>
                            <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                                {video.duration}
                            </span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug flex-1">{video.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-medium">
                                <span>Tác giả: {video.author}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span>{video.date}</span>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${video.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {video.isActive ? 'Đã xuất bản' : 'Tạm ẩn'}
                                </span>
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-gray-50 mt-auto">
                                <Link href={`/admin/content/videos/${video.id}/edit`} className="flex-1 text-center bg-gray-50 text-gray-600 font-bold py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all">
                                    Sửa
                                </Link>
                                <button onClick={() => handleDelete(video.id)} className="flex-1 bg-gray-50 text-gray-600 font-bold py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all">
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {videos.length === 0 && (
                <div className="p-20 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 font-medium">
                    Chưa có video nào được tải lên.
                </div>
            )}
        </div>
    );
}
