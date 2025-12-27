"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateBanner() {
    const router = useRouter();
    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'image', label: 'Hình ảnh (URL)', type: 'text' as const, required: true, placeholder: '/img/banner.jpg' },
        { name: 'link', label: 'Liên kết', type: 'text' as const, placeholder: '/page/about' },
        {
            name: 'position', label: 'Vị trí', type: 'select' as const, required: true, options: [
                { value: 'home_top', label: 'Trang chủ - Đầu trang' },
                { value: 'home_middle', label: 'Trang chủ - Giữa trang' },
                { value: 'sidebar', label: 'Sidebar' },
            ]
        },
        { name: 'order', label: 'Thứ tự hiển thị', type: 'number' as const, required: true },
        { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' as const },
        { name: 'endDate', label: 'Ngày kết thúc', type: 'date' as const },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating banner:', data);
        alert('Tạo banner thành công!');
        router.push('/admin/content/banners');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Banner</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo banner" columns={2} />
            </div>
        </div>
    );
}
