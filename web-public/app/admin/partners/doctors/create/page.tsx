"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateDoctor() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        specialty: 'Tim mạch',
        hospital: '',
        phone: '',
        email: '',
        experience: '',
        bio: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Bác sĩ đã được thêm thành công!');
        router.push('/admin/users/doctors');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/users/doctors" className="text-gray-600 hover:text-gray-900">
                    <i className="fi flaticon-arrow-left text-xl"></i>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Thêm bác sĩ mới</h1>
                    <p className="text-gray-500 mt-1">Nhập thông tin bác sĩ</p>
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
                                    placeholder="VD: BS. Nguyễn Văn A"
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
                                    placeholder="VD: BV Chợ Rẫy"
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
                                    placeholder="090..."
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
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Kinh nghiệm (năm)</label>
                                <input
                                    type="number"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                                    placeholder="VD: 10"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Giới thiệu</label>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                                    placeholder="Mô tả ngắn về bác sĩ..."
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
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Tạm ngưng</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-gray-200 space-y-2">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark"
                                >
                                    Thêm bác sĩ
                                </button>
                                <Link
                                    href="/admin/users/doctors"
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
