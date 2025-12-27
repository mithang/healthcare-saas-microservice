'use client';

import React from 'react';
import Image from 'next/image';
import { Chat, User } from '../types';
import { formatMessageTime } from '../utils/chatUtils';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  currentUser: User;
  participants: { [chatId: string]: User[] };
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onChatSelect,
  currentUser,
  participants
}) => {
  const getChatName = (chat: Chat): string => {
    const chatParticipants = participants[chat?.id] || [];
    // Assuming group chat if there are more than 2 participants
    if (chatParticipants.length > 2) {
      return chatParticipants.map(p => p.name).join(', ');
    }
    const otherUser = chatParticipants.find(p => p.id !== currentUser.id);
    return otherUser?.name || 'Người dùng không xác định';
  };

  const getAvatarUrl = (chat: Chat): string => {
    const chatParticipants = participants[chat?.id] || [];
    // Assuming group chat if there are more than 2 participants
    if (chatParticipants.length > 2) {
      return '/assets/group-avatar.png';
    }
    const otherUser = chatParticipants.find(p => p.id !== currentUser.id);
    return otherUser?.avatar || '/assets/default-avatar.png';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Tin nhắn</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-gray-100' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="relative">
              <Image
                src={getAvatarUrl(chat)}
                alt="Avatar"
                width={48}
                height={48}
                className="rounded-full"
              />
              {chat.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{getChatName(chat)}</h3>
                {chat.lastMessage && (
                  <span className="text-sm text-gray-500">
                    {formatMessageTime(new Date(chat.lastMessage.timestamp))}
                  </span>
                )}
              </div>
              {chat.lastMessage && (
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;