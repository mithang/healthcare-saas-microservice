"use client";

import React, { useState, useEffect } from 'react';
import aiService, { Recommendation, AIStats, ModelPerformance, RecommendationStatus } from '@/services/ai.service';

export default function AIRecommendationsPage() {
    const [activeTab, setActiveTab] = useState('doctors');
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [stats, setStats] = useState<AIStats | null>(null);
    const [performance, setPerformance] = useState<ModelPerformance | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const typeMap: Record<string, string> = {
                'doctors': 'DOCTOR',
                'diagnosis': 'DIAGNOSIS',
                'medications': 'MEDICATION'
            };

            const [recsData, statsData, perfData] = await Promise.all([
                aiService.getRecommendations(typeMap[activeTab]),
                aiService.getAIStats(),
                aiService.getModelPerformance()
            ]);

            setRecommendations(recsData);
            setStats(statsData);
            setPerformance(perfData);
        } catch (error) {
            console.error('Failed to fetch AI data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleFeedback = async (id: number, status: RecommendationStatus) => {
        try {
            await aiService.handleFeedback(id, status);
            // Refresh recommendations to reflect status change or remove from list if filtered by status
            fetchData();
        } catch (error) {
            alert('Lỗi khi thực hiện hành động');
        }
    };

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
                    { label: 'Độ chính xác', value: stats ? `${(stats.accuracy * 100).toFixed(0)}%` : '...', icon: 'flaticon-target', color: 'bg-green-500' },
                    { label: 'Gợi ý/ngày', value: stats ? stats.dailySuggestions.toLocaleString() : '...', icon: 'flaticon-chart', color: 'bg-blue-500' },
                    { label: 'Chấp nhận', value: stats ? `${(stats.acceptanceRate * 100).toFixed(0)}%` : '...', icon: 'flaticon-checked', color: 'bg-purple-500' },
                    { label: 'Model version', value: stats ? stats.modelVersion : '...', icon: 'flaticon-ai', color: 'bg-orange-500' },
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
                {loading ? (
                    <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 italic">Đang tải gợi ý từ AI...</div>
                ) : recommendations.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">Không có gợi ý nào.</div>
                ) : (
                    recommendations.map((rec, i) => (
                        <div key={rec.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative">
                            {rec.status !== 'PENDING' && (
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${rec.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {rec.status === 'ACCEPTED' ? 'Đã chấp nhận' : 'Đã từ chối'}
                                </div>
                            )}
                            <div className="flex items-start justify-between mb-4 pr-32">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-1">Bệnh nhân: {rec.patientName}</h3>
                                    <p className="text-sm text-gray-600 mb-2">Triệu chứng: {rec.symptoms}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-gray-600">Độ tin cậy:</span>
                                        <span className="text-2xl font-bold text-green-600">{(rec.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: `${rec.confidence * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">
                                    {rec.type === 'DOCTOR' ? 'Gợi ý bác sĩ:' : rec.type === 'DIAGNOSIS' ? 'Gợi ý chẩn đoán:' : 'Gợi ý thuốc:'}
                                </p>
                                <p className="font-bold text-blue-700 text-lg mb-2">{rec.recommendedItem}</p>
                                <p className="text-sm text-gray-600">Lý do: {rec.reason}</p>
                            </div>
                            {rec.status === 'PENDING' && (
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleFeedback(rec.id, 'ACCEPTED')}
                                        className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-bold hover:bg-green-200 transition"
                                    >
                                        Chấp nhận
                                    </button>
                                    <button
                                        onClick={() => handleFeedback(rec.id, 'REJECTED')}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition"
                                    >
                                        Từ chối
                                    </button>
                                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-200 transition">
                                        Xem chi tiết
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Model Performance */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Hiệu suất Model</h3>
                {performance ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Precision</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: `${performance.precision * 100}%` }}></div>
                                </div>
                                <span className="font-bold text-gray-900">{(performance.precision * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Recall</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${performance.recall * 100}%` }}></div>
                                </div>
                                <span className="font-bold text-gray-900">{(performance.recall * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">F1 Score</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500" style={{ width: `${performance.f1Score * 100}%` }}></div>
                                </div>
                                <span className="font-bold text-gray-900">{(performance.f1Score * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-500 italic">Đang tải hiệu suất...</div>
                )}
            </div>
        </div>
    );
}
