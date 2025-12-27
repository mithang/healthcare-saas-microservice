"use client";
import React, { useState } from 'react';
import { MOCK_LAB_RESULTS, MOCK_IMAGING_ORDERS } from '@/types/paraclinical';

export default function ParaclinicalPage() {
    const [activeTab, setActiveTab] = useState<'lis' | 'pacs'>('lis');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cận lâm sàng (LIS/PACS)</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý kết quả Xét nghiệm và Chẩn đoán hình ảnh</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('lis')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'lis'
                            ? 'bg-white text-blue-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Xét nghiệm (LIS)
                    </button>
                    <button
                        onClick={() => setActiveTab('pacs')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'pacs'
                            ? 'bg-white text-blue-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        CĐHA (PACS)
                    </button>
                </div>
            </div>

            {/* LIS Tab */}
            {activeTab === 'lis' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* List */}
                    <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 font-bold text-gray-900">Danh sách chỉ định</div>
                        <div className="divide-y divide-gray-50">
                            {MOCK_LAB_RESULTS.map((lab) => (
                                <div key={lab.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-gray-900">{lab.patientName}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${lab.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>{lab.status === 'completed' ? 'Đã có KQ' : 'Đang chạy'}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">{lab.testName}</div>
                                    <div className="text-xs text-gray-400 mt-1">{new Date(lab.orderDate).toLocaleTimeString('vi-VN')}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Result View */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Kết quả chi tiết</h3>
                            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                                <i className="fi flaticon-print mr-2"></i> In kết quả
                            </button>
                        </div>

                        {/* Demo showing first completed result */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="p-3">Chỉ số</th>
                                        <th className="p-3">Kết quả</th>
                                        <th className="p-3">Đơn vị</th>
                                        <th className="p-3">Tham chiếu</th>
                                        <th className="p-3">Đánh giá</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {MOCK_LAB_RESULTS[0].results.map((res, idx) => (
                                        <tr key={idx} className={res.isAbnormal ? 'bg-red-50' : ''}>
                                            <td className="p-3 font-medium text-gray-900">{res.indicator}</td>
                                            <td className={`p-3 font-bold ${res.isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>{res.value}</td>
                                            <td className="p-3 text-gray-500">{res.unit}</td>
                                            <td className="p-3 text-gray-500">{res.reference}</td>
                                            <td className="p-3">
                                                {res.isAbnormal && <span className="text-red-600 font-bold text-xs uppercase">Bất thường</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* PACS Tab */}
            {activeTab === 'pacs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_IMAGING_ORDERS.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                            <div className="h-48 bg-gray-900 flex items-center justify-center relative">
                                {order.imageUrl ? (
                                    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-gray-500">
                                        <i className="fi flaticon-medical text-4xl mb-2"></i>
                                        <span>X-Ray Viewer</span>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 flex flex-col items-center">
                                        <i className="fi flaticon-clock text-3xl mb-2"></i>
                                        <span>Chờ chụp</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {order.modality}
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900">{order.patientName}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>{order.status === 'completed' ? 'Đã có KQ' : 'Đã lên lịch'}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{order.bodyPart}</p>

                                {order.status === 'completed' && (
                                    <div className="mb-4 bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
                                        <span className="font-bold block mb-1">Kết luận:</span>
                                        {order.report}
                                    </div>
                                )}

                                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                                    <span>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</span>
                                    <span>{order.radiologist}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
