"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Post } from '@/services/content.service';

export default function NewsManagement() {
    const [allNews, setAllNews] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({ category: 'all', status: 'all', search: '' });
    const itemsPerPage = 10;

    const fetchNews = async () => {
        try {
            const data = await contentService.getPosts();
            setAllNews(data);
        } catch (error) {
            console.error('Failed to fetch news', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Filter logic
    const filteredNews = allNews.filter((news) => {
        if (filter.category !== 'all' && news.category !== filter.category) return false;
        if (filter.status !== 'all') {
            const isActive = filter.status === 'published';
            if (news.isActive !== isActive) return false;
        }
        if (filter.search && !news.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
        return true;
    });

    // Pagination
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
            try {
                await contentService.deletePost(id);
                fetchNews();
                alert('Xóa thành công!');
            } catch (err: any) {
                alert('Xóa thất bại: ' + (err.message || 'Unknown error'));
            }
        }
    };

    const categories = Array.from(new Set(allNews.map((n) => n.category))).filter((c): c is string => !!c);

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Tin tức</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredNews.length} bài viết</p>
                </div>
                <Link href="/admin/content/posts/create" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    + Tạo tin tức mới
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4">
                <select
                    value={filter.category}
                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="published">Đã xuất bản</option>
                    <option value="draft">Tạm ẩn</option>
                </select>
                <div className="relative flex-1 min-w-[300px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề..."
                        value={filter.search}
                        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">STT</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">Tiêu đề</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">Danh mục</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">Tác giả</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">Ngày đăng</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Lượt xem</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Trạng thái</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedNews.map((news, idx) => (
                            <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500 text-sm">{startIndex + idx + 1}</td>
                                <td className="px-6 py-4 max-w-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                            <img src={news.thumbnail || '/img/placeholder.png'} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="font-bold text-gray-900 truncate">{news.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                                        {news.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm font-medium">{news.author}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{news.date}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-gray-900 font-bold">{news.view.toLocaleString()}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${news.isActive ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                                        }`}>
                                        {news.isActive ? 'Đã xuất bản' : 'Tạm ẩn'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <Link href={`/news/${news.id}`} target="_blank" className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Xem">
                                            👁️
                                        </Link>
                                        <Link href={`/admin/content/posts/${news.id}/edit`} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Sửa">
                                            ✏️
                                        </Link>
                                        <button onClick={() => handleDelete(news.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Xóa">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredNews.length === 0 && (
                    <div className="p-12 text-center text-gray-400 font-medium bg-gray-50/50">
                        Không tìm thấy tin tức nào.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-sm font-medium text-gray-500">
                        Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredNews.length)} trong tổng số {filteredNews.length} tin tức
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold transition-all"
                        >
                            Trước
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${currentPage === page
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold transition-all"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
