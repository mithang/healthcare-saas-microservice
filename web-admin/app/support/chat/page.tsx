'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Button, Input, Tag, Avatar, Row, Col, List, Badge, message, Spin, Divider } from 'antd';
import { CustomerServiceOutlined, SendOutlined, UserOutlined, ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';
import supportService, { SupportChat, SupportMessage } from '@/services/support.service';

const { Title, Text } = Typography;

export default function SupportChatPage() {
    const [chats, setChats] = useState<SupportChat[]>([]);
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [selectedChat, setSelectedChat] = useState<SupportChat | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [msgLoading, setMsgLoading] = useState(false);

    const fetchChats = async () => {
        setLoading(true);
        try {
            const data = await supportService.getSupportChats();
            setChats(data);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
            // Fallback mock data if API fails
            setChats([
                { id: 1, userName: 'Nguyễn Văn A', lastMsg: 'Tôi cần hỗ trợ về đơn hàng...', unread: 2, status: 'online' },
                { id: 2, userName: 'Trần Thị B', lastMsg: 'Cảm ơn bạn nhé!', unread: 0, status: 'offline' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (chatId: number) => {
        setMsgLoading(true);
        try {
            const data = await supportService.getChatMessages(chatId);
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            setMessages([
                { id: 1, sender: 'user', content: 'Chào admin, mình hỏi chút', createdAt: new Date().toISOString() },
                { id: 2, sender: 'admin', content: 'Chào bạn, mình giúp gì được ạ?', createdAt: new Date().toISOString() }
            ]);
        } finally {
            setMsgLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    const handleSelectChat = (chat: SupportChat) => {
        setSelectedChat(chat);
        fetchMessages(chat.id);
    };

    const handleSendMessage = async () => {
        if (!selectedChat || !newMessage.trim()) return;

        try {
            await supportService.sendSupportMessage(selectedChat.id, 'admin', newMessage);
            setMessages([...messages, { id: Date.now(), sender: 'admin', content: newMessage, createdAt: new Date().toISOString() }]);
            setNewMessage('');
        } catch (error) {
            message.error('Lỗi khi gửi tin nhắn');
        }
    };

    return (
        <div style={{ padding: '0px', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Hỗ trợ trực tuyến</Title>
                <Text type="secondary">Tư vấn và giải đáp thắc mắc của khách hàng qua chat</Text>
            </div>

            <Row gutter={24} style={{ flex: 1, overflow: 'hidden' }}>
                <Col span={8} style={{ height: '100%' }}>
                    <Card size="small" title="Hội thoại" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <Input
                            placeholder="Tìm kiếm khách hàng..."
                            prefix={<SearchOutlined />}
                            style={{ marginBottom: '16px' }}
                        />
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <List
                                loading={loading}
                                dataSource={chats}
                                renderItem={(item) => (
                                    <List.Item
                                        onClick={() => handleSelectChat(item)}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '12px',
                                            background: selectedChat?.id === item.id ? '#e6f7ff' : 'transparent',
                                            borderRadius: '8px',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Badge dot color={item.status === 'online' ? 'green' : 'gray'}>
                                                    <Avatar icon={<UserOutlined />} />
                                                </Badge>
                                            }
                                            title={<Text strong>{item.userName}</Text>}
                                            description={
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Text type="secondary" style={{ maxWidth: '140px' }} ellipsis>{item.lastMsg}</Text>
                                                    {item.unread > 0 && <Badge count={item.unread} size="small" />}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Card>
                </Col>
                <Col span={16} style={{ height: '100%' }}>
                    {selectedChat ? (
                        <Card size="small"
                            title={
                                <Space>
                                    <Avatar icon={<UserOutlined />} />
                                    <div>
                                        <Text strong>{selectedChat.userName}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: '11px' }}>{selectedChat.status === 'online' ? 'Đang hoạt động' : 'Ngoại tuyến'}</Text>
                                    </div>
                                </Space>
                            }
                            extra={<Button icon={<ClockCircleOutlined />}>Lịch sử</Button>}
                            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        >
                            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                                <List
                                    loading={msgLoading}
                                    dataSource={messages}
                                    renderItem={(msg) => (
                                        <div style={{ textAlign: msg.sender === 'admin' ? 'right' : 'left', marginBottom: '16px' }}>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '8px 16px',
                                                borderRadius: '16px',
                                                background: msg.sender === 'admin' ? '#1890ff' : '#f0f0f0',
                                                color: msg.sender === 'admin' ? '#fff' : '#000',
                                                maxWidth: '70%'
                                            }}>
                                                {msg.content}
                                            </div>
                                            <div style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>
                                                {new Date(msg.createdAt).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <Divider style={{ margin: '8px 0' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Input
                                    placeholder="Nhập nội dung tin nhắn..."
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    onPressEnter={handleSendMessage}
                                />
                                <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} disabled={!newMessage.trim()}>
                                    Gửi
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <Card style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <CustomerServiceOutlined style={{ fontSize: '64px', color: '#f0f0f0', marginBottom: '16px' }} />
                                <br />
                                <Text type="secondary">Chọn một hội thoại để bắt đầu hỗ trợ</Text>
                            </div>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
}
