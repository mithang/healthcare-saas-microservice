"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateAppointment() {
    const router = useRouter();

    // Updated fields to use premium UI components implicitly via FormBuilder
    const fields = [
        {
            name: 'patientId', label: 'Bệnh nhân', type: 'select' as const, required: true, options: [
                { value: '1', label: 'Nguyễn Văn A - 0901234567' },
                { value: '2', label: 'Trần Thị B - 0909876543' },
                { value: 'draft', label: '+ Tạo bệnh nhân mới' }
            ]
        },
        {
            name: 'serviceType', label: 'Loại dịch vụ', type: 'select' as const, required: true, options: [
                { value: 'offline', label: 'Khám tại viện' },
                { value: 'online', label: 'Tư vấn trực tuyến (Video Call)' },
                { value: 'home', label: 'Khám tại nhà' }
            ]
        },
        {
            name: 'specialty', label: 'Chuyên khoa', type: 'select' as const, required: true, options: [
                { value: 'general', label: 'Đa khoa' },
                { value: 'cardiology', label: 'Tim mạch' },
                { value: 'dermatology', label: 'Da liễu' },
                { value: 'pediatrics', label: 'Nhi khoa' }
            ]
        },
        {
            name: 'doctorId', label: 'Bác sĩ', type: 'select' as const, required: true, options: [
                { value: 'dr_minh', label: 'BS. Nguyễn Minh (Tim mạch) - Ca sáng' },
                { value: 'dr_hoa', label: 'BS. Lê Thị Hoa (Da liễu) - Ca chiều' }
            ]
        },
        { name: 'appointmentDate', label: 'Ngày khám', type: 'date' as const, required: true },
        {
            name: 'appointmentTime', label: 'Giờ khám', type: 'select' as const, required: true, options: [
                { value: '08:00', label: '08:00 - 08:30' },
                { value: '08:30', label: '08:30 - 09:00' },
                { value: '09:00', label: '09:00 - 09:30' },
                { value: '09:30', label: '09:30 - 10:00' },
                { value: '10:00', label: '10:00 - 10:30' },
                { value: '10:30', label: '10:30 - 11:00' },
                { value: '13:30', label: '13:30 - 14:00' },
                { value: '14:00', label: '14:00 - 14:30' },
            ]
        },
        { name: 'symptoms', label: 'Triệu chứng / Lý do khám', type: 'textarea' as const, required: true, rows: 3, placeholder: 'Mô tả triệu chứng bệnh...' },
        { name: 'note', label: 'Ghi chú nội bộ', type: 'textarea' as const, rows: 2, placeholder: 'Ghi chú cho bác sĩ hoặc lễ tân...' },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating appointment:', data);
        alert('Đặt lịch khám thành công!');
        router.push('/admin/orders/appointments');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Đặt lịch khám mới</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Xác nhận đặt lịch"
                    columns={2}
                />
            </div>
        </div>
    );
}
