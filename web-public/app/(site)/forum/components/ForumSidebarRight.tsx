'use client';

import React from 'react';
import Link from 'next/link';

const trendingTopics = [
    { id: 1, title: 'Những lưu ý khi tiêm vaccine cúm mùa', views: '12.5k' },
    { id: 2, title: 'Chế độ ăn Keto có thực sự tốt?', views: '8.2k' },
    { id: 3, title: 'Review bệnh viện đa khoa X', views: '5.1k' },
    { id: 4, title: 'Cách xử lý khi trẻ bị sốt cao', views: '4.9k' },
    { id: 5, title: 'Top 5 bài tập yoga cho dân văn phòng', views: '3.4k' },
];

export default function ForumSidebarRight() {
    return (
        <div className="w-80 flex-shrink-0 hidden xl:block">
            <div className="space-y-6 sticky top-24">
                {/* Create Button */}
                <Link
                    href="/forum/create"
                    className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    <i className="fi flaticon-add mr-2"></i>
                    Tạo bài viết mới
                </Link>

                {/* Trending Widget */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Đang thảo luận sôi nổi</h3>
                    <div className="space-y-4">
                        {trendingTopics.map((topic, index) => (
                            <div key={topic.id} className="flex gap-3 items-start">
                                <span className="text-xl font-bold text-gray-200">{index + 1}</span>
                                <div>
                                    <Link href={`/forum/${topic.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600 line-clamp-2 transition-colors">
                                        {topic.title}
                                    </Link>
                                    <p className="text-xs text-gray-500 mt-1">{topic.views} lượt xem</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rules/Info Widget */}
                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold">
                        <i className="fi flaticon-info"></i>
                        <span>Nội quy diễn đàn</span>
                    </div>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        Vui lòng tôn trọng các thành viên khác. Không spam, quảng cáo trái phép hoặc chia sẻ thông tin y tế sai lệch.
                    </p>
                </div>
            </div>
        </div>
    );
}
