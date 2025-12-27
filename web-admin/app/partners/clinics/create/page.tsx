"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import partnerService from '@/services/partner.service';
import Link from 'next/link';

export default function CreateClinicPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        specialties: [] as string[],
        openingHours: {
            monday: { open: '08:00', close: '17:00' },
            tuesday: { open: '08:00', close: '17:00' },
            wednesday: { open: '08:00', close: '17:00' },
            thursday: { open: '08:00', close: '17:00' },
            friday: { open: '08:00', close: '17:00' },
            saturday: { open: '08:00', close: '12:00' },
        },
    });

    const [specialtyInput, setSpecialtyInput] = useState('');

    const handleAddSpecialty = () => {
        if (specialtyInput.trim()) {
            setFormData({
                ...formData,
                specialties: [...formData.specialties, specialtyInput.trim()]
            });
            setSpecialtyInput('');
        }
    };

    const handleRemoveSpecialty = (index: number) => {
        setFormData({
            ...formData,
            specialties: formData.specialties.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await partnerService.createClinic({
                ...formData,
                openingHours: formData.openingHours, // Ensure this matches backend expectation or service type
            });
            alert('Tạo phòng khám thành công!');
            router.push('/admin/partners/clinics');
        } catch (error: any) {
            alert('Lỗi: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Thêm Phòng khám</h1>
                    <p className="text-gray-500 mt-1">Tạo phòng khám mới</p>
                </div>
                <Link href="/admin/partners/clinics" className="text-gray-600 hover:text-gray-900">
                    ← Quay lại
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Tên phòng khám *</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Số điện thoại *</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Địa chỉ *</label>
                        <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold mb-2">Mô tả</label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>

                {/* Specialties */}
                <div>
                    <label className="block text-sm font-bold mb-2">Chuyên khoa</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={specialtyInput}
                            onChange={(e) => setSpecialtyInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
                            placeholder="Nhập chuyên khoa..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleAddSpecialty}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                            Thêm
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.specialties.map((spec, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                                {spec}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpecialty(index)}
                                    className="text-blue-900 hover:text-red-600"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-4 border-t">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                    >
                        {loading ? 'Đang lưu...' : 'Tạo phòng khám'}
                    </button>
                    <Link
                        href="/admin/partners/clinics"
                        className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Hủy
                    </Link>
                </div>
            </form>
        </div>
    );
}
