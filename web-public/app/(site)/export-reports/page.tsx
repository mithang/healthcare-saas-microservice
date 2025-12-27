"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function ExportReportsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">Xuất Báo cáo Sức khỏe</h1>

                <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi flaticon-pdf text-5xl text-blue-600"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo Báo cáo PDF</h2>
                        <p className="text-gray-500">Xuất toàn bộ hồ sơ sức khỏe để in hoặc chia sẻ với bác sĩ</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {['Thông tin cá nhân', 'Lịch sử khám bệnh', 'Kết quả xét nghiệm', 'Đơn thuốc', 'Chỉ số sức khỏe'].map((item, idx) => (
                            <label key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50">
                                <input type="checkbox" className="w-5 h-5" defaultChecked />
                                <span className="font-medium text-gray-700">{item}</span>
                            </label>
                        ))}
                    </div>

                    <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark shadow-lg">
                        <i className="fi flaticon-download mr-2"></i> Xuất PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
