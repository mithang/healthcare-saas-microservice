"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const COURSES = [
    { id: 1, title: 'Yoga cho người mới bắt đầu', instructor: 'HLV Nguyễn A', duration: '4 tuần', price: '500.000đ', students: 1200 },
    { id: 2, title: 'Dinh dưỡng khoa học', instructor: 'BS. Trần B', duration: '6 tuần', price: '800.000đ', students: 850 },
    { id: 3, title: 'Thiền & Quản lý Stress', instructor: 'Thiền sư Lê C', duration: '3 tuần', price: '400.000đ', students: 2100 },
];

export default function CoursesPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Khóa học Sức khỏe</h1>
                <p className="text-gray-500 mb-12">Học từ chuyên gia - Thay đổi lối sống</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {COURSES.map(course => (
                        <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                <i className="fi flaticon-online-learning text-6xl text-white"></i>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{course.instructor} • {course.duration}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                                    <span className="text-xs text-gray-400">{course.students} học viên</span>
                                </div>
                                <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark">Đăng ký ngay</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
