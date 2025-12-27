"use client";
import React, { useState } from 'react';
import { Button, Input, Select } from '@/components/portal/ui';
import { useRouter } from 'next/navigation';

export default function TopUpPage() {
    const router = useRouter();
    const [amount, setAmount] = useState('100000');

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    icon="arrow-left"
                    onClick={() => router.back()}
                    className="!p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                />
                <h1 className="text-2xl font-bold text-gray-900">Nạp tiền vào ví</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                {/* Balance Display */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white mb-6">
                    <p className="text-blue-100 text-sm font-medium mb-1">Số dư hiện tại</p>
                    <h2 className="text-3xl font-bold">1,250,000 đ</h2>
                </div>

                {/* Amount Selection */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Chọn số tiền nạp</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {['50000', '100000', '200000', '500000', '1000000', '2000000'].map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount(val)}
                                className={`
                                    py-3 rounded-xl border font-bold transition-all
                                    ${amount === val
                                        ? 'border-primary bg-blue-50 text-primary ring-2 ring-primary/20'
                                        : 'border-gray-200 hover:border-blue-300 text-gray-600'}
                                `}
                            >
                                {parseInt(val).toLocaleString()}đ
                            </button>
                        ))}
                    </div>
                    <Input
                        label="Hoặc nhập số tiền khác"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        rightIcon="money"
                    />
                </div>

                {/* Payment Method */}
                <Select
                    label="Phương thức thanh toán"
                    options={[
                        { value: 'momo', label: 'Ví MoMo' },
                        { value: 'vnpay', label: 'VNPAY-QR' },
                        { value: 'bank', label: 'Chuyển khoản ngân hàng' },
                        { value: 'credit', label: 'Thẻ ATM / Visa / Master' }
                    ]}
                    value="momo"
                    required
                />

                <div className="pt-4">
                    <Button fullWidth size="lg" icon="credit-card">
                        Thanh toán {parseInt(amount).toLocaleString()}đ
                    </Button>
                    <p className="text-center text-gray-400 text-xs mt-4">
                        Giao dịch được bảo mật bởi cổng thanh toán quốc gia
                    </p>
                </div>
            </div>
        </div>
    );
}
