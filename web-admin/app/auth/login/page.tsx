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
                initialValues={{
                    remember: true,
                    email: '',
                    password: ''
                }}
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Email"
                        className="h-10 bg-white border-gray-300 text-gray-900 placeholder-gray-400 hover:border-blue-400 focus:border-blue-500 hover:bg-white focus:bg-white"
                        style={{ color: '#000' }}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Mật khẩu"
                        className="h-10 bg-white border-gray-300 text-gray-900 placeholder-gray-400 hover:border-blue-400 focus:border-blue-500 hover:bg-white focus:bg-white"
                        style={{ color: '#000' }}
                    />
                </Form.Item>
                <div className="flex justify-between items-center mb-6">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="text-white/80 hover:text-white">Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>
                    <Link href="/auth/forgot-password" className="text-teal-400 hover:text-teal-300 text-sm font-medium">
                        Quên mật khẩu?
                    </Link>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold border-none hover:from-blue-400 hover:to-teal-400 shadow-lg"
                    >
                        ĐĂNG NHẬP
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-4">
                <span className="text-white/70">Chưa có tài khoản? </span>
                <Link href="/auth/register" className="text-teal-400 font-bold hover:text-teal-300 hover:underline">
                    Đăng ký ngay
                </Link>
            </div>
        </div>
    );
}
