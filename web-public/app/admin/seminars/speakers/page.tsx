"use client";
import React, { useState } from 'react';

export default function SeminarSpeakersPage() {
    const [showAddForm, setShowAddForm] = useState(false);

    const speakers = [
        { id: 1, name: 'GS.TS Nguyễn Văn A', title: 'Trưởng khoa Dược, BV Chợ Rẫy', photo: '/img/speaker-1.jpg', seminars: 2 },
        { id: 2, name: 'PGS.TS Trần Thị B', title: 'Phó Giám đốc BV 115', photo: '/img/speaker-2.jpg', seminars: 1 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Diễn giả</h1>
                    <p className="text-gray-500 text-sm mt-1">Thêm và quản lý diễn giả cho hội thảo</p>
                </div>
                <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition">
                    Thêm Diễn giả
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Diễn giả</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Chức danh</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Số hội thảo</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {speakers.map((speaker) => (
                            <tr key={speaker.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={speaker.photo} alt={speaker.name} className="w-12 h-12 rounded-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'} />
                                        <p className="font-medium text-gray-900">{speaker.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{speaker.title}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{speaker.seminars}</td>
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

            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Thêm Diễn giả</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chức danh</label>
                                <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiểu sử</label>
                                <textarea rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh</label>
                                <input type="file" accept="image/*" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setShowAddForm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Hủy</button>
                                <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
