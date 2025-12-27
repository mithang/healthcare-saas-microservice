"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductKnowledgePage() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [userPoints, setUserPoints] = useState(450);

    const videos = [
        { id: 1, title: 'Giới thiệu Sản phẩm A', duration: '12:30', points: 50, completed: true, thumbnail: '/img/video-1.jpg' },
        { id: 2, title: 'Hướng dẫn Sử dụng Sản phẩm B', duration: '18:45', points: 75, completed: false, thumbnail: '/img/video-2.jpg' },
        { id: 3, title: 'Tính năng Nâng cao Sản phẩm C', duration: '25:10', points: 100, completed: false, thumbnail: '/img/video-3.jpg' },
    ];

    const leaderboard = [
        { rank: 1, name: 'Nguyen Van A', points: 1250, avatar: '/img/avatar-1.jpg' },
        { rank: 2, name: 'Tran Thi B', points: 980, avatar: '/img/avatar-2.jpg' },
        { rank: 3, name: 'Le Van C', points: 850, avatar: '/img/avatar-3.jpg' },
        { rank: 4, name: 'Bạn', points: userPoints, avatar: '/img/avatar-4.jpg', isUser: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kiến thức Sản phẩm</h1>
                        <p className="text-gray-500 mt-1">Học và kiếm điểm từ các video đào tạo</p>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500">Điểm của bạn</p>
                        <p className="text-2xl font-bold text-primary">{userPoints}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Library */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">Thư viện Video</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {videos.map((video) => (
                                <div key={video.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
                                    <div className="relative">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                                        />
                                        {video.completed && (
                                            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                ✓ Hoàn thành
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-2">{video.title}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-yellow-600 font-bold">+{video.points} điểm</span>
                                            <button
                                                onClick={() => setShowQuiz(true)}
                                                className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition text-sm"
                                            >
                                                {video.completed ? 'Xem lại' : 'Học ngay'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">Bảng xếp hạng</h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="space-y-4">
                                {leaderboard.map((user) => (
                                    <div
                                        key={user.rank}
                                        className={`flex items-center gap-4 p-3 rounded-xl ${user.isUser ? 'bg-blue-50 border-2 border-blue-200' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${user.rank === 1 ? 'bg-yellow-500 text-white' :
                                                user.rank === 2 ? 'bg-gray-400 text-white' :
                                                    user.rank === 3 ? 'bg-orange-600 text-white' :
                                                        'bg-gray-200 text-gray-700'
                                            }`}>
                                            {user.rank}
                                        </div>
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                            onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                                        />
                                        <div className="flex-1">
                                            <p className={`font-bold ${user.isUser ? 'text-blue-700' : 'text-gray-900'}`}>{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.points} điểm</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quiz Modal */}
                {showQuiz && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Trắc nghiệm sau Video</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="font-bold text-gray-900 mb-3">Câu 1: Sản phẩm A có tác dụng chính là gì?</p>
                                    <div className="space-y-2">
                                        {['Giảm đau', 'Hạ sốt', 'Kháng viêm', 'Tất cả các đáp án trên'].map((option, idx) => (
                                            <label key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                                                <input type="radio" name="q1" className="w-4 h-4" />
                                                <span className="text-gray-700">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowQuiz(false)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => { setShowQuiz(false); setUserPoints(userPoints + 50); }}
                                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark"
                                >
                                    Nộp bài
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
