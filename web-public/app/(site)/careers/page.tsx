"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const JOBS = [
    { id: 1, title: 'Bác sĩ Nội tổng quát', loc: 'TP.HCM', type: 'Toàn thời gian', salary: '30 - 50 triệu', deadline: '30/12/2024', tags: ['Bác sĩ', 'Nội khoa'] },
    { id: 2, title: 'Điều dưỡng viên', loc: 'Hà Nội', type: 'Toàn thời gian', salary: '10 - 15 triệu', deadline: '15/01/2025', tags: ['Điều dưỡng', 'Chăm sóc'] },
    { id: 3, title: 'Dược sĩ bán thuốc', loc: 'Đà Nẵng', type: 'Ca xoay', salary: '8 - 12 triệu', deadline: '20/12/2024', tags: ['Dược'] },
    { id: 4, title: 'Chuyên viên Tư vấn Khách hàng', loc: 'TP.HCM', type: 'Toàn thời gian', salary: '12 - 18 triệu', deadline: '31/12/2024', tags: ['Văn phòng'] },
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />

            {/* Hero */}
            <div className="bg-blue-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Gia nhập đội ngũ Y tế hàng đầu</h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10">
                        Cùng chúng tôi kiến tạo hệ sinh thái chăm sóc sức khỏe toàn diện, mang lại giá trị tốt đẹp cho cộng đồng.
                    </p>
                    <div className="bg-white p-2 rounded-2xl max-w-2xl mx-auto flex">
                        <input type="text" placeholder="Tìm kiếm vị trí ứng tuyển..." className="flex-1 px-6 py-3 rounded-xl outline-none text-gray-900 font-bold" />
                        <button className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">Tìm kiếm</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="mb-12 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Vị trí đang tuyển dụng</h2>
                    <div className="flex gap-2">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Tất cả</span>
                        <span className="bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 cursor-pointer">Bác sĩ</span>
                        <span className="bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 cursor-pointer">Điều dưỡng</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {JOBS.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center font-bold text-blue-600 text-xl border border-blue-100">
                                {job.title.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><i className="fi flaticon-placeholder"></i> {job.loc}</span>
                                    <span className="flex items-center gap-1"><i className="fi flaticon-clock"></i> {job.type}</span>
                                    <span className="flex items-center gap-1 text-green-600 font-bold"><i className="fi flaticon-money"></i> {job.salary}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-400 mb-2">Hạn nộp: {job.deadline}</div>
                                <button className="bg-white border-2 border-primary text-primary font-bold px-6 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
                                    Ứng tuyển
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
