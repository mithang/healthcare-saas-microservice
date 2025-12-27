"use client";
import React, { useState } from 'react';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Select } from '@/components/admin/ui/Select';
import { RadioGroup } from '@/components/admin/ui/Radio';
import { Checkbox } from '@/components/admin/ui/Checkbox';
import { useRouter } from 'next/navigation';

export default function CreateCoursePage() {
    const router = useRouter();
    const [courseType, setCourseType] = useState('CME');
    const [priceType, setPriceType] = useState('free');

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" icon="arrow-left" onClick={() => router.back()} />
                <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
                {/* Basic Info */}
                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Thông tin chung</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Tên khóa học" placeholder="Ví dụ: Cập nhật điều trị tăng huyết áp 2025" fullWidth required />
                        <Select
                            label="Loại hình đào tạo"
                            options={[
                                { value: 'CME', label: 'CME - Đào tạo Y khoa liên tục (Bác sĩ)' },
                                { value: 'CPE', label: 'CPE - Đào tạo Dược liên tục (Dược sĩ)' },
                                { value: 'Workshop', label: 'Hội thảo / Workshop' }
                            ]}
                            value={courseType}
                            onChange={(val) => setCourseType(val as string)}
                        />
                        <Input label="Đơn vị tổ chức" placeholder="Bệnh viện / Trường / Hội sở" fullWidth required />
                        <Input label="Số tín chỉ / Giờ đào tạo" type="number" placeholder="4" fullWidth />
                    </div>
                </section>

                {/* Pricing */}
                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Chi phí & Đối tượng</h3>
                    <div className="mb-4">
                        <RadioGroup
                            label="Hình thức thu phí"
                            direction="row"
                            name="priceType"
                            value={priceType}
                            onChange={setPriceType}
                            options={[
                                { value: 'free', label: 'Miễn phí', description: 'Mở rộng cho cộng đồng' },
                                { value: 'paid', label: 'Có thu phí', description: 'Bán vé tham dự' },
                                { value: 'invite', label: 'Chỉ định danh', description: 'Chỉ khách mời' },
                            ]}
                        />
                    </div>
                    {priceType === 'paid' && (
                        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl mb-4">
                            <Input label="Giá vé tiêu chuẩn" icon="dollar" placeholder="500,000" />
                            <Input label="Giá vé VIP" icon="star" placeholder="1,000,000" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Đối tượng tham gia</label>
                        <div className="flex gap-6">
                            <Checkbox label="Bác sĩ đa khoa" />
                            <Checkbox label="Bác sĩ chuyên khoa" />
                            <Checkbox label="Dược sĩ" />
                            <Checkbox label="Điều dưỡng" />
                        </div>
                    </div>
                </section>

                {/* Schedule & Content */}
                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Thời gian & Nội dung</h3>
                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <Input label="Ngày bắt đầu" type="date" />
                        <Input label="Ngày kết thúc" type="date" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả nội dung</label>
                        <textarea className="w-full p-4 border border-gray-200 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nội dung chi tiết, diễn giả, lịch trình..."></textarea>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer">
                        <i className="fi flaticon-cloud-upload text-3xl mb-2"></i>
                        <p>Tải lên tài liệu hoặc Banner khóa học</p>
                    </div>
                </section>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => router.back()}>Hủy</Button>
                    <Button icon="check">Tạo khóa học</Button>
                </div>
            </div>
        </div>
    );
}
