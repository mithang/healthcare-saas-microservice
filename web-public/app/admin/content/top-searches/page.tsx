"use client";

import React, { useState, useEffect } from 'react';
import contentService, { TopSearchKeyword } from '@/services/content.service';

export default function TopSearchesManagement() {
    const [keywords, setKeywords] = useState<TopSearchKeyword[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [keywordToDelete, setKeywordToDelete] = useState<TopSearchKeyword | null>(null);
    const [editingKeyword, setEditingKeyword] = useState<TopSearchKeyword | null>(null);
    const [newKeyword, setNewKeyword] = useState({ keyword: '', searchTimes: 0 });
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchKeywords = async () => {
        try {
            const data = await contentService.getTopSearches();
            setKeywords(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeywords();
    }, []);

    const filteredKeywords = keywords.filter((k) =>
        k.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async () => {
        if (!keywordToDelete) return;
        try {
            await contentService.deleteTopSearch(keywordToDelete.id);
            showMessage('Đã xóa từ khóa thành công');
            setIsDeleteModalOpen(false);
            setKeywordToDelete(null);
            fetchKeywords();
        } catch (err) {
            showMessage('Xóa thất bại', 'error');
        }
    };

    const handleToggleStatus = async (keyword: TopSearchKeyword) => {
        try {
            await contentService.updateTopSearch(keyword.id, { isActive: !keyword.isActive });
            showMessage(`Đã ${!keyword.isActive ? 'hiện' : 'ẩn'} từ khóa`);
            fetchKeywords();
        } catch (err) {
            showMessage('Cập nhật thất bại', 'error');
        }
    };

    const handleSave = async () => {
        try {
            if (editingKeyword) {
                await contentService.updateTopSearch(editingKeyword.id, {
                    keyword: newKeyword.keyword,
                    searchTimes: parseInt(newKeyword.searchTimes.toString())
                });
                showMessage('Đã cập nhật từ khóa');
            } else {
                await contentService.createTopSearch(
                    newKeyword.keyword,
                    parseInt(newKeyword.searchTimes.toString())
                );
                showMessage('Đã thêm từ khóa mới');
            }
            setIsModalOpen(false);
            setEditingKeyword(null);
            setNewKeyword({ keyword: '', searchTimes: 0 });
            fetchKeywords();
        } catch (err) {
            showMessage('Lưu thất bại', 'error');
        }
    };

    const openEditModal = (keyword: TopSearchKeyword) => {
        setEditingKeyword(keyword);
        setNewKeyword({ keyword: keyword.keyword, searchTimes: keyword.searchTimes });
        setIsModalOpen(true);
    };

    const openDeleteModal = (keyword: TopSearchKeyword) => {
        setKeywordToDelete(keyword);
        setIsDeleteModalOpen(true);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Tìm kiếm nhiều nhất</h1>
                    <p className="text-gray-500 mt-1">Tổng: {filteredKeywords.length} từ khóa</p>
                </div>
                <button
                    onClick={() => {
                        setEditingKeyword(null);
                        setNewKeyword({ keyword: '', searchTimes: 0 });
                        setIsModalOpen(true);
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
                >
                    + Thêm từ khóa mới
                </button>
            </div>

            {/* Message Toast */}
            {message && (
                <div className={`fixed top-24 right-8 z-[60] px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                    <span>{message.type === 'success' ? '✅' : '❌'}</span>
                    <span className="font-bold">{message.text}</span>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm từ khóa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">STT</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">Từ khóa</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Lượt tìm kiếm</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Trạng thái</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredKeywords.map((k, idx) => (
                            <tr key={k.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{k.keyword}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                                        {k.searchTimes.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleToggleStatus(k)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${k.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}
                                    >
                                        {k.isActive ? 'Hoạt động' : 'Tạm ẩn'}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => openEditModal(k)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Sửa"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(k)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Xóa"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredKeywords.length === 0 && (
                    <div className="p-12 text-center text-gray-500 font-medium">
                        Không tìm thấy từ khóa nào.
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingKeyword ? 'Chỉnh sửa từ khóa' : 'Thêm từ khóa mới'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-2xl leading-none">×</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Từ khóa</label>
                                <input
                                    type="text"
                                    value={newKeyword.keyword}
                                    onChange={(e) => setNewKeyword({ ...newKeyword, keyword: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="Nhập từ khóa..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Lượt tìm kiếm</label>
                                <input
                                    type="number"
                                    value={newKeyword.searchTimes}
                                    onChange={(e) => setNewKeyword({ ...newKeyword, searchTimes: parseInt(e.target.value || '0') })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                            >
                                {editingKeyword ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                🗑️
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận xóa</h3>
                            <p className="text-gray-500 px-4">
                                Bạn có chắc chắn muốn xóa từ khóa <span className="font-bold text-gray-900">"{keywordToDelete?.keyword}"</span>? Hành động này không thể hoàn tác.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                            >
                                Xóa ngay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
