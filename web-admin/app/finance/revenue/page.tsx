"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import StatsCard from '@/components/admin/StatsCard';
import financeService, { Revenue } from '@/services/finance.service';

export default function RevenueManagement() {
    const [revenueData, setRevenueData] = useState<Revenue[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchRevenue = async () => {
        try {
            setLoading(true);
            const data = await financeService.getRevenue();
            setRevenueData(data);
        } catch (error) {
            console.error('Failed to fetch revenue', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenue();
    }, []);

    const totalPages = Math.ceil(revenueData.length / itemsPerPage);
    const paginatedData = revenueData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Dynamic stats (simplified for demo)
    const totalAmount = revenueData.reduce((acc, curr) => acc + curr.amount, 0);
    const totalFee = revenueData.reduce((acc, curr) => acc + curr.fee, 0);
    const totalNet = revenueData.reduce((acc, curr) => acc + curr.net, 0);

    const columns = [
        { label: 'Thời gian', key: 'timestamp', render: (val: string) => <span>{new Date(val).toLocaleString('vi-VN')}</span> },
        { label: 'Loại', key: 'type' },
        { label: 'Chi tiết', key: 'details' },
        { label: 'Số tiền', key: 'amount', render: (val: number) => <span className="font-bold text-green-600">{val.toLocaleString()} đ</span> },
        { label: 'Trạng thái', key: 'status', render: (val: string) => <StatusBadge status={val === 'Done' ? 'approved' : 'pending'} /> }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Doanh thu</h1>
                <button
                    onClick={async () => {
                        await financeService.createRevenue({
                            type: 'Đặt khám',
                            details: 'Khám bệnh nhi khoa',
                            amount: 500000,
                            fee: 50000,
                            net: 450000,
                            status: 'Done'
                        });
                        fetchRevenue();
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl"
                >
                    + Ghi nhận doanh thu
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard title="Tổng doanh thu" value={(totalAmount / 1000000).toFixed(1) + "M"} icon="flaticon-money" color="green" />
                <StatsCard title="Thực nhận" value={(totalNet / 1000000).toFixed(1) + "M"} icon="flaticon-chart-line" color="blue" />
                <StatsCard title="Phí hệ thống" value={(totalFee / 1000000).toFixed(1) + "M"} icon="flaticon-percentage" color="orange" />
                <StatsCard title="Số giao dịch" value={revenueData.length.toString()} icon="flaticon-wallet" color="purple" />
            </div>

            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
