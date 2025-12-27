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

            {loading ? (
                <div className="p-8 text-center text-gray-500">Đang tải...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {speakers.map((speaker) => (
                        <div key={speaker.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center group relative">
                            <button
                                onClick={() => handleDelete(speaker.id)}
                                className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition"
                            >
                                <i className="fi flaticon-delete"></i>
                            </button>
                            <img src={speaker.photo} alt={speaker.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary/10 object-cover" onError={(e) => (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150'} />
                            <h3 className="font-bold text-gray-900">{speaker.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{speaker.title}</p>
                            <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs">
                                <i className="fi flaticon-calendar text-xs"></i>
                                {speaker.seminars} Hội thảo
                            </div>
                        </div>
                    ))}
                    {speakers.length === 0 && (
                        <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                            Chưa có diễn giả nào
                        </div>
                    )}
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Thêm Diễn giả mới</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ví dụ: TS. Nguyễn Văn A"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chức danh / Học hàm</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ví dụ: Giám đốc Bệnh viện"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiểu sử tóm tắt</label>
                                <textarea
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh đại diện</label>
                                <input type="file" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Hủy</button>
                                <button onClick={handleAddSpeaker} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
