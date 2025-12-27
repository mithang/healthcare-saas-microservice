'use client';

import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function RegisterPage() {
    const onFinish = (values: any) => {
        message.info('Chức năng đăng ký đang được phát triển.');
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">Đăng ký tài khoản</h2>
            <Form
                name="register_form"
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="text-white/50" />}
                        placeholder="Họ và tên"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                >
                    <Input
                        prefix={<MailOutlined className="text-white/50" />}
                        placeholder="Email"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-white/50" />}
                        placeholder="Mật khẩu"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-white/50" />}
                        placeholder="Xác nhận mật khẩu"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full h-12 bg-white text-purple-600 font-bold border-none hover:bg-gray-100 hover:text-purple-700 shadow-lg"
                    >
                        ĐĂNG KÝ
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-4">
                <span className="text-white/70">Đã có tài khoản? </span>
                <Link href="/auth/login" className="text-white font-bold hover:underline">
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
}
