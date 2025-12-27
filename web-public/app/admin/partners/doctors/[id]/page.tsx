"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ViewDoctor() {
    const params = useParams<{ id: string }>();
    const doctor = {
        id: params.id,
        name: 'BS. Nguyễn Văn A',
        specialty: 'Tim mạch',
        hospital: 'BV Chợ Rẫy',
        phone: '0901234567',
        email: 'nguyenvana@hospital.vn',
        experience: '10 năm',
        patients: 245,
        rating: 4.9,
        status: 'active',
        bio: 'Bác sĩ chuyên khoa Tim mạch với hơn 10 năm kinh nghiệm...',
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/users/doctors" className="text-gray-600 hover:text-gray-900">
                        <i className="fi flaticon-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ Bác sĩ</h1>
                        <p className="text-gray-500 mt-1">ID: #{doctor.id}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/admin/users/doctors/${doctor.id}/edit`} className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600">
                        <i className="fi flaticon-edit mr-2"></i> Chỉnh sửa
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
                                {doctor.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
                                <p className="text-gray-600 mb-4">{doctor.specialty} • {doctor.hospital}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <i className="fi flaticon-star text-yellow-500"></i>
                                        <span className="font-bold">{doctor.rating}</span>
                                    </div>
                                    <div className="text-gray-600">{doctor.patients} bệnh nhân</div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="font-bold text-gray-900 mb-3">Giới thiệu</h3>
                            <p className="text-gray-700">{doctor.bio}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Điện thoại</p>
                                <p className="font-bold text-gray-900 mt-1">{doctor.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-bold text-gray-900 mt-1">{doctor.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Kinh nghiệm</p>
                                <p className="font-bold text-gray-900 mt-1">{doctor.experience}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Trạng thái</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${doctor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {doctor.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
