"use client";
import React, { useState } from 'react';

export default function AIRecommendationsPage() {
    const [activeTab, setActiveTab] = useState('doctors');

    const doctorRecommendations = [
        { patient: 'Nguyễn Văn A', symptoms: 'Đau ngực, khó thở', recommended: 'BS. Trần Tim Mạch', confidence: 95, reason: 'Chuyên khoa phù hợp, kinh nghiệm 15 năm' },
        { patient: 'Trần Thị B', symptoms: 'Sốt cao, ho', recommended: 'BS. Lê Nhi Khoa', confidence: 88, reason: 'Triệu chứng phù hợp với chuyên môn' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">AI Recommendations</h1>
                    <p className="text-gray-500 text-sm mt-1">Gợi ý thông minh dựa trên Machine Learning</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-settings mr-2"></i> Cấu hình AI
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Độ chính xác', value: '92%', icon: 'flaticon-target', color: 'bg-green-500' },
                    { label: 'Gợi ý/ngày', value: '1,234', icon: 'flaticon-chart', color: 'bg-blue-500' },
                    { label: 'Chấp nhận', value: '85%', icon: 'flaticon-checked', color: 'bg-purple-500' },
                    { label: 'Model version', value: 'v2.5', icon: 'flaticon-ai', color: 'bg-orange-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                {['doctors', 'diagnosis', 'medications'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === tab ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200'
                            }`}
                    >
                        {tab === 'doctors' ? 'Gợi ý Bác sĩ' : tab === 'diagnosis' ? 'Chẩn đoán' : 'Thuốc'}
                    </button>
                ))}
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
                {doctorRecommendations.map((rec, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-1">Bệnh nhân: {rec.patient}</h3>
                                <p className="text-sm text-gray-600 mb-2">Triệu chứng: {rec.symptoms}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm text-gray-600">Độ tin cậy:</span>
                                    <span className="text-2xl font-bold text-green-600">{rec.confidence}%</span>
                                </div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: `${rec.confidence}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-gray-600 mb-1">Gợi ý bác sĩ:</p>
                            <p className="font-bold text-blue-700 text-lg mb-2">{rec.recommended}</p>
                            <p className="text-sm text-gray-600">Lý do: {rec.reason}</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-bold">
                                Chấp nhận
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold">
                                Từ chối
                            </button>
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold">
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Model Performance */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Hiệu suất Model</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Precision</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: '91%' }}></div>
                            </div>
                            <span className="font-bold text-gray-900">91%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Recall</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: '89%' }}></div>
                            </div>
                            <span className="font-bold text-gray-900">89%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">F1 Score</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: '90%' }}></div>
                            </div>
                            <span className="font-bold text-gray-900">90%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
