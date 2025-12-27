"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    subject: `Email Campaign ${i + 1}`,
    recipients: Math.floor(Math.random() * 5000) + 1000,
    sent: `${15 + (i % 15)}/12/2024`,
    openRate: `${(20 + Math.random() * 30).toFixed(1)}%`,
    clickRate: `${(5 + Math.random() * 15).toFixed(1)}%`,
    status: i % 5 === 0 ? 'draft' : 'published',
}));

export default function EmailMarketingManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'subject', label: 'Tiêu đề', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'recipients', label: 'Người nhận' },
        { key: 'sent', label: 'Ngày gửi' },
        { key: 'openRate', label: 'Tỷ lệ mở', render: (val: string) => <span className="text-blue-600">{val}</span> },
        { key: 'clickRate', label: 'Tỷ lệ click', render: (val: string) => <span className="text-green-600">{val}</span> },
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
                <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl">+ Tạo chiến dịch</button>
            </div>
            <DataTable columns={columns} data={paginatedData} actions={actions} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
