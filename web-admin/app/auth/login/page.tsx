'use client';

import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Simulate login or call API
            // For now, using the mock login function
            await login(values.email, values.password);
            message.success('Đăng nhập thành công');
        } catch (err: any) {
            message.error(err.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Form
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="text-white/50" />}
                        placeholder="Email"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20 hover:border-white/40 focus:border-white/60"
                        style={{ color: 'white' }}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-white/50" />}
                        placeholder="Mật khẩu"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20 hover:border-white/40 focus:border-white/60"
                        style={{ color: 'white' }}
                    />
                </Form.Item>
                <div className="flex justify-between items-center mb-6">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="text-white/80 hover:text-white">Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>
                    <Link href="/auth/forgot-password" className="text-white/80 hover:text-white text-sm font-medium">
                        Quên mật khẩu?
                    </Link>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-12 bg-white text-purple-600 font-bold border-none hover:bg-gray-100 hover:text-purple-700 shadow-lg"
                    >
                        ĐĂNG NHẬP
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-4">
                <span className="text-white/70">Chưa có tài khoản? </span>
                <Link href="/auth/register" className="text-white font-bold hover:underline">
                    Đăng ký ngay
                </Link>
            </div>
        </div>
    );
}
