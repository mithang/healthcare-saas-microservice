"use client";
import React, { useState } from 'react';
import { ChatSession, Message, MOCK_CHATS, MOCK_MESSAGES } from '@/types/chat';

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState<ChatSession | null>(MOCK_CHATS[0]);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        const newMsg: Message = {
            id: Date.now().toString(),
            senderId: 'p1', // Current user (pharmacist)
            content: messageInput,
            type: 'text',
            timestamp: new Date().toISOString()
        };
        setMessages([...messages, newMsg]);
        setMessageInput('');
    };

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6">
            {/* Chat List */}
            <div className="w-1/3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Tư vấn trực tuyến</h2>
                    <input type="text" placeholder="Tìm kiếm bệnh nhân..." className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MOCK_CHATS.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat?.id === chat.id ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center relative">
                                    <span className="text-xl">👤</span>
                                    {chat.unreadCount > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-gray-900 truncate">{chat.patientSnippet?.name}</h3>
                                        <span className="text-xs text-gray-500">
                                            {new Date(chat.updatedAt).getHours()}:{new Date(chat.updatedAt).getMinutes()}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                        {chat.lastMessage?.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-lg">👤</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{selectedChat.patientSnippet?.name}</h3>
                                    <p className="text-xs text-gray-500">
                                        {selectedChat.patientSnippet?.age} tuổi • {selectedChat.patientSnippet?.gender}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-100">
                                    📹 Video Call
                                </button>
                                <button className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-100">
                                    ℹ️ Hồ sơ
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map(msg => {
                                const isMe = msg.senderId === 'p1';
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none'
                                            }`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex gap-3">
                                <button className="p-3 text-gray-400 hover:text-gray-600">
                                    📎
                                </button>
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark font-bold"
                                >
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Chọn một cuộc hội thoại để bắt đầu
                    </div>
                )}
            </div>
        </div>
    );
}
