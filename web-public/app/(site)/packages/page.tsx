"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PACKAGES, CATEGORIES } from './mockData';
import Banner from '@/components/common/Banner';

export default function PackagesPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortOption, setSortOption] = useState('popular');

    const filteredPackages = PACKAGES.filter(pkg =>
        activeCategory === 'all' ? true : pkg.category === activeCategory
    );

    const sortedPackages = [...filteredPackages].sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        return 0; // Default popular/rating order (mocked as index order for now)
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Banner page="others" /> {/* Reusing general banner for now */}

            <div className="container mx-auto px-4 py-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gói khám sức khỏe & Tầm soát</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Lựa chọn các gói khám chất lượng từ các bệnh viện, phòng khám uy tín hàng đầu.
                        Tiết kiệm chi phí, đặt lịch nhanh chóng.
                    </p>
                </div>

                {/* Filters & Sort */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    {/* Categories */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto hide-scrollbar">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm font-medium">Sắp xếp:</span>
                        <select
                            className="bg-white border border-gray-200 text-sm font-medium rounded-lg p-2.5 focus:ring-primary focus:border-primary outline-none"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="popular">Phổ biến nhất</option>
                            <option value="price-asc">Giá thấp đến cao</option>
                            <option value="price-desc">Giá cao đến thấp</option>
                        </select>
                    </div>
                </div>

                {/* Listing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedPackages.map(pkg => (
                        <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        // Fallback image if broken
                                        (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg';
                                    }}
                                />
                                {pkg.discount > 0 && (
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        -{pkg.discount}%
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-2">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                        {CATEGORIES.find(c => c.id === pkg.category)?.name}
                                    </span>
                                </div>

                                <Link href={`/packages/${pkg.id}`} className="block">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {pkg.title}
                                    </h3>
                                </Link>

                                <div className="flex items-center gap-2 mb-3">
                                    <i className="fi flaticon-hospital text-gray-400"></i>
                                    <span className="text-sm text-gray-500 font-medium truncate">{pkg.hospitalName}</span>
                                </div>

                                {/* Features Preview */}
                                <ul className="space-y-1 mb-6 flex-1">
                                    {pkg.details.slice(0, 3).map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                            <i className="fi flaticon-check text-green-500 text-xs mt-1"></i>
                                            <span className="line-clamp-1">{detail}</span>
                                        </li>
                                    ))}
                                    {pkg.details.length > 3 && <li className="text-xs text-gray-400 pl-5">+{pkg.details.length - 3} danh mục khác</li>}
                                </ul>

                                <div className="border-t border-gray-100 pt-4 mt-auto">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-400 line-through block">{pkg.originalPrice.toLocaleString()}đ</span>
                                            <span className="text-xl font-bold text-primary">{pkg.price.toLocaleString()}đ</span>
                                        </div>
                                        <Link href={`/packages/${pkg.id}`} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                            Chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedPackages.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fi flaticon-search text-gray-400 text-2xl"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Không tìm thấy gói khám</h3>
                        <p className="text-gray-500">Vui lòng thử chọn danh mục khác.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
