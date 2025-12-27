"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const FAMILY = [
    { name: 'Nguyễn Văn A (Bạn)', age: 35, relation: 'Chủ tài khoản', avatar: '👨' },
    { name: 'Trần Thị B', age: 32, relation: 'Vợ', avatar: '👩' },
    { name: 'Nguyễn C', age: 5, relation: 'Con', avatar: '👦' },
];

export default function FamilyManagementPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Gia đình</h1>
                    <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                        + Thêm thành viên
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FAMILY.map((member, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all">
                            <div className="text-6xl mb-4">{member.avatar}</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">{member.relation}</p>
                            <p className="text-sm text-gray-400 mb-6">{member.age} tuổi</p>
                            <div className="space-y-2">
                                <button className="w-full bg-gray-100 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-200">
                                    Xem hồ sơ
                                </button>
                                <button className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark">
                                    Đặt lịch khám
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
