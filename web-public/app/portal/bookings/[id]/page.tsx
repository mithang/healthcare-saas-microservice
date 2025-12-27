"use client";
import React from 'react';
import { Button } from '@/components/portal/ui';
import { useRouter, useParams } from 'next/navigation';

export default function BookingDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    // Mock data based on ID - in real app fetch this
    const booking = {
        id: params.id,
        doctor: 'BS. CKII Nguyễn Văn A',
        specialty: 'Tim mạch',
        clinic: 'Phòng khám đa khoa Quốc tế',
        address: '201 Nguyễn Thị Minh Khai, Q1, TP.HCM',
        date: '20/12/2024',
        time: '09:30',
        status: 'confirmed',
        price: '500,000 đ',
        patientName: 'Trần Văn B'
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <Button
                    variant="ghost"
                    icon="arrow-left"
                    onClick={() => router.back()}
                    className="!p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                />
                <h1 className="text-2xl font-bold text-gray-900">Chi tiết lịch hẹn</h1>
            </div>

            {/* Status Card */}
            <div className="bg-green-50 border border-green-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <i className="fi flaticon-check text-2xl text-green-600"></i>
                </div>
                <h2 className="text-xl font-bold text-green-800 mb-1">Đặt lịch thành công</h2>
                <p className="text-green-600 text-sm">Mã đặt chỗ: <span className="font-bold">{booking.id}</span></p>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin bác sĩ</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                            <i className="fi flaticon-doctor text-2xl text-blue-500"></i>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{booking.doctor}</p>
                            <p className="text-gray-500 text-sm">{booking.specialty} • {booking.clinic}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-b border-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Thời gian & Địa điểm</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <i className="fi flaticon-calendar"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ngày khám</p>
                                <p className="font-bold text-gray-900">{booking.date}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <i className="fi flaticon-clock"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Giờ khám</p>
                                <p className="font-bold text-gray-900">{booking.time}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <i className="fi flaticon-marker"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Địa chỉ</p>
                                <p className="font-bold text-gray-900">{booking.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50/50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Bệnh nhân</span>
                        <span className="font-bold text-gray-900">{booking.patientName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Phí khám</span>
                        <span className="font-bold text-primary">{booking.price}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" fullWidth icon="calendar-clock">Dời lịch</Button>
                <Button variant="danger" fullWidth icon="cross">Hủy lịch</Button>
            </div>
        </div>
    );
}
