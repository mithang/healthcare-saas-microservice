"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditBanner() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        title: 'Banner Khuyến mãi Tết',
        image: '/img/banner-tet.jpg',
        link: '/promotions/tet-2024',
        position: 'home_top',
        order: 1,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        status: 'active',
    };

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'image', label: 'Hình ảnh (URL)', type: 'text' as const, required: true },
        { name: 'link', label: 'Liên kết', type: 'text' as const },
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
        console.log('Updating banner:', data);
        alert('Cập nhật banner thành công!');
        router.push(`/admin/content/banners/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Banner</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
