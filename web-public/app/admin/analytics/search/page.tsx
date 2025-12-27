"use client";
import React, { useState } from 'react';
import { SearchHashtag, SearchKeyword, formatSearchCount, getTopItems } from '@/types/search-analytics';

export default function SearchAnalyticsPage() {
    const [activeTab, setActiveTab] = useState<'keywords' | 'hashtags'>('keywords');

    // Mock data
    const keywords: SearchKeyword[] = [
        { id: 1, keyword: 'dau-dau', keywordVN: 'đau đầu', times: 15420, createdDate: '2024-01-15', status: true },
        { id: 2, keyword: 'cam-cum', keywordVN: 'cảm cúm', times: 12350, createdDate: '2024-01-20', status: true },
        { id: 3, keyword: 'tieu-duong', keywordVN: 'tiểu đường', times: 9870, createdDate: '2024-02-01', status: true },
        { id: 4, keyword: 'huyet-ap', keywordVN: 'huyết áp', times: 8560, createdDate: '2024-02-10', status: true },
        { id: 5, keyword: 'dau-bung', keywordVN: 'đau bụng', times: 7230, createdDate: '2024-02-15', status: true },
    ];

    const hashtags: SearchHashtag[] = [
        { id: 1, hashtag: 'suckhoe', hashtagVN: 'sức khỏe', times: 25600, createdDate: '2024-01-10', status: true },
        { id: 2, hashtag: 'duocsi', hashtagVN: 'dược sĩ', times: 18900, createdDate: '2024-01-12', status: true },
        { id: 3, hashtag: 'nhathuoc', hashtagVN: 'nhà thuốc', times: 14500, createdDate: '2024-01-15', status: true },
        { id: 4, hashtag: 'tuvan', hashtagVN: 'tư vấn', times: 12300, createdDate: '2024-01-18', status: true },
        { id: 5, hashtag: 'dieutri', hashtagVN: 'điều trị', times: 10800, createdDate: '2024-01-20', status: true },
    ];

    const totalSearches = keywords.reduce((sum, k) => sum + k.times, 0) +
        hashtags.reduce((sum, h) => sum + h.times, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Phân tích Tìm kiếm</h1>
                    <p className="text-gray-500 text-sm mt-1">Theo dõi từ khóa và hashtag phổ biến</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng tìm kiếm', value: formatSearchCount(totalSearches), icon: 'flaticon-search', color: 'bg-blue-500' },
                    { label: 'Từ khóa', value: keywords.length.toString(), icon: 'flaticon-keyword', color: 'bg-green-500' },
                    { label: 'Hashtags', value: hashtags.length.toString(), icon: 'flaticon-hashtag', color: 'bg-purple-500' },
                    { label: 'Hôm nay', value: '2.5K', icon: 'flaticon-chart', color: 'bg-orange-500' },
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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="border-b border-gray-100">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('keywords')}
                            className={`flex-1 px-6 py-4 font-bold ${activeTab === 'keywords'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            🔍 Từ khóa ({keywords.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('hashtags')}
                            className={`flex-1 px-6 py-4 font-bold ${activeTab === 'hashtags'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            # Hashtags ({hashtags.length})
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === 'keywords' ? (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Top Từ khóa</h3>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm từ khóa..."
                                    className="px-4 py-2 border border-gray-200 rounded-xl w-64"
                                />
                            </div>
                            <div className="space-y-3">
                                {getTopItems(keywords, 10).map((keyword, index) => (
                                    <div key={keyword.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' :
                                                    index === 1 ? 'bg-gray-400' :
                                                        index === 2 ? 'bg-orange-600' :
                                                            'bg-gray-300'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{keyword.keywordVN}</p>
                                                <p className="text-sm text-gray-500">{keyword.keyword}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-blue-600">{formatSearchCount(keyword.times)}</p>
                                                <p className="text-xs text-gray-500">lượt tìm kiếm</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                                    Chi tiết
                                                </button>
                                                <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                                                    Ẩn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Top Hashtags</h3>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm hashtag..."
                                    className="px-4 py-2 border border-gray-200 rounded-xl w-64"
                                />
                            </div>
                            <div className="space-y-3">
                                {getTopItems(hashtags, 10).map((hashtag, index) => (
                                    <div key={hashtag.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' :
                                                    index === 1 ? 'bg-gray-400' :
                                                        index === 2 ? 'bg-orange-600' :
                                                            'bg-gray-300'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">#{hashtag.hashtagVN}</p>
                                                <p className="text-sm text-gray-500">#{hashtag.hashtag}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-purple-600">{formatSearchCount(hashtag.times)}</p>
                                                <p className="text-xs text-gray-500">lượt sử dụng</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                                    Chi tiết
                                                </button>
                                                <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                                                    Ẩn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Trending Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Xu hướng Từ khóa</h3>
                    <div className="space-y-3">
                        {keywords.slice(0, 5).map((keyword) => (
                            <div key={keyword.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">{keyword.keywordVN}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 text-sm">↑ 12%</span>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${(keyword.times / keywords[0].times) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Xu hướng Hashtags</h3>
                    <div className="space-y-3">
                        {hashtags.slice(0, 5).map((hashtag) => (
                            <div key={hashtag.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">#{hashtag.hashtagVN}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 text-sm">↑ 8%</span>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full"
                                            style={{ width: `${(hashtag.times / hashtags[0].times) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
