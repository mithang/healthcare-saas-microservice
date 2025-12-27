"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    partner: `Đối tác ${String.fromCharCode(65 + (i % 26))}`,
    amount: `${(500 + i * 50)}k`,
    bankAccount: `**** **** ${1000 + i}`,
    requestDate: `${15 + (i % 15)}/12/2024`,
    processedDate: i % 3 === 0 ? `${16 + (i % 15)}/12/2024` : '-',
    status: ['pending', 'approved', 'completed'][i % 3] as any,
}));

export default function WithdrawalsManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'partner', label: 'Đối tác', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'amount', label: 'Số tiền', render: (val: string) => <span className="font-bold text-green-600">{val}</span> },
        { key: 'bankAccount', label: 'Tài khoản' },
        { key: 'requestDate', label: 'Ngày yêu cầu' },
        { key: 'processedDate', label: 'Ngày xử lý' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            {row.status === 'pending' && (
                <button className="text-green-600 hover:text-green-800" title="Duyệt"><i className="fi flaticon-check"></i></button>
            )}
        </>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Rút tiền</h1>
            <DataTable columns={columns} data={paginatedData} actions={actions} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
