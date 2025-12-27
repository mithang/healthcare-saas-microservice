"use client";
import React from 'react';
import { Button, Input, Select } from '@/components/portal/ui';
import { useRouter, useParams } from 'next/navigation';

export default function EditPatientPage() {
    const params = useParams<{ id: string }>();
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
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cập nhật hồ sơ</h1>
                    <p className="text-gray-500 text-sm">Mã hồ sơ: {params.id}</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Họ và tên"
                        defaultValue="Trần Văn A"
                        required
                    />
                    <Input
                        label="Số điện thoại"
                        defaultValue="0901234567"
                        required
                        type="tel"
                        icon="phone-call"
                    />
                    <Select
                        label="Giới tính"
                        value="male"
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
                        defaultValue="1980-05-15"
                        required
                    />
                    <Input
                        label="CMND/CCCD"
                        defaultValue="079123456789"
                    />
                    <Input
                        label="Mã BHYT"
                        defaultValue="DN479123456789"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Input
                        label="Địa chỉ"
                        defaultValue="123 Nguyễn Văn Cừ, Q5, TP.HCM"
                        icon="marker"
                    />
                    <Input
                        label="Tiền sử bệnh lý"
                        defaultValue="Cao huyết áp nhẹ"
                        containerClassName="mb-0"
                    />
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                    <Button variant="danger" icon="trash" className="mr-auto">Xóa hồ sơ</Button>
                    <Button variant="outline" onClick={() => router.back()}>Hủy bỏ</Button>
                    <Button icon="check">Cập nhật</Button>
                </div>
            </div>
        </div>
    );
}
