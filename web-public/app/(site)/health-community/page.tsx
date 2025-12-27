"use client";
import React, { useState } from 'react';

export default function HealthCommunityPage() {
    const [activeTab, setActiveTab] = useState<'discussions' | 'cases' | 'qa'>('discussions');

    const discussions = [
        { id: 1, title: 'Cập nhật hướng dẫn điều trị COVID-19', author: 'Dr. Nguyen A', specialty: 'Hô hấp', replies: 24, views: 450 },
        { id: 2, title: 'Kinh nghiệm xử lý biến chứng sau phẫu thuật', author: 'Dr. Tran B', specialty: 'Ngoại khoa', replies: 18, views: 320 },
    ];

    const cases = [
        { id: 1, title: 'Ca bệnh: Nam 45 tuổi, đau ngực cấp', author: 'Dr. Le C', specialty: 'Tim mạch', status: 'Đang thảo luận' },
        { id: 2, title: 'Nữ 32 tuổi, sốt cao kéo dài', author: 'Dr. Pham D', specialty: 'Nội khoa', status: 'Đã giải quyết' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Cộng đồng Y tế Chuyên nghiệp</h1>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {[
                        { key: 'discussions', label: 'Thảo luận' },
                        { key: 'cases', label: 'Ca bệnh' },
                        { key: 'qa', label: 'Hỏi đáp' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === tab.key
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {activeTab === 'discussions' && discussions.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                    <span className="flex items-center gap-1">
                                        <i className="fi flaticon-user"></i> {item.author}
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">{item.specialty}</span>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <span>{item.replies} trả lời</span>
                                    <span>{item.views} lượt xem</span>
                                </div>
                            </div>
                        ))}

                        {activeTab === 'cases' && cases.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Đang thảo luận'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <i className="fi flaticon-user"></i> {item.author}
                                    </span>
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">{item.specialty}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Chuyên khoa</h3>
                            <div className="space-y-2">
                                {['Tim mạch', 'Nội khoa', 'Ngoại khoa', 'Nhi khoa', 'Dược lâm sàng'].map((specialty) => (
                                    <button key={specialty} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm">
                                        {specialty}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Chuyên gia hàng đầu</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Dr. Nguyen A', specialty: 'Tim mạch', verified: true },
                                    { name: 'Dr. Tran B', specialty: 'Ngoại khoa', verified: true },
                                ].map((expert, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-1">
                                                <p className="font-bold text-gray-900 text-sm">{expert.name}</p>
                                                {expert.verified && <i className="fi flaticon-checked text-blue-500 text-xs"></i>}
                                            </div>
                                            <p className="text-xs text-gray-500">{expert.specialty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
