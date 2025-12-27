"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateLabTest() {
    const router = useRouter();

    const fields = [
        {
            name: 'patientId', label: 'Bệnh nhân', type: 'select' as const, required: true, options: [
                { value: '1', label: 'Nguyễn Văn A - 0901234567' },
                { value: '2', label: 'Trần Thị B - 0909876543' }
            ]
        },
        {
            name: 'testType', label: 'Gói xét nghiệm', type: 'select' as const, required: true, isMulti: true, options: [
                { value: 'blood_general', label: 'Xét nghiệm máu tổng quát' },
                { value: 'diabetes', label: 'Tầm soát tiểu đường' },
                { value: 'cancer_marker', label: 'Tầm soát ung thư (Marker)' },
                { value: 'liver', label: 'Chức năng gan' },
                { value: 'kidney', label: 'Chức năng thận' }
            ]
        },
        {
            name: 'sampleType', label: 'Loại mẫu', type: 'select' as const, required: true, options: [
                { value: 'home_collection', label: 'Lấy mẫu tại nhà' },
                { value: 'clinic_collection', label: 'Lấy mẫu tại phòng khám' }
            ]
        },
        { name: 'collectionDate', label: 'Ngày lấy mẫu', type: 'date' as const, required: true },
        {
            name: 'collectionTime', label: 'Giờ lấy mẫu', type: 'select' as const, required: true, options: [
                { value: '07:00', label: '07:00 - 08:00' },
                { value: '08:00', label: '08:00 - 09:00' },
                { value: '09:00', label: '09:00 - 10:00' }
            ]
        },
        { name: 'address', label: 'Địa chỉ lấy mẫu (Nếu tại nhà)', type: 'text' as const, placeholder: 'Để trống nếu lấy tại phòng khám' },
        { name: 'note', label: 'Lưu ý lâm sàng', type: 'textarea' as const, rows: 2, placeholder: 'Nhịn ăn sáng, tiền sử bệnh...' },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating lab test order:', data);
        alert('Đặt lịch xét nghiệm thành công!');
        router.push('/admin/orders/lab-tests');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Đặt lịch Xét nghiệm</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo phiếu xét nghiệm"
                    columns={2}
                />
            </div>
        </div>
    );
}
