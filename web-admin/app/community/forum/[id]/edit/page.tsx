"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditForumTopic() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        title: 'Cách phòng ngừa bệnh tim mạch',
        category: 'health',
        content: 'Nội dung bài viết về cách phòng ngừa bệnh tim mạch...',
        tags: 'tim mạch, phòng ngừa, sức khỏe',
        status: 'approved',
    };

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
        { name: 'tags', label: 'Tags', type: 'text' as const },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'approved', label: 'Đã duyệt' },
                { value: 'pending', label: 'Chờ duyệt' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating forum topic:', data);
        alert('Cập nhật chủ đề thành công!');
        router.push(`/admin/community/forum/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Chủ đề</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={1} />
            </div>
        </div>
    );
}
