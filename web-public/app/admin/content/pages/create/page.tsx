"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
    const router = useRouter();
    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true, placeholder: 'about-us' },
        { name: 'content', label: 'Nội dung', type: 'textarea' as const, required: true, rows: 10 },
        { name: 'metaTitle', label: 'Meta Title (SEO)', type: 'text' as const },
        { name: 'metaDescription', label: 'Meta Description (SEO)', type: 'textarea' as const, rows: 3 },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'published', label: 'Đã xuất bản' },
                { value: 'draft', label: 'Nháp' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating page:', data);
        alert('Tạo trang thành công!');
        router.push('/admin/content/pages');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Trang tĩnh</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo trang" columns={1} />
            </div>
        </div>
    );
}
