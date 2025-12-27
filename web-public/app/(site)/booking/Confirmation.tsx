'use client';

import React from 'react';
import { BookingData } from '@/types/booking.types';

interface ConfirmationProps {
    bookingData: BookingData;
    onEdit: (step: number) => void;
    bookingId?: string;
    success?: boolean;
}

const Confirmation: React.FC<ConfirmationProps> = ({ bookingData, onEdit, bookingId, success }) => {
    if (success && bookingId) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="text-center space-y-6">
                    {/* Success Icon */}
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <i className="fi flaticon-check text-5xl text-green-600"></i>
                    </div>

                    {/* Success Message */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h2>
                        <p className="text-gray-500">
                            Mã đặt lịch của bạn là <span className="font-bold text-primary">#{bookingId}</span>
                        </p>
                    </div>

                    {/* Booking Details Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
                        <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b">Thông tin đặt lịch</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <i className="fi flaticon-stethoscope text-primary mt-1"></i>
                                <div>
                                    <p className="text-sm text-gray-500">Dịch vụ</p>
                                    <p className="font-medium text-gray-900">{bookingData.service?.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="fi flaticon-doctor text-primary mt-1"></i>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {bookingData.provider?.type === 'doctor' ? 'Bác sĩ' : 'Bệnh viện'}
                                    </p>
                                    <p className="font-medium text-gray-900">{bookingData.provider?.name}</p>
                                    <p className="text-sm text-gray-500">{bookingData.provider?.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="fi flaticon-calendar text-primary mt-1"></i>
                                <div>
                                    <p className="text-sm text-gray-500">Thời gian</p>
                                    <p className="font-medium text-gray-900">
                                        {bookingData.date?.toLocaleDateString('vi-VN')} - {bookingData.timeSlot?.time}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="fi flaticon-user text-primary mt-1"></i>
                                <div>
                                    <p className="text-sm text-gray-500">Bệnh nhân</p>
                                    <p className="font-medium text-gray-900">{bookingData.patientInfo?.fullName}</p>
                                    <p className="text-sm text-gray-500">{bookingData.patientInfo?.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 rounded-xl p-6 text-left">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <i className="fi flaticon-info text-blue-600"></i>
                            Lưu ý
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Vui lòng đến trước giờ hẹn 15 phút để làm thủ tục</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Mang theo CMND/CCCD và thẻ bảo hiểm y tế (nếu có)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Chúng tôi đã gửi email xác nhận đến {bookingData.patientInfo?.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Về trang chủ
                        </button>
                        <button
                            onClick={() => window.location.href = '/portal/bookings'}
                            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Xem lịch hẹn
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Xác nhận thông tin</h2>
                <p className="text-gray-500">Vui lòng kiểm tra lại thông tin trước khi hoàn tất</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
                {/* Service */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="fi flaticon-stethoscope text-primary text-xl"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Dịch vụ khám</p>
                                <p className="font-bold text-gray-900">{bookingData.service?.name}</p>
                                <p className="text-sm text-gray-600">{bookingData.service?.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onEdit(1)}
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                            Sửa
                        </button>
                    </div>
                </div>

                {/* Provider */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <img
                                src={bookingData.provider?.avatar || '/styles/img/user/default-avatar.jpg'}
                                alt={bookingData.provider?.name}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    {bookingData.provider?.type === 'doctor' ? 'Bác sĩ' : 'Bệnh viện'}
                                </p>
                                <p className="font-bold text-gray-900">{bookingData.provider?.name}</p>
                                {bookingData.provider?.specialty && (
                                    <p className="text-sm text-primary font-medium">{bookingData.provider.specialty}</p>
                                )}
                                <p className="text-sm text-gray-600">{bookingData.provider?.address}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onEdit(2)}
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                            Sửa
                        </button>
                    </div>
                </div>

                {/* Date & Time */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="fi flaticon-calendar text-primary text-xl"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Thời gian khám</p>
                                <p className="font-bold text-gray-900">
                                    {bookingData.date?.toLocaleDateString('vi-VN', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <i className="fi flaticon-clock mr-1"></i>
                                    {bookingData.timeSlot?.time}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => onEdit(3)}
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                            Sửa
                        </button>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="fi flaticon-user text-primary text-xl"></i>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Thông tin bệnh nhân</p>
                                <p className="font-bold text-gray-900">{bookingData.patientInfo?.fullName}</p>
                                <div className="text-sm text-gray-600 space-y-1 mt-2">
                                    <p>
                                        <i className="fi flaticon-phone mr-1"></i>
                                        {bookingData.patientInfo?.phone}
                                    </p>
                                    <p>
                                        <i className="fi flaticon-email mr-1"></i>
                                        {bookingData.patientInfo?.email}
                                    </p>
                                    <p>
                                        <i className="fi flaticon-birthday-cake mr-1"></i>
                                        {bookingData.patientInfo?.dateOfBirth}
                                    </p>
                                    {bookingData.patientInfo?.notes && (
                                        <p className="mt-2 text-gray-700">
                                            <span className="font-medium">Ghi chú:</span> {bookingData.patientInfo.notes}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => onEdit(4)}
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                            Sửa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
