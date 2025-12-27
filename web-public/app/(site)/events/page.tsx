"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const EVENTS = [
    { id: 1, day: '12', month: '12', title: 'Hội thảo: Phòng chống bệnh tiểu đường', time: '09:00 - 11:00', location: 'Online (Zoom)', type: 'Webinar', image: '/img/event-1.jpg' },
    { id: 2, day: '15', month: '12', title: 'Khám tầm soát ung thư miễn phí', time: '08:00 - 17:00', location: 'BV ĐH Y Dược', type: 'Offline', image: '/img/event-2.jpg' },
    { id: 3, day: '20', month: '12', title: 'Tư vấn dinh dưỡng cho trẻ biếng ăn', time: '14:00 - 16:00', location: 'Online (Livestream)', type: 'Webinar', image: '/img/event-3.jpg' },
    { id: 4, day: '05', month: '01', title: 'Ngày hội Hiến máu nhân đạo', time: '07:30 - 11:30', location: 'Viện Huyết học TW', type: 'Community', image: '/img/event-4.jpg' },
];

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Sự kiện Y tế</h1>
                    <p className="text-gray-500">Cập nhật các sự kiện, hội thảo sức khỏe mới nhất.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {EVENTS.map(ev => (
                        <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col sm:flex-row">
                            <div className="sm:w-1/3 relative min-h-[160px]">
                                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/news/news-1.jpg'} />
                                <div className="absolute top-0 right-0 m-3 bg-white/90 backdrop-blur rounded-lg p-2 text-center shadow-lg min-w-[60px]">
                                    <div className="text-xs font-bold text-red-500 uppercase">{ev.month}</div>
                                    <div className="text-2xl font-extrabold text-gray-900">{ev.day}</div>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center">
                                <div className="mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${ev.type === 'Webinar' ? 'bg-blue-100 text-blue-700' :
                                            ev.type === 'Offline' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>{ev.type}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">{ev.title}</h3>
                                <div className="space-y-1 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <i className="fi flaticon-clock text-xs"></i> {ev.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fi flaticon-placeholder text-xs"></i> {ev.location}
                                    </div>
                                </div>
                                <button className="mt-4 text-sm font-bold text-primary hover:underline self-start">Đăng ký tham gia</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
