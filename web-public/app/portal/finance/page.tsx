"use client";
import React, { useState } from 'react';
import { MOCK_INVOICES } from '@/types/finance';

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState<'billing' | 'insurance'>('billing');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tài chính & Bảo hiểm</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý thu ngân, viện phí và cổng giám định BHYT</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('billing')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'billing'
                            ? 'bg-white text-green-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Thu ngân & Viện phí
                    </button>
                    <button
                        onClick={() => setActiveTab('insurance')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'insurance'
                            ? 'bg-white text-green-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Cổng BHYT
                    </button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Doanh thu ngày</div>
                    <div className="text-2xl font-bold text-gray-900">45.2M <span className="text-xs font-normal text-gray-400">VNĐ</span></div>
                    <div className="text-xs text-green-600 font-medium mt-1">↑ 12% so với hôm qua</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">BHYT Chi trả (Ước tính)</div>
                    <div className="text-2xl font-bold text-blue-700">128M <span className="text-xs font-normal text-gray-400">VNĐ</span></div>
                    <div className="text-xs text-gray-400 font-medium mt-1">Chờ quyết toán</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Viện phí tồn đọng</div>
                    <div className="text-2xl font-bold text-orange-600">32.5M <span className="text-xs font-normal text-gray-400">VNĐ</span></div>
                    <div className="text-xs text-red-500 font-medium mt-1">15 bệnh nhân chưa đóng</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Hồ sơ XML lỗi</div>
                    <div className="text-2xl font-bold text-red-600">3 <span className="text-xs font-normal text-gray-400">Hồ sơ</span></div>
                    <div className="text-xs text-gray-400 font-medium mt-1">Cần xử lý ngay</div>
                </div>
            </div>

            {activeTab === 'billing' ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Hóa đơn gần đây</h3>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700">
                            Tạo hóa đơn mới
                        </button>
                    </div>
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="p-4">Mã HĐ</th>
                                <th className="p-4">Bệnh nhân</th>
                                <th className="p-4">Loại hình</th>
                                <th className="p-4 text-right">Tổng cộng</th>
                                <th className="p-4 text-right">BHYT Trả</th>
                                <th className="p-4 text-right">BN Trả</th>
                                <th className="p-4">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {MOCK_INVOICES.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium text-gray-900">{inv.id}</td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{inv.patientName}</div>
                                        <div className="text-xs text-gray-400">{inv.patientId}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${inv.serviceType === 'Inpatient' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                            }`}>{inv.serviceType === 'Inpatient' ? 'Nội trú' : 'Ngoại trú'}</span>
                                    </td>
                                    <td className="p-4 text-right font-bold text-gray-900">{inv.amount.toLocaleString()} ₫</td>
                                    <td className="p-4 text-right text-blue-600">{inv.insuranceCovered.toLocaleString()} ₫</td>
                                    <td className="p-4 text-right text-green-600">{inv.patientPaid.toLocaleString()} ₫</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {inv.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                        <i className="fi flaticon-info text-blue-600 mt-1"></i>
                        <div>
                            <h4 className="font-bold text-blue-900">Trạng thái kết nối Cổng GĐ BHYT</h4>
                            <p className="text-sm text-blue-700">Hệ thống đang kết nối ổn định. Lần đồng bộ cuối: 10 phút trước.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fi flaticon-file text-2xl text-gray-400"></i>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Danh sách hồ sơ XML 1-5</h3>
                        <p className="text-gray-500 mb-6">Chưa có hồ sơ nào cần đẩy lên cổng.</p>
                        <button className="px-6 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">
                            Kiểm tra lịch sử
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
