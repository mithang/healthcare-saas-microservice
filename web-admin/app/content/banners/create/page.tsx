"use client";
import React, { useState } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import contentService from '@/services/content.service';

export default function CreateBanner() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'image', label: 'Hình ảnh (URL)', type: 'text' as const, required: true, placeholder: 'https://example.com/banner.jpg' },
        { name: 'link', label: 'Liên kết', type: 'text' as const, placeholder: '/news/123' },
        {
            name: 'position', label: 'Vị trí', type: 'select' as const, required: true, options: [
                { value: 'home_hero', label: 'Trang chủ - Đầu trang' },
                { value: 'sidebar', label: 'Sidebar' },
                { value: 'news_top', label: 'Tin tức - Đầu trang' },
            ]
        },
        {
            name: 'isActive', label: 'Hoạt động', type: 'select' as const, required: true, options: [
                { value: 'true', label: 'Có' },
                { value: 'false', label: 'Không' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            await contentService.createBanner({
                ...data,
                isActive: data.isActive === 'true'
            });
            alert('Tạo banner thành công!');
            router.push('/admin/content/banners');
        } catch (error) {
            alert('Tạo banner thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Banner</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel={submitting ? "Đang xử lý..." : "Tạo banner"} columns={2} />
            </div>
        </div>
    );
}
