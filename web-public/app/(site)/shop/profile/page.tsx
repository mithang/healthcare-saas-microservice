"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');

    const user = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0909123456',
        avatar: '/img/avatar-1.jpg',
        points: 450,
        level: 'Dược sĩ',
    };

    const stats = {
        orders: 12,
        courses: 5,
        quizzes: 18,
        communityPosts: 24,
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                            onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                        />
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-gray-600">{user.level}</p>
                            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Điểm tích lũy</p>
                            <p className="text-3xl font-bold text-primary">{user.points}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Link href="/portal/orders">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fi flaticon-shopping-cart text-blue-600"></i>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
                            </div>
                            <p className="text-sm text-gray-600">Đơn hàng</p>
                        </div>
                    </Link>
                    <Link href="/portal/education">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fi flaticon-book text-green-600"></i>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.courses}</p>
                            </div>
                            <p className="text-sm text-gray-600">Khóa học</p>
                        </div>
                    </Link>
                    <Link href="/portal/education/quizzes/history">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <i className="fi flaticon-list text-purple-600"></i>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.quizzes}</p>
                            </div>
                            <p className="text-sm text-gray-600">Trắc nghiệm</p>
                        </div>
                    </Link>
                    <Link href="/community">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <i className="fi flaticon-comment text-yellow-600"></i>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.communityPosts}</p>
                            </div>
                            <p className="text-sm text-gray-600">Bài viết</p>
                        </div>
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {[
                        { key: 'overview', label: 'Tổng quan', icon: 'flaticon-home' },
                        { key: 'info', label: 'Thông tin', icon: 'flaticon-user' },
                        { key: 'orders', label: 'Đơn hàng', icon: 'flaticon-shopping-cart' },
                        { key: 'addresses', label: 'Địa chỉ', icon: 'flaticon-location' },
                        { key: 'learning', label: 'Học tập', icon: 'flaticon-book' },
                        { key: 'community', label: 'Cộng đồng', icon: 'flaticon-comment' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-3 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-2 ${activeTab === tab.key
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-100'
                                }`}
                        >
                            <i className={`fi ${tab.icon}`}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Hoạt động gần đây</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3">Đơn hàng gần nhất</h3>
                                    <Link href="/portal/orders">
                                        <div className="p-4 border border-gray-200 rounded-xl hover:border-primary transition">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="font-bold text-gray-900">#ORD001</p>
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Đã giao</span>
                                            </div>
                                            <p className="text-sm text-gray-600">2024-12-18</p>
                                            <p className="text-primary font-bold mt-2">2.790.000đ</p>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3">Khóa học đang học</h3>
                                    <Link href="/portal/education">
                                        <div className="p-4 border border-gray-200 rounded-xl hover:border-primary transition">
                                            <p className="font-bold text-gray-900 mb-2">CPE 2024</p>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                                                <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                                            </div>
                                            <p className="text-sm text-gray-600">65% hoàn thành</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'info' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                    <input type="text" defaultValue={user.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input type="email" defaultValue={user.email} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                    <input type="tel" defaultValue={user.phone} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Trình độ</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none">
                                        <option>Dược sĩ</option>
                                        <option>Bác sĩ</option>
                                        <option>Y tá</option>
                                    </select>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition">
                                Cập nhật thông tin
                            </button>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Đơn hàng của tôi</h2>
                                <Link href="/portal/orders" className="text-primary font-bold hover:underline">
                                    Xem tất cả →
                                </Link>
                            </div>
                            <p className="text-gray-600">Xem danh sách đơn hàng và theo dõi trạng thái giao hàng.</p>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Sổ địa chỉ</h2>
                                <Link href="/portal/addresses" className="text-primary font-bold hover:underline">
                                    Quản lý địa chỉ →
                                </Link>
                            </div>
                            <p className="text-gray-600">Quản lý địa chỉ nhận hàng của bạn.</p>
                        </div>
                    )}

                    {activeTab === 'learning' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Hoạt động học tập</h2>
                                <Link href="/portal/education/quizzes/history" className="text-primary font-bold hover:underline">
                                    Lịch sử quiz →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-50 rounded-xl">
                                    <p className="text-sm text-blue-700 mb-1">Khóa học đã hoàn thành</p>
                                    <p className="text-2xl font-bold text-blue-900">3</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <p className="text-sm text-green-700 mb-1">Quiz đã làm</p>
                                    <p className="text-2xl font-bold text-green-900">18</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl">
                                    <p className="text-sm text-purple-700 mb-1">Điểm trung bình</p>
                                    <p className="text-2xl font-bold text-purple-900">85%</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'community' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Hoạt động cộng đồng</h2>
                                <Link href="/community" className="text-primary font-bold hover:underline">
                                    Xem cộng đồng →
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">24</p>
                                    <p className="text-sm text-gray-600">Bài viết</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">156</p>
                                    <p className="text-sm text-gray-600">Likes</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">89</p>
                                    <p className="text-sm text-gray-600">Comments</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">32</p>
                                    <p className="text-sm text-gray-600">Shares</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Links */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/product-knowledge">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fi flaticon-video text-blue-600 text-xl"></i>
                            </div>
                            <p className="font-bold text-gray-900">Kiến thức SP</p>
                        </div>
                    </Link>
                    <Link href="/health-community">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fi flaticon-user text-green-600 text-xl"></i>
                            </div>
                            <p className="font-bold text-gray-900">Cộng đồng YT</p>
                        </div>
                    </Link>
                    <Link href="/medical-journal">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fi flaticon-book text-purple-600 text-xl"></i>
                            </div>
                            <p className="font-bold text-gray-900">Tạp chí YH</p>
                        </div>
                    </Link>
                    <Link href="/cart">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fi flaticon-shopping-cart text-yellow-600 text-xl"></i>
                            </div>
                            <p className="font-bold text-gray-900">Giỏ hàng</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
