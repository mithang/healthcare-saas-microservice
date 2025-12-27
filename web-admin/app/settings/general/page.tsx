'use client';

import React, { useState } from 'react';
import { Typography, Card, Space, Button, Input, Form, Select, Row, Col, Breadcrumb, message, Divider, Switch } from 'antd';
import { SettingOutlined, SaveOutlined, GlobalOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function GeneralSettingsPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        console.log('Success:', values);
        setTimeout(() => {
            message.success('Cập nhật cài đặt hệ thống thành công');
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Cấu hình</Breadcrumb.Item>
                <Breadcrumb.Item>Cài đặt chung</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Cài đặt chung</Title>
                    <Text type="secondary">Cấu hình các thông tin cơ bản và tham số vận hành của hệ thống</Text>
                </div>
                <Button type="primary" icon={<SaveOutlined />} size="large" onClick={() => form.submit()} loading={loading}>
                    Lưu thay đổi
                </Button>
            </div>

            <Row gutter={24}>
                <Col span={16}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            siteName: 'Healthcare SaaS Platform',
                            siteDescription: 'Nền tảng quản lý y tế và chăm sóc sức khỏe toàn diện cho bệnh viện và phòng khám.',
                            contactEmail: 'contact@healthcare-global.vn',
                            contactPhone: '1900 8888',
                            address: 'Tầng 15, Tòa nhà Innovation, Công viên phần mềm Quang Trung, Quận 12, TP. Hồ Chí Minh',
                            timezone: 'Asia/Ho_Chi_Minh',
                            language: 'vi',
                            maintenanceMode: false
                        }}
                    >
                        <Card title="Thông tin cơ bản" style={{ marginBottom: '24px' }}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item name="siteName" label="Tên nền tảng" rules={[{ required: true }]}>
                                        <Input prefix={<GlobalOutlined />} placeholder="Nhập tên website/ứng dụng" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="siteDescription" label="Mô tả hệ thống">
                                        <TextArea rows={3} placeholder="Mô tả ngắn gọn về nền tảng" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Thông tin liên hệ" style={{ marginBottom: '24px' }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="contactEmail" label="Email hỗ trợ" rules={[{ required: true, type: 'email' }]}>
                                        <Input prefix={<MailOutlined />} placeholder="email@domain.com" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="contactPhone" label="Hotline" rules={[{ required: true }]}>
                                        <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại hỗ trợ" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="address" label="Địa chỉ trụ sở">
                                        <Input prefix={<HomeOutlined />} placeholder="Địa chỉ văn phòng chính" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Vùng & Ngôn ngữ">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="timezone" label="Múi giờ hệ thống" rules={[{ required: true }]}>
                                        <Select>
                                            <Option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+07:00)</Option>
                                            <Option value="Asia/Singapore">Singapore (GMT+08:00)</Option>
                                            <Option value="UTC">Giờ quốc tế (UTC)</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="language" label="Ngôn ngữ hiển thị" rules={[{ required: true }]}>
                                        <Select>
                                            <Option value="vi">Tiếng Việt</Option>
                                            <Option value="en">English (US)</Option>
                                            <Option value="fr">Français</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Form>
                </Col>

                <Col span={8}>
                    <Card title="Trạng thái hệ thống" style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <Text strong>Chế độ bảo trì</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: '12px' }}>Tạm dừng truy cập cho người dùng ngoài</Text>
                            </div>
                            <Form.Item name="maintenanceMode" valuePropName="checked" noStyle>
                                <Switch />
                            </Form.Item>
                        </div>
                        <Divider />
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button block>Gửi bản tin hệ thống</Button>
                            <Button block type="dashed" danger>Tái khởi động Service</Button>
                        </Space>
                    </Card>

                    <Card title="Phiên bản phần mềm">
                        <Space direction="vertical">
                            <div>
                                <Text type="secondary">App Version:</Text>
                                <Text strong style={{ marginLeft: '8px' }}>v2.4.0-stable</Text>
                            </div>
                            <div>
                                <Text type="secondary">Build Architecture:</Text>
                                <Text strong style={{ marginLeft: '8px' }}>x64_linux_node20</Text>
                            </div>
                            <div>
                                <Text type="secondary">Last Update:</Text>
                                <Text strong style={{ marginLeft: '8px' }}>20/12/2024</Text>
                            </div>
                            <Button type="link" style={{ padding: 0 }}>Xem Change Log</Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
