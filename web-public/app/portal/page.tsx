'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';

const data = [
    { name: 'T2', views: 4000, bookings: 2400 },
    { name: 'T3', views: 3000, bookings: 1398 },
    { name: 'T4', views: 2000, bookings: 9800 },
    { name: 'T5', views: 2780, bookings: 3908 },
    { name: 'T6', views: 1890, bookings: 4800 },
    { name: 'T7', views: 2390, bookings: 3800 },
    { name: 'CN', views: 3490, bookings: 4300 },
];

const StatCard = ({ title, value, icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            <p className={`text-sm mt-2 flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <i className={`fi ${trend >= 0 ? 'flaticon-up-arrow' : 'flaticon-down-arrow'} mr-1 text-xs`}></i>
                {Math.abs(trend)}% so với tuần trước
            </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg ${color}`}>
            <i className={`fi ${icon}`}></i>
        </div>
    </div>
);

export default function PortalDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Lượt xem Profile" value="12.5K" icon="flaticon-view" color="bg-blue-500" trend={12.5} />
                <StatCard title="Lượt thích" value="845" icon="flaticon-like" color="bg-red-500" trend={-2.4} />
                <StatCard title="Lịch đặt khám" value="128" icon="flaticon-calendar" color="bg-green-500" trend={8.2} />
                <StatCard title="Câu hỏi mới" value="15" icon="flaticon-speech-bubble" color="bg-purple-500" trend={5.0} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Thống kê truy cập</h3>
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500">
                            <option>7 ngày qua</option>
                            <option>30 ngày qua</option>
                        </select>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Hoạt động gần đây</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">Nguyễn Văn B đã đặt lịch khám</p>
                                    <p className="text-xs text-gray-500 mt-1">10 phút trước • Khám tổng quát</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                        Xem tất cả
                    </button>
                </div>
            </div>
        </div>
    );
}
