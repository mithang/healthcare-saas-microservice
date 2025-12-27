'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [showPassword, setShowPassword] = useState(false);
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                console.log('Form submitted:', formData);
            } catch (error) {
                console.error('Login error:', error);
                setErrors({
                    submit: 'Email hoặc mật khẩu không chính xác'
                });
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page__container">
                <div className="auth-page__header">
                    <h2>Đăng nhập</h2>
                    <p>
                        Hoặc{' '}
                        <Link href="/shop/register">đăng ký tài khoản mới</Link>
                    </p>
                </div>

                <div className="auth-page__form-wrapper">
                    <form className="auth-page__form" onSubmit={handleSubmit}>
                        {errors.submit && (
                            <div className="auth-page__error-alert">
                                {errors.submit}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                            {errors.email && (
                                <p className="form-error">{errors.email}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <div className="auth-page__password-wrapper">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
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
                            {errors.password && (
                                <p className="form-error">{errors.password}</p>
                            )}
                        </div>

                        <div className="auth-page__options">
                            <div className="auth-page__remember">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
                            </div>

                            <Link href="/shop/forgot-password" className="auth-page__forgot">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <button type="submit" className="btn btn-primary auth-page__submit">
                            Đăng nhập
                        </button>
                    </form>

                    <div className="auth-page__social">
                        <div className="auth-page__social-divider">
                            <span>Hoặc đăng nhập với</span>
                        </div>

                        <div className="auth-page__social-buttons">
                            <button type="button" className="auth-page__social-btn">
                                Facebook
                            </button>
                            <button type="button" className="auth-page__social-btn">
                                Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
