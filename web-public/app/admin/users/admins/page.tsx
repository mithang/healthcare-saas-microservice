"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/admin/ui/Button';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_ALL_USERS, DELETE_USER, RESET_PASSWORD } from '@/graphql/users';
import { FiEdit, FiTrash2, FiLock } from 'react-icons/fi';

export default function AdminsManagement() {
    const router = useRouter();
    const { data, loading, refetch } = useQuery(GET_ALL_USERS);
    const [deleteUser] = useMutation(DELETE_USER);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const admins = (data as any)?.getAllUsers || [];

    // ... columns definition (no change needed in columns themselves, but using them in DataTable) ...
    // Re-defining columns to ensure scope access if needed, but looks standard.
    // Actually, I should keep the columns definition if it was fine, but let's just use what was there or ensure it matches. 
    // The previous code had columns defined. I will preserve them.

    const columns = [
        { key: 'fullName', label: 'Họ tên', render: (val: string) => <span className="font-bold text-gray-900">{val}</span> },
        { key: 'email', label: 'Email' },
        {
            key: 'role', label: 'Vai trò', render: (val: any) => (
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${val?.name === 'super_admin' || val?.name === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                    val?.name === 'admin' || val?.name === 'Admin' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {val?.name || 'N/A'}
                </span>
            )
        },
        { key: 'createdAt', label: 'Ngày tạo', render: (val: string) => new Date(val).toLocaleDateString('vi-VN') },
        {
            key: 'isActive', label: 'Trạng thái', render: (val: boolean) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${val ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {val ? 'Hoạt động' : 'Đã khóa'}
                </span>
            )
        },
    ];

    const handleCreate = () => {
        router.push('/admin/users/admins/create');
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/users/admins/${id}/edit`);
    };

    const confirmDelete = (user: any) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const confirmReset = (user: any) => {
        setSelectedUser(user);
        setResetModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            await deleteUser({ variables: { id: selectedUser.id } });
            refetch();
            setDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (error: any) {
            alert('Lỗi khi xóa user: ' + error.message);
        }
    };

    const [resetPasswordMutation, { loading: isResetting }] = useMutation(RESET_PASSWORD);
    const handleResetPassword = async () => {
        if (!selectedUser || isResetting) return;
        try {
            const userName = selectedUser.fullName;
            await resetPasswordMutation({ variables: { id: selectedUser.id } });

            // Close modal immediately
            setResetModalOpen(false);
            setSelectedUser(null);

            // Delay alert to allow UI to settle and prevent context-based duplication issues
            setTimeout(() => {
                alert(`Đã reset mật khẩu cho ${userName} thành công! Mật khẩu mới là: password123`);
            }, 100);
        } catch (error: any) {
            alert('Lỗi reset mật khẩu: ' + error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Quản trị viên</h1>
                    <p className="text-gray-500 mt-1">Tổng: {admins.length} nhân sự</p>
                </div>
                <Button onClick={handleCreate} icon="plus">Thêm Admin</Button>
            </div>

            <DataTable
                columns={columns}
                data={admins}
                searchable
                searchPlaceholder="Tìm kiếm theo tên, email..."
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => confirmReset(row)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Reset Mật khẩu"
                        >
                            <FiLock size={18} />
                        </button>
                        <button
                            onClick={() => handleEdit(row.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                        >
                            <FiEdit size={18} />
                        </button>
                        <button
                            onClick={() => confirmDelete(row)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                )}
                pagination={{
                    currentPage: 1,
                    totalPages: 1,
                    onPageChange: () => { }
                }}
            />

            {/* Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận xóa</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn xóa user <span className="font-bold text-red-600">{selectedUser?.fullName}</span>?
                            Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Hủy bỏ</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Xóa User</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {resetModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Reset Mật Khẩu</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn reset mật khẩu cho user <span className="font-bold text-blue-600">{selectedUser?.fullName}</span>?
                            <br /><span className="text-sm text-gray-500 mt-2 block">Mật khẩu sẽ được đặt về mặc định: <b>password123</b></span>
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setResetModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg" disabled={isResetting}>Hủy bỏ</button>
                            <button onClick={handleResetPassword} className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50" disabled={isResetting}>
                                {isResetting ? 'Đang xử lý...' : 'Reset Mật Khẩu'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
