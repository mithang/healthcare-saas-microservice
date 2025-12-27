'use client';

import React from 'react';

const questions = [
    {
        id: 1,
        user: 'Trần Văn X',
        avatar: '/styles/img/user/user-1.jpg',
        content: 'Bác sĩ cho em hỏi, dạo này em hay bị đau đầu vào buổi chiều, có phải là dấu hiệu thiếu máu không ạ?',
        date: '2 giờ trước',
        status: 'unanswered'
    },
    {
        id: 2,
        user: 'Nguyễn Thị Y',
        avatar: '/styles/img/user/user-2.jpg',
        content: 'Chi phí khám tổng quát bên mình là bao nhiêu vậy ạ? Có cần đặt lịch trước không?',
        date: '1 ngày trước',
        status: 'answered'
    }
];

export default function EngagementPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hỏi đáp & Đánh giá</h1>
                    <p className="text-gray-500 text-sm mt-1">Tương tác với bệnh nhân của bạn</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Câu hỏi mới nhất</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {questions.map((q) => (
                        <div key={q.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex gap-4">
                                <img src={q.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{q.user}</h4>
                                            <p className="text-xs text-gray-500">{q.date}</p>
                                        </div>
                                        {q.status === 'unanswered' && (
                                            <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-lg">
                                                Chưa trả lời
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-4">{q.content}</p>

                                    <div className="flex gap-3">
                                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
                                            Trả lời ngay
                                        </button>
                                        <button className="text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                                            Bỏ qua
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
