'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import userService, { User } from '@/services/user.service';
import roleService from '@/services/role.service';
import FormBuilder from '@/components/admin/FormBuilder';

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userData, rolesData] = await Promise.all([
                    userService.getUser(parseInt(id)),
                    roleService.getRoles()
                ]);
                setUser(userData);
                setRoles(rolesData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    const roleOptions = roles.map((r: any) => ({
        label: r.name,
        value: r.id.toString()
    }));

    const handleSubmit = async (values: any) => {
        try {
            setSubmitting(true);
            await userService.updateUser(parseInt(id), {
                name: values.fullName,
                roleId: parseInt(values.roleId),
                isActive: values.isActive === 'true',
                phone: values.phone
            });
            router.push('/admin/users/admins');
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa Người dùng</h1>

            {user && (
                <FormBuilder
                    initialValues={{
                        email: user.email,
                        fullName: user.name,
                        roleId: user.roleId?.toString(),
                        phone: user.phone,
                        isActive: user.isActive ? 'true' : 'false'
                    }}
                    fields={[
                        { name: 'email', label: 'Email', type: 'text', disabled: true },
                        { name: 'fullName', label: 'Họ tên', type: 'text', required: true },
                        { name: 'phone', label: 'Số điện thoại', type: 'text' },
                        {
                            name: 'roleId',
                            label: 'Vai trò',
                            type: 'select',
                            required: true,
                            options: roleOptions,
                        },
                        {
                            name: 'isActive',
                            label: 'Trạng thái',
                            type: 'select',
                            required: true,
                            options: [
                                { label: 'Hoạt động', value: 'true' },
                                { label: 'Đã khóa', value: 'false' }
                            ],
                        }
                    ]}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? 'Đang lưu...' : 'Lưu Thay đổi'}
                    loading={submitting}
                />
            )}
        </div>
    );
}
