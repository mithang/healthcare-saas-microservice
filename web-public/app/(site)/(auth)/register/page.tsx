'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform -rotate-3 hover:rotate-0 transition-transform">
                        <i className="fi flaticon-add-user text-3xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Tạo tài khoản mới
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Tham gia cộng đồng chăm sóc sức khỏe ngay hôm nay
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fi flaticon-user text-gray-400"></i>
                            </div>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                placeholder="Nguyễn Văn A"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fi flaticon-email text-gray-400"></i>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                    placeholder="name@mail.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fi flaticon-phone-call text-gray-400"></i>
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                    placeholder="0912..."
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fi flaticon-locked text-gray-400"></i>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                placeholder="Ít nhất 6 ký tự"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                            >
                                {showPassword ? (
                                    <i className="fi flaticon-visibility"></i>
                                ) : (
                                    <i className="fi flaticon-visibility-1"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fi flaticon-locked text-gray-400"></i>
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                placeholder="Nhập lại mật khẩu"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <i className="fi flaticon-visibility"></i>
                                ) : (
                                    <i className="fi flaticon-visibility-1"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="agree-terms"
                            name="agreeToTerms"
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                            Tôi đồng ý với <Link href="/terms" className="text-green-600 hover:underline">Điều khoản sử dụng</Link> và <Link href="/privacy" className="text-green-600 hover:underline">Chính sách bảo mật</Link>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Đăng ký tài khoản
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Hoặc đăng ký với</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button
                                type='button'
                                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                                Google
                            </button>
                            <button
                                type='button'
                                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
                                Facebook
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Đã có tài khoản?{' '}
                        <Link href="/login" className="font-bold text-green-600 hover:text-green-500 transition-colors">
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
