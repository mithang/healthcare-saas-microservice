"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/portal/posts" className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-sm transition">
                        <i className="fi flaticon-left-arrow-1 text-sm"></i>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Viết bài mới</h1>
                        <p className="text-gray-500 text-sm">Chia sẻ kiến thức y khoa với cộng đồng</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">Lưu nháp</button>
                    <button className="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-0.5">Xuất bản</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề bài viết</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tiêu đề..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-bold text-lg"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung</label>
                                {/* Editor Placeholder */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
                                        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center"><i className="fi flaticon-bold"></i></button>
                                        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center"><i className="fi flaticon-italic"></i></button>
                                        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center"><i className="fi flaticon-underline"></i></button>
                                        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                                        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center"><i className="fi flaticon-list-1"></i></button>
                                        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center"><i className="fi flaticon-list"></i></button>
                                        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                                        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center"><i className="fi flaticon-picture"></i></button>
                                        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center"><i className="fi flaticon-link"></i></button>
                                    </div>
                                    <textarea
                                        className="w-full p-4 h-[400px] focus:outline-none resize-none"
                                        placeholder="Nội dung bài viết..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Thông tin chung</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên mục</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Chọn chuyên mục</option>
                                    <option value="song-khoe">Sống khỏe</option>
                                    <option value="y-hoc">Y học thường thức</option>
                                    <option value="benh-hoc">Bệnh học</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer group">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/10 group-hover:text-primary transition">
                                        <i className="fi flaticon-add"></i>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">Tải ảnh lên</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tóm tắt (Meta Desc)</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
