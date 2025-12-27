'use client';

import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';

export default function VerifyPage() {
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        setTimeout(() => {
            message.success('Xác thực thành công!');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-white mb-2 text-center">Xác thực tài khoản</h2>
            <p className="text-white/70 text-center mb-6 text-sm">Nhập mã OTP 6 số đã được gửi đến email của bạn.</p>

            <Form
                name="verify_form"
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
                <div className="flex justify-center mb-6 gap-2">
                    <Form.Item
                        name="otp"
                        rules={[{ required: true, message: 'Nhập mã OTP', len: 6 }]}
                        className="m-0 w-full"
                    >
                        <Input
                            placeholder="Mã OTP"
                            className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 focus:bg-white/20 text-center tracking-[1em] font-mono text-lg"
                            maxLength={6}
                        />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-12 bg-white text-purple-600 font-bold border-none hover:bg-gray-100 hover:text-purple-700 shadow-lg"
                    >
                        XÁC NHẬN
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-4 text-white/70 text-sm">
                Chưa nhận được mã? <button className="text-white font-bold hover:underline bg-transparent border-none cursor-pointer">Gửi lại</button>
            </div>
            <div className="text-center mt-6">
                <Link href="/auth/login" className="text-white/80 hover:text-white transition-colors">
                    &larr; Quay lại đăng nhập
                </Link>
            </div>
        </div>
    );
}
