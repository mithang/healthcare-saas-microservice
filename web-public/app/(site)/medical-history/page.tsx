"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const TIMELINE = [
    { date: '15/12/2024', event: 'Khám Tim mạch', doctor: 'BS. Nguyễn A', hospital: 'BV Chợ Rẫy', type: 'checkup' },
    { date: '10/11/2024', event: 'Xét nghiệm Tổng quát', doctor: '-', hospital: 'Phòng Lab ABC', type: 'test' },
    { date: '05/10/2024', event: 'Tiêm vắc-xin Cúm', doctor: 'BS. Trần B', hospital: 'TT Y tế Q1', type: 'vaccine' },
];

export default function MedicalHistoryPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-12">Lịch sử Khám bệnh</h1>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-8">
                            {TIMELINE.map((item, idx) => (
                                <div key={idx} className="relative pl-20">
                                    <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center ${item.type === 'checkup' ? 'bg-blue-100' : item.type === 'test' ? 'bg-green-100' : 'bg-orange-100'
                                        }`}>
                                        <i className={`fi ${item.type === 'checkup' ? 'flaticon-stethoscope' : item.type === 'test' ? 'flaticon-flask' : 'flaticon-injection'
                                            } text-2xl ${item.type === 'checkup' ? 'text-blue-600' : item.type === 'test' ? 'text-green-600' : 'text-orange-600'
                                            }`}></i>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-gray-900 text-lg">{item.event}</h3>
                                            <span className="text-sm text-gray-400">{item.date}</span>
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            {item.doctor !== '-' && <p>Bác sĩ: {item.doctor}</p>}
                                            <p>Cơ sở: {item.hospital}</p>
                                        </div>
                                        <button className="mt-4 text-primary font-bold text-sm hover:underline">Xem chi tiết</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
