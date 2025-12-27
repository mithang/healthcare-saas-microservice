"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { useRouter } from 'next/navigation';
import bookingService, { Appointment } from '@/services/booking.service';

export default function AppointmentsManagement() {
    const router = useRouter();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const data = await bookingService.getAppointments();
            setAppointments(data);
        } catch (error) {
            console.error('Failed to fetch appointments', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const filteredData = appointments.filter(item =>
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientPhone.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        {
            key: 'patientName', label: 'Bệnh nhân', render: (val: string, row: Appointment) => (
                <div>
                    <p className="font-bold text-gray-900">{val}</p>
                    <p className="text-xs text-gray-500">{row.patientPhone}</p>
                </div>
            )
        },
        { key: 'doctorName', label: 'Bác sĩ', render: (val: string) => <span className="font-medium text-blue-700">{val}</span> },
        {
            key: 'date', label: 'Thời gian', render: (val: string, row: Appointment) => (
                <div>
                    <p className="font-medium text-gray-900">{val}</p>
                    <p className="text-xs text-gray-500">{row.time}</p>
                </div>
            )
        },
        { key: 'service', label: 'Dịch vụ' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: Appointment) => (
        <div className="flex gap-2">
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
            <button
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) {
                        await bookingService.deleteAppointment(row.id);
                        fetchAppointments();
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
                loading={loading}
                actions={actions}
                searchable
                searchPlaceholder="Tìm kiếm bệnh nhân, bác sĩ..."
                onSearch={setSearchQuery}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
