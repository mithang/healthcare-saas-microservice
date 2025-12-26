'use client';

import React from 'react';
import { Button, Checkbox, Form, Input, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                message.success('Login successful');
                console.log('Login success:', data);
                // Store token if needed, e.g., localStorage.setItem('token', data.accessToken);
                router.push('/users');
            } else {
                const error = await response.json();
                message.error(error.message || 'Login failed');
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
};

export default App;
