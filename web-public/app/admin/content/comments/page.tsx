"use client";
import React, { useState, useEffect } from 'react';
import contentService, { Comment } from '@/services/content.service';

export default function CommentsManagement() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        try {
            const data = await contentService.getAllComments();
            setComments(data);
        } catch (error) {
            console.error('Failed to fetch comments', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleDelete = async (id: number | string) => {
        if (confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            try {
                await contentService.deleteComment(id);
                fetchComments();
            } catch (error) {
                alert('Xóa thất bại');
            }
        }
    };

    const getTargetLabel = (type: string) => {
        switch (type) {
            case 'post': return 'Bài viết';
            case 'question': return 'Hỏi đáp';
            case 'video': return 'Video';
            default: return type;
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Bình luận</h1>
                <p className="text-gray-500 mt-1">Quản lý phản hồi và thảo luận từ người dùng trên toàn hệ thống</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Người dùng</th>
                            <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Nội dung</th>
                            <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Loại</th>
                            <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Ngày</th>
                            <th className="px-6 py-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {comments.map(c => (
                            <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900">{c.authorName}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600 line-clamp-1 max-w-xs">{c.content}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                                        {getTargetLabel(c.targetType)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{c.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {comments.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium whitespace-pre-wrap italic">
                        {"Chưa có bình luận nào trên hệ thống."}
                    </div>
                )}
            </div>
        </div>
    );
}
