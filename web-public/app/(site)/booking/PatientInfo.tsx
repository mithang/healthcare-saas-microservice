'use client';

import React, { useState } from 'react';
import { PatientInfo } from '@/types/booking.types';

interface PatientInfoFormProps {
    patientInfo?: PatientInfo;
    onSubmit: (info: PatientInfo) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ patientInfo, onSubmit }) => {
    const [formData, setFormData] = useState<PatientInfo>(
        patientInfo || {
            fullName: '',
            phone: '',
            email: '',
            dateOfBirth: '',
            gender: 'male',
            notes: ''
        }
    );

    const [errors, setErrors] = useState<Partial<Record<keyof PatientInfo, string>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof PatientInfo]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof PatientInfo, string>> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ tên';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Vui lòng chọn ngày sinh';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin bệnh nhân</h2>
                <p className="text-gray-500">Vui lòng điền đầy đủ thông tin để hoàn tất đặt lịch</p>
            </div>

            <form id="patient-info-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                            placeholder="Nguyễn Văn A"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                            placeholder="0901234567"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                            placeholder="example@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Date of Birth and Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ngày sinh <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                            />
                            {errors.dateOfBirth && (
                                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Giới tính <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ghi chú / Lý do khám
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Mô tả triệu chứng hoặc lý do khám..."
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PatientInfoForm;
