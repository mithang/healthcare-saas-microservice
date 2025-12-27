"use client";
import React from 'react';

export default function MarketingCampaignsPage() {
    const campaigns = [
        { id: 1, name: 'Khuyến mãi Tết 2025', type: 'Email', status: 'active', sent: 15000, opened: 8500, clicked: 2100, budget: '10,000,000 ₫' },
        { id: 2, name: 'Chương trình Khám miễn phí', type: 'SMS', status: 'completed', sent: 25000, opened: 22000, clicked: 5500, budget: '15,000,000 ₫' },
        { id: 3, name: 'Giới thiệu Telemedicine', type: 'Push', status: 'draft', sent: 0, opened: 0, clicked: 0, budget: '5,000,000 ₫' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Chiến dịch Marketing</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý và theo dõi hiệu quả</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-add mr-2"></i> Tạo chiến dịch
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng chiến dịch', value: '24', icon: 'flaticon-campaign', color: 'bg-blue-500' },
                    { label: 'Đang chạy', value: '8', icon: 'flaticon-play', color: 'bg-green-500' },
                    { label: 'Tổng gửi', value: '125K', icon: 'flaticon-send', color: 'bg-purple-500' },
                    { label: 'Tỷ lệ mở', value: '42%', icon: 'flaticon-chart', color: 'bg-orange-500' },
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

            {/* Campaigns List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Danh sách chiến dịch</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Tên chiến dịch</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Loại</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Đã gửi</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Đã mở</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Click</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Ngân sách</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{campaign.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                            {campaign.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{campaign.sent.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {campaign.opened.toLocaleString()}
                                        <span className="text-xs text-gray-500 ml-1">
                                            ({campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {campaign.clicked.toLocaleString()}
                                        <span className="text-xs text-gray-500 ml-1">
                                            ({campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : 0}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{campaign.budget}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                                                campaign.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {campaign.status === 'active' ? 'Đang chạy' :
                                                campaign.status === 'completed' ? 'Hoàn thành' : 'Nháp'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                                Xem
                                            </button>
                                            {campaign.status === 'draft' && (
                                                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                                                    Chạy
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Hiệu quả theo kênh</h3>
                    <div className="space-y-3">
                        {[
                            { channel: 'Email', sent: 45000, rate: 38, color: 'bg-blue-500' },
                            { channel: 'SMS', sent: 35000, rate: 62, color: 'bg-green-500' },
                            { channel: 'Push', sent: 25000, rate: 45, color: 'bg-purple-500' },
                        ].map((ch, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-bold text-gray-700">{ch.channel}</span>
                                    <span className="text-sm text-gray-600">{ch.sent.toLocaleString()} gửi • {ch.rate}% mở</span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${ch.color}`} style={{ width: `${ch.rate}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">ROI Chiến dịch</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Khuyến mãi Tết', spent: '10M', revenue: '45M', roi: 350 },
                            { name: 'Khám miễn phí', spent: '15M', revenue: '38M', roi: 153 },
                            { name: 'Telemedicine', spent: '5M', revenue: '22M', roi: 340 },
                        ].map((campaign, i) => (
                            <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl">
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{campaign.name}</p>
                                    <p className="text-xs text-gray-600">Chi: {campaign.spent} • Thu: {campaign.revenue}</p>
                                </div>
                                <span className="text-lg font-bold text-green-600">+{campaign.roi}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
