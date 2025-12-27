'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const threads = [
    {
        id: 1,
        title: 'Top 10 thực phẩm giàu vitamin C giúp tăng đề kháng',
        author: 'Dinh Dưỡng Vàng',
        avatar: '/styles/img/user/user-3.jpg',
        category: 'Dinh dưỡng',
        createdAt: '1 giờ trước',
        votes: 89,
        comments: 24,
        preview: 'Vitamin C đóng vai trò quan trọng trong việc tăng cường hệ miễn dịch. Dưới đây là danh sách các loại thực phẩm giàu vitamin C bạn nên bổ sung hàng ngày...',
        tags: ['Vitamin C', 'Đề kháng']
    },
    {
        id: 2,
        title: 'Chế độ ăn cho người tập Gym muốn tăng cơ giảm mỡ',
        author: 'Muscle Man',
        avatar: '/styles/img/user/user-4.jpg',
        category: 'Dinh dưỡng',
        createdAt: '3 giờ trước',
        votes: 156,
        comments: 42,
        preview: 'Protein là yếu tố then chốt. Cần tính toán macro (Đạm/Béo/Tinh bột) phù hợp với cân nặng và cường độ tập luyện...',
        tags: ['Gym', 'Tăng cơ']
    },
    {
        id: 3,
        title: 'Có nên uống sữa hạt thay thế sữa bò hoàn toàn?',
        author: 'Healthy Life',
        avatar: '/styles/img/user/user-1.jpg',
        category: 'Dinh dưỡng',
        createdAt: '1 ngày trước',
        votes: 45,
        comments: 15,
        preview: 'Sữa hạt đang là xu hướng, nhưng liệu nó có đủ dưỡng chất như sữa bò? Cùng phân tích ưu nhược điểm nhé...',
        tags: ['Sữa hạt', 'Sữa bò']
    }
];

export default function CategoryPage() {
    const params = useParams<{ slug: string }>();
    // Map slug to category name for demo
    const categoryNames: Record<string, string> = {
        nutrition: 'Dinh dưỡng',
        general: 'Sức khỏe chung',
        mental: 'Tâm lý',
        fitness: 'Thể dục & Thể thao',
        disease: 'Bệnh lý',
        obs: 'Sản phụ khoa',
        pediatrics: 'Nhi khoa'
    };

    const categoryName = categoryNames[params.slug] || 'Chuyên mục';

    return (
        <div className="space-y-6">
            {/* Category Header */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl">
                            <i className="fi flaticon-folder"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
                    </div>
                    <p className="text-gray-500 max-w-2xl">
                        Nơi thảo luận, chia sẻ kiến thức và kinh nghiệm về các vấn đề liên quan đến {categoryName.toLowerCase()}.
                        Hãy cùng xây dựng cộng đồng khỏe mạnh!
                    </p>
                </div>
            </div>

            {/* Thread List */}
            <div className="space-y-4">
                {threads.map((thread) => (
                    <div key={thread.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 flex hover:border-green-200 transition-colors cursor-pointer group">
                        <div className="w-12 bg-gray-50 rounded-l-xl flex flex-col items-center p-2 gap-1 flex-shrink-0">
                            <button className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 w-8 h-8 rounded flex items-center justify-center transition-colors">
                                <i className="fi flaticon-up-arrow font-bold"></i>
                            </button>
                            <span className="font-bold text-gray-700 text-sm">{thread.votes}</span>
                            <button className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 w-8 h-8 rounded flex items-center justify-center transition-colors">
                                <i className="fi flaticon-down-arrow font-bold"></i>
                            </button>
                        </div>

                        <Link href={`/forum/${thread.id}`} className="flex-1 p-3 pl-4 block">
                            <div className="flex items-center gap-2 mb-2 text-xs">
                                <img src={thread.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                                <span className="font-bold text-gray-700">{thread.author}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-green-600 font-medium">{thread.category}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{thread.createdAt}</span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                {thread.title}
                            </h3>

                            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                {thread.preview}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-lg">
                                    <i className="fi flaticon-speech-bubble"></i>
                                    {thread.comments}
                                </div>
                                {thread.tags.map((tag) => (
                                    <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
