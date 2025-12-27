"use client";
import React from 'react';

const MOCK_SERVICES = [
    { id: 'SV01', name: 'Khám Nội tổng quát', category: 'Khám bệnh', price: 150000, insurance: true },
    { id: 'SV02', name: 'Khám Chuyên khoa (Tim mạch/Nội tiết)', category: 'Khám bệnh', price: 300000, insurance: true },
    { id: 'SV03', name: 'Siêu âm ổ bụng tổng quát', category: 'CĐHA', price: 250000, insurance: true },
    { id: 'SV04', name: 'X-Quang Phổi thẳng', category: 'CĐHA', price: 180000, insurance: true },
    { id: 'SV05', name: 'Gói khám sức khỏe VIP', category: 'Gói khám', price: 5000000, insurance: false },
];

export default function ServicesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Danh mục Dịch vụ & Bảng giá</h1>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold shadow-sm hover:bg-green-700">
                    + Thêm dịch vụ
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                        <tr>
                            <th className="p-4">Mã DV</th>
                            <th className="p-4">Tên dịch vụ</th>
                            <th className="p-4">Nhóm</th>
                            <th className="p-4 text-right">Đơn giá (VNĐ)</th>
                            <th className="p-4 text-center">BHYT</th>
                            <th className="p-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {MOCK_SERVICES.map(svc => (
                            <tr key={svc.id} className="hover:bg-gray-50">
                                <td className="p-4 font-mono text-gray-500">{svc.id}</td>
                                <td className="p-4 font-bold text-gray-900">{svc.name}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">{svc.category}</span>
                                </td>
                                <td className="p-4 text-right font-medium">{svc.price.toLocaleString()}</td>
                                <td className="p-4 text-center">
                                    {svc.insurance ? <i className="fi flaticon-check text-green-600"></i> : <span className="text-gray-300">-</span>}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg">Sửa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
