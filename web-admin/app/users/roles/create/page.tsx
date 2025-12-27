"use client";
import React, { useState } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import roleService from '@/services/role.service';

export default function CreateRole() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const fields = [
        { name: 'name', label: 'Tên vai trò', type: 'text' as const, required: true, placeholder: 'Ví dụ: Content Manager' },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, required: true, rows: 2 },
        {
            name: 'permissions', label: 'Quyền hạn được cấp', type: 'select' as const, required: true, isMulti: true, options: [
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
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        try {
            setSubmitting(true);
            await roleService.createRole({
                name: data.name,
                description: data.description,
                permissions: data.permissions
            });
            alert('Tạo vai trò mới thành công!');
            router.push('/admin/users/roles');
        } catch (error: any) {
            alert('Lỗi khi tạo vai trò: ' + (error.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Vai trò mới</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? "Đang tạo..." : "Tạo vai trò"}
                    loading={submitting}
                    columns={1}
                />
            </div>
        </div>
    );
}
