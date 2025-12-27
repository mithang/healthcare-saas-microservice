"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import partnerService, { Doctor } from '@/services/partner.service';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

export default function DoctorsManagement() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({ specialty: 'all', status: 'all', search: '' });
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await partnerService.getDoctors();
                setDoctors(data);
            } catch (error) {
                console.error('Failed to fetch doctors', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor => {
        if (filter.specialty !== 'all' && doctor.specialty !== filter.specialty) return false;
        if (filter.search && !doctor.name.toLowerCase().includes(filter.search.toLowerCase())) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

    const columns = [
        { key: 'id', label: 'ID', render: (val: any) => <span className="text-gray-600">#{val}</span> },
        {
            key: 'name', label: 'Bác sĩ', render: (val: string, row: Doctor) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        {val.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{val}</span>
                </div>
            )
        },
        { key: 'specialty', label: 'Chuyên khoa' },
        { key: 'hospital', label: 'Bệnh viện', render: (val: string) => val || 'Tự do' },
        {
            key: 'rating', label: 'Đánh giá', render: (val: number) => (
                <div className="flex items-center gap-1">
                    <i className="fi flaticon-star text-yellow-500 text-sm"></i>
                    <span className="font-bold text-gray-900">{val || 'N/A'}</span>
                </div>
            )
        },
        {
            key: 'isVerified', label: 'Trạng thái', render: (val: boolean) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${val ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {val ? 'Đã xác thực' : 'Chưa xác thực'}
                </span>
            )
        },
    ];

    const actions = (row: Doctor) => (
        <div className="flex gap-2">
            <Link href={`/admin/partners/doctors/${row.id}/edit`} className="text-green-600 hover:text-green-800">
                <i className="fi flaticon-edit"></i>
            </Link>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Bác sĩ</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredDoctors.length} bác sĩ</p>
                </div>
                <Link href="/admin/partners/doctors/create" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                    + Thêm bác sĩ mới
                </Link>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <select
                    value={filter.specialty}
                    onChange={(e) => setFilter({ ...filter, specialty: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2 outline-none"
                >
                    <option value="all">Tất cả chuyên khoa</option>
                    <option value="Tim mạch">Tim mạch</option>
                    <option value="Nhi khoa">Nhi khoa</option>
                    <option value="Tiêu hóa">Tiêu hóa</option>
                </select>
                <input
                    type="text"
                    placeholder="Tìm kiếm bác sĩ..."
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 outline-none"
                />
            </div>

            <DataTable
                columns={columns}
                data={paginatedDoctors}
                loading={loading}
                actions={actions}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage,
                }}
            />
        </div>
    );
}
