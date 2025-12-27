"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

export default function AIAssistantPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Xin chào! Tôi là trợ lý sức khỏe AI. Tôi có thể giúp gì cho bạn?' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages,
        { role: 'user', text: input },
        { role: 'assistant', text: 'Cảm ơn câu hỏi! Dựa trên triệu chứng bạn mô tả, tôi khuyên bạn nên gặp bác sĩ chuyên khoa...' }
        ]);
        setInput('');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trợ lý Sức khỏe AI</h1>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 p-4 flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Nhập triệu chứng hoặc câu hỏi..."
                            className="flex-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button onClick={sendMessage} className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
