"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { Button } from '@/components/admin/ui/Button';
import { useRouter } from 'next/navigation';

// Mock data with more realistic structure
const appointments = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    patientName: `Bệnh nhân ${String.fromCharCode(65 + (i % 26))} ${i}`,
    patientPhone: `09${10000000 + i}`,
    doctorName: `BS. ${['Nguyễn', 'Trần', 'Lê'][i % 3]} ${['Minh', 'Hoa', 'Tuấn'][i % 3]}`,
    date: `${20 + (i % 10)}/12/2024`,
    time: `${8 + (i % 10)}:00`,
    service: ['Khám tổng quát', 'Khám chuyên khoa', 'Tái khám', 'Tư vấn online'][i % 4],
    status: ['pending', 'confirmed', 'completed', 'cancelled'][i % 4] as any,
}));

export default function AppointmentsManagement() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const filteredData = appointments.filter(item =>
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientPhone.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        {
            key: 'patientName', label: 'Bệnh nhân', render: (val: string, row: any) => (
                <div>
                    <p className="font-bold text-gray-900">{val}</p>
                    <p className="text-xs text-gray-500">{row.patientPhone}</p>
                </div>
            )
        },
        { key: 'doctorName', label: 'Bác sĩ', render: (val: string) => <span className="font-medium text-blue-700">{val}</span> },
        {
            key: 'date', label: 'Thời gian', render: (val: string, row: any) => (
                <div>
                    <p className="font-medium text-gray-900">{val}</p>
                    <p className="text-xs text-gray-500">{row.time}</p>
                </div>
            )
        },
        { key: 'service', label: 'Dịch vụ' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button
                onClick={() => router.push(`/admin/orders/appointments/${row.id}`)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Xem chi tiết"
            >
                <i className="fi flaticon-eye"></i>
            </button>
            <button
                onClick={() => router.push(`/admin/orders/appointments/${row.id}/edit`)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Chỉnh sửa"
            >
                <i className="fi flaticon-edit"></i>
            </button>
        </>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Đặt lịch khám</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} lịch hẹn</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => router.push('/admin/orders/appointments/calendar')}
                        icon="calendar"
                    >
                        Xem Lịch
                    </Button>
                    <Button
                        onClick={() => router.push('/admin/orders/appointments/create')}
                        icon="plus"
                    >
                        Đặt lịch mới
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={paginatedData}
                actions={actions}
                searchable
                searchPlaceholder="Tìm kiếm bệnh nhân, bác sĩ..."
                onSearch={setSearchQuery}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
