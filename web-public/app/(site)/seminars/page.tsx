"use client";
import React from 'react';
import Link from 'next/link';

export default function SeminarsPage() {
    const seminars = [
        {
            id: 1,
            title: 'Hội thảo Dược lâm sàng 2024',
            date: '2024-12-25',
            time: '08:00 - 17:00',
            location: 'Khách sạn Rex, TP.HCM',
            banner: '/img/seminar-1.jpg',
            speakers: ['GS.TS Nguyễn Văn A', 'PGS.TS Trần Thị B'],
            registrations: 245,
            capacity: 300,
            status: 'Đang mở',
        },
        {
            id: 2,
            title: 'Cập nhật Điều trị Tim mạch',
            date: '2025-01-15',
            time: '08:30 - 16:30',
            location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
            banner: '/img/seminar-2.jpg',
            speakers: ['TS.BS Lê Văn C', 'BS.CKII Phạm Thị D'],
            registrations: 180,
            capacity: 250,
            status: 'Đang mở',
        },
        {
            id: 3,
            title: 'Hội thảo Kháng sinh Hợp lý',
            date: '2025-02-10',
            time: '09:00 - 17:00',
            location: 'Bệnh viện Đại học Y Dược, TP.HCM',
            banner: '/img/seminar-3.jpg',
            speakers: ['PGS.TS Hoàng Văn E'],
            registrations: 120,
            capacity: 200,
            status: 'Đang mở',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Hội thảo Offline</h1>
                    <p className="text-lg text-gray-600">Tham gia các hội thảo chuyên môn hàng đầu</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {seminars.map((seminar) => (
                        <div key={seminar.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition">
                            {/* Banner */}
                            <div className="relative h-48">
                                <img
                                    src={seminar.banner}
                                    alt={seminar.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                                />
                                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {seminar.status}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{seminar.title}</h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <i className="fi flaticon-calendar"></i>
                                        <span>{seminar.date} • {seminar.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <i className="fi flaticon-location"></i>
                                        <span>{seminar.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <i className="fi flaticon-user"></i>
                                        <span>{seminar.speakers.join(', ')}</span>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Đã đăng ký</span>
                                        <span className="font-bold text-gray-900">{seminar.registrations}/{seminar.capacity}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${(seminar.registrations / seminar.capacity) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <Link href={`/seminars/${seminar.id}`}>
                                    <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition">
                                        Xem chi tiết & Đăng ký
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
