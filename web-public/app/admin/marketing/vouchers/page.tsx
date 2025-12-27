"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    code: `VOU${1000 + i}`,
    name: `Voucher ${i % 3 === 0 ? 'Giảm 50k' : i % 2 === 0 ? 'Freeship' : 'Giảm 20%'}`,
    discount: i % 3 === 0 ? '50.000đ' : i % 2 === 0 ? 'Freeship' : '20%',
    minOrder: `${(i + 1) * 100}k`,
    used: Math.floor(Math.random() * 200),
    maxUses: 500,
    expiry: `31/12/2024`,
    status: i % 7 === 0 ? 'inactive' : 'active',
}));

export default function VouchersManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const filteredData = MOCK_DATA.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'code', label: 'Mã', render: (val: string) => <span className="font-mono font-bold">{val}</span> },
        { key: 'name', label: 'Tên voucher' },
        { key: 'discount', label: 'Giảm giá', render: (val: string) => <span className="text-green-600 font-bold">{val}</span> },
        { key: 'minOrder', label: 'Đơn tối thiểu' },
        { key: 'used', label: 'Đã dùng' },
        { key: 'expiry', label: 'Hết hạn' },
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
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Voucher</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} voucher</p>
                </div>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl">+ Tạo voucher</button>
            </div>
            <DataTable columns={columns} data={paginatedData} actions={actions} searchable onSearch={setSearchQuery} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
