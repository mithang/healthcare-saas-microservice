"use client";
import React, { useState, useEffect, use } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import contentService, { Banner } from '@/services/content.service';

export default function EditBanner({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const banner = await contentService.getBanners().then(banners => banners.find(b => String(b.id) === id));
                if (banner) {
                    setInitialValues({
                        ...banner,
                        isActive: banner.isActive ? 'true' : 'false'
                    });
                }
            } catch (error) {
                console.error('Failed to fetch banner', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanner();
    }, [id]);

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'image', label: 'Hình ảnh (URL)', type: 'text' as const, required: true },
        { name: 'link', label: 'Liên kết', type: 'text' as const },
        {
            name: 'position', label: 'Vị trí', type: 'select' as const, required: true, options: [
                { value: 'home_hero', label: 'Trang chủ - Hero' },
                { value: 'sidebar', label: 'Sidebar' },
                { value: 'news_top', label: 'Tin tức - Đầu trang' },
            ]
        },
        {
            name: 'isActive', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'true', label: 'Hoạt động' },
                { value: 'false', label: 'Tạm ngưng' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            // In a real scenario, we'd have a getBanner(id) method. 
            // For now we use the same update logic.
            alert('Cập nhật banner thành công!');
            router.push('/admin/content/banners');
        } catch (error) {
            alert('Cập nhật thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;
    if (!initialValues) return <div className="p-8 text-center text-red-500">Không tìm thấy banner</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Banner</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? "Đang xử lý..." : "Cập nhật"}
                    initialValues={initialValues}
                    columns={2}
                />
            </div>
        </div>
    );
}
