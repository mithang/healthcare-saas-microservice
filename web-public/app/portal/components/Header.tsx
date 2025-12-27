'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

export default function Header() {
    const { user } = useAuth();

    console.log("ABC", user);

    // Default values if user data is not available
    const userName = user?.name || 'Dr. Nguyễn Văn A';
    const userRole = (user as any)?.role === 'doctor' || user?.roleId === 2 ? 'Bác sĩ' : '';
    const userSpecialty = user?.department || user?.position || 'Khoa Tim mạch';

    return (
        <header className="h-[70px] bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800 hidden md:block">Bảng điều khiển</h2>
                <button className="md:hidden text-gray-600 text-2xl">
                    <i className="fi flaticon-menu"></i>
                </button>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-gray-500 hover:text-green-600 transition-colors">
                    <i className="fi flaticon-notification text-xl"></i>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <Link href="/portal/profile" className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:opacity-80 transition-opacity">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{userRole} {userSpecialty}</p>
                    </div>
                    <img
                        src="/styles/img/user/user-1.jpg"
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                </Link>
            </div>
        </header>
    );
}
