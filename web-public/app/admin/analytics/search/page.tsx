"use client";

import React, { useState, useEffect } from 'react';
import analyticService, { SearchKeyword, SearchHashtag } from '@/services/analytic.service';

export default function SearchAnalyticsPage() {
    const [activeTab, setActiveTab] = useState<'keywords' | 'hashtags'>('keywords');
    const [keywords, setKeywords] = useState<SearchKeyword[]>([]);
    const [hashtags, setHashtags] = useState<SearchHashtag[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [kData, hData] = await Promise.all([
                analyticService.getKeywords(),
                analyticService.getHashtags()
            ]);
            setKeywords(kData);
            setHashtags(hData);
        } catch (error) {
            console.error('Failed to fetch analytics data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (id: number, type: 'keyword' | 'hashtag', status: boolean) => {
        try {
            if (type === 'keyword') {
                await analyticService.updateKeywordStatus(id, status);
            } else {
                await analyticService.updateHashtagStatus(id, status);
            }
            fetchData();
        } catch (error) {
            alert('Lỗi khi thực hiện hành động');
        }
    };

    const formatSearchCount = (count: number): string => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
        return count.toString();
    };

    const getTopItems = <T extends { times: number }>(items: T[], limit: number): T[] => {
        return [...items].sort((a, b) => b.times - a.times).slice(0, limit);
    };

    const filteredKeywords = keywords.filter(k =>
        k.keyword.toLowerCase().includes(filter.toLowerCase()) ||
        k.keywordVN.toLowerCase().includes(filter.toLowerCase())
    );

    const filteredHashtags = hashtags.filter(h =>
        h.hashtag.toLowerCase().includes(filter.toLowerCase()) ||
        h.hashtagVN.toLowerCase().includes(filter.toLowerCase())
    );

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
                    {loading ? (
                        <div className="p-12 text-center text-gray-500 italic">Đang tải dữ liệu...</div>
                    ) : (
                        activeTab === 'keywords' ? (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Top Từ khóa</h3>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm từ khóa..."
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-xl w-64 outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-3">
                                    {getTopItems(filteredKeywords, 10).map((keyword, index) => (
                                        <div key={keyword.id} className={`flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition ${!keyword.status ? 'bg-gray-50 opacity-60 border-gray-200' : 'border-gray-100'}`}>
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
                                                    <button onClick={() => alert('Xem chi tiết từ khóa: ' + keyword.keywordVN)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200 transition">
                                                        Chi tiết
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(keyword.id, 'keyword', !keyword.status)}
                                                        className={`px-3 py-1 rounded text-xs font-bold transition ${keyword.status ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                                                    >
                                                        {keyword.status ? 'Ẩn' : 'Hiện'}
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
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-xl w-64 outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-3">
                                    {getTopItems(filteredHashtags, 10).map((hashtag, index) => (
                                        <div key={hashtag.id} className={`flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition ${!hashtag.status ? 'bg-gray-50 opacity-60 border-gray-200' : 'border-gray-100'}`}>
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
                                                    <button onClick={() => alert('Xem chi tiết hashtag: #' + hashtag.hashtagVN)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200 transition">
                                                        Chi tiết
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(hashtag.id, 'hashtag', !hashtag.status)}
                                                        className={`px-3 py-1 rounded text-xs font-bold transition ${hashtag.status ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                                                    >
                                                        {hashtag.status ? 'Ẩn' : 'Hiện'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Trending Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Xu hướng Từ khóa</h3>
                    <div className="space-y-3">
                        {keywords.length > 0 ? getTopItems(keywords, 5).map((keyword) => (
                            <div key={keyword.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">{keyword.keywordVN}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 text-sm">↑ 12%</span>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                            style={{ width: `${(keyword.times / (getTopItems(keywords, 1)[0]?.times || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )) : <div className="text-sm text-gray-400 italic">Dữ liệu trống</div>}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Xu hướng Hashtags</h3>
                    <div className="space-y-3">
                        {hashtags.length > 0 ? getTopItems(hashtags, 5).map((hashtag) => (
                            <div key={hashtag.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">#{hashtag.hashtagVN}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 text-sm">↑ 8%</span>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                            style={{ width: `${(hashtag.times / (getTopItems(hashtags, 1)[0]?.times || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )) : <div className="text-sm text-gray-400 italic">Dữ liệu trống</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
