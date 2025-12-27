"use client";
import React from 'react';
import { Button, StatusBadge } from '@/components/portal/ui';
import Link from 'next/link';

export default function PharmacyEducationPage() {
    // Mock Enrolled Courses
    const myCourses = [
        {
            id: 'CME001',
            name: 'Cập nhật Kiến thức Dược lâm sàng 2024',
            provider: 'Đại học Dược Hà Nội',
            progress: 75,
            status: 'InProgress',
            credits: '4 CPE',
            lastAccess: '2 giờ trước',
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1000'
        },
        {
            id: 'CPE002',
            name: 'Kỹ năng Tư vấn sử dụng thuốc an toàn',
            provider: 'Hội Dược học TP.HCM',
            progress: 100,
            status: 'Completed',
            credits: '2 CPE',
            lastAccess: '1 tuần trước',
            image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=1000'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Đào tạo & CPE</h1>
                    <p className="text-gray-500">Các khóa học đã tham gia và chứng chỉ đào tạo liên tục</p>
                </div>
                <Link href="/education">
                    <Button icon="search">Tìm khóa học mới</Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
                    <div>
                        <p className="text-blue-600 font-bold text-sm">Tổng tín chỉ CPE</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">6.0</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                        <i className="fi flaticon-diploma"></i>
                    </div>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center justify-between">
                    <div>
                        <p className="text-green-600 font-bold text-sm">Khóa hoàn thành</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">12</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                        <i className="fi flaticon-checked"></i>
                    </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div>
                        <p className="text-purple-600 font-bold text-sm">Đang học</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">1</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl">
                        <i className="fi flaticon-play-button"></i>
                    </div>
                </div>
            </div>

            {/* Course List */}
            <div>
                <h2 className="text-lg font-bold mb-4">Khóa học của tôi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myCourses.map((course) => (
                        <div key={course.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                            <img src={course.image} className="w-24 h-24 rounded-xl object-cover" alt={course.name} />
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{course.credits}</span>
                                        <StatusBadge status={course.status} />
                                    </div>
                                    <Link href={`/portal/education/${course.id}`}>
                                        <h3 className="font-bold text-gray-900 mt-2 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">{course.name}</h3>
                                    </Link>
                                    <p className="text-xs text-gray-500">{course.provider}</p>
                                </div>
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Tiến độ</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full ${course.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        {course.status === 'Completed' ? (
                                            <Button size="sm" variant="outline" fullWidth icon="download">Tải chứng chỉ</Button>
                                        ) : (
                                            <Link href={`/portal/education/${course.id}`} className="w-full">
                                                <Button size="sm" fullWidth icon="play-button">Tiếp tục học</Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
