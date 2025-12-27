"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Topic } from '@/services/content.service';

export default function TopicsManagement() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTopics = async () => {
        try {
            const data = await contentService.getTopics();
            setTopics(data);
        } catch (error) {
            console.error('Failed to fetch topics', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleDelete = async (id: number | string) => {
        if (confirm('Bạn có chắc chắn muốn xóa chủ đề này?')) {
            try {
                await contentService.deleteTopic(id);
                fetchTopics();
            } catch (error) {
                alert('Xóa thất bại');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Diễn đàn</h1>
                    <p className="text-gray-500 mt-1">Quản lý các chủ đề thảo luận và tương tác cộng đồng</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Chủ đề</th>
                            <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Tương tác</th>
                            <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Trạng thái</th>
                            <th className="px-6 py-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {topics.map(topic => (
                            <tr key={topic.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900 mb-0.5">{topic.title}</div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                                        <span className="text-primary">{topic.category}</span>
                                        <span>•</span>
                                        <span>Bởi: {topic.authorName}</span>
                                        <span>•</span>
                                        <span>{topic.date}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-gray-700">👁️ {topic.viewCount}</span>
                                            <span className="text-xs font-bold text-gray-700">💬 {topic.commentCount}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${topic.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {topic.isActive ? 'Hoạt động' : 'Tạm khóa'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/forum/topics/${topic.id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">👁️</Link>
                                        <button onClick={() => handleDelete(topic.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {topics.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium italic">
                        Chưa có chủ đề nào được thảo luận.
                    </div>
                )}
            </div>
        </div>
    );
}
