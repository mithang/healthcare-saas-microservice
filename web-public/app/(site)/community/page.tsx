"use client";
import React, { useState } from 'react';

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'clinical' | 'research' | 'news'>('all');
    const [showCreatePost, setShowCreatePost] = useState(false);

    const posts = [
        {
            id: 1,
            author: 'Dr. Nguyen Van A',
            avatar: '/img/avatar-1.jpg',
            specialty: 'Tim mạch',
            time: '2 giờ trước',
            category: 'clinical',
            content: 'Chia sẻ ca bệnh: Bệnh nhân nam 65 tuổi, tăng huyết áp, đau ngực. Các bác sĩ có kinh nghiệm xử lý tình huống tương tự?',
            likes: 24,
            comments: 8,
            shares: 3
        },
        {
            id: 2,
            author: 'Dược sĩ Tran Thi B',
            avatar: '/img/avatar-2.jpg',
            specialty: 'Dược lâm sàng',
            time: '5 giờ trước',
            category: 'research',
            content: 'Nghiên cứu mới về tương tác thuốc Warfarin và kháng sinh. Link bài báo đính kèm.',
            likes: 45,
            comments: 12,
            shares: 18
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Cộng đồng Y tế</h1>
                    <button
                        onClick={() => setShowCreatePost(true)}
                        className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition flex items-center gap-2"
                    >
                        <i className="fi flaticon-add"></i> Tạo bài viết
                    </button>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {[
                        { key: 'all', label: 'Tất cả' },
                        { key: 'clinical', label: 'Lâm sàng' },
                        { key: 'research', label: 'Nghiên cứu' },
                        { key: 'news', label: 'Tin tức' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${activeTab === tab.key
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            {/* Author Info */}
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={post.avatar}
                                    alt={post.author}
                                    className="w-12 h-12 rounded-full object-cover"
                                    onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{post.author}</h3>
                                    <p className="text-sm text-gray-500">{post.specialty} • {post.time}</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                    {post.category === 'clinical' ? 'Lâm sàng' : 'Nghiên cứu'}
                                </span>
                            </div>

                            {/* Content */}
                            <p className="text-gray-700 mb-4">{post.content}</p>

                            {/* Actions */}
                            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition">
                                    <i className="fi flaticon-heart"></i>
                                    <span className="font-medium">{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition">
                                    <i className="fi flaticon-comment"></i>
                                    <span className="font-medium">{post.comments}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition">
                                    <i className="fi flaticon-share"></i>
                                    <span className="font-medium">{post.shares}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Post Modal */}
                {showCreatePost && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Tạo bài viết mới</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Chủ đề</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none">
                                        <option>Lâm sàng</option>
                                        <option>Nghiên cứu</option>
                                        <option>Tin tức</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung</label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"
                                        placeholder="Chia sẻ suy nghĩ của bạn..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowCreatePost(false)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => setShowCreatePost(false)}
                                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark"
                                >
                                    Đăng bài
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
