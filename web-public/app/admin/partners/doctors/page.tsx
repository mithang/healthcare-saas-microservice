"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import partnerService, { Doctor } from '@/services/partner.service';

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
        // status filtering might need adjustment based on backend data, assuming backend returns all
        if (filter.search && !doctor.name.toLowerCase().includes(filter.search.toLowerCase())) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <div className="p-8 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>;

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
                <select
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2 outline-none"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm ngưng</option>
                </select>
                <input
                    type="text"
                    placeholder="Tìm kiếm bác sĩ..."
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 outline-none"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Bác sĩ</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Chuyên khoa</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Bệnh viện</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Bệnh nhân</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Đánh giá</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDoctors.map(doctor => (
                            <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-600">#{doctor.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                                            {doctor.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-gray-900">{doctor.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{doctor.specialty}</td>
                                <td className="px-6 py-4 text-gray-600">{doctor.hospital || 'Tự do'}</td>
                                <td className="px-6 py-4 text-gray-600">N/A</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <i className="fi flaticon-star text-yellow-500 text-sm"></i>
                                        <span className="font-bold text-gray-900">{doctor.rating || 'N/A'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${doctor.isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {doctor.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <Link href={`/admin/partners/doctors/${doctor.id}/edit`} className="text-green-600 hover:text-green-800">
                                            <i className="fi flaticon-edit"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600">
                    Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredDoctors.length)} trong tổng số {filteredDoctors.length} bác sĩ
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        Trước
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-primary text-white font-bold' : 'border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}
