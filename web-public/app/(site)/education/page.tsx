"use client";
import React, { useEffect, useState } from 'react';
import { Button, Input } from '@/components/portal/ui';
import { useRouter } from 'next/navigation';
import { educationService, Course } from '@/services/education.service';

export default function EducationPortalPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await educationService.getCourses();
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => {
        if (filter === 'all') return true;
        if (filter === 'Free') return course.price === 0;
        return course.type === filter;
    });

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header / Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Nâng cao năng lực chuyên môn</h1>
                    <p className="text-blue-100 text-lg mb-8">Tham gia các khóa học CME/CPE chất lượng cao từ các bệnh viện và tổ chức uy tín hàng đầu.</p>
                    <div className="flex gap-4">
                        <Button className="bg-white text-blue-600 hover:bg-blue-50">Khám phá ngay</Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white/10">Đào tạo của tôi</Button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl"></div>
            </div>

            {/* Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                    {['all', 'CME', 'CPE', 'Free'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            {f === 'all' ? 'Tất cả' : f}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Input placeholder="Tìm khóa học..." icon="search" containerClassName="!mb-0 w-full md:w-64" />
                </div>
            </div>

            {/* Course Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden animate-pulse p-4 flex flex-col gap-4">
                            <div className="h-48 bg-gray-100 rounded-2xl w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                            <div className="h-6 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => router.push(`/portal/education/${course.id}`)}>
                            <div className="h-48 overflow-hidden relative">
                                <img src={course.thumbnail || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400'} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${course.type === 'CME' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                    {course.type}
                                </span>
                                {course.price === 0 && (
                                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg">
                                        Miễn phí
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 font-medium">
                                    <i className="fi flaticon-calendar"></i> {new Date().toLocaleDateString('vi-VN')}
                                    <span>•</span>
                                    <i className="fi flaticon-diploma"></i> {course.credits} tín chỉ
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 h-12">{course.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                                    <i className="fi flaticon-hospital text-gray-400"></i> {course.provider}
                                </p>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                    <span className="font-bold text-primary text-lg">
                                        {course.price === 0 ? 'Free' : course.price.toLocaleString() + 'đ'}
                                    </span>
                                    <Button size="sm" rounded="lg" icon="arrow-right">Chi tiết</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
