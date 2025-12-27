'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import roleService, { Role } from '@/services/role.service';
import FormBuilder from '@/components/admin/FormBuilder';

export default function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const data = await roleService.getRole(parseInt(id));
                setRole(data);
            } catch (error) {
                console.error('Failed to fetch role:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchRole();
    }, [id]);

    const handleSubmit = async (values: any) => {
        try {
            setSubmitting(true);
            await roleService.updateRole(parseInt(id), {
                name: values.name,
                description: values.description,
                permissions: values.permissions // Provided the FormBuilder supports multiselect array return
            });
            router.push('/admin/users/roles');
        } catch (error: any) {
            console.error(error);
            alert('Lỗi cập nhật: ' + (error.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa Vai trò</h1>

            {role && (
                <FormBuilder
                    initialValues={{
                        name: role.name,
                        description: role.description,
                        permissions: role.permissions // Assumes permissions array
                    }}
                    fields={[
                        { name: 'name', label: 'Tên Vai trò', type: 'text', required: true },
                        { name: 'description', label: 'Mô tả', type: 'textarea', required: true },
                        {
                            name: 'permissions', label: 'Quyền hạn được cấp', type: 'select', required: true, isMulti: true, options: [
                                { value: 'dashboard.view', label: 'Xem Dashboard' },
                                { value: 'users.view', label: 'Xem danh sách User' },
                                { value: 'users.create', label: 'Tạo User' },
                                { value: 'users.edit', label: 'Sửa User' },
                                { value: 'users.delete', label: 'Xóa User' },
                                { value: 'roles.view', label: 'Xem danh sách Role' },
                                { value: 'roles.create', label: 'Tạo Role' },
                                { value: 'roles.edit', label: 'Sửa Role' },
                                { value: 'roles.delete', label: 'Xóa Role' },
                                { value: 'content.view', label: 'Xem Nội dung' },
                                { value: 'content.create', label: 'Tạo Nội dung' },
                                { value: 'content.edit', label: 'Sửa Nội dung' },
                                { value: 'content.delete', label: 'Xóa Nội dung' },
                                { value: 'finance.view', label: 'Xem Tài chính' },
                                { value: 'finance.manage', label: 'Quản lý Tài chính' },
                                { value: 'settings.view', label: 'Xem Cài đặt' },
                                { value: 'settings.manage', label: 'Quản lý Cài đặt' },
                            ]
                        },
                    ]}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? 'Đang lưu...' : 'Lưu Thay đổi'}
                    loading={submitting}
                />
            )}
        </div>
    );
}
