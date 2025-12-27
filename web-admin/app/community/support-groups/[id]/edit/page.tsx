"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditSupportGroup() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        name: 'Nhóm hỗ trợ Tiểu đường',
        description: 'Nhóm dành cho người bệnh tiểu đường',
        moderator: 'BS. Nguyễn Văn A',
        category: 'diabetes',
        rules: 'Tôn trọng các thành viên khác\nKhông spam hoặc quảng cáo\nChia sẻ thông tin chính xác',
        status: 'active',
    };

    const fields = [
        { name: 'name', label: 'Tên nhóm', type: 'text' as const, required: true },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, required: true, rows: 4 },
        { name: 'moderator', label: 'Người quản lý', type: 'text' as const, required: true },
        {
            name: 'category', label: 'Danh mục', type: 'select' as const, required: true, options: [
                { value: 'diabetes', label: 'Tiểu đường' },
                { value: 'hypertension', label: 'Huyết áp' },
                { value: 'cancer', label: 'Ung thư' },
                { value: 'mental', label: 'Tâm lý' },
            ]
        },
        { name: 'rules', label: 'Nội quy', type: 'textarea' as const, rows: 5 },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating support group:', data);
        alert('Cập nhật nhóm hỗ trợ thành công!');
        router.push(`/admin/community/support-groups/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Nhóm hỗ trợ</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
