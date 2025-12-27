"use client";
import React from 'react';

const MOCK_STAFF = [
    { id: 'S01', name: 'BS. Nguyễn Văn A', role: 'Bác sĩ', dept: 'Khoa Nội', status: 'active', phone: '0901234567' },
    { id: 'S02', name: 'ĐD. Trần Thị B', role: 'Điều dưỡng', dept: 'Khoa Ngoại', status: 'on-leave', phone: '0909999999' },
    { id: 'S03', name: 'BS. Lê C', role: 'Bác sĩ', dept: 'Cấp cứu', status: 'active', phone: '0908888888' },
];

export default function StaffPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Nhân sự</h1>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold shadow-sm hover:bg-green-700">
                    + Thêm nhân viên
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                        <tr>
                            <th className="p-4">Nhân viên</th>
                            <th className="p-4">Chức vụ / Khoa</th>
                            <th className="p-4">Liên hệ</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {MOCK_STAFF.map(staff => (
                            <tr key={staff.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-bold text-gray-900">{staff.name}</div>
                                    <div className="text-xs text-gray-500">ID: {staff.id}</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-gray-900">{staff.role}</div>
                                    <div className="text-xs text-blue-600 font-medium">{staff.dept}</div>
                                </td>
                                <td className="p-4">{staff.phone}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${staff.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {staff.status === 'active' ? 'Đang làm việc' : 'Nghỉ phép'}
                                    </span>
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
