"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import partnerService, { Hospital } from '@/services/partner.service';
import DataTable from '@/components/admin/DataTable';

// Custom Modal Component for Delete Confirmation
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; itemName: string }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Xác nhận xóa</h3>
                <p className="text-gray-500 text-center mb-6">
                    Bạn có chắc chắn muốn xóa bệnh viện <span className="font-bold text-gray-800">"{itemName}"</span> không? Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                    >
                        Xóa ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function HospitalsManagement() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ id: any; name: string } | null>(null);

    const fetchHospitals = async () => {
        try {
            setLoading(true);
            const data = await partnerService.getHospitals();
            setHospitals(data);
        } catch (error) {
            console.error('Failed to fetch hospitals', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const filteredData = hospitals.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const openDeleteModal = (id: any, name: string) => {
        setItemToDelete({ id, name });
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await partnerService.deleteHospital(itemToDelete.id);
            fetchHospitals();
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (error: any) {
            alert('Lỗi: ' + (error.message || 'Unknown error'));
        }
    };

    const columns = [
        { key: 'name', label: 'Tên', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'address', label: 'Địa chỉ', render: (val: string) => <span className="text-gray-600 max-w-xs truncate block" title={val}>{val}</span> },
        { key: 'phone', label: 'Điện thoại' },
        {
            key: 'departments', label: 'Khoa', render: (val: string[]) => (
                <div className="flex gap-1 flex-wrap">
                    {val?.slice(0, 2).map((d: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100">{d}</span>
                    ))}
                    {val?.length > 2 && (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100">+{val.length - 2}</span>
                    )}
                </div>
            )
        },
        { key: 'beds', label: 'Giường', render: (val: number) => val || 0 },
        {
            key: 'rating', label: 'Đánh giá', render: (val: number) => (
                <div className="flex items-center gap-1 font-medium text-gray-900">
                    <span className="text-yellow-400">★</span> {val || 0}
                </div>
            )
        },
        {
            key: 'isVerified', label: 'Trạng thái', render: (val: boolean) => (
                val ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Đã xác thực
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Chưa xác thực
                    </span>
                )
            )
        },
    ];

    const actions = (row: Hospital) => (
        <div className="flex gap-2">
            <Link href={`/admin/partners/hospitals/${row.id}/edit`} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                <i className="fi flaticon-edit"></i>
            </Link>
            <button onClick={() => openDeleteModal(row.id, row.name)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Bệnh viện</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} bệnh viện</p>
                </div>
                <Link href="/admin/partners/hospitals/create" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition shadow-lg shadow-primary/25 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Thêm bệnh viện
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                searchable
                onSearch={(q) => { setSearchQuery(q); setCurrentPage(1); }}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage,
                }}
            />

            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={itemToDelete?.name || ''} />
        </div>
    );
}
