"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';

const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    month: `${i + 1}/2024`,
    revenue: `${(100 + i * 10)}M`,
    orders: Math.floor(Math.random() * 500) + 200,
    avgOrderValue: `${(400 + i * 20)}k`,
    growth: `${(5 + Math.random() * 15).toFixed(1)}%`,
}));

export default function RevenueReports() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'month', label: 'Tháng' },
        { key: 'revenue', label: 'Doanh thu', render: (val: string) => <span className="font-bold text-green-600">{val}</span> },
        { key: 'orders', label: 'Đơn hàng' },
        { key: 'avgOrderValue', label: 'Giá trị TB' },
        { key: 'growth', label: 'Tăng trưởng', render: (val: string) => <span className="text-blue-600">{val}</span> },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Báo cáo Doanh thu</h1>
            <DataTable columns={columns} data={paginatedData} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
