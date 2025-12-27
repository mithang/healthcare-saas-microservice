"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const USERS = [
    { name: 'Nguyễn A', age: 28, activity: 'Chạy bộ', location: 'Q1, TP.HCM', avatar: '🏃' },
    { name: 'Trần B', age: 32, activity: 'Yoga', location: 'Q3, TP.HCM', avatar: '🧘' },
    { name: 'Lê C', age: 25, activity: 'Gym', location: 'Q7, TP.HCM', avatar: '💪' },
];

export default function WorkoutBuddyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Tìm bạn Tập luyện</h1>
                <p className="text-gray-500 mb-12">Kết nối người cùng sở thích - Động lực tập luyện</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {USERS.map((user, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all">
                            <div className="text-6xl mb-4">{user.avatar}</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{user.name}, {user.age}</h3>
                            <p className="text-primary font-bold mb-2">{user.activity}</p>
                            <p className="text-sm text-gray-500 mb-4">{user.location}</p>
                            <button className="w-full bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-primary-dark">
                                Kết nối
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
