"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditHospital() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        name: 'Bệnh viện ABC',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0287000000',
        email: 'contact@hospital-abc.vn',
        website: 'www.hospital-abc.vn',
        description: 'Bệnh viện đa khoa hàng đầu',
    };

    const fields = [
        { name: 'name', label: 'Tên bệnh viện', type: 'text' as const, required: true },
        { name: 'address', label: 'Địa chỉ', type: 'textarea' as const, required: true, rows: 3 },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true },
        { name: 'email', label: 'Email', type: 'email' as const, required: true },
        { name: 'website', label: 'Website', type: 'text' as const },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, rows: 4 },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating hospital:', data);
        alert('Cập nhật bệnh viện thành công!');
        router.push(`/admin/partners/hospitals/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Bệnh viện</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
