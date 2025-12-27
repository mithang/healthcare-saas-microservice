"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Post } from '@/services/content.service';

const RelatedNews: React.FC = () => {
    const [relatedItems, setRelatedItems] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await contentService.getPosts();
                setRelatedItems(data.filter(item => item.isActive).slice(0, 3));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="mt-12 animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="space-y-3">
                            <div className="aspect-video bg-gray-200 rounded-lg"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (relatedItems.length === 0) return null;

    return (
        <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase border-l-4 border-primary pl-3">
                Bài viết liên quan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedItems.map((item: any) => (
                    <Link key={item.id} href={`/news/${item.id}`} className="group block">
                        <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-sm">
                            <img
                                src={item.thumbnail || '/img/placeholder.png'}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 text-sm md:text-base leading-snug">
                            {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
                            <span className="text-[10px] text-gray-400 opacity-50">•</span>
                            <span className="text-[10px] text-gray-400 font-medium">👁️ {item.view || 0}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedNews;
