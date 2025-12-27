"use client";
import React from 'react';
import { Button, Input, Select } from '@/components/portal/ui';
import { useRouter } from 'next/navigation';

export default function CreatePatientPage() {
    const router = useRouter();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    icon="arrow-left"
                    onClick={() => router.back()}
                    className="!p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                />
                <h1 className="text-2xl font-bold text-gray-900">Thêm hồ sơ bệnh nhân</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Họ và tên"
                        placeholder="Nhập họ tên đầy đủ"
                        required
                        fullWidth
                    />
                    <Input
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        required
                        fullWidth
                        type="tel"
                        icon="phone-call"
                    />
                    <Select
                        label="Giới tính"
                        options={[
                            { value: 'male', label: 'Nam' },
                            { value: 'female', label: 'Nữ' },
                            { value: 'other', label: 'Khác' }
                        ]}
                        required
                    />
                    <Input
                        label="Ngày sinh"
                        type="date"
                        required
                        fullWidth
                    />
                    <Input
                        label="CMND/CCCD"
                        placeholder="Nhập số CMND/CCCD"
                        fullWidth
                    />
                    <Input
                        label="Mã BHYT"
                        placeholder="Nhập mã thẻ BHYT (nếu có)"
                        fullWidth
                    />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Input
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ liên hệ"
                        fullWidth
                        icon="marker"
                    />
                    <Input
                        label="Tiền sử bệnh lý"
                        placeholder="Ghi chú tiền sử bệnh (nếu có)"
                        fullWidth
                        containerClassName="mb-0"
                    />
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => router.back()}>Hủy bỏ</Button>
                    <Button icon="check">Lưu hồ sơ</Button>
                </div>
            </div>
        </div>
    );
}
