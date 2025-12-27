'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const threads = [
    {
        id: 1,
        title: 'Xin kinh nghiệm chăm sóc người già bị tiểu đường type 2',
        author: 'Minh Anh',
        avatar: '/styles/img/user/user-1.jpg',
        category: 'Sức khỏe chung',
        createdAt: '2 giờ trước',
        votes: 45,
        comments: 12,
        preview: 'Chào mọi người, bố mình năm nay 65 tuổi vừa phát hiện bị tiểu đường type 2. Mọi người có kinh nghiệm gì về chế độ ăn uống và tập luyện cho người cao tuổi không ạ? Mình đang rất lo lắng...',
        tags: ['Tiểu đường', 'Người cao tuổi']
    },
    {
        id: 2,
        title: 'Review chi tiết gói khám tổng quát tại Bệnh viện Y',
        author: 'Hoàng Nam',
        avatar: '/styles/img/user/user-2.jpg',
        category: 'Review',
        createdAt: '5 giờ trước',
        votes: 128,
        comments: 34,
        preview: 'Hôm qua mình vừa đi khám tổng quát gói VIP tại BV Y. Sau đây là một vài đánh giá cá nhân để mọi người tham khảo. Về cơ sở vật chất thì rất mới, sạch sẽ...',
        tags: ['Khám bệnh', 'Review']
    },
    {
        id: 3,
        title: 'Trẻ 6 tháng tuổi biếng ăn, các mom giúp em với!',
        author: 'Mẹ Bắp',
        avatar: '/styles/img/user/user-3.jpg',
        category: 'Nhi khoa',
        createdAt: '1 ngày trước',
        votes: 23,
        comments: 56,
        preview: 'Bé nhà em được 6 tháng, bắt đầu ăn dặm nhưng dạo này rất lười ăn, đút là khóc. Em đã đổi nhiều món nhưng không cải thiện...',
        tags: ['Ăn dặm', 'Biếng ăn']
    }
];

export default function ForumHome() {
    const [filter, setFilter] = useState('hot');

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white p-2 rounded-xl border border-gray-100 flex gap-2 shadow-sm mb-4">
                {['hot', 'new', 'top'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${filter === f
                            ? 'bg-gray-100 text-green-600'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <i className={`fi ${f === 'hot' ? 'flaticon-fire' :
                            f === 'new' ? 'flaticon-flash' : 'flaticon-star'
                            }`}></i>
                        {f === 'hot' ? 'Đáng chú ý' : f === 'new' ? 'Mới nhất' : 'Hàng đầu'}
                    </button>
                ))}
            </div>

            {/* Thread List */}
            <div className="space-y-4">
                {threads.map((thread) => (
                    <div key={thread.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 flex hover:border-green-200 transition-colors cursor-pointer group">
                        {/* Voting Side */}
                        <div className="w-12 bg-gray-50 rounded-l-xl flex flex-col items-center p-2 gap-1 flex-shrink-0">
                            <button className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 w-8 h-8 rounded flex items-center justify-center transition-colors">
                                <i className="fi flaticon-up-arrow font-bold"></i>
                            </button>
                            <span className="font-bold text-gray-700 text-sm">{thread.votes}</span>
                            <button className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 w-8 h-8 rounded flex items-center justify-center transition-colors">
                                <i className="fi flaticon-down-arrow font-bold"></i>
                            </button>
                        </div>

                        {/* Content */}
                        <Link href={`/forum/topic/${thread.id}`} className="flex-1 p-3 pl-4 block">
                            <div className="flex items-center gap-2 mb-2 text-xs">
                                <img src={thread.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                                <span className="font-bold text-gray-700">{thread.author}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500">{thread.category}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{thread.createdAt}</span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors lineHeight-1.4">
                                {thread.title}
                            </h3>

                            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                {thread.preview}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200">
                                    <i className="fi flaticon-speech-bubble"></i>
                                    {thread.comments} bình luận
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200">
                                    <i className="fi flaticon-share"></i>
                                    Chia sẻ
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
