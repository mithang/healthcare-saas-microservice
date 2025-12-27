"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Thông báo ${i + 1}`,
    message: `Nội dung thông báo số ${i + 1}`,
    recipients: Math.floor(Math.random() * 10000) + 1000,
    sent: `${15 + (i % 15)}/12/2024 ${8 + (i % 12)}:00`,
    delivered: Math.floor(Math.random() * 9000) + 900,
    clicked: Math.floor(Math.random() * 500) + 50,
    status: i % 6 === 0 ? 'draft' : 'published',
}));

export default function PushNotificationsManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'title', label: 'Tiêu đề', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'message', label: 'Nội dung' },
        { key: 'recipients', label: 'Người nhận' },
        { key: 'delivered', label: 'Đã gửi' },
        { key: 'clicked', label: 'Đã click' },
        { key: 'sent', label: 'Thời gian' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button className="text-blue-600 hover:text-blue-800"><i className="fi flaticon-eye"></i></button>
        </>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Push Notification</h1>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl">+ Gửi thông báo</button>
            </div>
            <DataTable columns={columns} data={paginatedData} actions={actions} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
