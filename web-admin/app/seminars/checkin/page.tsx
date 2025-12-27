"use client";

import React, { useState, useEffect } from 'react';
import seminarService, { SeminarAttendee, Seminar } from '@/services/seminar.service';

export default function SeminarCheckinPage() {
    const [selectedSeminarId, setSelectedSeminarId] = useState<string>('');
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [attendees, setAttendees] = useState<SeminarAttendee[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const seminarData = await seminarService.getSeminars();
            setSeminars(seminarData);
            if (seminarData.length > 0 && !selectedSeminarId) {
                setSelectedSeminarId(seminarData[0].id.toString());
            }
        } catch (error) {
            console.error('Failed to fetch seminar check-in data', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendees = async () => {
        if (!selectedSeminarId) return;
        try {
            const attendeeData = await seminarService.getAttendees(parseInt(selectedSeminarId));
            setAttendees(attendeeData);
        } catch (error) {
            console.error('Failed to fetch attendees', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchAttendees();
    }, [selectedSeminarId]);

    const handleCheckin = async (id: number) => {
        try {
            await seminarService.updateAttendee(id, {
                checkedIn: true,
                checkinTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            fetchAttendees();
        } catch (error) {
            console.error('Failed to check in', error);
        }
    };

    // Stats
    const totalReg = attendees.length;
    const checkedInCount = attendees.filter(a => a.checkedIn).length;
    const notCheckedInCount = totalReg - checkedInCount;
    const rate = totalReg > 0 ? ((checkedInCount / totalReg) * 100).toFixed(1) : '0';

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Check-in</h1>
                    <p className="text-gray-500 text-sm mt-1">Quét QR Code và quản lý điểm danh</p>
                </div>
                <div className="w-64">
                    <select
                        value={selectedSeminarId}
                        onChange={(e) => setSelectedSeminarId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-bold"
                    >
                        <option value="">-- Chọn hội thảo --</option>
                        {seminars.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng đăng ký</p>
                    <p className="text-3xl font-bold text-gray-900">{totalReg}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã check-in</p>
                    <p className="text-3xl font-bold text-green-600">{checkedInCount}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Chưa check-in</p>
                    <p className="text-3xl font-bold text-orange-600">{notCheckedInCount}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tỷ lệ</p>
                    <p className="text-3xl font-bold text-blue-600">{rate}%</p>
                </div>
            </div>

            {/* QR Scanner */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-6">QR Code Scanner (Demo)</h2>
                <button
                    onClick={async () => {
                        const email = prompt('Nhập Email người tham dự để TEST check-in:');
                        if (email) {
                            await seminarService.createAttendee({
                                seminarId: parseInt(selectedSeminarId),
                                name: 'Học viên Test',
                                email: email,
                                phone: '0901234567',
                                checkedIn: false
                            });
                            fetchAttendees();
                        }
                    }}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark"
                >
                    + Thêm người đăng ký TEST
                </button>
            </div>

            {/* Attendee List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Danh sách Tham dự</h2>
                    <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">
                        Export Excel
                    </button>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Đang tải...</div>
                ) : (
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
                                <tr key={attendee.id} className="hover:bg-gray-50 transition">
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
                                            <button
                                                onClick={() => handleCheckin(attendee.id)}
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold"
                                            >
                                                Check-in thủ công
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {attendees.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Chưa có người đăng ký
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
