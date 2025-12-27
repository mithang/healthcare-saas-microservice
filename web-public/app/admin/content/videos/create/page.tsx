"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateVideo() {
    const router = useRouter();
    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'videoUrl', label: 'URL Video (YouTube/Vimeo)', type: 'text' as const, required: true, placeholder: 'https://youtube.com/watch?v=...' },
        { name: 'thumbnail', label: 'Ảnh thumbnail', type: 'text' as const, placeholder: '/img/video-thumb.jpg' },
        {
            name: 'category', label: 'Danh mục', type: 'select' as const, required: true, options: [
                { value: 'health_tips', label: 'Mẹo sức khỏe' },
                { value: 'exercise', label: 'Bài tập' },
                { value: 'nutrition', label: 'Dinh dưỡng' },
                { value: 'mental_health', label: 'Sức khỏe tinh thần' },
            ]
        },
        { name: 'duration', label: 'Thời lượng (phút)', type: 'number' as const },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, rows: 4 },
        { name: 'tags', label: 'Tags (phân cách bằng dấu phẩy)', type: 'text' as const, placeholder: 'sức khỏe, yoga, thể dục' },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'published', label: 'Đã xuất bản' },
                { value: 'draft', label: 'Nháp' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating video:', data);
        alert('Tạo video thành công!');
        router.push('/admin/content/videos');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Thêm Video</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo video" columns={2} />
            </div>
        </div>
    );
}
