"use client";
import React from 'react';

export default function LiveViewerPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-80px)]">

                {/* Main Video Area */}
                <div className="lg:col-span-3 flex flex-col">
                    <div className="flex-1 bg-black rounded-2xl overflow-hidden relative border border-gray-800 flex items-center justify-center group">
                        {/* Mock Video Player */}
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition cursor-pointer">
                                <i className="fi flaticon-play-button text-4xl text-white ml-2"></i>
                            </div>
                            <h2 className="text-xl font-bold">Hội thảo: Cập nhật điều trị Đái tháo đường 2024</h2>
                            <p className="text-gray-400 mt-2">Bắt đầu trong 15 phút</p>
                        </div>

                        {/* Overlay Controls */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div> LIVE
                            </span>
                            <span className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold">
                                <i className="fi flaticon-eye"></i> 1,204 đang xem
                            </span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold">Hội thảo Khoa học: Cập nhật điều trị Đái tháo đường 2024</h1>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">M</div>
                                <span className="text-white font-medium">MediHub Official</span>
                            </div>
                            <button className="px-4 py-1.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">Đăng ký kênh</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Chat */}
                <div className="lg:col-span-1 bg-gray-800 rounded-2xl flex flex-col border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700 font-bold flex justify-between items-center">
                        <span>Trò chuyện trực tiếp</span>
                        <i className="fi flaticon-user text-gray-400"></i>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex gap-2 text-sm">
                            <span className="font-bold text-blue-400 shrink-0">Dr. Tuan:</span>
                            <span className="text-gray-300">Chủ đề hôm nay rất hay.</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <span className="font-bold text-green-400 shrink-0">BS. Lan:</span>
                            <span className="text-gray-300">Cho mình hỏi về slide bài giảng ạ?</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <span className="font-bold text-purple-400 shrink-0">Admin:</span>
                            <span className="text-gray-300">Slide sẽ được gửi qua email sau hội thảo nhé @Lan.</span>
                        </div>
                        {/* Mock filler content */}
                        <div className="text-center text-xs text-gray-600 my-4">Chào mừng 200 người mới tham gia</div>
                    </div>

                    <div className="p-4 border-t border-gray-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Chat..."
                                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-primary outline-none"
                            />
                            <button className="bg-primary hover:bg-primary-dark text-white p-2 rounded-xl transition">
                                <i className="fi flaticon-send"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
