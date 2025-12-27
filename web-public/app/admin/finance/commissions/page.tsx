"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    partner: `Đối tác ${String.fromCharCode(65 + (i % 26))}`,
    type: ['Bệnh viện', 'Phòng khám', 'Nhà thuốc'][i % 3],
    revenue: `${(1000 + i * 100)}k`,
    commission: `${(100 + i * 10)}k`,
    rate: '10%',
    month: '12/2024',
    status: i % 6 === 0 ? 'pending' : 'approved',
}));

export default function CommissionsManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'partner', label: 'Đối tác', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'type', label: 'Loại hình' },
        { key: 'revenue', label: 'Doanh thu' },
        { key: 'rate', label: 'Tỷ lệ' },
        { key: 'commission', label: 'Hoa hồng', render: (val: string) => <span className="font-bold text-green-600">{val}</span> },
        { key: 'month', label: 'Tháng' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Hoa hồng</h1>
            <DataTable columns={columns} data={paginatedData} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
