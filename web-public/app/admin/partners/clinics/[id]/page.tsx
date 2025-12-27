"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ClinicDetail() {
    const params = useParams<{ id: string }>();
    const clinic = {
        id: params.id,
        name: 'Phòng khám ABC',
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        phone: '0286000000',
        email: 'contact@clinic-abc.vn',
        website: 'www.clinic-abc.vn',
        specialties: 'Nội khoa, Nhi khoa, Da liễu',
        doctors: 12,
        rating: '4.6',
        status: 'active',
        description: 'Phòng khám chuyên khoa uy tín',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{clinic.name}</h1>
                <div className="flex gap-3">
                    <Link href={`/admin/partners/clinics/${clinic.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Số bác sĩ</p>
                    <h3 className="text-3xl font-bold text-gray-900">{clinic.doctors}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đánh giá</p>
                    <h3 className="text-3xl font-bold text-yellow-600">⭐ {clinic.rating}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={clinic.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Địa chỉ</p><p className="font-medium text-gray-900">{clinic.address}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Số điện thoại</p><p className="font-medium text-gray-900">{clinic.phone}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Email</p><p className="font-medium text-gray-900">{clinic.email}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Website</p><p className="font-medium text-gray-900">{clinic.website}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Chuyên khoa</p><p className="font-medium text-gray-900">{clinic.specialties}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Mô tả</p><p className="font-medium text-gray-900">{clinic.description}</p></div>
                </div>
            </div>
        </div>
    );
}
