'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
    { id: 'general', name: 'Sức khỏe chung', icon: 'flaticon-health-care' },
    { id: 'nutrition', name: 'Dinh dưỡng', icon: 'flaticon-apple' },
    { id: 'mental', name: 'Tâm lý', icon: 'flaticon-brain' },
    { id: 'fitness', name: 'Thể dục & Thể thao', icon: 'flaticon-fitness' },
    { id: 'disease', name: 'Bệnh lý', icon: 'flaticon-virus' },
    { id: 'obs', name: 'Sản phụ khoa', icon: 'flaticon-fetus' },
    { id: 'pediatrics', name: 'Nhi khoa', icon: 'flaticon-baby' },
];

export default function ForumSidebarLeft() {
    const pathname = usePathname();

    return (
        <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 px-2">Chuyên mục</h3>
                <nav className="space-y-1">
                    <Link
                        href="/forum"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all ${pathname === '/forum'
                                ? 'bg-green-50 text-green-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <i className="fi flaticon-home mr-3 text-lg"></i>
                        Tất cả
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/forum/c/${cat.id}`}
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                        >
                            <i className={`fi ${cat.icon} mr-3 text-lg text-gray-400`}></i>
                            {cat.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
