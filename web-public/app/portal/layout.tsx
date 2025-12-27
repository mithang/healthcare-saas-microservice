'use client';

import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from '@/components/common/ProtectedRoute';

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex">
                <Sidebar />
                <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                    <Header />
                    <main className="flex-1 p-6 md:p-10">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
