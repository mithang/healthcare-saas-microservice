'use client';

import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const onFinish = (values: any) => {
        message.success('Email khôi phục mật khẩu đã được gửi!');
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-white mb-2 text-center">Quên mật khẩu?</h2>
            <p className="text-white/70 text-center mb-6 text-sm">Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>

            <Form
                name="forgot_password_form"
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                >
                    <Input
                        prefix={<MailOutlined className="text-white/50" />}
                        placeholder="Email đăng ký"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full h-12 bg-white text-purple-600 font-bold border-none hover:bg-gray-100 hover:text-purple-700 shadow-lg"
                    >
                        GỬI YÊU CẦU
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-4">
                <Link href="/auth/login" className="text-white/80 hover:text-white transition-colors">
                    &larr; Quay lại đăng nhập
                </Link>
            </div>
        </div>
    );
}
