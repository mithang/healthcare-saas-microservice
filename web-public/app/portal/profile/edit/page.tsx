"use client";
import React from 'react';
import { Button, Input, Select } from '@/components/portal/ui';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
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
                <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa thông tin cá nhân</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Avatar Section */}
                <div className="bg-gray-50/50 p-8 border-b border-gray-100 flex flex-col items-center">
                    <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-sm flex items-center justify-center text-3xl overflow-hidden">
                            {/* Placeholder Avatar */}
                            <span className="font-bold text-primary">MH</span>
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="fi flaticon-camera text-white"></i>
                        </div>
                    </div>
                    <button className="text-primary text-sm font-bold mt-3 hover:underline">Thay đổi ảnh đại diện</button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Họ và tên hiển thị"
                            defaultValue="Mithang"
                            required
                            fullWidth
                        />
                        <Input
                            label="Email"
                            defaultValue="mithang@example.com"
                            required
                            fullWidth
                            type="email"
                            icon="envelope"
                        />
                        <Input
                            label="Số điện thoại"
                            defaultValue="0987xxx678"
                            fullWidth
                            type="tel"
                            disabled
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
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <Button variant="outline" onClick={() => router.back()}>Hủy thay đổi</Button>
                        <Button icon="check">Lưu thông tin</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
