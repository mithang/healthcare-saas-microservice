"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    orderCode: `REF${10000 + i}`,
    customerName: `Khách hàng ${String.fromCharCode(65 + (i % 26))}`,
    originalOrder: `ORD${5000 + i}`,
    amount: `${(300 + i * 30)}k`,
    reason: ['Hủy đơn', 'Sản phẩm lỗi', 'Giao muộn'][i % 3],
    requestDate: `${15 + (i % 15)}/12/2024`,
    status: ['pending', 'approved', 'rejected'][i % 3] as any,
}));

export default function RefundsManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'orderCode', label: 'Mã yêu cầu', render: (val: string) => <span className="font-mono font-bold">{val}</span> },
        { key: 'customerName', label: 'Khách hàng' },
        { key: 'originalOrder', label: 'Đơn gốc' },
        { key: 'amount', label: 'Số tiền', render: (val: string) => <span className="font-bold text-red-600">{val}</span> },
        { key: 'reason', label: 'Lý do' },
        { key: 'requestDate', label: 'Ngày yêu cầu' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            {row.status === 'pending' && (
                <>
                    <button className="text-green-600 hover:text-green-800" title="Duyệt"><i className="fi flaticon-check"></i></button>
                    <button className="text-red-600 hover:text-red-800" title="Từ chối"><i className="fi flaticon-close"></i></button>
                </>
            )}
        </>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Hoàn tiền</h1>
            <DataTable columns={columns} data={paginatedData} actions={actions} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
