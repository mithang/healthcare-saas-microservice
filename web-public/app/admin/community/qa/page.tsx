"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `Câu hỏi về sức khỏe ${i + 1}`,
    askedBy: `User ${String.fromCharCode(65 + (i % 26))}`,
    category: ['Tim mạch', 'Tiêu hóa', 'Da liễu', 'Nội khoa'][i % 4],
    answers: Math.floor(Math.random() * 10),
    views: Math.floor(Math.random() * 500) + 50,
    askedDate: `${15 + (i % 15)}/12/2024`,
    status: i % 8 === 0 ? 'pending' : 'approved',
}));

export default function QAManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const filteredData = MOCK_DATA.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'question', label: 'Câu hỏi', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'askedBy', label: 'Người hỏi' },
        { key: 'category', label: 'Danh mục' },
        { key: 'answers', label: 'Trả lời' },
        { key: 'views', label: 'Lượt xem' },
        { key: 'askedDate', label: 'Ngày hỏi' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button className="text-blue-600 hover:text-blue-800"><i className="fi flaticon-eye"></i></button>
            <button className="text-green-600 hover:text-green-800"><i className="fi flaticon-check"></i></button>
        </>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Hỏi đáp</h1>
            <DataTable columns={columns} data={paginatedData} actions={actions} searchable onSearch={setSearchQuery} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
