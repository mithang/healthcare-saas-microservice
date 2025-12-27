"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditVideo() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        title: '10 Bài tập Yoga cho người mới bắt đầu',
        videoUrl: 'https://youtube.com/watch?v=example',
        thumbnail: '/img/yoga-thumb.jpg',
        category: 'exercise',
        duration: 15,
        description: 'Video hướng dẫn 10 bài tập yoga cơ bản',
        tags: 'yoga, sức khỏe, thể dục',
        status: 'published',
    };

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'videoUrl', label: 'URL Video', type: 'text' as const, required: true },
        { name: 'thumbnail', label: 'Ảnh thumbnail', type: 'text' as const },
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
        { name: 'tags', label: 'Tags', type: 'text' as const },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'published', label: 'Đã xuất bản' },
                { value: 'draft', label: 'Nháp' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating video:', data);
        alert('Cập nhật video thành công!');
        router.push(`/admin/content/videos/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Video</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
