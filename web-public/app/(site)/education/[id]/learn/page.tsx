"use client";
import React, { useState } from 'react';
import { Button } from '@/components/portal/ui';
import { TreeView, TreeNode } from '@/components/admin/ui/TreeView'; // Reusing TreeView
import { useRouter, useParams } from 'next/navigation';

export default function CourseLearningInterace() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [activeLesson, setActiveLesson] = useState<TreeNode | null>(null);

    // Mock Learning Tree
    const treeData: TreeNode[] = [
        {
            id: '1',
            label: 'Bài 1: Tổng quan về Đái tháo đường',
            icon: 'folder',
            isExpanded: true,
            children: [
                { id: '1-1', label: '1.1 Phân loại và Chẩn đoán', icon: 'play-button' },
                { id: '1-2', label: '1.2 Cơ chế bệnh sinh mới', icon: 'play-button' },
                { id: '1-3', label: '1.3 Quiz: Kiểm tra kiến thức', icon: 'question' }
            ]
        },
        {
            id: '2',
            label: 'Bài 2: Các nhóm thuốc điều trị mới',
            icon: 'folder',
            children: [
                { id: '2-1', label: '2.1 SGLT2 inhibitors', icon: 'play-button' },
                { id: '2-2', label: '2.2 GLP-1 receptor agonists', icon: 'play-button' },
            ]
        },
        {
            id: '3',
            label: 'Bài 3: Quản lý biến chứng',
            icon: 'folder',
            children: [
                { id: '3-1', label: '3.1 Biến chứng tim mạch', icon: 'play-button' },
            ]
        },
        {
            id: '4',
            label: 'Tổng kết & Hỏi đáp',
            icon: 'folder',
            children: [
                { id: '4-1', label: 'Q&A với Giảng viên', icon: 'chat' },
                { id: '4-2', label: 'Bài thi cuối khóa (Final)', icon: 'diploma' },
            ]
        }
    ];

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row bg-gray-50 -m-8">

            {/* Sidebar Overview */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full z-10">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <Button variant="ghost" size="sm" icon="arrow-left" onClick={() => router.back()} className="mb-2">
                        Thoát
                    </Button>
                    <h2 className="font-bold text-gray-800 text-sm line-clamp-2">Cập nhật Chẩn đoán & Điều trị Đái tháo đường 2024</h2>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                        <div className="bg-green-500 h-1.5 rounded-full w-[35%]"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Hoàn thành 35%</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <TreeView
                        data={treeData}
                        selectedId={activeLesson?.id}
                        onSelect={(node) => !node.children && setActiveLesson(node)}
                        className="border-none shadow-none"
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {activeLesson ? (
                        <div className="max-w-4xl mx-auto">
                            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-6 relative group">
                                {/* Fake Video Player */}
                                <img src="https://images.unsplash.com/photo-1576091160501-e9da8f33f182?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60" />
                                <button className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center pl-1 shadow-xl">
                                        <i className="fi flaticon-play-button text-4xl text-primary"></i>
                                    </div>
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h1 className="text-xl font-bold">{activeLesson.label}</h1>
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <h3>Ghi chú bài học</h3>
                                <p>Nội dung đang được cập nhật...</p>
                            </div>

                            {/* Q&A Section specific to this lesson */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <i className="fi flaticon-chat text-primary"></i> Hỏi đáp về bài học này
                                </h3>
                                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                                    <textarea className="w-full p-2 focus:outline-none" rows={3} placeholder="Đặt câu hỏi cho giảng viên..."></textarea>
                                    <div className="flex justify-end mt-2">
                                        <Button size="sm">Gửi câu hỏi</Button>
                                    </div>
                                </div>
                                {/* Mock Q&A List */}
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 flex-shrink-0">BS</div>
                                        <div>
                                            <p className="font-bold text-sm">Dr. Watson <span className="text-xs font-normal text-gray-500 ml-2">2 giờ trước</span></p>
                                            <p className="text-gray-700 text-sm">Cho em hỏi về liều dùng khởi đầu của SGLT2i trên bệnh nhân suy thận nhẹ?</p>

                                            <div className="mt-2 pl-4 border-l-2 border-gray-100">
                                                <p className="font-bold text-sm text-primary">Giảng viên <span className="text-xs font-normal text-gray-500 ml-2">1 giờ trước</span></p>
                                                <p className="text-gray-700 text-sm">Chào bạn, đối với eGFR từ 30-60, liều khởi đầu vẫn giữ nguyên, tuy nhiên cần theo dõi kỹ chức năng thận...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <i className="fi flaticon-video-camera text-6xl mb-4 text-gray-200"></i>
                            <p className="text-lg">Chọn bài học từ danh sách bên trái để bắt đầu</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
