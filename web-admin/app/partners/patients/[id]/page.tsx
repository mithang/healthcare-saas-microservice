"use client";

import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PatientDetail() {
    const params = useParams<{ id: string }>();
    const patient = {
        id: params.id,
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        email: 'patient@email.com',
        dob: '15/05/1990',
        gender: 'Nam',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        status: 'active',
        visits: 12,
        lastVisit: '15/12/2024',
        medicalHistory: 'Tiểu đường type 2, Huyết áp cao',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
                    <p className="text-gray-500 mt-1">ID: #{patient.id}</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href={`/admin/users/patients/${patient.id}/edit`}
                        className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600"
                    >
                        Chỉnh sửa
                    </Link>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600">
                        Xóa
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Tổng lượt khám</p>
                    <h3 className="text-3xl font-bold text-gray-900">{patient.visits}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lần khám cuối</p>
                    <h3 className="text-xl font-bold text-gray-900">{patient.lastVisit}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={patient.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Số điện thoại</p>
                        <p className="font-medium text-gray-900">{patient.phone}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="font-medium text-gray-900">{patient.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Ngày sinh</p>
                        <p className="font-medium text-gray-900">{patient.dob}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Giới tính</p>
                        <p className="font-medium text-gray-900">{patient.gender}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 mb-1">Địa chỉ</p>
                        <p className="font-medium text-gray-900">{patient.address}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 mb-1">Tiền sử bệnh</p>
                        <p className="font-medium text-gray-900">{patient.medicalHistory}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
