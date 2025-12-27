"use client";

import React from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

const ARTICLES = [
    { id: 1, title: '10 thực phẩm tốt cho tim mạch', category: 'Dinh dưỡng', image: '/img/health-news-1.jpg', excerpt: 'Khám phá những siêu thực phẩm giúp bảo vệ tim mạch khỏe mạnh...', author: 'BS. Nguyễn A', date: '15/12/2024', views: 1200 },
    { id: 2, title: 'Cách phòng ngừa cảm cúm mùa đông', category: 'Phòng bệnh', image: '/img/health-news-2.jpg', excerpt: 'Mùa đông đến, nguy cơ mắc cảm cúm tăng cao. Làm thế nào để...', author: 'BS. Trần B', date: '14/12/2024', views: 850 },
    { id: 3, title: 'Yoga buổi sáng - Bí quyết sống khỏe', category: 'Lối sống', image: '/img/health-news-3.jpg', excerpt: 'Chỉ 15 phút yoga mỗi sáng có thể thay đổi hoàn toàn sức khỏe...', author: 'HLV Lê C', date: '13/12/2024', views: 2100 },
    { id: 4, title: 'Hiểu đúng về chỉ số đường huyết', category: 'Kiến thức', image: '/img/health-news-4.jpg', excerpt: 'Đường huyết bao nhiêu là bình thường? Khi nào cần lo lắng?...', author: 'BS. Phạm D', date: '12/12/2024', views: 1500 },
];

const CATEGORIES = ['Tất cả', 'Dinh dưỡng', 'Phòng bệnh', 'Lối sống', 'Kiến thức', 'Mẹo hay'];

export default function HealthNewsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />

            {/* Hero Featured */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative rounded-2xl overflow-hidden h-96">
                            <img src="/img/health-featured.jpg" alt="Featured" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-2.jpg'} />
                            <span className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-1 rounded-full text-sm">Nổi bật</span>
                        </div>
                        <div>
                            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Dinh dưỡng</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 my-4 leading-tight">
                                Chế độ ăn Địa Trung Hải - Bí quyết sống thọ của người Ý
                            </h2>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Nghiên cứu mới nhất cho thấy chế độ ăn Địa Trung Hải giúp giảm 30% nguy cơ mắc bệnh tim mạch và tăng tuổi thọ lên đến 5 năm...
                            </p>
                            <Link href="/health-news/1" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-colors">
                                Đọc ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Categories */}
                <div className="flex overflow-x-auto gap-3 mb-12 pb-2 hide-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className="px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap bg-white border border-gray-200 hover:border-primary hover:text-primary transition-colors"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ARTICLES.map(article => (
                        <Link href={`/health-news/${article.id}`} key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/news/news-1.jpg'}
                                />
                                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-50">
                                    <span>{article.author}</span>
                                    <div className="flex items-center gap-3">
                                        <span>{article.date}</span>
                                        <span className="flex items-center gap-1">
                                            <i className="fi flaticon-eye"></i> {article.views}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
