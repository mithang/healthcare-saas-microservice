'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Banner from '@/components/common/Banner';
import ForumSidebarLeft from './components/ForumSidebarLeft';
import ForumSidebarRight from './components/ForumSidebarRight';

export default function ForumLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <Banner page="forum" /> {/* Using forum banner */}

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="flex gap-6 items-start">
                    <ForumSidebarLeft />

                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    <ForumSidebarRight />
                </div>
            </div>
        </div>
    );
}
