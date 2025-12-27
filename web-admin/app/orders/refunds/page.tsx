"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import bookingService, { RefundRequest } from '@/services/booking.service';

export default function RefundsManagement() {
    const [refunds, setRefunds] = useState<RefundRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchRefunds = async () => {
        try {
            setLoading(true);
            const data = await bookingService.getRefundRequests();
            setRefunds(data);
        } catch (error) {
            console.error('Failed to fetch refund requests', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRefunds();
    }, []);

    const filteredData = refunds.filter(item =>
        item.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'orderCode', label: 'Mã yêu cầu', render: (val: string) => <span className="font-mono font-bold">{val}</span> },
        { key: 'customerName', label: 'Khách hàng' },
        { key: 'originalOrder', label: 'Đơn gốc' },
        {
            key: 'amount', label: 'Số tiền', render: (val: number) => (
                <span className="font-bold text-red-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
                </span>
            )
        },
        { key: 'reason', label: 'Lý do' },
        { key: 'requestDate', label: 'Ngày yêu cầu' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: RefundRequest) => (
        <div className="flex gap-2">
            {row.status === 'pending' && (
                <>
                    <button
                        className="text-green-600 hover:text-green-800"
                        title="Duyệt"
                        onClick={async () => {
                            await bookingService.updateRefundRequest(row.id, { status: 'approved' });
                            fetchRefunds();
                        }}
                    >
                        <i className="fi flaticon-check"></i>
                    </button>
                    <button
                        className="text-red-600 hover:text-red-800"
                        title="Từ chối"
                        onClick={async () => {
                            await bookingService.updateRefundRequest(row.id, { status: 'rejected' });
                            fetchRefunds();
                        }}
                    >
                        <i className="fi flaticon-close"></i>
                    </button>
                </>
            )}
            <button
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
                        await bookingService.deleteRefundRequest(row.id);
                        fetchRefunds();
                    }
                }}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Xóa"
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Hoàn tiền</h1>
            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                searchable
                onSearch={setSearchQuery}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
