'use client';

import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  // Mock current user
  const currentUser = {
    id: 'user1',
    name: 'Người dùng hiện tại',
    avatar: '/assets/default-avatar.png',
    status: 'online' as const
  };

  // Mock participants data
  const participants = {
    '1': [
      { id: 'user1', name: 'Người dùng hiện tại', avatar: '/assets/default-avatar.png', status: 'online' as const },
      { id: 'user2', name: 'Người dùng 2', avatar: '/assets/default-avatar.png', status: 'online' as const }
    ],
    '2': [
      { id: 'user1', name: 'Người dùng hiện tại', avatar: '/assets/default-avatar.png', status: 'online' as const },
      { id: 'user3', name: 'Người dùng 3', avatar: '/assets/default-avatar.png', status: 'offline' as const }
    ]
  };

  useEffect(() => {
    // TODO: Fetch chats from API
    const mockChats: Chat[] = [
      {
        id: '1',
        participants: ['user1', 'user2'],
        messages: [],
        unreadCount: 2
      },
      {
        id: '2',
        participants: ['user1', 'user3'],
        messages: [],
        unreadCount: 0
      }
    ];
    setChats(mockChats);
  }, []);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user1', // Current user ID
      content,
      timestamp: new Date()
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: newMessage
    };

    setSelectedChat(updatedChat);
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id ? updatedChat : chat
      )
    );

    // TODO: Send message to API
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          onChatSelect={handleChatSelect}
          currentUser={currentUser}
          participants={participants}
        />
      </div>
      <div className="w-2/3 bg-white">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            currentUserId={currentUser.id}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;