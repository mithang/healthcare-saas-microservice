'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Typography, Card, Space, Button, Input, Tag, Avatar, Row, Col, List, Badge, message, Spin, Divider, Switch, Tooltip } from 'antd';
import { VideoCameraOutlined, SendOutlined, UserOutlined, ClockCircleOutlined, CopyOutlined, EyeInvisibleOutlined, EyeOutlined, PlayCircleOutlined, StopOutlined } from '@ant-design/icons';
import liveService, { Livestream, LiveChatMessage } from '@/services/live.service';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function LivePage() {
    const [config, setConfig] = useState<Livestream | null>(null);
    const [messages, setMessages] = useState<LiveChatMessage[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [showKey, setShowKey] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await liveService.getLiveConfig();
            if (data) {
                setConfig(data);
                setIsStreaming(data.isStreaming);
                fetchMessages(data.id);
            }
        } catch (error) {
            console.error('Failed to fetch live config:', error);
            // Fallback mock
            setConfig({
                id: 1,
                title: 'Hội thảo: Sức khỏe cộng đồng 2024',
                description: 'Ứng dụng công nghệ trong việc chăm sóc sức khỏe cộng đồng và quản lý bệnh án điện tử.',
                serverUrl: 'rtmp://live.healthsaas.com/stream',
                streamKey: 'live_552631_abcdef123456',
                isStreaming: false
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (id: number) => {
        try {
            const msgs = await liveService.getLiveMessages(id);
            setMessages(msgs);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            setMessages([
                { id: 1, userName: 'Nguyễn Văn A', content: 'Chào bác sĩ, cho em hỏi về...', userRole: 'User' },
                { id: 2, userName: 'Admin', content: 'Chào bạn, bác sĩ sẽ trả lời ngay!', userRole: 'Moderator' }
            ]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleStreaming = async () => {
        if (!config) return;
        try {
            const updated = await liveService.updateLiveConfig(config.id, { isStreaming: !isStreaming });
            setIsStreaming(updated.isStreaming);
            setConfig(updated);
            message.success(updated.isStreaming ? 'Đã bắt đầu phát trực tiếp' : 'Đã kết thúc phát trực tiếp');
        } catch (error) {
            message.error('Lỗi khi cập nhật trạng thái livestream');
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        message.success('Đã sao chép vào bộ nhớ tạm');
    };

    const handleSendMessage = async () => {
        if (!config || !newMessage.trim()) return;
        try {
            await liveService.sendLiveMessage(config.id, {
                userName: 'Admin',
                content: newMessage,
                userRole: 'Moderator'
            });
            setNewMessage('');
            fetchMessages(config.id);
        } catch (error) {
            message.error('Lỗi khi gửi tin nhắn');
        }
    };

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}><Spin size="large" /></div>;

    return (
        <div style={{ padding: '0px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Livestream</Title>
                    <Text type="secondary">Cấu hình và điều hành các buổi phát trực tiếp trên hệ thống</Text>
                </div>
                <Space>
                    <Tag color={isStreaming ? 'error' : 'default'} style={{ padding: '4px 12px', borderRadius: '16px' }}>
                        {isStreaming ? 'ĐANG PHÁT' : 'NGOẠI TUYẾN'}
                    </Tag>
                    <Button
                        type={isStreaming ? 'default' : 'primary'}
                        danger={!isStreaming}
                        size="large"
                        icon={isStreaming ? <StopOutlined /> : <PlayCircleOutlined />}
                        onClick={toggleStreaming}
                    >
                        {isStreaming ? 'Kết thúc phát' : 'Bắt đầu phát'}
                    </Button>
                </Space>
            </div>

            <Row gutter={24}>
                <Col span={16}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Card title="Thông tin buổi phát">
                            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                <div>
                                    <Text strong>Tiêu đề</Text>
                                    <Input defaultValue={config?.title} style={{ marginTop: '8px' }} />
                                </div>
                                <div>
                                    <Text strong>Mô tả</Text>
                                    <TextArea rows={4} defaultValue={config?.description} style={{ marginTop: '8px' }} />
                                </div>
                            </Space>
                        </Card>

                        <Card title="Cấu hình truyền dẫn (Encoder Setting)">
                            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                <div>
                                    <Text strong>Server URL</Text>
                                    <Input
                                        value={config?.serverUrl}
                                        disabled
                                        suffix={
                                            <Tooltip title="Sao chép">
                                                <CopyOutlined style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => handleCopy(config?.serverUrl || '')} />
                                            </Tooltip>
                                        }
                                        style={{ marginTop: '8px' }}
                                    />
                                </div>
                                <div>
                                    <Text strong>Stream Key</Text>
                                    <Input.Password
                                        value={config?.streamKey}
                                        disabled
                                        visibilityToggle={{ visible: showKey, onVisibleChange: setShowKey }}
                                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                        suffix={
                                            <Tooltip title="Sao chép">
                                                <CopyOutlined style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => handleCopy(config?.streamKey || '')} />
                                            </Tooltip>
                                        }
                                        style={{ marginTop: '8px' }}
                                    />
                                    <Text type="warning" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
                                        Lưu ý: Không chia sẻ mã khóa luồng cho bất kỳ ai.
                                    </Text>
                                </div>
                            </Space>
                        </Card>
                    </Space>
                </Col>

                <Col span={8}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Card
                            title="Xem trước (Preview)"
                            bodyStyle={{ padding: 0 }}
                            cover={
                                <div style={{ height: '200px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                    {isStreaming ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <PlayCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f', display: 'block', marginBottom: '8px' }} />
                                            <Text style={{ color: '#fff' }}>LIVE PREVIEW</Text>
                                        </div>
                                    ) : (
                                        <Text style={{ color: '#666' }}>CHƯA CÓ TÍN HIỆU</Text>
                                    )}
                                </div>
                            }
                        />

                        <Card title="Cửa sổ Chat" bodyStyle={{ padding: 0 }} style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                                <List
                                    dataSource={messages}
                                    renderItem={(item) => (
                                        <div style={{ marginBottom: '12px' }}>
                                            <Space align="start">
                                                <Text strong style={{ color: item.userRole === 'Moderator' ? '#ff4d4f' : '#1890ff' }}>{item.userName}:</Text>
                                                <Text>{item.content}</Text>
                                            </Space>
                                        </div>
                                    )}
                                />
                                <div ref={chatEndRef} />
                            </div>
                            <Divider style={{ margin: 0 }} />
                            <div style={{ padding: '12px' }}>
                                <Input
                                    placeholder="Gửi tin nhắn..."
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    onPressEnter={handleSendMessage}
                                    suffix={<SendOutlined style={{ color: '#1890ff', cursor: 'pointer' }} onClick={handleSendMessage} />}
                                />
                            </div>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}
