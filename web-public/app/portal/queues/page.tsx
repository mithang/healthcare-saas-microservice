"use client";
import React from 'react';
import { MOCK_QUEUE } from '@/types/reception';

export default function QueuesPage() {
    const myQueue = MOCK_QUEUE.filter(q => q.status === 'waiting' || q.status === 'called' || q.status === 'serving');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Danh sách khám</h1>
                    <p className="text-gray-500 text-sm mt-1">Hàng đợi bệnh nhân đang chờ khám tại phòng của bạn</p>
                </div>
                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-bold">
                    Phòng khám: P. Nội Tổng hợp 01
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Patient */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                        <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Bệnh nhân đang khám</div>
                        <div className="text-4xl font-black text-green-600 mb-4">Nguyễn Văn A</div>
                        <div className="flex justify-center gap-4 text-sm text-gray-600 mb-8">
                            <span>STT: <b className="text-gray-900">1001</b></span>
                            <span>•</span>
                            <span>Tuổi: <b className="text-gray-900">34</b></span>
                            <span>•</span>
                            <span>Giới tính: <b className="text-gray-900">Nam</b></span>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all flex items-center">
                                <i className="fi flaticon-stethoscope mr-2"></i>
                                Bắt đầu khám
                            </button>
                            <button className="px-6 py-3 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all">
                                Xem hồ sơ cũ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Queue List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[500px]">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-900 flex justify-between items-center">
                        <span>Đang chờ ({myQueue.length})</span>
                        <button className="text-xs text-blue-600 hover:underline">Làm mới</button>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                        {myQueue.map((patient) => (
                            <div key={patient.id} className="p-4 hover:bg-gray-50 flex justify-between items-center group cursor-pointer">
                                <div>
                                    <div className="font-bold text-gray-900 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{patient.number}</span>
                                        {patient.patientName}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 pl-10">Chờ từ: {new Date(patient.issueTime).toLocaleTimeString('vi-VN')}</div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg transition-all">
                                    Gọi số
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
