"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [selectedCourse, setSelectedCourse] = useState('all');

    // Mock Data
    const stats = {
        totalUsers: 1240,
        weeklyActiveUsers: 456,
        completionRate50: 680,
        completionRate70: 420,
        completionRate100: 285,
        notCompleted: 560,
    };

    const lessonStats = [
        { id: 1, name: 'Bài 1: Giới thiệu', learners: 1100, passed: 1050, satisfaction: 4.5, quizAvg: 85 },
        { id: 2, name: 'Bài 2: Cơ bản', learners: 980, passed: 920, satisfaction: 4.3, quizAvg: 78 },
        { id: 3, name: 'Bài 3: Nâng cao', learners: 850, passed: 750, satisfaction: 4.2, quizAvg: 72 },
        { id: 4, name: 'Bài 4: Thực hành', learners: 720, passed: 650, satisfaction: 4.4, quizAvg: 80 },
        { id: 5, name: 'Bài 5: Chuyên sâu', learners: 680, passed: 580, satisfaction: 4.1, quizAvg: 68 },
        { id: 6, name: 'Bài 6: Ứng dụng', learners: 550, passed: 480, satisfaction: 4.3, quizAvg: 75 },
        { id: 7, name: 'Bài 7: Tổng hợp', learners: 420, passed: 360, satisfaction: 4.2, quizAvg: 70 },
        { id: 8, name: 'Bài 8: Thi cuối khóa', learners: 350, passed: 285, satisfaction: 4.5, quizAvg: 82 },
    ];

    const courseSatisfaction = {
        midCourse: 4.2,
        endCourse: 4.4,
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Tổng quan</h1>
                    <p className="text-gray-500 mt-1">Thống kê chi tiết về người dùng, khóa học và kết quả học tập</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                        <option value="all">Tất cả khóa học</option>
                        <option value="1">CME: Cập nhật Y khoa 2024</option>
                        <option value="2">CPE: Dược lâm sàng</option>
                    </select>
                </div>
            </div>

            {/* User Metrics */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thống kê Người dùng</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                <i className="fi flaticon-user-1"></i>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs">Tổng người đăng ký</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                                <i className="fi flaticon-stats"></i>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs">Hoạt động (7 ngày)</p>
                                <p className="text-2xl font-bold text-green-600">{stats.weeklyActiveUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                                <i className="fi flaticon-close"></i>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs">Chưa hoàn thành</p>
                                <p className="text-2xl font-bold text-red-600">{stats.notCompleted}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Completion Rates */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tỷ lệ Hoàn thành Khóa học (8 bài)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
                        <p className="text-yellow-700 font-bold mb-2">≥ 50% (4+ bài)</p>
                        <p className="text-4xl font-bold text-yellow-900">{stats.completionRate50}</p>
                        <p className="text-xs text-yellow-600 mt-1">{((stats.completionRate50 / stats.totalUsers) * 100).toFixed(1)}% tổng số</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                        <p className="text-blue-700 font-bold mb-2">≥ 70% (6+ bài)</p>
                        <p className="text-4xl font-bold text-blue-900">{stats.completionRate70}</p>
                        <p className="text-xs text-blue-600 mt-1">{((stats.completionRate70 / stats.totalUsers) * 100).toFixed(1)}% tổng số</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                        <p className="text-green-700 font-bold mb-2">100% (8/8 bài)</p>
                        <p className="text-4xl font-bold text-green-900">{stats.completionRate100}</p>
                        <p className="text-xs text-green-600 mt-1">{((stats.completionRate100 / stats.totalUsers) * 100).toFixed(1)}% tổng số</p>
                    </div>
                </div>
            </div>

            {/* Per-Lesson Stats */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thống kê Chi tiết Từng Bài học</h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-gray-700">Bài học</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Số người học</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Vượt qua</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Tỷ lệ đạt</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Điểm TB Quiz</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Hài lòng</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {lessonStats.map((lesson) => (
                                    <tr key={lesson.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{lesson.name}</td>
                                        <td className="px-6 py-4 text-blue-600 font-bold">{lesson.learners}</td>
                                        <td className="px-6 py-4 text-green-600 font-bold">{lesson.passed}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                                                    <div
                                                        className="h-full bg-green-500 rounded-full"
                                                        style={{ width: `${(lesson.passed / lesson.learners) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-600">{((lesson.passed / lesson.learners) * 100).toFixed(0)}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${lesson.quizAvg >= 80 ? 'text-green-600' : lesson.quizAvg >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {lesson.quizAvg}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <i className="fi flaticon-star text-yellow-400 text-xs"></i>
                                                <span className="font-bold text-gray-900">{lesson.satisfaction}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Course Satisfaction */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mức độ Hài lòng Khóa học</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <p className="text-gray-500 text-sm mb-2">Giữa khóa (Bài 4)</p>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <i key={star} className={`fi flaticon-star text-2xl ${star <= Math.floor(courseSatisfaction.midCourse) ? 'text-yellow-400' : 'text-gray-200'}`}></i>
                            ))}
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{courseSatisfaction.midCourse}/5</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <p className="text-gray-500 text-sm mb-2">Cuối khóa (Bài 8)</p>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <i key={star} className={`fi flaticon-star text-2xl ${star <= Math.floor(courseSatisfaction.endCourse) ? 'text-yellow-400' : 'text-gray-200'}`}></i>
                            ))}
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{courseSatisfaction.endCourse}/5</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/education/analytics" className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition text-center">
                    <i className="fi flaticon-stats text-2xl text-primary mb-2"></i>
                    <p className="font-bold text-gray-900 text-sm">Phân tích chi tiết</p>
                </Link>
                <Link href="/admin/education/quizzes/results" className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition text-center">
                    <i className="fi flaticon-list text-2xl text-blue-500 mb-2"></i>
                    <p className="font-bold text-gray-900 text-sm">Kết quả Quiz</p>
                </Link>
                <Link href="/admin/engagement/comments" className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition text-center">
                    <i className="fi flaticon-comment text-2xl text-green-500 mb-2"></i>
                    <p className="font-bold text-gray-900 text-sm">Bình luận</p>
                </Link>
                <Link href="/admin/users" className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition text-center">
                    <i className="fi flaticon-user-1 text-2xl text-purple-500 mb-2"></i>
                    <p className="font-bold text-gray-900 text-sm">Người dùng</p>
                </Link>
            </div>
        </div>
    );
}
