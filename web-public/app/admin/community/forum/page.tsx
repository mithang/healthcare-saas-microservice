"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Chủ đề diễn đàn ${i + 1}`,
    author: `User ${String.fromCharCode(65 + (i % 26))}`,
    category: ['Sức khỏe', 'Dinh dưỡng', 'Tâm lý', 'Thể thao'][i % 4],
    replies: Math.floor(Math.random() * 50),
    views: Math.floor(Math.random() * 1000) + 100,
    lastActivity: `${15 + (i % 15)}/12/2024`,
    status: i % 10 === 0 ? 'pending' : 'approved',
}));

export default function ForumManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const filteredData = MOCK_DATA.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'title', label: 'Tiêu đề', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'author', label: 'Tác giả' },
        { key: 'category', label: 'Danh mục' },
        { key: 'replies', label: 'Trả lời' },
        { key: 'views', label: 'Lượt xem' },
        { key: 'lastActivity', label: 'Hoạt động cuối' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button className="text-blue-600 hover:text-blue-800"><i className="fi flaticon-eye"></i></button>
            <button className="text-red-600 hover:text-red-800"><i className="fi flaticon-delete"></i></button>
        </>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Diễn đàn</h1>
            <DataTable columns={columns} data={paginatedData} actions={actions} searchable onSearch={setSearchQuery} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
