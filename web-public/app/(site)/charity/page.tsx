"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const CAMPAIGNS = [
    { id: 1, title: 'Trái tim cho em', org: 'Quỹ Bảo trợ Trẻ em', target: 500000000, current: 350000000, image: '/img/charity-1.jpg', donors: 1250 },
    { id: 2, title: 'Chung tay đẩy lùi ung thư', org: 'Bệnh viện K', target: 2000000000, current: 800000000, image: '/img/charity-2.jpg', donors: 3400 },
    { id: 3, title: 'Mắt sáng học đường', org: 'Bệnh viện Mắt TW', target: 300000000, current: 280000000, image: '/img/charity-3.jpg', donors: 980 },
];

const DONORS = [
    { name: 'Nguyễn Văn A', amount: '5.000.000đ', time: '5 phút trước' },
    { name: 'Trần Thị B', amount: '2.000.000đ', time: '12 phút trước' },
    { name: 'Ẩn danh', amount: '500.000đ', time: '30 phút trước' },
    { name: 'Công ty XYZ', amount: '10.000.000đ', time: '1 giờ trước' },
];

export default function CharityPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 text-pink-600">Quỹ Tấm lòng vàng</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Chung tay chia sẻ yêu thương tới những hoàn cảnh khó khăn trong cộng đồng.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Campaigns */}
                    <div className="lg:w-2/3 space-y-8">
                        {CAMPAIGNS.map(camp => (
                            <div key={camp.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-all">
                                <div className="md:w-2/5 relative">
                                    <img src={camp.image} alt={camp.title} className="w-full h-64 md:h-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-3.jpg'} />
                                    <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">Đang gây quỹ</div>
                                </div>
                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="mb-2 text-sm text-gray-500 font-bold uppercase">{camp.org}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{camp.title}</h3>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-bold text-pink-600">{camp.current.toLocaleString()}đ</span>
                                            <span className="text-gray-400">{Math.round(camp.current / camp.target * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full" style={{ width: `${Math.min(camp.current / camp.target * 100, 100)}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>với {camp.donors} lượt quyên góp</span>
                                            <span>Mục tiêu: {camp.target.toLocaleString()}đ</span>
                                        </div>
                                    </div>

                                    <button className="mt-auto w-full bg-pink-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-500/30 hover:bg-pink-700 transition-all">
                                        Quyên góp ngay
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Leaderboard */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <i className="fi flaticon-medal text-yellow-500"></i> Bảng vàng vinh danh
                            </h3>
                            <div className="space-y-4">
                                {DONORS.map((d, idx) => (
                                    <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center font-bold text-pink-600">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-gray-900">{d.name}</div>
                                            <div className="text-xs text-gray-400">{d.time}</div>
                                        </div>
                                        <div className="font-bold text-pink-600 text-sm">{d.amount}</div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-2 text-sm font-bold text-gray-500 hover:text-pink-600">Xem tất cả</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
