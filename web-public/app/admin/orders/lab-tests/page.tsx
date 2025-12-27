"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { useRouter } from 'next/navigation';

const MOCK_DATA = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    orderCode: `LAB${10000 + i}`,
    patientName: `Bệnh nhân ${String.fromCharCode(65 + (i % 26))}`,
    patientPhone: `09${10000000 + i}`,
    testType: ['Xét nghiệm máu', 'Xét nghiệm nước tiểu', 'X-quang', 'CT Scan'][i % 4],
    hospital: `Bệnh viện ${String.fromCharCode(65 + ((i + 2) % 26))}`,
    fee: (300 + i * 30) * 1000,
    testDate: `${20 + (i % 10)}/12/2024`,
    status: ['pending', 'processing', 'completed', 'cancelled'][i % 4] as any,
}));

export default function LabTestsManagement() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const filteredData = MOCK_DATA.filter(item =>
        item.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'orderCode', label: 'Mã hồ sơ', render: (val: string) => <span className="font-mono font-bold text-gray-700">{val}</span> },
        {
            key: 'patientName', label: 'Bệnh nhân', render: (val: string, row: any) => (
                <div>
                    <p className="font-medium text-gray-900">{val}</p>
                    <p className="text-xs text-gray-500">{row.patientPhone}</p>
                </div>
            )
        },
        { key: 'testType', label: 'Loại xét nghiệm' },
        { key: 'hospital', label: 'Đơn vị thực hiện' },
        {
            key: 'fee', label: 'Phí dịch vụ', render: (val: number) => (
                <span className="font-bold text-green-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
                </span>
            )
        },
        { key: 'testDate', label: 'Ngày thực hiện' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button
                onClick={() => router.push(`/admin/orders/lab-tests/${row.id}`)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Xem chi tiết"
            >
                <i className="fi flaticon-eye"></i>
            </button>
            <button
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Cập nhật kết quả"
            >
                <i className="fi flaticon-file"></i>
            </button>
        </>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Xét nghiệm</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} hồ sơ</p>
                </div>
                <Button
                    onClick={() => router.push('/admin/orders/lab-tests/create')}
                    icon="plus"
                >
                    Đặt lịch xét nghiệm
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={paginatedData}
                actions={actions}
                searchable
                searchPlaceholder="Tìm kiếm mã hồ sơ, bệnh nhân..."
                onSearch={setSearchQuery}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
