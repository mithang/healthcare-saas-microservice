"use client";
import React from 'react';

export default function ProfessionalProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ chuyên môn</h1>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                            <img src="/styles/img/doctor-avatar-placeholder.jpg" className="w-full h-full object-cover" alt="" />
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700">
                            Cập nhật hồ sơ
                        </button>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">BS. Nguyễn Văn A</h2>
                        <p className="text-lg text-gray-600">Chuyên khoa Nội Tim Mạch • 10 năm kinh nghiệm</p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Thông tin hành nghề</h4>
                            <ul className="space-y-4">
                                <li>
                                    <div className="text-sm text-gray-500">Số chứng chỉ hành nghề</div>
                                    <div className="font-medium text-gray-900">001234/BYT-CCHN</div>
                                </li>
                                <li>
                                    <div className="text-sm text-gray-500">Phạm vi hoạt động</div>
                                    <div className="font-medium text-gray-900">Khám bệnh, chữa bệnh chuyên khoa Nội</div>
                                </li>
                                <li>
                                    <div className="text-sm text-gray-500">Nơi công tác</div>
                                    <div className="font-medium text-gray-900">Bệnh viện Đa khoa MedPortal</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Học vấn & Bằng cấp</h4>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🎓</div>
                                    <div>
                                        <div className="font-bold text-gray-900">Bác sĩ Đa khoa</div>
                                        <div className="text-sm text-gray-500">Đại học Y Dược TP.HCM (2008-2014)</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🎓</div>
                                    <div>
                                        <div className="font-bold text-gray-900">Thạc sĩ Nội khoa</div>
                                        <div className="text-sm text-gray-500">Đại học Y Dược TP.HCM (2016-2018)</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
