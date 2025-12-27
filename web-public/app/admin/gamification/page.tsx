"use client";
import React, { useState } from 'react';

export default function GamificationPage() {
    const leaderboard = [
        { rank: 1, name: 'Nguyễn Văn A', points: 12500, badges: 15, level: 'Platinum' },
        { rank: 2, name: 'Trần Thị B', points: 11200, badges: 12, level: 'Gold' },
        { rank: 3, name: 'Lê Văn C', points: 9800, badges: 10, level: 'Gold' },
    ];

    const badges = [
        { id: 1, name: 'Early Bird', desc: 'Đăng nhập sớm 7 ngày liên tiếp', icon: '🌅', awarded: 234 },
        { id: 2, name: 'Health Champion', desc: 'Hoàn thành 30 nhiệm vụ sức khỏe', icon: '🏆', awarded: 156 },
        { id: 3, name: 'Social Butterfly', desc: 'Chia sẻ 10 bài viết', icon: '🦋', awarded: 189 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gamification</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý điểm thưởng, huy hiệu và nhiệm vụ</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">
                        Tạo nhiệm vụ
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                        Tạo huy hiệu
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng điểm phát', value: '2.5M', icon: 'flaticon-star', color: 'bg-yellow-500' },
                    { label: 'Người chơi', value: '15,234', icon: 'flaticon-users', color: 'bg-blue-500' },
                    { label: 'Huy hiệu', value: '45', icon: 'flaticon-badge', color: 'bg-purple-500' },
                    { label: 'Nhiệm vụ', value: '120', icon: 'flaticon-task', color: 'bg-green-500' },
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leaderboard */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Bảng xếp hạng</h3>
                    <div className="space-y-3">
                        {leaderboard.map((user) => (
                            <div key={user.rank} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : 'bg-orange-600'
                                    }`}>
                                    {user.rank}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.level} • {user.badges} huy hiệu</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary">{user.points.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">điểm</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Badges */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Huy hiệu phổ biến</h3>
                    <div className="space-y-3">
                        {badges.map((badge) => (
                            <div key={badge.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                                <div className="text-4xl">{badge.icon}</div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 mb-1">{badge.name}</p>
                                    <p className="text-sm text-gray-600 mb-2">{badge.desc}</p>
                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">
                                        {badge.awarded} người đạt được
                                    </span>
                                </div>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">
                                    Chỉnh sửa
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Points System */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Hệ thống điểm</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { action: 'Đăng nhập hàng ngày', points: 10 },
                        { action: 'Hoàn thành khóa học', points: 100 },
                        { action: 'Chia sẻ bài viết', points: 20 },
                        { action: 'Đánh giá bác sĩ', points: 15 },
                        { action: 'Tham gia hội thảo', points: 50 },
                        { action: 'Giới thiệu bạn bè', points: 200 },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl">
                            <span className="text-sm text-gray-700">{item.action}</span>
                            <span className="font-bold text-primary">+{item.points}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
