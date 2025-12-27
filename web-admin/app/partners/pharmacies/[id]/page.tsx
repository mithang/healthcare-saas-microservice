"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PharmacyDetail() {
    const params = useParams<{ id: string }>();
    const pharmacy = {
        id: params.id,
        name: 'Nhà thuốc XYZ',
        address: '789 Đường DEF, Quận 3, TP.HCM',
        phone: '0285000000',
        email: 'contact@pharmacy-xyz.vn',
        license: 'GPK-12345',
        website: 'www.pharmacy-xyz.vn',
        products: 450,
        rating: '4.7',
        status: 'active',
        description: 'Nhà thuốc uy tín với đầy đủ các loại thuốc',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
                <div className="flex gap-3">
                    <Link href={`/admin/partners/pharmacies/${pharmacy.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Sản phẩm</p>
                    <h3 className="text-3xl font-bold text-gray-900">{pharmacy.products}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đánh giá</p>
                    <h3 className="text-3xl font-bold text-yellow-600">⭐ {pharmacy.rating}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={pharmacy.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Địa chỉ</p><p className="font-medium text-gray-900">{pharmacy.address}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Số điện thoại</p><p className="font-medium text-gray-900">{pharmacy.phone}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Email</p><p className="font-medium text-gray-900">{pharmacy.email}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Giấy phép</p><p className="font-medium text-gray-900">{pharmacy.license}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Website</p><p className="font-medium text-gray-900">{pharmacy.website}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Mô tả</p><p className="font-medium text-gray-900">{pharmacy.description}</p></div>
                </div>
            </div>
        </div>
    );
}
