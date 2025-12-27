'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginPage() {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('admin@healthcare.vn');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại');
        }
    };

    // Quick login for testing
    const quickLogin = (testEmail: string, testPassword: string) => {
        setEmail(testEmail);
        setPassword(testPassword);
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
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Chào mừng trở lại!
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Đăng nhập để tiếp tục trải nghiệm hệ sinh thái
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </div>

                    {/* Quick Login for Testing */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center mb-4">Đăng nhập nhanh (Test):</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => quickLogin('citizen@test.com', 'password123')}
                                className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition border border-green-200"
                            >
                                👤 Người dân
                            </button>
                            <button
                                type="button"
                                onClick={() => quickLogin('doctor@hospital.com', 'securePassword123')}
                                className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition border border-blue-200"
                            >
                                👨‍⚕️ Bác sĩ
                            </button>
                            <button
                                type="button"
                                onClick={() => quickLogin('hospital@test.com', 'password123')}
                                className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition border border-purple-200"
                            >
                                🏥 Bệnh viện
                            </button>
                            <button
                                type="button"
                                onClick={() => quickLogin('clinic@test.com', 'password123')}
                                className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition border border-orange-200"
                            >
                                🏪 Phòng khám
                            </button>
                            <button
                                type="button"
                                onClick={() => quickLogin('super_admin@test.com', 'password123')}
                                className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition border border-red-200 col-span-2"
                            >
                                ⚡ Super Admin
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        <Link href="/register" className="font-bold text-green-600 hover:text-green-500 transition-colors">
                            Đăng ký ngay
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
