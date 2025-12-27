"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditPharmacy() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        name: 'Nhà thuốc XYZ',
        address: '789 Đường DEF, Quận 3, TP.HCM',
        phone: '0285000000',
        email: 'contact@pharmacy-xyz.vn',
        license: 'GPK-12345',
        website: 'www.pharmacy-xyz.vn',
        description: 'Nhà thuốc uy tín',
    };

    const fields = [
        { name: 'name', label: 'Tên nhà thuốc', type: 'text' as const, required: true },
        { name: 'address', label: 'Địa chỉ', type: 'textarea' as const, required: true, rows: 3 },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true },
        { name: 'email', label: 'Email', type: 'email' as const, required: true },
        { name: 'license', label: 'Số giấy phép', type: 'text' as const, required: true },
        { name: 'website', label: 'Website', type: 'text' as const },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, rows: 4 },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating pharmacy:', data);
        alert('Cập nhật nhà thuốc thành công!');
        router.push(`/admin/partners/pharmacies/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Nhà thuốc</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
