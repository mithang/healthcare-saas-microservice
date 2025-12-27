"use client";
import React, { useState } from 'react';
import { MOCK_QUEUE } from '@/types/reception';

export default function ReceptionPage() {
    const [activeTab, setActiveTab] = useState<'kiosk' | 'queue' | 'triage'>('queue');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tiếp đón & Sàng lọc</h1>
                    <p className="text-gray-500 text-sm mt-1">Hệ thống Lấy số, Gọi số và Phân loại bệnh nhân</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('kiosk')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'kiosk'
                            ? 'bg-white text-green-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Kiosk Lấy số
                    </button>
                    <button
                        onClick={() => setActiveTab('queue')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'queue'
                            ? 'bg-white text-blue-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Hàng đợi (Queue)
                    </button>
                    <button
                        onClick={() => setActiveTab('triage')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'triage'
                            ? 'bg-white text-orange-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Sàng lọc (Triage)
                    </button>
                </div>
            </div>

            {/* Kiosk Mode */}
            {activeTab === 'kiosk' && (
                <div className="max-w-4xl mx-auto text-center mt-10">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-green-600 p-6 text-white">
                            <h2 className="text-3xl font-bold">CHÀO MỪNG QUÝ KHÁCH</h2>
                            <p className="opacity-90 mt-2">Vui lòng chọn dịch vụ để lấy số thứ tự</p>
                        </div>
                        <div className="p-10 grid grid-cols-2 gap-6">
                            <button className="flex flex-col items-center justify-center p-8 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:bg-blue-100 hover:border-blue-300 transition-all group">
                                <i className="fi flaticon-health-insurance text-5xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
                                <span className="text-xl font-bold text-blue-900">Khám BHYT</span>
                                <span className="text-sm text-blue-600 mt-2">Dành cho đối tượng có thẻ BHYT</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-8 bg-green-50 border-2 border-green-100 rounded-2xl hover:bg-green-100 hover:border-green-300 transition-all group">
                                <i className="fi flaticon-medical-report text-5xl text-green-600 mb-4 group-hover:scale-110 transition-transform"></i>
                                <span className="text-xl font-bold text-green-900">Khám Dịch Vụ</span>
                                <span className="text-sm text-green-600 mt-2">Khám thu phí thông thường</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-8 bg-purple-50 border-2 border-purple-100 rounded-2xl hover:bg-purple-100 hover:border-purple-300 transition-all group">
                                <i className="fi flaticon-ambulance text-5xl text-purple-600 mb-4 group-hover:scale-110 transition-transform"></i>
                                <span className="text-xl font-bold text-purple-900">Ưu tiên / Cấp cứu</span>
                                <span className="text-sm text-purple-600 mt-2">Người già, Trẻ em, Cấp cứu</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-gray-100 rounded-2xl hover:bg-gray-100 hover:border-gray-300 transition-all group">
                                <i className="fi flaticon-information text-5xl text-gray-500 mb-4 group-hover:scale-110 transition-transform"></i>
                                <span className="text-xl font-bold text-gray-900">Tư vấn / Khác</span>
                                <span className="text-sm text-gray-500 mt-2">Hỏi đáp thông tin</span>
                            </button>
                        </div>
                        <div className="bg-gray-50 p-4 text-sm text-gray-500">
                            Hệ thống tiếp đón thông minh v1.0
                        </div>
                    </div>
                </div>
            )}

            {/* Queue Monitor */}
            {activeTab === 'queue' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                                <h3 className="font-bold text-lg">ĐANG GỌI SỐ</h3>
                                <span className="animate-pulse w-3 h-3 bg-red-400 rounded-full"></span>
                            </div>
                            <div className="p-8 text-center bg-blue-50">
                                <div className="text-gray-500 mb-2 uppercase tracking-widest text-sm font-semibold">Số thứ tự</div>
                                <div className="text-8xl font-black text-blue-900 tracking-tighter">1001</div>
                                <div className="mt-6 text-2xl font-bold text-blue-800">Quầy số 1</div>
                                <div className="mt-2 text-blue-600">Nguyễn Văn A</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                                <div className="text-sm text-gray-500 mb-1">Quầy 2</div>
                                <div className="text-4xl font-bold text-gray-900">1002</div>
                                <div className="text-xs text-green-600 mt-1">Đang phục vụ</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                                <div className="text-sm text-gray-500 mb-1">Quầy 3</div>
                                <div className="text-4xl font-bold text-gray-400">---</div>
                                <div className="text-xs text-gray-400 mt-1">Đang nghỉ</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                        <div className="p-4 border-b border-gray-100 font-bold text-gray-900">Danh sách chờ</div>
                        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                            {MOCK_QUEUE.filter(q => q.status === 'waiting').map((q) => (
                                <div key={q.id} className="p-4 flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{q.number}</div>
                                        <div className="text-xs text-gray-500">{q.patientName}</div>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${q.serviceType === 'priority' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {q.serviceType === 'priority' ? 'Ưu tiên' : 'Thường'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Triage Interface */}
            {activeTab === 'triage' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ml-auto mr-auto max-w-5xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Phiếu Sàng lọc / Phân loại (Triage)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn bệnh nhân từ hàng đợi</label>
                            <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-white">
                                {MOCK_QUEUE.map(q => (
                                    <option key={q.id} value={q.id}>{q.number} - {q.patientName} ({q.serviceType})</option>
                                ))}
                            </select>

                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h4 className="font-bold text-gray-900">Sinh hiệu (Vitals)</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500">Mạch (lần/phút)</label>
                                        <input type="number" className="w-full mt-1 p-2 rounded-lg border border-gray-200" placeholder="VD: 80" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Nhiệt độ (°C)</label>
                                        <input type="number" className="w-full mt-1 p-2 rounded-lg border border-gray-200" placeholder="VD: 37.0" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Huyết áp (mmHg)</label>
                                        <input type="text" className="w-full mt-1 p-2 rounded-lg border border-gray-200" placeholder="VD: 120/80" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">SpO2 (%)</label>
                                        <input type="number" className="w-full mt-1 p-2 rounded-lg border border-gray-200" placeholder="VD: 98" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Đánh giá & Phân luồng</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Triệu chứng chính</label>
                                    <textarea className="w-full p-3 rounded-xl border border-gray-200 h-24" placeholder="Mô tả triệu chứng bệnh nhân khai..."></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ ưu tiên (Triage Scale)</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="p-3 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 text-left border border-red-200">
                                            🔴 CẤP CỨU (Red)
                                            <span className="block text-xs font-normal mt-1 opacity-75">Nguy kịch, xử trí ngay</span>
                                        </button>
                                        <button className="p-3 bg-yellow-100 text-yellow-700 rounded-xl font-bold hover:bg-yellow-200 text-left border border-yellow-200">
                                            🟡 CẤP BÁCH (Yellow)
                                            <span className="block text-xs font-normal mt-1 opacity-75">Có nguy cơ, xử trí sớm</span>
                                        </button>
                                        <button className="p-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 text-left border border-green-200 opacity-50">
                                            🟢 KHÔNG CẤP CỨU
                                            <span className="block text-xs font-normal mt-1 opacity-75">Bệnh thông thường</span>
                                        </button>
                                        <button className="p-3 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200 text-left border border-blue-200 opacity-50">
                                            🔵 KHÁC
                                            <span className="block text-xs font-normal mt-1 opacity-75">Tư vấn, hành chính</span>
                                        </button>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all mt-4">
                                    Lưu & Chuyển vào phòng khám
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
