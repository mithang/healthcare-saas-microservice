"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function SupportGroupDetail() {
    const params = useParams<{ id: string }>();
    const group = {
        id: params.id,
        name: 'Nhóm hỗ trợ Tiểu đường',
        description: 'Nhóm dành cho người bệnh tiểu đường, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau',
        moderator: 'BS. Nguyễn Văn A',
        members: 245,
        posts: 156,
        createdDate: '01/11/2024',
        lastActivity: '19/12/2024 15:30',
        status: 'active',
        rules: [
            'Tôn trọng các thành viên khác',
            'Không spam hoặc quảng cáo',
            'Chia sẻ thông tin chính xác',
        ],
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
                    <p className="text-gray-500 mt-1">Quản lý bởi {group.moderator}</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</button>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Thành viên</p>
                    <h3 className="text-3xl font-bold text-gray-900">{group.members}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Bài viết</p>
                    <h3 className="text-3xl font-bold text-blue-600">{group.posts}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Hoạt động cuối</p>
                    <p className="font-medium text-gray-900">{group.lastActivity}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={group.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả</h2>
                <p className="text-gray-700">{group.description}</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Nội quy nhóm</h2>
                <ul className="space-y-3">
                    {group.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fi flaticon-check text-green-600 text-xs"></i>
                            </span>
                            <span className="text-gray-700">{rule}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Ngày tạo</p><p className="font-medium text-gray-900">{group.createdDate}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Người quản lý</p><p className="font-medium text-gray-900">{group.moderator}</p></div>
                </div>
            </div>
        </div>
    );
}
