"use client";
import React, { useState } from 'react';
import { MOCK_BEDS, MOCK_ADMISSIONS } from '@/types/inpatient';

export default function InpatientPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'beds' | 'admissions'>('dashboard');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Nội trú</h1>
                    <p className="text-gray-500 text-sm mt-1">Theo dõi bệnh nhân nhập viện, sơ đồ giường bệnh và điều trị</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
                    {['dashboard', 'beds', 'admissions'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === tab
                                ? 'bg-white text-blue-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {tab === 'dashboard' ? 'Tổng quan' :
                                tab === 'beds' ? 'Sơ đồ giường' : 'DS Nhập viện'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Overview Stats */}
            {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="fi flaticon-hospital-bed text-6xl text-blue-600"></i>
                        </div>
                        <div className="text-sm text-gray-500 mb-1">Đang điều trị</div>
                        <div className="text-2xl font-bold text-gray-900">128 <span className="text-xs font-normal text-gray-400">BN</span></div>
                        <div className="text-xs text-green-600 font-medium mt-1">Công suất 85%</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Nhập viện hôm nay</div>
                        <div className="text-2xl font-bold text-blue-700">14 <span className="text-xs font-normal text-gray-400">BN</span></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Dự kiến xuất viện</div>
                        <div className="text-2xl font-bold text-green-600">8 <span className="text-xs font-normal text-gray-400">BN</span></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Giường trống</div>
                        <div className="text-2xl font-bold text-orange-600">22 <span className="text-xs font-normal text-gray-400">Giường</span></div>
                    </div>
                </div>
            )}

            {/* Bed Map */}
            {(activeTab === 'dashboard' || activeTab === 'beds') && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <i className="fi flaticon-hospital-bed text-blue-600"></i>
                            Sơ đồ giường bệnh theo khoa
                        </h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></span> Trống</span>
                            <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></span> Có bệnh nhân</span>
                            <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-gray-100 border border-gray-200"></span> Bảo trì</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {MOCK_BEDS.map((bed) => (
                            <div key={bed.id} className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${bed.status === 'available' ? 'border-green-100 bg-green-50 hover:border-green-300' :
                                    bed.status === 'occupied' ? 'border-blue-100 bg-blue-50 hover:border-blue-300' :
                                        'border-gray-100 bg-gray-50 opacity-70'
                                }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-gray-700">{bed.code}</span>
                                    <span className="text-xs font-mono bg-white/50 px-1 rounded">{bed.room}</span>
                                </div>
                                {bed.status === 'occupied' ? (
                                    <div>
                                        <div className="text-sm font-bold text-blue-800 truncate">{bed.patientName}</div>
                                        <div className="text-xs text-blue-600 mt-1">Vào: {new Date(bed.admissionDate!).toLocaleDateString('vi-VN')}</div>
                                    </div>
                                ) : (
                                    <div className={`text-sm font-medium ${bed.status === 'available' ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {bed.status === 'available' ? 'Giường trống' : 'Đang bảo trì'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Admission List */}
            {activeTab === 'admissions' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="p-4">Bệnh nhân</th>
                                <th className="p-4">Chẩn đoán</th>
                                <th className="p-4">Khoa / Giường</th>
                                <th className="p-4">Bác sĩ điều trị</th>
                                <th className="p-4">Ngày vào</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {MOCK_ADMISSIONS.map((adm) => (
                                <tr key={adm.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900">{adm.patientName}</div>
                                        <div className="text-xs text-gray-500">{adm.gender} - {new Date().getFullYear() - new Date(adm.dob).getFullYear()} tuổi</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-gray-900 truncate max-w-[200px]">{adm.diagnosis}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-blue-600">{adm.department}</div>
                                        <div className="text-xs text-gray-500">{adm.bedName}</div>
                                    </td>
                                    <td className="p-4 text-gray-900">{adm.doctorInCharge}</td>
                                    <td className="p-4 text-gray-500">{new Date(adm.admissionDate).toLocaleDateString('vi-VN')}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
