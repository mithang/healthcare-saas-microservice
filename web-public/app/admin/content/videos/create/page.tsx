"use client";
import React, { useState } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import contentService from '@/services/content.service';

export default function CreateVideo() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'url', label: 'URL Video (YouTube/Vimeo)', type: 'text' as const, required: true, placeholder: 'https://youtube.com/watch?v=...' },
        { name: 'thumbnail', label: 'Ảnh thumbnail (URL)', type: 'text' as const, placeholder: 'https://example.com/thumb.jpg' },
        { name: 'author', label: 'Tác giả/Bác sĩ', type: 'text' as const, required: true },
        { name: 'duration', label: 'Thời lượng (VD: 12:30)', type: 'text' as const, required: true },
        {
            name: 'isActive', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'true', label: 'Đã xuất bản' },
                { value: 'false', label: 'Tạm ẩn' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            await contentService.createVideo({
                ...data,
                isActive: data.isActive === 'true'
            });
            alert('Tạo video thành công!');
            router.push('/admin/content/videos');
        } catch (error) {
            alert('Tạo video thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Thêm Video</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel={submitting ? "Đang xử lý..." : "Tạo video"} columns={2} />
            </div>
        </div>
    );
}
