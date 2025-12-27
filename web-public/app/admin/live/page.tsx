"use client";

import React, { useState, useEffect, useRef } from 'react';
import liveService, { Livestream, LiveChatMessage } from '@/services/live.service';

export default function LivestreamAdminPage() {
    const [config, setConfig] = useState<Livestream | null>(null);
    const [messages, setMessages] = useState<LiveChatMessage[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [showKey, setShowKey] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        try {
            const data = await liveService.getLiveConfig();
            if (data) {
                setConfig(data);
                setIsStreaming(data.isStreaming);
                fetchMessages(data.id);
            }
        } catch (error) {
            console.error('Failed to fetch live config', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (id: number) => {
        try {
            const msgs = await liveService.getLiveMessages(id);
            setMessages(msgs);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            if (config) fetchMessages(config.id);
        }, 5000);
        return () => clearInterval(interval);
    }, [config?.id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleStreaming = async () => {
        if (!config) return;
        try {
            const updated = await liveService.updateLiveConfig(config.id, { isStreaming: !isStreaming });
            setIsStreaming(updated.isStreaming);
            setConfig(updated);
        } catch (error) {
            alert('Lỗi khi cập nhật trạng thái livestream');
        }
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
            alert('Lỗi khi gửi tin nhắn');
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-500 italic">Đang tải cấu hình livestream...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Phát trực tiếp (Livestream)</h1>
                    <p className="text-gray-500 text-sm mt-1">Cấu hình và quản lý các buổi hội thảo trực tuyến.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isStreaming ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-500'}`}>
                        <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-red-600' : 'bg-gray-400'}`}></div>
                        {isStreaming ? 'ĐANG PHÁT' : 'OFFLINE'}
                    </span>
                    <button
                        onClick={toggleStreaming}
                        className={`px-6 py-2 rounded-xl font-bold text-white shadow-lg transition ${isStreaming ? 'bg-gray-700 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                        {isStreaming ? 'Kết thúc' : 'Bắt đầu phát'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stream Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Thông tin buổi phát</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                                <input type="text" defaultValue={config?.title} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <textarea rows={3} defaultValue={config?.description || ''} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Stream Key Configuration */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Cấu hình Encoder</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">RTMP Server URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={config?.serverUrl} disabled className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500" />
                                    <button onClick={() => { navigator.clipboard.writeText(config?.serverUrl || ''); alert('Copied!'); }} className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">Copy</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stream Key</label>
                                <div className="flex gap-2">
                                    <input type={showKey ? "text" : "password"} value={config?.streamKey} disabled className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500" />
                                    <button onClick={() => setShowKey(!showKey)} className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">{showKey ? 'Ẩn' : 'Hiện'}</button>
                                    <button onClick={() => { navigator.clipboard.writeText(config?.streamKey || ''); alert('Copied!'); }} className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">Copy</button>
                                </div>
                                <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                                    <i className="fi flaticon-warning"></i> Không chia sẻ Stream Key này cho người khác.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Preview & Chat */}
                <div className="space-y-6">
                    <div className="bg-black rounded-2xl aspect-video flex items-center justify-center text-white/50 border border-gray-800 overflow-hidden relative">
                        {isStreaming ? (
                            <div className="text-center animate-pulse">
                                <i className="fi flaticon-play-button text-4xl mb-2 block"></i>
                                <span className="font-bold">Live Preview</span>
                            </div>
                        ) : (
                            <div className="text-center">
                                <i className="fi flaticon-video-camera text-4xl mb-2 block"></i>
                                <span className="font-bold">Waiting for signal...</span>
                            </div>
                        )}
                        {isStreaming && <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-[10px] font-bold text-white rounded">LIVE</div>}
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-[350px] flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2 flex justify-between">
                            Live Chat
                            <span className="text-[10px] text-gray-400 font-normal self-end">Sử dụng real-time</span>
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className="flex flex-col text-sm">
                                    <span className={`font-bold ${msg.userName === 'Admin' ? 'text-red-500' : 'text-blue-600'}`}>{msg.userName}:</span>
                                    <span className="text-gray-700 bg-gray-50 p-2 rounded-lg mt-1">{msg.content}</span>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                placeholder="Gửi tin nhắn..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
                            />
                            <button onClick={handleSendMessage} className="text-primary hover:text-primary-dark transition-transform active:scale-95">
                                <i className="fi flaticon-send"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
