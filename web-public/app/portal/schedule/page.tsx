"use client";
import React, { useState } from 'react';
import { Shift, getShiftTypeText, getShiftStatusColor, SHIFT_TIMES } from '@/types/schedule';

export default function SchedulePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddShiftModal, setShowAddShiftModal] = useState(false);

    // Mock data
    const shifts: Shift[] = [
        {
            id: '1',
            pharmacistId: 'ps001',
            pharmacistName: 'Dược sĩ Nguyễn Văn A',
            pharmacyId: 'ph001',
            pharmacyName: 'Nhà thuốc Long Châu',
            date: '2024-12-20',
            startTime: '07:00',
            endTime: '12:00',
            type: 'morning',
            status: 'confirmed',
            checkIn: '07:05',
            checkOut: '12:00'
        },
        {
            id: '2',
            pharmacistId: 'ps002',
            pharmacistName: 'Dược sĩ Trần Thị B',
            pharmacyId: 'ph001',
            pharmacyName: 'Nhà thuốc Long Châu',
            date: '2024-12-20',
            startTime: '12:00',
            endTime: '17:00',
            type: 'afternoon',
            status: 'scheduled'
        },
        {
            id: '3',
            pharmacistId: 'ps001',
            pharmacistName: 'Dược sĩ Nguyễn Văn A',
            pharmacyId: 'ph001',
            pharmacyName: 'Nhà thuốc Long Châu',
            date: '2024-12-21',
            startTime: '17:00',
            endTime: '22:00',
            type: 'evening',
            status: 'scheduled'
        }
    ];

    const getDaysInMonth = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const getShiftsForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return shifts.filter(s => s.date === dateStr);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lịch làm việc</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý ca trực và chấm công</p>
                </div>
                <button
                    onClick={() => setShowAddShiftModal(true)}
                    className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark"
                >
                    <i className="fi flaticon-add mr-2"></i> Thêm ca trực
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Ca trong tháng', value: '24', icon: 'flaticon-calendar', color: 'bg-blue-500' },
                    { label: 'Đã hoàn thành', value: '18', icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Sắp tới', value: '6', icon: 'flaticon-clock', color: 'bg-orange-500' },
                    { label: 'Tổng giờ', value: '120h', icon: 'flaticon-time', color: 'bg-purple-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Tháng {selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
                    </h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">←</button>
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold">Hôm nay</button>
                        <button className="px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">→</button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                        <div key={day} className="text-center font-bold text-gray-700 py-2">{day}</div>
                    ))}

                    {getDaysInMonth().map((day, index) => {
                        const dayShifts = getShiftsForDate(day);
                        const isToday = day.toDateString() === new Date().toDateString();

                        return (
                            <div
                                key={index}
                                className={`min-h-24 border border-gray-200 rounded-xl p-2 ${isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
                                    }`}
                            >
                                <div className={`text-sm font-bold mb-1 ${isToday ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {day.getDate()}
                                </div>
                                <div className="space-y-1">
                                    {dayShifts.map(shift => (
                                        <div
                                            key={shift.id}
                                            className={`text-xs px-2 py-1 rounded ${getShiftStatusColor(shift.status)}`}
                                        >
                                            {getShiftTypeText(shift.type)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Shift List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Danh sách ca trực</h2>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ca trực</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Dược sĩ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Giờ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Check-in/out</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {shifts.map(shift => (
                            <tr key={shift.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {new Date(shift.date).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                        {getShiftTypeText(shift.type)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-700">{shift.pharmacistName}</td>
                                <td className="px-6 py-4 text-gray-600 text-xs">
                                    {shift.startTime} - {shift.endTime}
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-xs">
                                    {shift.checkIn ? `✓ ${shift.checkIn}` : '-'} /
                                    {shift.checkOut ? ` ${shift.checkOut}` : ' -'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getShiftStatusColor(shift.status)}`}>
                                        {shift.status === 'scheduled' ? 'Đã lên lịch' :
                                            shift.status === 'confirmed' ? 'Đã xác nhận' :
                                                shift.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Sửa</button>
                                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Hủy</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Shift Modal */}
            {showAddShiftModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Thêm ca trực</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Dược sĩ *</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option>Dược sĩ Nguyễn Văn A</option>
                                    <option>Dược sĩ Trần Thị B</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày *</label>
                                <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ca trực *</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option value="morning">Ca sáng (07:00 - 12:00)</option>
                                    <option value="afternoon">Ca chiều (12:00 - 17:00)</option>
                                    <option value="evening">Ca tối (17:00 - 22:00)</option>
                                    <option value="night">Ca đêm (22:00 - 07:00)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option value="scheduled">Đã lên lịch</option>
                                    <option value="confirmed">Đã xác nhận</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ghi chú</label>
                                <textarea className="w-full px-4 py-3 border border-gray-200 rounded-xl h-20" />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAddShiftModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl"
                            >
                                Hủy
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">
                                Thêm ca trực
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
