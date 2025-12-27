"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Banner } from '@/services/content.service';

export default function BannersManagement() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBanners = async () => {
        try {
            const data = await contentService.getBanners();
            setBanners(data);
        } catch (error) {
            console.error('Failed to fetch banners', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleDelete = async (id: number | string) => {
        if (confirm('Bạn có chắc chắn muốn xóa banner này?')) {
            try {
                await contentService.deleteBanner(id);
                fetchBanners();
                alert('Xóa thành công!');
            } catch (error) {
                alert('Xóa thất bại');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Banner</h1>
                    <p className="text-gray-500 mt-1">Quản lý banner quảng cáo trên hệ thống</p>
                </div>
                <Link href="/admin/content/banners/create" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                    + Tạo banner mới
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map(banner => (
                    <div key={banner.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                        <div className="aspect-video bg-gray-50 relative overflow-hidden">
                            <img src={banner.image || '/img/placeholder.png'} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${banner.isActive ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-400 text-white'}`}>
                                    {banner.isActive ? 'Hoạt động' : 'Tạm ngưng'}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-gray-900 mb-1 truncate text-lg">{banner.title}</h3>
                            <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                                    {banner.position}
                                </span>
                            </p>
                            <div className="flex gap-3 pt-4 border-t border-gray-50">
                                <Link href={`/admin/content/banners/${banner.id}/edit`} className="flex-1 text-center bg-gray-50 text-gray-600 font-bold py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all">
                                    Sửa
                                </Link>
                                <button onClick={() => handleDelete(banner.id)} className="flex-1 bg-gray-50 text-gray-600 font-bold py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all">
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {banners.length === 0 && (
                <div className="p-20 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 font-medium">
                    Chưa có banner nào được tạo.
                </div>
            )}
        </div>
    );
}
