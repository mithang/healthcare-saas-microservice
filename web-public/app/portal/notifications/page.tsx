"use client";
import React from 'react';

const notifications = [
    { id: 1, type: 'booking', title: 'Lịch hẹn mới', message: 'Bệnh nhân Nguyễn Văn A đã đặt lịch khám vào 09:00 20/12/2024.', time: '10 phút trước', read: false },
    { id: 2, type: 'system', title: 'Bảo trì hệ thống', message: 'Hệ thống sẽ bảo trì định kỳ vào 00:00 - 02:00 ngày 25/12/2024.', time: '1 giờ trước', read: false },
    { id: 3, type: 'payment', title: 'Thanh toán thành công', message: 'Bạn đã nhận được thanh toán 500.000đ từ bệnh nhân Lê Văn C.', time: '2 giờ trước', read: true },
    { id: 4, type: 'review', title: 'Đánh giá mới', message: 'Bệnh nhân Phạm Thị D đã đánh giá 5 sao cho buổi khám hôm qua.', time: '1 ngày trước', read: true },
];

export default function NotificationsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
                    <p className="text-gray-500 text-sm mt-1">Cập nhật tin tức và hoạt động mới nhất</p>
                </div>
                <button className="text-primary text-sm font-bold hover:underline">Đánh dấu tất cả là đã đọc</button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {notifications.map(notif => (
                        <div key={notif.id} className={`p-6 hover:bg-gray-50 transition flex gap-4 ${notif.read ? 'opacity-70' : 'bg-blue-50/30'}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                                    notif.type === 'system' ? 'bg-red-100 text-red-600' :
                                        notif.type === 'payment' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                }`}>
                                <i className={`fi ${notif.type === 'booking' ? 'flaticon-calendar' :
                                        notif.type === 'system' ? 'flaticon-settings' :
                                            notif.type === 'payment' ? 'flaticon-money' : 'flaticon-star'
                                    }`}></i>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`font-bold text-gray-900 ${!notif.read && 'text-primary'}`}>{notif.title}</h4>
                                    <span className="text-xs text-gray-400">{notif.time}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{notif.message}</p>
                            </div>
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
                        </div>
                    ))}
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                    <button className="text-gray-500 hover:text-gray-900 text-sm font-medium">Xem các thông báo cũ hơn</button>
                </div>
            </div>
        </div>
    );
}
