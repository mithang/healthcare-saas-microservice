"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateAdmin() {
    const router = useRouter();

    const fields = [
        { name: 'name', label: 'Họ và tên', type: 'text' as const, required: true, placeholder: 'Nguyen Van A' },
        { name: 'email', label: 'Email đăng nhập', type: 'email' as const, required: true, placeholder: 'admin@healthcare.vn' },
        { name: 'password', label: 'Mật khẩu', type: 'password' as const, required: true },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const },
        {
            name: 'role', label: 'Phân quyền', type: 'select' as const, required: true, options: [
                { value: 'super_admin', label: 'Super Admin - Toàn quyền' },
                { value: 'admin', label: 'Admin - Quản lý chung' },
                { value: 'editor', label: 'Editor - Biên tập viên' },
                { value: 'moderator', label: 'Moderator - Kiểm duyệt viên' },
                { value: 'support', label: 'Support - Hỗ trợ khách hàng' },
                { value: 'accountant', label: 'Accountant - Kế toán' },
            ]
        },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm khóa' },
            ]
        },
        { name: 'avatar', label: 'Avatar URL', type: 'text' as const, placeholder: 'https://...' },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating admin:', data);
        // Mock API call
        setTimeout(() => {
            alert('Tạo tài khoản quản trị viên thành công!');
            router.push('/admin/users/admins');
        }, 500);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Thêm Quản trị viên mới</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo tài khoản"
                    columns={2}
                />
            </div>
        </div>
    );
}
