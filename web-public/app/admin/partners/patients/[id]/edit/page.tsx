"use client";

import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditPatient() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const initialValues = {
        fullName: 'Nguyễn Văn A',
        phone: '0901234567',
        email: 'patient@email.com',
        dob: '1990-05-15',
        gender: 'male',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        medicalHistory: 'Tiểu đường type 2, Huyết áp cao',
    };

    const fields = [
        { name: 'fullName', label: 'Họ và tên', type: 'text' as const, required: true },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true },
        { name: 'email', label: 'Email', type: 'email' as const, required: true },
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
        console.log('Updating patient:', data);
        alert('Cập nhật bệnh nhân thành công!');
        router.push(`/admin/users/patients/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Bệnh nhân</h1>
                <p className="text-gray-500 mt-1">ID: #{params.id}</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Cập nhật"
                    initialValues={initialValues}
                    columns={2}
                />
            </div>
        </div>
    );
}
