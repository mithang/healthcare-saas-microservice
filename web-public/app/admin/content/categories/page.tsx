"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Category } from '@/services/content.service';

export default function NewsCategoriesAdmin() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [newName, setNewName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const fetchCategories = async () => {
        try {
            const data = await contentService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;

        setIsCreating(true);
        try {
            await contentService.createCategory(newName);
            setNewName('');
            await fetchCategories();
            alert('Đã thêm danh mục mới!');
        } catch (err: any) {
            alert('Lỗi: ' + (err.message || err));
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}"?`)) return;

        try {
            await contentService.deleteCategory(id);
            await fetchCategories();
            alert('Đã xóa danh mục!');
        } catch (err: any) {
            alert('Lỗi: ' + (err.message || err));
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Chuyên mục</h1>
                    <p className="text-gray-500 mt-1">Quản lý các danh mục bài viết trên hệ thống</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/content/posts" className="bg-white px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:text-primary transition-all flex items-center gap-2">
                        <span>Danh sách bài viết</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Add New */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Thêm danh mục mới
                        </h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên danh mục *</label>
                                <input
                                    type="text"
                                    required
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="VD: Sống khỏe, Covid-19..."
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                            >
                                {isCreating ? 'Đang thêm...' : 'Thêm danh mục'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tên danh mục</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {categories.length > 0 ? (
                                    categories.map((cat: any) => (
                                        <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-gray-900">{cat.name}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                                                {cat.id.substring(0, 8)}...
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(cat.id, cat.name)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Xóa danh mục"
                                                >
                                                    <i className="fi flaticon-trash text-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-gray-400 font-medium">
                                            Chưa có danh mục nào. Hãy thêm danh mục đầu tiên!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
