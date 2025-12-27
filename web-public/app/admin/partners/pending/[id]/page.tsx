"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useRouter, useParams } from 'next/navigation';

export default function PendingPartnerDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const request = {
        id: params.id,
        name: 'Phòng khám Đa khoa Quốc tế',
        type: 'Clinic',
        representative: 'Dr. John Doe',
        phone: '0987654321',
        email: 'contact@pkqa.vn',
        address: '123 Nguyễn Văn Cừ, Q.5, TP.HCM',
        licenseNumber: '012345/BYT-GPHĐ',
        licenseDate: '2023-01-01',
        documents: [
            { name: 'Giấy phép kinh doanh.pdf', url: '#' },
            { name: 'Chứng chỉ hành nghề.pdf', url: '#' },
            { name: 'Hợp đồng hợp tác.pdf', url: '#' }
        ],
        submissionDate: '18/12/2024',
        status: 'pending'
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Duyệt hồ sơ đối tác</h1>
                    <p className="text-gray-500 mt-1">Ngày nộp: {request.submissionDate}</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 shadow-lg shadow-green-200 transaction-all">
                        Duyệt hồ sơ
                    </button>
                    <button className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-yellow-600 shadow-lg shadow-yellow-200 transaction-all">
                        Yêu cầu bổ sung
                    </button>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transaction-all">
                        Từ chối
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin doanh nghiệp</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div><p className="text-sm text-gray-500 mb-1">Tên đối tác</p><p className="font-medium text-gray-900 text-lg">{request.name}</p></div>
                        <div><p className="text-sm text-gray-500 mb-1">Loại hình</p><span className="font-bold text-blue-600">{request.type}</span></div>
                        <div><p className="text-sm text-gray-500 mb-1">Người đại diện</p><p className="font-medium text-gray-900">{request.representative}</p></div>
                        <div><p className="text-sm text-gray-500 mb-1">Số giấy phép</p><p className="font-medium text-gray-900 font-mono">{request.licenseNumber}</p></div>
                        <div className="col-span-2"><p className="text-sm text-gray-500 mb-1">Địa chỉ</p><p className="font-medium text-gray-900">{request.address}</p></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <i className="fi flaticon-smartphone text-blue-500 text-xl"></i>
                            <div>
                                <p className="text-xs text-gray-500">Số điện thoại</p>
                                <p className="font-medium text-gray-900">{request.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fi flaticon-email text-blue-500 text-xl"></i>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-gray-900">{request.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tài liệu hồ sơ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {request.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                <i className="fi flaticon-document text-red-500 text-lg group-hover:text-red-600"></i>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                                <p className="text-xs text-blue-500 group-hover:underline">Xem tài liệu</p>
                            </div>
                            <i className="fi flaticon-download text-gray-400 group-hover:text-blue-600"></i>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
