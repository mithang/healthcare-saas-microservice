'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { TimeSlot } from '@/types/booking.types';
import 'react-calendar/dist/Calendar.css';

interface SelectDateTimeProps {
    selectedDate?: Date;
    selectedTimeSlot?: TimeSlot;
    timeSlots: TimeSlot[];
    onDateSelect: (date: Date) => void;
    onTimeSlotSelect: (slot: TimeSlot) => void;
    loading?: boolean;
}

const SelectDateTime: React.FC<SelectDateTimeProps> = ({
    selectedDate,
    selectedTimeSlot,
    timeSlots,
    onDateSelect,
    onTimeSlotSelect,
    loading
}) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2); // Allow booking up to 2 months ahead

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chọn ngày và giờ khám</h2>
                <p className="text-gray-500">Vui lòng chọn thời gian phù hợp với bạn</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Chọn ngày</h3>
                    <div className="booking-calendar">
                        <Calendar
                            onChange={(value) => onDateSelect(value as Date)}
                            value={selectedDate || today}
                            minDate={today}
                            maxDate={maxDate}
                            locale="vi-VN"
                            className="w-full border-0"
                        />
                    </div>
                </div>

                {/* Time Slots */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">
                        Chọn giờ khám
                        {selectedDate && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                ({selectedDate.toLocaleDateString('vi-VN')})
                            </span>
                        )}
                    </h3>

                    {!selectedDate ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fi flaticon-calendar text-2xl text-gray-400"></i>
                            </div>
                            <p className="text-gray-500">Vui lòng chọn ngày trước</p>
                        </div>
                    ) : loading ? (
                        <div className="grid grid-cols-2 gap-3">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-12"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => slot.available && onTimeSlotSelect(slot)}
                                    disabled={!slot.available}
                                    className={`p-3 rounded-lg border-2 font-medium transition-all duration-300 ${selectedTimeSlot?.id === slot.id
                                            ? 'border-primary bg-primary text-white'
                                            : slot.available
                                                ? 'border-gray-200 hover:border-primary hover:bg-primary/5 text-gray-900'
                                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <i className="fi flaticon-clock text-sm"></i>
                                        <span>{slot.time}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {selectedDate && timeSlots.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fi flaticon-calendar-cross text-2xl text-gray-400"></i>
                            </div>
                            <p className="text-gray-500">Không có lịch trống trong ngày này</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-primary bg-primary"></div>
                    <span className="text-gray-600">Đã chọn</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-gray-200"></div>
                    <span className="text-gray-600">Còn trống</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-gray-100 bg-gray-50"></div>
                    <span className="text-gray-600">Đã đặt</span>
                </div>
            </div>
        </div>
    );
};

export default SelectDateTime;
