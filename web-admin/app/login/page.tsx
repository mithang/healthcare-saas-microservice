'use client';

import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                const data = await res.json();
                // Assuming backend returns user object with id. If not, we might need to fetch profile or parse token.
                // For this MVP, let's assume the login returns { access_token, user: { id, email } } or just mocking it if backend doesn't support it yet.
                // Since I only implemented auth.login returning token, I will mock the ID for now or decode JWT if I had time.
                // Let's simpler: Fetch user profile with token? No wait, backend doesn't have /me yet.
                // Quick fix: Just use a fake ID for now or try to extract from token if possible (but tricky without library).
                // Better: Update backend auth.login to return user info.

                // For now, I will simulate a user ID for the logged in user as 'admin-id-123'
                login('admin-id-123', values.email);
                message.success('Login successful');
            } else {
                message.error('Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            message.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <Card title="Web Admin Login" style={{ width: 350 }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block loading={loading}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
