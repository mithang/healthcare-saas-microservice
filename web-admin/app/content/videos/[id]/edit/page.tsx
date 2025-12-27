"use client";
import React, { useState, useEffect, use } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import contentService, { Video } from '@/services/content.service';

export default function EditVideo({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const video = await contentService.getVideos().then(videos => videos.find(v => String(v.id) === id));
                if (video) {
                    setInitialValues({
                        ...video,
                        isActive: video.isActive ? 'true' : 'false'
                    });
                }
            } catch (error) {
                console.error('Failed to fetch video', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id]);

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'url', label: 'URL Video', type: 'text' as const, required: true },
        { name: 'thumbnail', label: 'Ảnh thumbnail', type: 'text' as const },
        { name: 'author', label: 'Tác giả', type: 'text' as const },
        { name: 'duration', label: 'Thời lượng', type: 'text' as const },
        {
            name: 'isActive', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'true', label: 'Đã xuất bản' },
                { value: 'false', label: 'Nháp' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            alert('Cập nhật video thành công!');
            router.push('/admin/content/videos');
        } catch (error) {
            alert('Cập nhật thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;
    if (!initialValues) return <div className="p-8 text-center text-red-500">Không tìm thấy video</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Video</h1>
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
