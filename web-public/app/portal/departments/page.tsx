"use client";
import React from 'react';

const DEPARTMENTS = [
    { name: 'Khoa Nội Tổng hợp', head: 'BS.CKII Nguyễn Văn A', staffCount: 15, bedCount: 50 },
    { name: 'Khoa Ngoại Tổng quát', head: 'ThS.BS Trần Văn B', staffCount: 20, bedCount: 45 },
    { name: 'Khoa Nhi', head: 'BS.CKI Lê Thị C', staffCount: 12, bedCount: 30 },
    { name: 'Khoa Cấp cứu', head: 'BS. Phạm D', staffCount: 25, bedCount: 20 },
];

export default function DepartmentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Khoa / Phòng</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEPARTMENTS.map((dept, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-3xl text-blue-600">
                            <i className="fi flaticon-hospital"></i>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-bold text-xl text-gray-900 mb-1">{dept.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">Trưởng khoa: <span className="text-gray-900 font-medium">{dept.head}</span></p>
                            <div className="flex justify-center md:justify-start gap-4">
                                <span className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                                    👥 {dept.staffCount} Nhân sự
                                </span>
                                <span className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                                    🛏️ {dept.bedCount} Giường
                                </span>
                            </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-blue-600">
                            <i className="fi flaticon-edit"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
