'use client';

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_ROLE, UPDATE_ROLE } from '@/graphql/roles';
import FormBuilder from '@/components/admin/FormBuilder';

export default function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const { data, loading } = useQuery(GET_ROLE, {
        variables: { id },
        skip: !id
    });

    const [updateRole, { loading: submitting }] = useMutation(UPDATE_ROLE);

    const handleSubmit = async (values: any) => {
        try {
            await updateRole({
                variables: {
                    id,
                    input: {
                        name: values.name,
                        description: values.description
                    }
                }
            });
            router.push('/admin/users/roles');
        } catch (error: any) {
            console.error(error);
            alert('Lỗi cập nhật: ' + error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    const role = (data as any)?.getRole;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa Vai trò</h1>

            {role && (
                <FormBuilder
                    initialValues={{
                        name: role.name,
                        description: role.description
                    }}
                    fields={[
                        { name: 'name', label: 'Tên Vai trò', type: 'text', required: true },
                        { name: 'description', label: 'Mô tả', type: 'textarea', required: true },
                    ]}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? 'Đang lưu...' : 'Lưu Thay đổi'}
                    loading={submitting}
                />
            )}
        </div>
    );
}
