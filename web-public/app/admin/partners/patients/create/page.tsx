"use client";

import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreatePatient() {
    const router = useRouter();

    const fields = [
        { name: 'fullName', label: 'Họ và tên', type: 'text' as const, required: true, placeholder: 'Nguyễn Văn A' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '0901234567' },
        { name: 'email', label: 'Email', type: 'email' as const, required: true, placeholder: 'patient@email.com' },
        { name: 'dob', label: 'Ngày sinh', type: 'date' as const, required: true },
        {
            name: 'gender', label: 'Giới tính', type: 'select' as const, required: true, options: [
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
                { value: 'other', label: 'Khác' },
            ]
        },
        { name: 'address', label: 'Địa chỉ', type: 'textarea' as const, required: true, rows: 3 },
        { name: 'medicalHistory', label: 'Tiền sử bệnh', type: 'textarea' as const, rows: 4 },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating patient:', data);
        alert('Tạo bệnh nhân thành công!');
        router.push('/admin/users/patients');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Thêm Bệnh nhân mới</h1>
                <p className="text-gray-500 mt-1">Nhập thông tin bệnh nhân</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo bệnh nhân"
                    columns={2}
                />
            </div>
        </div>
    );
}
