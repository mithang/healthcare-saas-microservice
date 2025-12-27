'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '../types';

interface ChatHeaderProps {
  participants: User[];
  onlineUsers?: string[];
  currentUserId: string;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  onViewProfile?: (userId: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  participants,
  onlineUsers = [],
  currentUserId,
  onVideoCall,
  onVoiceCall,
  onViewProfile
}) => {
  const otherParticipants = participants.filter(p => p.id !== currentUserId);
  const isGroup = otherParticipants.length > 1;

  const getStatusText = () => {
    if (isGroup) {
      const onlineCount = otherParticipants.filter(p => onlineUsers.includes(p.id)).length;
      return `${onlineCount} thành viên đang hoạt động`;
    } else {
      const otherUser = otherParticipants[0];
      return onlineUsers.includes(otherUser.id) ? 'Đang hoạt động' : 'Không hoạt động';
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center flex-1">
        <div className="relative">
          {isGroup ? (
            <div className="flex -space-x-2">
              {otherParticipants.slice(0, 3).map((participant) => (
                <Image
                  key={participant.id}
                  src={participant.avatar || '/assets/default-avatar.png'}
                  alt={participant.name}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              ))}
              {otherParticipants.length > 3 && (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  +{otherParticipants.length - 3}
                </div>
              )}
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => onViewProfile?.(otherParticipants[0].id)}
            >
              <Image
                src={otherParticipants[0].avatar || '/assets/default-avatar.png'}
                alt={otherParticipants[0].name}
                width={40}
                height={40}
                className="rounded-full"
              />
              {onlineUsers.includes(otherParticipants[0].id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
          )}
        </div>

        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">
            {isGroup
              ? otherParticipants.map(p => p.name).join(', ')
              : otherParticipants[0].name
            }
          </h2>
          <p className="text-sm text-gray-500">{getStatusText()}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {!isGroup && (
          <>
            <button
              onClick={onVoiceCall}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              title="Gọi thoại"
            >
              📞
            </button>
            <button
              onClick={onVideoCall}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              title="Gọi video"
            >
              🎥
            </button>
          </>
        )}
        <button
          onClick={() => onViewProfile?.(isGroup ? '' : otherParticipants[0].id)}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          title="Xem thông tin"
        >
          ℹ️
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;