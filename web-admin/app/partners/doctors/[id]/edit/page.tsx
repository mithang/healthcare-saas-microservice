"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import partnerService from '@/services/partner.service';

export default function EditDoctor({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const id = parseInt(resolvedParams.id);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        specialty: 'Tim mạch',
        hospital: '',
        phone: '',
        email: '',
        description: '',
        isVerified: false,
    });

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const doctor = await partnerService.getDoctor(id);
                setFormData({
                    name: doctor.name || '',
                    specialty: doctor.specialty || 'Tim mạch',
                    hospital: doctor.hospital || '',
                    phone: doctor.phone || '',
                    email: doctor.email || '',
                    description: doctor.description || '',
                    isVerified: doctor.isVerified || false,
                });
            } catch (error) {
                console.error('Failed to fetch doctor', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await partnerService.updateDoctor(id, formData);
            alert('Cập nhật bác sĩ thành công!');
            router.push('/admin/partners/doctors');
        } catch (error: any) {
            alert('Lỗi: ' + (error.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/partners/doctors" className="text-gray-600 hover:text-gray-900">
                    <i className="fi flaticon-arrow-left text-xl"></i>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sửa thông tin bác sĩ</h1>
                    <p className="text-gray-500 mt-1">Cập nhật thông tin bác sĩ</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Thông tin cơ bản</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Họ tên *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chuyên khoa *</label>
                                <select
                                    value={formData.specialty}
                                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white"
                                >
                                    <option>Tim mạch</option>
                                    <option>Nhi khoa</option>
                                    <option>Tiêu hóa</option>
                                    <option>Da liễu</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Bệnh viện *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.hospital}
                                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại *</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả / Giới thiệu</label>
                                <textarea
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Cài đặt</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái xác thực</label>
                                <select
                                    value={formData.isVerified ? 'verified' : 'unverified'}
                                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.value === 'verified' })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white"
                                >
                                    <option value="verified">Đã xác thực</option>
                                    <option value="unverified">Chưa xác thực</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-gray-200 space-y-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark disabled:opacity-50"
                                >
                                    {submitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                                </button>
                                <Link
                                    href="/admin/partners/doctors"
                                    className="block w-full text-center border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50"
                                >
                                    Hủy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
