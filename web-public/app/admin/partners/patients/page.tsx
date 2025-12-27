"use client";

import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';

const MOCK_DATA = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Bệnh nhân ${String.fromCharCode(65 + (i % 26))}`,
    phone: `090${1000000 + i}`,
    email: `patient${i + 1}@email.com`,
    visits: Math.floor(Math.random() * 20),
    lastVisit: `${15 - (i % 15)}/12/2024`,
    status: i % 5 === 0 ? 'inactive' : 'active',
}));

export default function PatientsManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const filteredData = MOCK_DATA.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const columns = [
        { key: 'name', label: 'Họ tên', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'phone', label: 'Điện thoại' },
        { key: 'email', label: 'Email' },
        { key: 'visits', label: 'Lượt khám' },
        { key: 'lastVisit', label: 'Lần cuối' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <Link href={`/admin/partners/patients/${row.id}`} className="text-blue-600 hover:text-blue-800">
                <i className="fi flaticon-eye"></i>
            </Link>
            <Link href={`/admin/partners/patients/${row.id}/edit`} className="text-green-600 hover:text-green-800">
                <i className="fi flaticon-edit"></i>
            </Link>
            <button className="text-red-600 hover:text-red-800">
                <i className="fi flaticon-delete"></i>
            </button>
        </>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Bệnh nhân</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} bệnh nhân</p>
                </div>
                <Link
                    href="/admin/partners/patients/create"
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark"
                >
                    + Thêm bệnh nhân
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={paginatedData}
                actions={actions}
                searchable
                onSearch={setSearchQuery}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage,
                }}
            />
        </div>
    );
}
