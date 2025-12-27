"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { StaticPage } from '@/services/content.service';

export default function PagesManagement() {
    const [pages, setPages] = useState<StaticPage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPages = async () => {
        try {
            const data = await contentService.getStaticPages();
            setPages(data);
        } catch (error) {
            console.error('Failed to fetch pages', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDelete = async (id: number | string) => {
        if (confirm('Bạn có chắc chắn muốn xóa trang này?')) {
            try {
                await contentService.deleteStaticPage(id);
                fetchPages();
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
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Trang tĩnh</h1>
                    <p className="text-gray-500 mt-1">Tổng cộng: {pages.length} trang nội dung tĩnh</p>
                </div>
                <Link href="/admin/content/pages/create" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                    + Tạo trang mới
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Tiêu đề</th>
                                <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Slug</th>
                                <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Trạng thái</th>
                                <th className="px-10 py-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pages.map(page => (
                                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{page.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">/{page.slug}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${page.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {page.isActive ? 'Đã xuất bản' : 'Tạm ẩn'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/${page.slug}`} target="_blank" className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                                👁️
                                            </Link>
                                            <Link href={`/admin/content/pages/${page.id}/edit`} className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-all">
                                                ✏️
                                            </Link>
                                            <button onClick={() => handleDelete(page.id)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all">
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {pages.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium">
                        Chưa có trang tĩnh nào được tạo.
                    </div>
                )}
            </div>
        </div>
    );
}
