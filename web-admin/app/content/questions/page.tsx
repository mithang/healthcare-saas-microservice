"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Question } from '@/services/content.service';

export default function QuestionsManagement() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQuestions = async () => {
        try {
            const data = await contentService.getQuestions();
            setQuestions(data);
        } catch (error) {
            console.error('Failed to fetch questions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleDelete = async (id: number | string) => {
        if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
            try {
                await contentService.deleteQuestion(id);
                fetchQuestions();
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
                    <h1 className="text-3xl font-bold text-gray-900">Hỏi đáp & Tư vấn</h1>
                    <p className="text-gray-500 mt-1">Quản lý câu hỏi từ người dùng và phản hồi của bác sĩ</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {questions.map(q => (
                    <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-primary/20 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${q.isResolved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {q.isResolved ? '✓ Đã trả lời' : '● Chờ trả lời'}
                                </span>
                                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">{q.category}</span>
                            </div>
                            <button onClick={() => handleDelete(q.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
                                🗑️
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{q.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{q.content}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                                    {q.authorName.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-900">{q.authorName}</span>
                                    <span className="text-[10px] text-gray-400">{q.date}</span>
                                </div>
                            </div>
                            <Link href={`/admin/content/questions/${q.id}`} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                Xem chi tiết & Trả lời →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {questions.length === 0 && (
                <div className="p-20 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 font-medium italic">
                    Chưa có câu hỏi nào cần xử lý.
                </div>
            )}
        </div>
    );
}
