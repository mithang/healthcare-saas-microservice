'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Forgot password submitted:', email);
        setIsSubmitted(true);
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
                    <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3 hover:rotate-6 transition-transform">
                        <i className="fi flaticon-unlock text-3xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Quên mật khẩu?
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Đừng lo lắng! Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu.
                    </p>
                </div>

                {!isSubmitted ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email đăng ký</label>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Gửi yêu cầu
                            </button>
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Quay lại{' '}
                            <Link href="/login" className="font-bold text-green-600 hover:text-green-500 transition-colors">
                                Đăng nhập
                            </Link>
                        </p>
                    </form>
                ) : (
                    <div className="mt-8 text-center">
                        <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 mb-6">
                            <p className="text-sm font-medium">Link khôi phục mật khẩu đã được gửi đến email <strong>{email}</strong></p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Vui lòng kiểm tra hộp thư đến (và mục spam) của bạn.
                        </p>
                        <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                            <i className="fi flaticon-left-arrow mr-2 text-xs"></i> Quay lại đăng nhập
                        </Link>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="block w-full mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Thử lại với email khác
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
