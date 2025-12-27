"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function QADetail() {
    const params = useParams<{ id: string }>();
    const qa = {
        id: params.id,
        question: 'Làm thế nào để giảm huyết áp tự nhiên?',
        askedBy: 'Trần Thị B',
        category: 'Tim mạch',
        content: 'Tôi bị huyết áp cao, muốn tìm cách giảm tự nhiên không dùng thuốc...',
        answers: [
            { author: 'BS. Nguyễn Văn C', content: 'Bạn nên tập thể dục đều đặn, ăn ít muối...', likes: 15, createdDate: '16/12/2024' },
            { author: 'Lê Văn D', content: 'Tôi cũng từng bị, uống nước dừa hàng ngày rất tốt...', likes: 8, createdDate: '17/12/2024' },
        ],
        views: 850,
        askedDate: '15/12/2024 14:30',
        status: 'approved',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{qa.question}</h1>
                    <p className="text-gray-500 mt-1">Hỏi bởi {qa.askedBy} • {qa.askedDate}</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl">Duyệt</button>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt xem</p>
                    <h3 className="text-3xl font-bold text-gray-900">{qa.views}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Câu trả lời</p>
                    <h3 className="text-3xl font-bold text-blue-600">{qa.answers.length}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={qa.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Câu hỏi</h2>
                <p className="text-gray-700 mb-4">{qa.content}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                    <span>Danh mục: <span className="font-medium text-gray-900">{qa.category}</span></span>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Câu trả lời ({qa.answers.length})</h2>
                <div className="space-y-4">
                    {qa.answers.map((answer, idx) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-bold text-gray-900">{answer.author}</p>
                                    <p className="text-sm text-gray-500">{answer.createdDate}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <i className="fi flaticon-heart text-red-500"></i>
                                    <span>{answer.likes}</span>
                                </div>
                            </div>
                            <p className="text-gray-700">{answer.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
