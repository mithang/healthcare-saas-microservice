"use client";
import React, { useState } from 'react';
import { Button } from '@/components/portal/ui';
import { useRouter, useParams } from 'next/navigation';

export default function CourseDetailPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState('syllabus');

    const course = {
        id: params.id,
        name: 'Cập nhật Chẩn đoán & Điều trị Đái tháo đường 2024',
        provider: 'Bệnh viện ĐH Y Dược',
        credits: 4,
        price: 500000,
        description: 'Khóa học cung cấp kiến thức cập nhật nhất về phác đồ điều trị đái tháo đường type 2 theo ADA 2024. Phù hợp cho Bác sĩ đa khoa và chuyên khoa Nội.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
        mentors: [
            { name: 'GS. TS. Nguyễn Văn A', title: 'Trưởng khoa Nội tiết', avatar: 'https://i.pravatar.cc/150?u=a' },
            { name: 'TS. BS. Trần Thị B', title: 'Phó khoa Nội tiết', avatar: 'https://i.pravatar.cc/150?u=b' }
        ],
        sponsors: [
            { name: 'AstraZeneca', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/AstraZeneca_logo.svg/2560px-AstraZeneca_logo.svg.png', type: 'Diamond' },
            { name: 'Sanofi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sanofi_logo.svg/2560px-Sanofi_logo.svg.png', type: 'Gold' }
        ],
        syllabus: [
            {
                title: 'Bài 1: Tổng quan về Đái tháo đường 2024',
                sessions: [
                    { title: 'Phân loại và Chẩn đoán', duration: '45 phút' },
                    { title: 'Cơ chế bệnh sinh mới', duration: '30 phút' }
                ]
            },
            {
                title: 'Bài 2: Các nhóm thuốc điều trị mới',
                sessions: [
                    { title: 'SGLT2 inhibitors', duration: '60 phút' },
                    { title: 'GLP-1 receptor agonists', duration: '60 phút' },
                    { title: 'Phối hợp thuốc', duration: '45 phút' }
                ]
            },
            {
                title: 'Bài 3: Quản lý biến chứng',
                sessions: [
                    { title: 'Biến chứng tim mạch', duration: '50 phút' },
                    { title: 'Biến chứng thận', duration: '50 phút' }
                ]
            }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <Button variant="ghost" icon="arrow-left" onClick={() => router.back()} className="mb-4 text-gray-500">
                Quay lại danh sách
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Image */}
                    <div className="rounded-3xl overflow-hidden h-64 md:h-80 relative shadow-sm">
                        <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <span className="bg-blue-600 px-3 py-1 rounded-lg text-xs font-bold mb-2 inline-block">CME 4 Tiết</span>
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.name}</h1>
                                <p className="opacity-90"><i className="fi flaticon-hospital mr-1"></i> {course.provider}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        {['syllabus', 'mentors', 'qa'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {tab === 'syllabus' ? 'Nội dung khóa học' : tab === 'mentors' ? 'Giảng viên' : 'Hỏi đáp (Q&A)'}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[300px]">
                        {activeTab === 'syllabus' && (
                            <div className="space-y-4">
                                <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
                                <div className="space-y-4">
                                    {course.syllabus.map((lesson, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 font-bold text-gray-900 flex justify-between items-center">
                                                <span>{lesson.title}</span>
                                                <span className="text-xs text-gray-500">{lesson.sessions.length} bài học</span>
                                            </div>
                                            <div className="divide-y divide-gray-100">
                                                {lesson.sessions.map((session, sIdx) => (
                                                    <div key={sIdx} className="px-6 py-3 flex justify-between items-center hover:bg-white transition">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                                                                <i className="fi flaticon-play-button"></i>
                                                            </div>
                                                            <span className="text-sm text-gray-700 font-medium">{session.title}</span>
                                                        </div>
                                                        <span className="text-xs text-gray-400">{session.duration}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'mentors' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.mentors.map((mentor, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                                        <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full object-cover" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">{mentor.name}</h3>
                                            <p className="text-sm text-blue-600 font-medium">{mentor.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'qa' && (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                                <i className="fi flaticon-question text-4xl text-gray-300 mb-2"></i>
                                <p className="text-gray-500">Chức năng hỏi đáp sẽ mở sau khi bạn tham gia khóa học.</p>
                            </div>
                        )}
                    </div>

                    {/* Sponsors */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Nhà tài trợ</h3>
                        <div className="flex gap-8 items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            {course.sponsors.map((sponsor, idx) => (
                                <div key={idx} className="h-12 w-32 flex items-center justify-center border border-gray-100 rounded-lg bg-white p-2">
                                    <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar (Pricing & Action) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white rounded-3xl shadow-lg border border-gray-100 p-6 space-y-6">
                        <div className="text-center">
                            <p className="text-gray-500 text-sm mb-1">Học phí trọn gói</p>
                            <h2 className="text-4xl font-bold text-primary">{course.price.toLocaleString()} đ</h2>
                        </div>

                        <Button fullWidth size="lg" icon="cart" onClick={() => router.push(`/portal/education/${course.id}`)}>
                            Đăng ký tham gia ngay
                        </Button>
                        <Button fullWidth variant="outline" icon="share">Chia sẻ khóa học</Button>

                        <ul className="space-y-3 pt-6 border-t border-gray-100">
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <i className="fi flaticon-diploma text-green-500"></i>
                                <span>Chứng chỉ CME <b>{course.credits} tiết</b></span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <i className="fi flaticon-infinity text-blue-500"></i>
                                <span>Truy cập trọn đời</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <i className="fi flaticon-phone-call text-purple-500"></i>
                                <span>Hỗ trợ chuyên môn 24/7</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
