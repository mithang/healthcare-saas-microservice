"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const QUESTIONS = [
    { id: 1, title: 'Uống thuốc hạ sốt khi nào?', author: 'Nguyễn A', answers: 5, views: 120, tags: ['Thuốc', 'Sốt'] },
    { id: 2, title: 'Cách phòng ngừa tiểu đường type 2?', author: 'Trần B', answers: 12, views: 350, tags: ['Tiểu đường', 'Phòng bệnh'] },
    { id: 3, title: 'Chế độ ăn cho người huyết áp cao?', author: 'Lê C', answers: 8, views: 200, tags: ['Dinh dưỡng', 'Huyết áp'] },
];

export default function CommunityQAPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hỏi đáp Cộng đồng</h1>
                        <p className="text-gray-500">Chia sẻ kiến thức - Cùng nhau học hỏi</p>
                    </div>
                    <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                        Đặt câu hỏi
                    </button>
                </div>

                <div className="space-y-4">
                    {QUESTIONS.map(q => (
                        <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-primary cursor-pointer">{q.title}</h3>
                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                <span>Bởi <strong>{q.author}</strong></span>
                                <span className="flex items-center gap-1">
                                    <i className="fi flaticon-comment"></i> {q.answers} câu trả lời
                                </span>
                                <span className="flex items-center gap-1">
                                    <i className="fi flaticon-eye"></i> {q.views} lượt xem
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {q.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
