"use client";
import React, { useState } from 'react';

export default function SupportChat() {
    const [selectedChat, setSelectedChat] = useState<number | null>(1);
    const [message, setMessage] = useState('');

    const chats = [
        { id: 1, user: 'Nguyễn Văn A', lastMsg: 'Cảm ơn bác sĩ!', time: '10:30', unread: 0, status: 'online' },
        { id: 2, user: 'Trần Thị B', lastMsg: 'Cho tôi hỏi lịch khám...', time: '09:15', unread: 2, status: 'offline' },
        { id: 3, user: 'Lê Văn C', lastMsg: 'Thuốc này uống sao ạ?', time: 'Yesterday', unread: 0, status: 'online' },
    ];

    const messages = [
        { id: 1, sender: 'user', content: 'Chào bác sĩ, tôi muốn hỏi về gói khám tổng quát.', time: '10:00' },
        { id: 2, sender: 'admin', content: 'Chào bạn, gói khám tổng quát bao gồm xét nghiệm máu, siêu âm và khám nội.', time: '10:05' },
        { id: 3, sender: 'user', content: 'Giá bao nhiêu vậy ạ?', time: '10:06' },
        { id: 4, sender: 'admin', content: 'Giá gói cơ bản là 2.500.000đ ạ.', time: '10:10' },
        { id: 5, sender: 'user', content: 'Cảm ơn bác sĩ!', time: '10:30' },
    ];

    return (
        <div className="h-[calc(100vh-120px)] flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <input type="text" placeholder="Tìm kiếm tin nhắn..." className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 ${selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                                    {chat.user.charAt(0)}
                                </div>
                                {chat.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900 truncate">{chat.user}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className={`text-sm truncate ${chat.unread > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>{chat.lastMsg}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">A</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Nguyễn Văn A</h3>
                                    <p className="text-xs text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Online</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600"><i className="fi flaticon-menu-dots"></i></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'admin' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-900 shadow-sm rounded-bl-none'}`}>
                                        <p>{msg.content}</p>
                                        <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"><i className="fi flaticon-clip"></i></button>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    onKeyDown={(e) => e.key === 'Enter' && setMessage('')}
                                />
                                <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200"><i className="fi flaticon-paper-plane"></i></button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <i className="fi flaticon-chat text-6xl mb-4"></i>
                        <p>Chọn một cuộc hội thoại để bắt đầu chat</p>
                    </div>
                )}
            </div>
        </div>
    );
}
