"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import partnerService, { Doctor } from '@/services/partner.service';

export default function ViewDoctor({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = parseInt(resolvedParams.id);
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await partnerService.getDoctor(id);
                setDoctor(data);
            } catch (error) {
                console.error('Failed to fetch doctor', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    if (loading) return <div className="p-8 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>;
    if (!doctor) return <div className="p-8 text-center text-red-500">Không tìm thấy bác sĩ</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/partners/doctors" className="text-gray-600 hover:text-gray-900">
                        <i className="fi flaticon-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ Bác sĩ</h1>
                        <p className="text-gray-500 mt-1">ID: #{doctor.id}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/admin/partners/doctors/${doctor.id}/edit`} className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600">
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
                                <p className="text-gray-600 mb-4">{doctor.specialty} • {doctor.hospital || 'Tự do'}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <i className="fi flaticon-star text-yellow-500"></i>
                                        <span className="font-bold">{doctor.rating || 'N/A'}</span>
                                    </div>
                                    <div className="text-gray-600">N/A bệnh nhân</div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="font-bold text-gray-900 mb-3">Giới thiệu</h3>
                            <p className="text-gray-700 whitespace-pre-line">{doctor.description || 'Chưa có thông tin giới thiệu'}</p>
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
                                <p className="font-bold text-gray-900 mt-1">{doctor.email || 'Chưa cập nhật'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Trạng thái</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${doctor.isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {doctor.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
