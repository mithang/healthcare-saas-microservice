'use client';

import { useState } from 'react';
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
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="auth-page">
            <div className="auth-page__container">
                <div className="auth-page__header">
                    <h2>Đăng ký tài khoản</h2>
                    <p>
                        Hoặc{' '}
                        <Link href="/shop/login">đăng nhập nếu bạn đã có tài khoản</Link>
                    </p>
                </div>

                <div className="auth-page__form-wrapper">
                    <form className="auth-page__form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Họ và tên</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <div className="auth-page__password-wrapper">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="auth-page__password-toggle"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <div className="auth-page__password-wrapper">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="auth-page__password-toggle"
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <div className="auth-page__terms">
                            <input
                                id="agreeToTerms"
                                name="agreeToTerms"
                                type="checkbox"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="agreeToTerms">
                                Tôi đồng ý với{' '}
                                <Link href="/terms">điều khoản sử dụng</Link>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary auth-page__submit">
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
