"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EventRegistrationPage() {
    const params = useParams<{ id: string }>();
    const [step, setStep] = useState(1); // 1: Form, 2: Success
    const [formData, setFormData] = useState({
        name: 'Nguyen Van Duoc',
        email: 'duocsy@example.com',
        phone: '0909123456',
        workplace: 'Nhà thuốc Long Châu',
        role: 'Dược sĩ'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setStep(2), 1000);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            {step === 1 ? (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Đăng ký tham dự</h1>
                        <p className="text-gray-500 mt-2">Hội thảo: Cập nhật điều trị Đái tháo đường 2024</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Đơn vị công tác</label>
                            <input
                                type="text"
                                required
                                value={formData.workplace}
                                onChange={e => setFormData({ ...formData, workplace: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition"
                            />
                        </div>

                        <button type="submit" className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-1 mt-4">
                            Xác nhận đăng ký
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl">
                        <i className="fi flaticon-checked"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h1>
                    <p className="text-gray-500 mb-8">Vui lòng lưu lại mã QR bên dưới để Check-in tại sự kiện.</p>

                    <div className="bg-white p-4 border-2 border-dashed border-gray-300 rounded-2xl inline-block mb-8">
                        {/* Mock QR Code */}
                        <div className="w-48 h-48 bg-gray-900 flex items-center justify-center text-white">
                            [QR CODE MOCK]
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">
                            <i className="fi flaticon-download mr-2"></i> Tải vé
                        </button>
                        <Link href={`/events/${params.id}/live`}>
                            <button className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark shadow-lg">
                                Vào phòng chờ
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
