"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatsCard from '@/components/admin/StatsCard';

const MOCK_DATA = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    date: `${15 + (i % 15)}/12/2024`,
    source: ['Đặt khám', 'Mua thuốc', 'Xét nghiệm'][i % 3],
    amount: `${(500 + i * 50)}k`,
    fee: `${(50 + i * 5)}k`,
    net: `${(450 + i * 45)}k`,
}));

export default function RevenueManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'date', label: 'Ngày' },
        { key: 'source', label: 'Nguồn' },
        { key: 'amount', label: 'Tổng tiền', render: (val: string) => <span className="font-bold text-green-600">{val}</span> },
        { key: 'fee', label: 'Phí' },
        { key: 'net', label: 'Thực nhận', render: (val: string) => <span className="font-bold text-blue-600">{val}</span> },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Doanh thu</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard title="Doanh thu hôm nay" value="12.5M" icon="flaticon-money" color="green" trend={{ value: "+8.2%", isPositive: true }} />
                <StatsCard title="Doanh thu tháng" value="125.5M" icon="flaticon-chart-line" color="blue" trend={{ value: "+12.5%", isPositive: true }} />
                <StatsCard title="Phí hệ thống" value="12.5M" icon="flaticon-percentage" color="orange" />
                <StatsCard title="Thực nhận" value="113M" icon="flaticon-wallet" color="purple" />
            </div>

            <DataTable columns={columns} data={paginatedData} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
