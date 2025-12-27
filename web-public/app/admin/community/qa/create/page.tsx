"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateQA() {
    const router = useRouter();
    const fields = [
        { name: 'question', label: 'Câu hỏi', type: 'text' as const, required: true },
        {
            name: 'category', label: 'Danh mục', type: 'select' as const, required: true, options: [
                { value: 'cardiology', label: 'Tim mạch' },
                { value: 'digestive', label: 'Tiêu hóa' },
                { value: 'dermatology', label: 'Da liễu' },
                { value: 'internal', label: 'Nội khoa' },
            ]
        },
        { name: 'content', label: 'Nội dung chi tiết', type: 'textarea' as const, required: true, rows: 6 },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'approved', label: 'Đã duyệt' },
                { value: 'pending', label: 'Chờ duyệt' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating Q&A:', data);
        alert('Tạo câu hỏi thành công!');
        router.push('/admin/community/qa');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Câu hỏi</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo câu hỏi" columns={1} />
            </div>
        </div>
    );
}
