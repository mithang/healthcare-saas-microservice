'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Reset password for:', email);
        setSubmitted(true);
    };

    return (
        <div className="auth-page">
            <div className="auth-page__container">
                <div className="auth-page__header">
                    <h2>Quên mật khẩu</h2>
                    <p>Nhập email của bạn để nhận link đặt lại mật khẩu</p>
                </div>

                <div className="auth-page__form-wrapper">
                    {!submitted ? (
                        <form className="auth-page__form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary auth-page__submit">
                                Gửi link đặt lại mật khẩu
                            </button>

                            <div className="auth-page__back-link">
                                <Link href="/shop/login">Quay lại đăng nhập</Link>
                            </div>
                        </form>
                    ) : (
                        <div className="auth-page__success">
                            <h3>Kiểm tra email của bạn</h3>
                            <p>Chúng tôi đã gửi link đặt lại mật khẩu đến {email}</p>
                            <Link href="/shop/login" className="btn btn-primary">
                                Quay lại đăng nhập
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
