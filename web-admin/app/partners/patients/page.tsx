"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import partnerService, { Patient } from '@/services/partner.service';

export default function PatientsManagement() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const data = await partnerService.getPatients();
            setPatients(data);
        } catch (error) {
            console.error('Failed to fetch patients', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const filteredData = patients.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const columns = [
        { key: 'name', label: 'Họ tên', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'phone', label: 'Điện thoại' },
        { key: 'email', label: 'Email', render: (val: string) => val || 'N/A' },
        { key: 'visits', label: 'Lượt khám', render: (val: number) => val || 0 },
        { key: 'lastVisit', label: 'Lần cuối', render: (val: string) => val || 'Chưa khám' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: Patient) => (
        <div className="flex gap-2">
            <Link href={`/admin/partners/patients/${row.id}`} className="text-blue-600 hover:text-blue-800">
                <i className="fi flaticon-eye"></i>
            </Link>
            <Link href={`/admin/partners/patients/${row.id}/edit`} className="text-green-600 hover:text-green-800">
                <i className="fi flaticon-edit"></i>
            </Link>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Bệnh nhân</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} bệnh nhân</p>
                </div>
                <Link
                    href="/admin/partners/patients/create"
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark"
                >
                    + Thêm bệnh nhân
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                searchable
                onSearch={setSearchQuery}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage,
                }}
            />
        </div>
    );
}
