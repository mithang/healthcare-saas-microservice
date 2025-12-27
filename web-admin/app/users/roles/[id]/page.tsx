"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RoleDetail() {
    const params = useParams<{ id: string }>();
    const role = {
        id: params.id,
        name: 'Editor',
        description: 'Có quyền quản lý nội dung và bài viết',
        users: 12,
        permissions: [
            'Quản lý nội dung',
            'Quản lý bài viết',
            'Quản lý banner',
            'Quản lý video',
        ],
        createdDate: '01/01/2024',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{role.name}</h1>
                <div className="flex gap-3">
                    <Link href={`/admin/users/roles/${role.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Số người dùng</p>
                    <h3 className="text-3xl font-bold text-gray-900">{role.users}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Ngày tạo</p>
                    <h3 className="text-xl font-bold text-gray-900">{role.createdDate}</h3>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả</h2>
                <p className="text-gray-700">{role.description}</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quyền hạn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {role.permissions.map((perm, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-green-50 rounded-lg">
                            <i className="fi flaticon-check text-green-600 mr-3"></i>
                            <span className="text-gray-900">{perm}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
