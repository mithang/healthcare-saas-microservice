"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_ALL_PHARMACIES, DELETE_PHARMACY } from '@/graphql/pharmacies';

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
                    Bạn có chắc chắn muốn xóa nhà thuốc <span className="font-bold text-gray-800">"{itemName}"</span> không? Hành động này không thể hoàn tác.
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

export default function PharmaciesManagement() {
    const { data, loading, refetch } = useQuery<any>(GET_ALL_PHARMACIES);
    const [deletePharmacy] = useMutation(DELETE_PHARMACY);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

    const pharmacies = data?.getAllPharmacies || [];
    const filteredData = pharmacies.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const openDeleteModal = (id: string, name: string) => {
        setItemToDelete({ id, name });
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deletePharmacy({ variables: { id: itemToDelete.id } });
            refetch();
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (error) {
            alert('Lỗi: ' + error);
        }
    };

    if (loading) return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Nhà thuốc</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredData.length} nhà thuốc</p>
                </div>
                <Link href="/admin/partners/pharmacies/create" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition shadow-lg shadow-primary/25 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Thêm nhà thuốc
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tên</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Điện thoại</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Đánh giá</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedData.map((pharmacy: any) => (
                                <tr key={pharmacy.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{pharmacy.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={pharmacy.address}>{pharmacy.address}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{pharmacy.phone}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-400">★</span>
                                            {pharmacy.rating || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {pharmacy.isVerified ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                Đã xác thực
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                Chưa xác thực
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-3">
                                            <Link href={`/admin/partners/pharmacies/${pharmacy.id}/edit`} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors group">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button onClick={() => openDeleteModal(pharmacy.id, pharmacy.name)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors group">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {paginatedData.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Không tìm thấy dữ liệu</h3>
                        <p className="text-gray-500 mt-1">Thử thay đổi bộ lọc tìm kiếm hoặc thêm mới.</p>
                    </div>
                )}
                {/* Pagination Stats */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div>
                        Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} đến {Math.min(currentPage * itemsPerPage, filteredData.length)} trong số {filteredData.length} kết quả
                    </div>
                </div>
            </div>

            {totalPages > 0 && (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105' : 'bg-white border text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}>{page}</button>
                    ))}
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}

            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={itemToDelete?.name || ''} />
        </div>
    );
}
