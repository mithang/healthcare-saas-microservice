"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_NEWS_BY_ID, UPDATE_NEWS, GET_NEWS_CATEGORIES_FULL } from '@/graphql/news';

export default function EditNews() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const { data, loading: queryLoading, error: queryError } = useQuery<any>(GET_NEWS_BY_ID, {
        variables: { id: params.id }
    });
    const { data: catData, loading: catLoading } = useQuery<any>(GET_NEWS_CATEGORIES_FULL);
    const [updateNews, { loading: updateLoading }] = useMutation(UPDATE_NEWS);

    const [formData, setFormData] = useState({
        title: '',
        categoryId: '',
        content: '',
        isActive: true,
        thumbnail: '',
        desc: '',
        authorName: '',
    });

    useEffect(() => {
        if (data?.getNewsById) {
            const { title, categoryId, content, isActive, thumbnail, desc, authorName } = data.getNewsById;
            setFormData({ title, categoryId, content, isActive, thumbnail, desc, authorName });
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateNews({
                variables: {
                    input: {
                        id: params.id,
                        ...formData
                    }
                }
            });
            alert('Tin tức đã được cập nhật thành công!');
            router.push('/admin/content/posts');
        } catch (err) {
            alert('Lỗi khi cập nhật tin tức: ' + err);
        }
    };

    if (queryLoading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;
    if (queryError) return <div className="p-8 text-center text-red-500">Lỗi: {queryError.message}</div>;

    const categories = catData?.getNewsCategoriesFull || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/content/posts" className="bg-white p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-primary transition-all">
                    <i className="fi flaticon-arrow-left text-xl"></i>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa tin tức</h1>
                    <p className="text-gray-500 mt-1">ID: #{params.id}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả ngắn</label>
                                <textarea
                                    rows={3}
                                    value={formData.desc || ''}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung bài viết *</label>
                                <textarea
                                    required
                                    rows={15}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all leading-relaxed"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh đại diện (URL)</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail || ''}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                                {formData.thumbnail && (
                                    <div className="mt-4 w-40 h-24 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                        <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Trạng thái & Phân loại
                        </h3>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select
                                    value={formData.isActive ? 'true' : 'false'}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50 font-medium cursor-pointer"
                                >
                                    <option value="true">Đã xuất bản</option>
                                    <option value="false">Tạm ẩn (Nháp)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Danh mục</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    disabled={catLoading}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50 font-medium cursor-pointer disabled:opacity-50"
                                >
                                    {catLoading ? (
                                        <option>Đang tải...</option>
                                    ) : (
                                        categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tác giả</label>
                                <input
                                    type="text"
                                    value={formData.authorName || ''}
                                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50"
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-100 space-y-3">
                                <button
                                    type="submit"
                                    disabled={updateLoading}
                                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                                >
                                    {updateLoading ? 'Đang cập nhật...' : 'Cập nhật tin tức'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="w-full border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Hủy bỏ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
