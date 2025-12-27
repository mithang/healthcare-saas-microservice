"use client";

import React, { useState, useEffect } from 'react';
import seminarService, { SeminarSession } from '@/services/seminar.service';

export default function SeminarSessionsPage() {
    const [sessions, setSessions] = useState<SeminarSession[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        try {
            setLoading(true);
            const data = await seminarService.getSessions();
            setSessions(data);
        } catch (error) {
            console.error('Failed to fetch sessions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Xóa phiên hội thảo này?')) {
            try {
                await seminarService.deleteSession(id);
                fetchSessions();
            } catch (error) {
                console.error('Failed to delete session', error);
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Phiên Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Sắp xếp chương trình và thời gian hội thảo</p>
                </div>
                <button
                    onClick={async () => {
                        const seminarId = prompt('Nhập ID hội thảo:');
                        if (!seminarId) return;
                        await seminarService.createSession({
                            seminarId: parseInt(seminarId),
                            time: '08:00 - 09:00',
                            topic: 'Chủ đề mới',
                            speaker: 'Diễn giả mặc định'
                        });
                        fetchSessions();
                    }}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
                >
                    Thêm Phiên mới
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Đang tải...</div>
                ) : (
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
                                <tr key={session.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{session.seminar?.title}</td>
                                    <td className="px-6 py-4 text-gray-600">{session.time}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{session.topic}</td>
                                    <td className="px-6 py-4 text-gray-600">{session.speaker}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Sửa</button>
                                            <button onClick={() => handleDelete(session.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sessions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Chưa có phiên hội thảo nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
