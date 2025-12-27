"use client";
import React, { useState } from 'react';
import { Booking, getBookingStatusColor, getBookingStatusText } from '@/types/booking';

const MOCK_BOOKINGS: Booking[] = [
    {
        id: '1',
        Name: 'Nguyễn Văn A',
        Phone: '0901234567',
        Email: 'nguyenvana@example.com',
        Address: '123 Nguyễn Văn Linh, Q7, TP.HCM',
        DateOfBirthday: '1990-01-01T00:00:00Z',
        Sex: 'Nam',
        AppointmentDate: '2025-12-25T09:00:00Z',
        DateCreate: '2025-12-20T08:00:00Z',
        Status: 'pending',
        TreatmentPlaceBooking: 'place-01',
        Type: 'offline',
        ServiceId: 101,
        NoExpected: 1,
        Note: 'Đau đầu, chóng mặt'
    },
    {
        id: '2',
        Name: 'Trần Thị B',
        Phone: '0987654321',
        Email: 'tranthib@example.com',
        Address: '456 Lê Văn Việt, Q9, TP.HCM',
        DateOfBirthday: '1995-05-15T00:00:00Z',
        Sex: 'Nữ',
        AppointmentDate: '2025-12-26T14:30:00Z',
        DateCreate: '2025-12-20T09:30:00Z',
        Status: 'confirmed',
        TreatmentPlaceBooking: 'place-01',
        Type: 'online',
        ServiceId: 102,
        DoctorId: 'doc-01',
        NoExpected: 1,
        Note: 'Tái khám tim mạch'
    },
    {
        id: '3',
        Name: 'Lê Văn C',
        Phone: '0912345678',
        Address: '789 Võ Văn Ngân, Thủ Đức',
        DateOfBirthday: '1988-10-20T00:00:00Z',
        Sex: 'Nam',
        AppointmentDate: '2025-12-27T10:00:00Z',
        DateCreate: '2025-12-19T15:45:00Z',
        Status: 'completed',
        TreatmentPlaceBooking: 'place-02',
        Type: 'offline',
        ServiceId: 103,
        NoExpected: 2,
        TreatmentInfo: 'Đã kê đơn thuốc'
    }
];

export default function BookingsPage() {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lịch đặt khám</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý danh sách lịch hẹn từ bệnh nhân</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                <input
                    type="text"
                    placeholder="Tìm tên, SĐT bệnh nhân..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="date"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="p-4">Bệnh nhân</th>
                                <th className="p-4">Thông tin liên hệ</th>
                                <th className="p-4">Ngày hẹn</th>
                                <th className="p-4">Dịch vụ/Loại</th>
                                <th className="p-4">Trạng thái</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {MOCK_BOOKINGS.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900">{booking.Name}</div>
                                        <div className="text-xs text-gray-500">
                                            {booking.Sex} • {new Date(booking.DateOfBirthday).toLocaleDateString('vi-VN')}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-gray-900">{booking.Phone}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[150px]">{booking.Email || 'Không có email'}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">
                                            {new Date(booking.AppointmentDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(booking.AppointmentDate).toLocaleDateString('vi-VN')}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>Service ID: {booking.ServiceId}</div>
                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${booking.Type === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {booking.Type === 'online' ? 'Online' : 'Trực tiếp'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBookingStatusColor(booking.Status)}`}>
                                            {getBookingStatusText(booking.Status)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => setSelectedBooking(booking)}
                                            className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-xs transition-colors"
                                        >
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-gray-900">Chi tiết lịch hẹn</h3>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Họ tên</label>
                                    <p className="font-medium text-gray-900">{selectedBooking.Name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Số điện thoại</label>
                                    <p className="font-medium text-gray-900">{selectedBooking.Phone}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Ngày sinh</label>
                                    <p className="font-medium text-gray-900">{new Date(selectedBooking.DateOfBirthday).toLocaleDateString('vi-VN')}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Giới tính</label>
                                    <p className="font-medium text-gray-900">{selectedBooking.Sex}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Địa chỉ</label>
                                    <p className="font-medium text-gray-900">{selectedBooking.Address || 'Chưa cập nhật'}</p>
                                </div>
                                <div className="col-span-2 border-t border-gray-100 pt-4 mt-2">
                                    <h4 className="font-bold text-green-700 mb-4">Thông tin đặt khám</h4>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Ngày giờ hẹn</label>
                                    <p className="font-medium text-gray-900">
                                        {new Date(selectedBooking.AppointmentDate).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Loại hình</label>
                                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${selectedBooking.Type === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {selectedBooking.Type === 'online' ? 'Khám Online' : 'Khám tại cơ sở'}
                                    </span>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Dịch vụ ID</label>
                                    <p className="font-medium text-gray-900">{selectedBooking.ServiceId}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Số lượng dự kiến</label>
                                    <p className="font-medium text-gray-900">{selectedBooking.NoExpected} người</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Ghi chú</label>
                                    <p className="p-3 bg-gray-50 rounded-lg text-gray-700 text-sm">
                                        {selectedBooking.Note || 'Không có ghi chú'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-xl transition-colors"
                            >
                                Đóng
                            </button>
                            <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg ring ring-green-100 transition-all">
                                Cập nhật trạng thái
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
