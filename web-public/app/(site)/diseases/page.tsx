"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

const DISEASES = [
    { letter: 'A', items: ['Alzheimer', 'Astma (Hen suyễn)', 'Anemia (Thiếu máu)'] },
    { letter: 'B', items: ['Bệnh tim mạch', 'Bệnh tiểu đường', 'Bệnh Parkinson'] },
    { letter: 'C', items: ['COVID-19', 'Cúm', 'Cao huyết áp'] },
    { letter: 'D', items: ['Đau đầu Migraine', 'Dị ứng', 'Đột quỵ'] },
];

export default function DiseasesPage() {
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Thư viện Bệnh lý</h1>
                <p className="text-gray-500 mb-8">Encyclopedia Y khoa từ A-Z</p>

                <div className="mb-12">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bệnh..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-2xl mx-auto block border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="space-y-8">
                    {DISEASES.map(group => (
                        <div key={group.letter} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-primary text-white rounded-xl flex items-center justify-center text-3xl font-bold">
                                    {group.letter}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Chữ {group.letter}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {group.items.map((disease, idx) => (
                                    <a key={idx} href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-primary transition-colors font-medium">
                                        {disease}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
