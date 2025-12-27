"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function MedicalJournalPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const articles = [
        {
            id: 1,
            title: 'Tiến bộ mới trong điều trị ung thư phổi giai đoạn muộn',
            authors: 'Nguyen Van A, Tran Thi B',
            category: 'Ung thư học',
            date: '2024-12-15',
            abstract: 'Nghiên cứu về phương pháp điều trị mới kết hợp hóa trị và miễn dịch liệu pháp...',
            views: 1250,
            downloads: 340,
        },
        {
            id: 2,
            title: 'Đánh giá hiệu quả của thuốc kháng sinh thế hệ mới',
            authors: 'Le Van C, Pham Thi D',
            category: 'Dược lâm sàng',
            date: '2024-12-10',
            abstract: 'Thử nghiệm lâm sàng đa trung tâm về hiệu quả và an toàn của kháng sinh mới...',
            views: 980,
            downloads: 280,
        },
    ];

    const categories = [
        'Tất cả',
        'Tim mạch',
        'Ung thư học',
        'Nội khoa',
        'Ngoại khoa',
        'Nhi khoa',
        'Dược lâm sàng',
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tạp chí Y học</h1>
                        <p className="text-gray-500 mt-1">Nghiên cứu và bài báo khoa học</p>
                    </div>
                    <Link href="/medical-journal/submit">
                        <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition flex items-center gap-2">
                            <i className="fi flaticon-add"></i> Nộp bài
                        </button>
                    </Link>
                </div>

                {/* Search & Filter */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài báo..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Articles List */}
                <div className="space-y-6">
                    {articles.map((article) => (
                        <div key={article.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                    {article.category}
                                </span>
                                <span className="text-sm text-gray-500">{article.date}</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary cursor-pointer">
                                {article.title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">Tác giả:</span> {article.authors}
                            </p>
                            <p className="text-gray-700 mb-4">{article.abstract}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <i className="fi flaticon-eye"></i> {article.views} lượt xem
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <i className="fi flaticon-download"></i> {article.downloads} tải xuống
                                    </span>
                                </div>
                                <Link href={`/medical-journal/${article.id}`}>
                                    <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition text-sm">
                                        Đọc toàn văn
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Archive */}
                <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Lưu trữ theo năm</h3>
                    <div className="flex flex-wrap gap-2">
                        {['2024', '2023', '2022', '2021'].map((year) => (
                            <button
                                key={year}
                                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition"
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
