'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USER, UPDATE_USER } from '@/graphql/users';
import { GET_ALL_ROLES } from '@/graphql/roles';
import FormBuilder from '@/components/admin/FormBuilder';

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    // Fetch user details
    const { data: userData, loading: userLoading } = useQuery(GET_USER, {
        variables: { id },
        skip: !id
    });

    // Fetch roles for selection
    const { data: rolesData, loading: rolesLoading } = useQuery(GET_ALL_ROLES);

    const [updateUser, { loading: submitting }] = useMutation(UPDATE_USER);

    // Prepare role options
    const roleOptions = (rolesData as any)?.getAllRoles?.map((r: any) => ({
        label: r.name,
        value: r.id
    })) || [];

    const handleSubmit = async (values: any) => {
        try {
            await updateUser({
                variables: {
                    id,
                    input: {
                        fullName: values.fullName,
                        roleId: values.roleId, // Expecting roleId from select
                        isActive: values.isActive === 'true' // Convert from radio/select if needed, or check FormBuilder boolean support
                    }
                }
            });
            router.push('/admin/users/admins');
        } catch (error: any) {
            console.error(error);
            alert('Lỗi cập nhật: ' + error.message);
        }
    };

    if (userLoading || rolesLoading) return <div>Loading...</div>;

    const user = (userData as any)?.getUser;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa Người dùng</h1>

            {user && (
                <FormBuilder
                    initialValues={{
                        email: user.email,
                        fullName: user.fullName,
                        roleId: user.role?.id,
                        isActive: user.isActive ? 'true' : 'false'
                    }}
                    fields={[
                        { name: 'email', label: 'Email', type: 'text', disabled: true },
                        { name: 'fullName', label: 'Họ tên', type: 'text', required: true },
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
