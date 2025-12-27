"use client";
import React from 'react';

export default function SeminarSessionsPage() {
    const sessions = [
        { id: 1, seminar: 'Hội thảo Dược lâm sàng 2024', time: '08:30 - 10:00', topic: 'Tương tác thuốc', speaker: 'GS.TS Nguyễn Văn A' },
        { id: 2, seminar: 'Hội thảo Dược lâm sàng 2024', time: '10:15 - 12:00', topic: 'Kháng sinh hợp lý', speaker: 'PGS.TS Trần Thị B' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Phiên Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Tạo và sắp xếp lịch trình hội thảo</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition">
                    Thêm Phiên
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Hội thảo</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thời gian</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Chủ đề</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Diễn giả</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sessions.map((session) => (
                            <tr key={session.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-600">{session.seminar}</td>
                                <td className="px-6 py-4 font-bold text-primary">{session.time}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{session.topic}</td>
                                <td className="px-6 py-4 text-gray-600">{session.speaker}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Sửa</button>
                                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
