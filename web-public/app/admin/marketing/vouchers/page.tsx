"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import marketingService, { Voucher } from '@/services/marketing.service';

export default function VouchersManagement() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchVouchers = async () => {
        try {
            setLoading(true);
            const data = await marketingService.getVouchers();
            setVouchers(data);
        } catch (error) {
            console.error('Failed to fetch vouchers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const totalPages = Math.ceil(vouchers.length / itemsPerPage);
    const paginatedData = vouchers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'code', label: 'Mã Voucher', render: (val: string) => <span className="font-bold text-primary">{val}</span> },
        { key: 'name', label: 'Tên chương trình' },
        { key: 'discount', label: 'Giảm giá' },
        { key: 'minOrder', label: 'Đơn tối thiểu' },
        { key: 'used', label: 'Đã dùng', render: (val: number, row: Voucher) => <span>{val}/{row.maxUses}</span> },
        { key: 'expiry', label: 'Hạn dùng' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: Voucher) => (
        <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800" title="Sửa"><i className="fi flaticon-edit"></i></button>
            <button
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
                        await marketingService.deleteVoucher(row.id);
                        fetchVouchers();
                    }
                }}
                className="text-red-600 hover:text-red-800"
                title="Xóa"
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Voucher</h1>
                <button
                    onClick={async () => {
                        await marketingService.createVoucher({
                            code: 'VOUCHER' + Math.floor(Math.random() * 1000),
                            name: 'Voucher mới ' + new Date().toLocaleTimeString(),
                            discount: '50.000 ₫',
                            minOrder: '200.000 ₫',
                            used: 0,
                            maxUses: 100,
                            expiry: '31/12/2025',
                            status: 'published'
                        });
                        fetchVouchers();
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl"
                >
                    + Tạo Voucher
                </button>
            </div>
            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
