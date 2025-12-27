"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import financeService, { Withdrawal } from '@/services/finance.service';
import { useRouter } from 'next/navigation';

export default function WithdrawalsManagement() {
    const router = useRouter();
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchWithdrawals = async () => {
        try {
            setLoading(true);
            const data = await financeService.getWithdrawals();
            setWithdrawals(data);
        } catch (error) {
            console.error('Failed to fetch withdrawals', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const totalPages = Math.ceil(withdrawals.length / itemsPerPage);
    const paginatedData = withdrawals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'partnerName', label: 'Đối tác', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'amount', label: 'Số tiền', render: (val: number) => <span className="font-bold text-green-600">{val.toLocaleString()} đ</span> },
        { key: 'accountNumber', label: 'Tài khoản' },
        { key: 'requestDate', label: 'Ngày yêu cầu', render: (val: string) => <span>{new Date(val).toLocaleDateString('vi-VN')}</span> },
        { key: 'processedDate', label: 'Ngày xử lý', render: (val: string) => <span>{val ? new Date(val).toLocaleDateString('vi-VN') : '-'}</span> },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: Withdrawal) => (
        <div className="flex gap-2">
            <button
                onClick={() => router.push(`/admin/finance/withdrawals/${row.id}`)}
                className="text-blue-600 hover:text-blue-800"
                title="Chi tiết"
            >
                <i className="fi flaticon-eye"></i>
            </button>
            {row.status === 'pending' && (
                <button
                    onClick={async () => {
                        if (confirm('Duyệt yêu cầu rút tiền này?')) {
                            await financeService.updateWithdrawal(row.id, { status: 'approved', processedDate: new Date().toISOString() });
                            fetchWithdrawals();
                        }
                    }}
                    className="text-green-600 hover:text-green-800"
                    title="Duyệt"
                >
                    <i className="fi flaticon-check"></i>
                </button>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Rút tiền</h1>
                <button
                    onClick={async () => {
                        await financeService.createWithdrawal({
                            transactionId: 'TRX-' + Math.floor(Math.random() * 1000000),
                            partnerName: 'Đối tác ' + new Date().toLocaleTimeString(),
                            partnerType: 'Clinic',
                            amount: 2000000,
                            bankName: 'Vietcombank',
                            accountName: 'NGUYEN VAN TEST',
                            accountNumber: '1234567890',
                            status: 'pending'
                        });
                        fetchWithdrawals();
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl"
                >
                    + Tạo yêu cầu
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
