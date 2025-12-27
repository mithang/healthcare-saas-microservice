"use client";
import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/admin/ui/Button';
import roleService, { Role } from '@/services/role.service';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function RolesManagement() {
    const router = useRouter();
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<any>(null);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const data = await roleService.getRoles();
            setRoles(data);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const columns = [
        { key: 'name', label: 'Tên vai trò', render: (val: string) => <span className="font-bold text-gray-900">{val}</span> },
        { key: 'description', label: 'Mô tả', width: '400px' },
        { key: 'permissions', label: 'Số quyền', render: (val: string[]) => <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-bold">{val?.length || 0} permissions</span> },
        { key: 'createdAt', label: 'Ngày tạo', render: (val: string) => new Date(val).toLocaleDateString('vi-VN') },
    ];

    const handleCreate = () => {
        router.push('/admin/users/roles/create');
    };

    const handleEdit = (id: number) => {
        router.push(`/admin/users/roles/${id}/edit`);
    };

    const confirmDelete = (role: any) => {
        setSelectedRole(role);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedRole) return;
        try {
            await roleService.deleteRole(selectedRole.id);
            fetchRoles();
            setDeleteModalOpen(false);
            setSelectedRole(null);
        } catch (error: any) {
            alert('Lỗi khi xóa vai trò: ' + (error.message || 'Unknown error'));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Phân quyền Vai trò</h1>
                    <p className="text-gray-500 mt-1">Tổng: {roles.length} vai trò</p>
                </div>
                <Button onClick={handleCreate} icon="plus">Thêm Vai trò</Button>
            </div>

            <DataTable
                columns={columns}
                data={roles}
                searchable
                searchPlaceholder="Tìm kiếm vai trò..."
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleEdit(row.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                        >
                            <FiEdit size={18} />
                        </button>
                        {row.name !== 'super_admin' && row.name !== 'Super Admin' && (
                            <button
                                onClick={() => confirmDelete(row)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa"
                            >
                                <FiTrash2 size={18} />
                            </button>
                        )}
                    </div>
                )}
            />

            {/* Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận xóa</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn xóa vai trò <span className="font-bold text-red-600">{selectedRole?.name}</span>?
                            Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
                            >
                                Xóa Vai trò
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
