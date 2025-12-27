"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateForumTopic() {
    const router = useRouter();
    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        {
            name: 'category', label: 'Danh mục', type: 'select' as const, required: true, options: [
                { value: 'health', label: 'Sức khỏe' },
                { value: 'nutrition', label: 'Dinh dưỡng' },
                { value: 'mental', label: 'Tâm lý' },
                { value: 'exercise', label: 'Thể thao' },
            ]
        },
        { name: 'content', label: 'Nội dung', type: 'textarea' as const, required: true, rows: 10 },
        { name: 'tags', label: 'Tags (phân cách bằng dấu phẩy)', type: 'text' as const, placeholder: 'sức khỏe, dinh dưỡng' },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'approved', label: 'Đã duyệt' },
                { value: 'pending', label: 'Chờ duyệt' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating forum topic:', data);
        alert('Tạo chủ đề thành công!');
        router.push('/admin/community/forum');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Chủ đề Diễn đàn</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo chủ đề" columns={1} />
            </div>
        </div>
    );
}
