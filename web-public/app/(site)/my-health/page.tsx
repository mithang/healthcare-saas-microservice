"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

const HEALTH_DATA = {
    weight: [{ date: '01/12', value: 68 }, { date: '08/12', value: 67.5 }, { date: '15/12', value: 67 }],
    bloodPressure: [{ date: '01/12', sys: 120, dia: 80 }, { date: '08/12', sys: 118, dia: 78 }],
    glucose: [{ date: '01/12', value: 95 }, { date: '08/12', value: 92 }]
};

const MEDICATIONS = [
    { name: 'Metformin 500mg', time: '08:00 & 20:00', status: 'active' },
    { name: 'Vitamin D3', time: '08:00', status: 'active' }
];

export default function MyHealthPage() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Hồ sơ Sức khỏe</h1>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar">
                    {['overview', 'vitals', 'medications', 'appointments'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab === 'overview' ? 'Tổng quan' : tab === 'vitals' ? 'Chỉ số' : tab === 'medications' ? 'Thuốc' : 'Lịch hẹn'}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <i className="fi flaticon-weight-scale text-3xl text-blue-500"></i>
                                <span className="text-xs text-gray-400">Hôm nay</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">67 kg</div>
                            <div className="text-sm text-green-600 font-bold">↓ -1kg so với tuần trước</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <i className="fi flaticon-heart text-3xl text-red-500"></i>
                                <span className="text-xs text-gray-400">Hôm nay</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">118/78</div>
                            <div className="text-sm text-gray-500">mmHg - Bình thường</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <i className="fi flaticon-blood text-3xl text-orange-500"></i>
                                <span className="text-xs text-gray-400">Hôm nay</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">92 mg/dL</div>
                            <div className="text-sm text-gray-500">Đường huyết - Tốt</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <i className="fi flaticon-pill text-3xl text-green-500"></i>
                                <span className="text-xs text-gray-400">Hôm nay</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">2/2</div>
                            <div className="text-sm text-green-600 font-bold">✓ Đã uống đủ thuốc</div>
                        </div>
                    </div>
                )}

                {activeTab === 'vitals' && (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Biểu đồ Cân nặng</h3>
                        <div className="h-64 flex items-end justify-around gap-4">
                            {HEALTH_DATA.weight.map((item, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center">
                                    <div className="w-full bg-blue-100 rounded-t-lg relative" style={{ height: `${item.value * 3}px` }}>
                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-900">{item.value}kg</span>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-2">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'medications' && (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Thuốc đang dùng</h3>
                        <div className="space-y-4">
                            {MEDICATIONS.map((med, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <i className="fi flaticon-pill text-green-600 text-xl"></i>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{med.name}</div>
                                            <div className="text-sm text-gray-500">{med.time}</div>
                                        </div>
                                    </div>
                                    <button className="text-primary font-bold text-sm hover:underline">Nhắc nhở</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
