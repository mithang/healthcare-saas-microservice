"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const CHALLENGES = [
    { id: 1, title: 'Thử thách 10,000 bước chân', participants: 15420, daysLeft: 5, reward: 'Voucher 50k', image: '/img/challenge-run.jpg', color: 'bg-orange-500' },
    { id: 2, title: '7 ngày Ăn sạch (Eat Clean)', participants: 8200, daysLeft: 12, reward: 'Ebook thực đơn', image: '/img/challenge-eat.jpg', color: 'bg-green-500' },
    { id: 3, title: 'Uống đủ 2 lít nước', participants: 22100, daysLeft: 2, reward: 'Huy hiệu', image: '/img/challenge-water.jpg', color: 'bg-blue-500' },
];

export default function ChallengesPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Thử thách Sức khỏe</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Tham gia thử thách, rèn luyện thói quen tốt và nhận quà hấp dẫn.</p>
                </div>

                {/* Featured Challenge */}
                <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl group">
                    <img src="/img/challenge-hero.jpg" alt="Featured" className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-2.jpg'} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                        <span className="bg-yellow-400 text-black font-bold px-4 py-1 rounded-full w-fit mb-4 text-sm animate-pulse">Sự kiện HOT</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Marathon Trực tuyến 2024</h2>
                        <p className="text-gray-200 mb-8 max-w-xl">Chinh phục 42km trong 30 ngày. Nhận huy chương thật và áo thun Finisher.</p>
                        <button className="bg-white text-gray-900 font-bold px-8 py-3 rounded-xl w-fit hover:bg-yellow-400 transition-colors">Tham gia ngay</button>
                    </div>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CHALLENGES.map(c => (
                        <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all flex flex-col">
                            <div className={`h-2 ${c.color}`}></div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Còn {c.daysLeft} ngày</div>
                                    <div className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded flex items-center gap-1">
                                        <i className="fi flaticon-star"></i> {c.reward}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
                                <div className="mt-auto pt-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>)}
                                        </div>
                                        <span className="text-xs text-gray-500 font-bold">+{c.participants.toLocaleString()} người tham gia</span>
                                    </div>
                                    <button className={`w-full py-2.5 rounded-lg font-bold text-white ${c.color} opacity-90 hover:opacity-100 transition-opacity`}>
                                        Tham gia
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
