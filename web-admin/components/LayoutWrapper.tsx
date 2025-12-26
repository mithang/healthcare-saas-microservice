'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminLayout from './AdminLayout';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return <AdminLayout>{children}</AdminLayout>;
}
