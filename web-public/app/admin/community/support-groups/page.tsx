"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Nhóm hỗ trợ ${['Tiểu đường', 'Huyết áp', 'Ung thư', 'Tâm lý'][i % 4]}`,
    members: Math.floor(Math.random() * 500) + 50,
    posts: Math.floor(Math.random() * 200) + 20,
    moderator: `Moderator ${String.fromCharCode(65 + (i % 5))}`,
    createdDate: `${1 + (i % 28)}/11/2024`,
    status: i % 10 === 0 ? 'inactive' : 'active',
}));

export default function SupportGroupsManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'name', label: 'Tên nhóm', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'members', label: 'Thành viên' },
        { key: 'posts', label: 'Bài viết' },
        { key: 'moderator', label: 'Người quản lý' },
        { key: 'createdDate', label: 'Ngày tạo' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button className="text-blue-600 hover:text-blue-800"><i className="fi flaticon-eye"></i></button>
            <button className="text-green-600 hover:text-green-800"><i className="fi flaticon-edit"></i></button>
        </>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Nhóm hỗ trợ</h1>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl">+ Tạo nhóm</button>
            </div>
            <DataTable columns={columns} data={paginatedData} actions={actions} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
