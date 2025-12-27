"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function RefundDetail() {
    const params = useParams<{ id: string }>();
    const refund = {
        id: params.id,
        refundCode: 'REF10015',
        customerName: 'Lê Văn D',
        originalOrder: 'ORD5020',
        amount: '450.000đ',
        reason: 'Sản phẩm lỗi',
        description: 'Thuốc bị hỏng bao bì, yêu cầu hoàn tiền',
        requestDate: '18/12/2024 16:00',
        status: 'pending',
        images: ['/img/refund1.jpg', '/img/refund2.jpg'],
        bankAccount: '1234567890',
        bankName: 'Vietcombank',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Yêu cầu hoàn tiền #{refund.refundCode}</h1>
                <p className="text-gray-500 mt-1">Ngày yêu cầu: {refund.requestDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Số tiền hoàn</p>
                    <h3 className="text-3xl font-bold text-red-600">{refund.amount}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Đơn hàng gốc</p>
                    <p className="font-mono font-bold text-gray-900">{refund.originalOrder}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={refund.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin khách hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Tên khách hàng</p><p className="font-medium text-gray-900">{refund.customerName}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Lý do</p><p className="font-medium text-gray-900">{refund.reason}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Mô tả chi tiết</p><p className="text-gray-700">{refund.description}</p></div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Hình ảnh minh chứng</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {refund.images.map((img, idx) => (
                        <div key={idx} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Ảnh {idx + 1}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin ngân hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Số tài khoản</p><p className="font-medium text-gray-900">{refund.bankAccount}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Ngân hàng</p><p className="font-medium text-gray-900">{refund.bankName}</p></div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl">Duyệt hoàn tiền</button>
                <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Từ chối</button>
            </div>
        </div>
    );
}
