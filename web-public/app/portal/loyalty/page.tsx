"use client";
import React, { useState } from 'react';
import { LoyaltyMember, Reward, MEMBER_TIERS, getTierInfo } from '@/types/loyalty';

export default function LoyaltyPage() {
    const [activeTab, setActiveTab] = useState<'members' | 'rewards'>('members');

    // Mock data
    const members: LoyaltyMember[] = [
        {
            id: 'lm1', userId: 'u1', fullName: 'Nguyễn Văn A', phone: '0901111111',
            currentTier: 'gold', totalPoints: 1560, currentPoints: 560, joinDate: '2023-01-10'
        },
        {
            id: 'lm2', userId: 'u2', fullName: 'Trần Thị B', phone: '0902222222',
            currentTier: 'silver', totalPoints: 230, currentPoints: 230, joinDate: '2024-05-20'
        },
        {
            id: 'lm3', userId: 'u3', fullName: 'Lê Văn C', phone: '0903333333',
            currentTier: 'platinum', totalPoints: 6700, currentPoints: 1200, joinDate: '2022-08-15'
        }
    ];

    const rewards: Reward[] = [
        {
            id: 'r1', name: 'Voucher 50k', description: 'Giảm 50.000đ cho đơn từ 200k',
            pointsRequired: 500, type: 'voucher', value: 50000, status: 'active'
        },
        {
            id: 'r2', name: 'Thực phẩm chức năng Omega-3', description: 'Đổi 1 lọ Omega-3',
            pointsRequired: 2000, type: 'product', status: 'active'
        },
        {
            id: 'r3', name: 'Miễn phí đo đường huyết', description: '1 lần đo miễn phí',
            pointsRequired: 200, type: 'service', status: 'active'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Khách hàng thân thiết</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý thành viên, tích điểm và đổi quà</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <p className="text-blue-100 text-sm mb-1">Tổng thành viên</p>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-bold">1,254</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs">+12% tháng này</span>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
                    <p className="text-yellow-100 text-sm mb-1">Điểm đã cấp</p>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-bold">85k</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Điểm</span>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                    <p className="text-green-100 text-sm mb-1">Quà đã đổi</p>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-bold">342</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Lượt đổi</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('members')}
                    className={`px-8 py-4 font-bold text-sm ${activeTab === 'members'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Danh sách thành viên
                </button>
                <button
                    onClick={() => setActiveTab('rewards')}
                    className={`px-8 py-4 font-bold text-sm ${activeTab === 'rewards'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Kho quà tặng
                </button>
            </div>

            {/* Content */}
            {activeTab === 'members' ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Filters */}
                    <div className="p-6 border-b border-gray-100 flex gap-4">
                        <input type="text" placeholder="Tìm tên, SĐT..." className="flex-1 px-4 py-2 border border-gray-200 rounded-xl" />
                        <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                            <option>Tất cả hạng</option>
                            <option>Kim cương</option>
                            <option>Bạch kim</option>
                            <option>Vàng</option>
                            <option>Bạc</option>
                        </select>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Khách hàng</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Hạng thành viên</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Điểm hiện có</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Tổng tích lũy</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Ngày tham gia</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {members.map(member => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{member.fullName}</p>
                                        <p className="text-xs text-gray-500">{member.phone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getTierInfo(member.currentTier).color}`}>
                                            {getTierInfo(member.currentTier).name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-green-600">{member.currentPoints.toLocaleString()}</td>
                                    <td className="px-6 py-4 font-bold text-gray-600">{member.totalPoints.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-600 text-xs">{new Date(member.joinDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-xs">Chi tiết</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Add Reward Card */}
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 cursor-pointer hover:border-primary hover:text-primary transition-colors min-h-[250px]">
                        <span className="text-4xl mb-2">+</span>
                        <span className="font-bold">Thêm quà mới</span>
                    </div>

                    {rewards.map(reward => (
                        <div key={reward.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl">
                                {reward.type === 'voucher' ? '🎟️' : reward.type === 'product' ? '🎁' : '💆'}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-1">{reward.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-4">{reward.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-orange-600 font-bold text-sm">{reward.pointsRequired.toLocaleString()} điểm</span>
                                    <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200">
                                        Sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
