"use client";
import React, { useState } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import userService from '@/services/user.service';
import roleService from '@/services/role.service';

export default function CreateAdmin() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [roles, setRoles] = useState<any[]>([]);

    React.useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await roleService.getRoles();
                setRoles(data);
            } catch (error) {
                console.error('Failed to fetch roles', error);
            }
        };
        fetchRoles();
    }, []);

    const roleOptions = roles.length > 0 ? roles.map(r => ({
        value: r.id.toString(),
        label: r.name
    })) : [];

    const fields = [
        { name: 'name', label: 'Họ và tên', type: 'text' as const, required: true, placeholder: 'Nguyen Van A' },
        { name: 'email', label: 'Email đăng nhập', type: 'email' as const, required: true, placeholder: 'admin@healthcare.vn' },
        { name: 'password', label: 'Mật khẩu', type: 'password' as const, required: true },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const },
        {
            name: 'roleId', label: 'Phân quyền', type: 'select' as const, required: true, options: roleOptions
        },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm khóa' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        try {
            setSubmitting(true);
            await userService.createUser({
                userId: crypto.randomUUID(), // or let backend handle it
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                roleId: parseInt(data.roleId || '2'),
                isActive: data.status === 'active'
            });
            alert('Tạo tài khoản quản trị viên thành công!');
            router.push('/admin/users/admins');
        } catch (error: any) {
            alert('Lỗi khi tạo tài khoản: ' + (error.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Thêm Quản trị viên mới</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? "Đang tạo..." : "Tạo tài khoản"}
                    loading={submitting}
                    columns={2}
                />
            </div>
        </div>
    );
}
