"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { useRouter } from 'next/navigation';
import bookingService, { PharmacyOrder } from '@/services/booking.service';

export default function PharmacyOrdersManagement() {
    const router = useRouter();
    const [orders, setOrders] = useState<PharmacyOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await bookingService.getPharmacyOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch pharmacy orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredData = orders.filter(item =>
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerPhone.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'code', label: 'Mã đơn', render: (val: string) => <span className="font-mono font-bold text-gray-700">{val}</span> },
        {
            key: 'customerName', label: 'Khách hàng', render: (val: string, row: PharmacyOrder) => (
                <div>
                    <p className="font-medium text-gray-900">{val}</p>
                    <p className="text-xs text-gray-500">{row.customerPhone}</p>
                </div>
            )
        },
        { key: 'pharmacy', label: 'Nhà thuốc cung cấp' },
        { key: 'itemsCount', label: 'SL', render: (val: number) => <span className="font-medium">{val} món</span> },
        {
            key: 'totalAmount', label: 'Tổng tiền', render: (val: number) => (
                <span className="font-bold text-green-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
                </span>
            )
        },
        { key: 'date', label: 'Ngày đặt' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: PharmacyOrder) => (
        <div className="flex gap-2">
            <button
                onClick={() => router.push(`/admin/orders/pharmacy/${row.id}`)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Xem chi tiết"
            >
                <i className="fi flaticon-eye"></i>
            </button>
            <button
                onClick={() => router.push(`/admin/orders/pharmacy/${row.id}/edit`)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Sửa đơn hàng"
            >
                <i className="fi flaticon-edit"></i>
            </button>
            <button
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
                        await bookingService.deletePharmacyOrder(row.id);
                        fetchOrders();
                    }
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Xóa"
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Đơn thuốc</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} đơn hàng</p>
                </div>
                <Button
                    onClick={() => router.push('/admin/orders/pharmacy/create')}
                    icon="plus"
                >
                    Tạo đơn mới
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                searchable
                searchPlaceholder="Tìm kiếm mã đơn, khách hàng..."
                onSearch={setSearchQuery}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
