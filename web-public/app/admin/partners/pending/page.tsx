"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Đối tác ${String.fromCharCode(65 + (i % 26))}`,
    type: ['Bệnh viện', 'Phòng khám', 'Nhà thuốc'][i % 3],
    email: `partner${i + 1}@email.com`,
    phone: `090${2000000 + i}`,
    submittedDate: `${15 + (i % 15)}/12/2024`,
    status: 'pending',
}));

export default function PendingPartnersManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'name', label: 'Tên đối tác', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'type', label: 'Loại hình' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Điện thoại' },
        { key: 'submittedDate', label: 'Ngày gửi' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button className="text-green-600 hover:text-green-800" title="Duyệt"><i className="fi flaticon-check"></i></button>
            <button className="text-red-600 hover:text-red-800" title="Từ chối"><i className="fi flaticon-close"></i></button>
        </>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Đối tác Chờ duyệt</h1>
                <p className="text-gray-500 mt-1">Tổng: {MOCK_DATA.length} đối tác</p>
            </div>
            <DataTable columns={columns} data={paginatedData} actions={actions} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
