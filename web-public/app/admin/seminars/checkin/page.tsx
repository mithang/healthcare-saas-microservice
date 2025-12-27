"use client";
import React, { useState } from 'react';

export default function SeminarCheckinPage() {
    const [selectedSeminar, setSelectedSeminar] = useState('1');

    const attendees = [
        { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0909123456', checkedIn: true, checkinTime: '08:15' },
        { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0909123457', checkedIn: false, checkinTime: '' },
        { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', phone: '0909123458', checkedIn: true, checkinTime: '08:20' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Check-in</h1>
                <p className="text-gray-500 text-sm mt-1">Quét QR Code và quản lý điểm danh</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng đăng ký</p>
                    <p className="text-3xl font-bold text-gray-900">245</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã check-in</p>
                    <p className="text-3xl font-bold text-green-600">180</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Chưa check-in</p>
                    <p className="text-3xl font-bold text-orange-600">65</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tỷ lệ</p>
                    <p className="text-3xl font-bold text-blue-600">73.5%</p>
                </div>
            </div>

            {/* QR Scanner */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">QR Code Scanner</h2>
                <div className="flex justify-center">
                    <div className="w-80 h-80 bg-gray-100 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300">
                        <div className="text-center">
                            <i className="fi flaticon-qr-code text-6xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500">Quét QR Code để check-in</p>
                            <button className="mt-4 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark">
                                Bật Camera
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendee List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Danh sách Tham dự</h2>
                    <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">
                        Export Excel
                    </button>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Họ tên</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Email</th>
                            <th className="px-6 py-4 font-bold text-gray-700">SĐT</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Check-in</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thời gian</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {attendees.map((attendee) => (
                            <tr key={attendee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{attendee.name}</td>
                                <td className="px-6 py-4 text-gray-600">{attendee.email}</td>
                                <td className="px-6 py-4 text-gray-600">{attendee.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${attendee.checkedIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {attendee.checkedIn ? 'Đã check-in' : 'Chưa check-in'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{attendee.checkinTime || '-'}</td>
                                <td className="px-6 py-4">
                                    {!attendee.checkedIn && (
                                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                            Check-in thủ công
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
