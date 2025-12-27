"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useRouter, useParams } from 'next/navigation';

export default function WithdrawalDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const withdrawal = {
        id: params.id,
        transactionId: 'TRX-987654',
        partnerName: 'Nhà thuốc An Khang',
        partnerType: 'Pharmacy',
        amount: '15.000.000đ',
        accountName: 'NGUYEN VAN A',
        accountNumber: '1903456789012',
        bankName: 'Techcombank',
        requestDate: '19/12/2024 08:30',
        status: 'pending',
        note: 'Rút tiền doanh thu tháng 11',
        history: [
            { date: '19/12/2024 08:30', action: 'Tạo yêu cầu', user: 'Nhà thuốc An Khang' },
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Yêu cầu rút tiền #{withdrawal.transactionId}</h1>
                    <p className="text-gray-500 mt-1">Ngày yêu cầu: {withdrawal.requestDate}</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors">
                        <i className="fi flaticon-check mr-2"></i>Duyệt chuyển khoản
                    </button>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-colors">
                        <i className="fi flaticon-cross mr-2"></i>Từ chối
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Số tiền rút</p>
                    <h3 className="text-4xl font-bold text-green-600">{withdrawal.amount}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đối tác</p>
                    <h3 className="text-xl font-bold text-gray-900">{withdrawal.partnerName}</h3>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {withdrawal.partnerType}
                    </span>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={withdrawal.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="fi flaticon-credit-card text-blue-500"></i>
                    Thông tin tài khoản nhận tiền
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Ngân hàng</p>
                            <p className="text-lg font-bold text-gray-900">{withdrawal.bankName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Chi nhánh</p>
                            <p className="text-lg font-medium text-gray-900">Hội sở chính</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Số tài khoản</p>
                            <p className="text-2xl font-mono font-bold text-blue-600 tracking-wider">
                                {withdrawal.accountNumber}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Chủ tài khoản</p>
                            <p className="text-lg font-bold text-gray-900 uppercase">{withdrawal.accountName}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-1">Ghi chú từ đối tác</p>
                    <p className="text-gray-700 italic">"{withdrawal.note}"</p>
                </div>
            </div>
        </div>
    );
}
