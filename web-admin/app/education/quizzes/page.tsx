"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { educationService } from '@/services/education.service';

export default function QuizManagerPage() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                // Since getQuizzes needs a courseId, and this is a general manager page,
                // we might need a general getQuizzes or list them per course.
                // For now, I'll stick to a placeholder or fetch if I have a default course.
                // In a real scenario, we'd have a get_all_quizzes pattern.
                // For this migration, I'll keep the mock data if no course is selected or
                // update the backend to support list_all_quizzes.
                const data = await educationService.getQuizzes('all');
                setQuizzes(data);
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải danh sách trắc nghiệm...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Trắc nghiệm</h1>
                    <p className="text-gray-500 text-sm mt-1">Tạo và quản lý ngân hàng câu hỏi cho các khóa học.</p>
                </div>
                <Link href="/admin/education/quizzes/builder">
                    <button className="btn btn-primary bg-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition">
                        <i className="fi flaticon-add"></i> Tạo bài trắc nghiệm
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Tên bài trắc nghiệm</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Khóa học</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Số câu hỏi</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Lượt làm</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Điểm TB</th>
                            <th className="px-6 py-4 font-bold text-gray-700 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {quizzes.length > 0 ? quizzes.map((quiz) => (
                            <tr key={quiz.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-bold text-gray-900">{quiz.title}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{quiz.course?.name || quiz.courseId}</td>
                                <td className="px-6 py-4 text-gray-700">{quiz.questions?.length || 0}</td>
                                <td className="px-6 py-4 text-blue-600 font-medium">{quiz.attempts || 0}</td>
                                <td className="px-6 py-4">
                                    <span className={`font-bold ${quiz.avgScore >= 80 ? 'text-green-600' : quiz.avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {quiz.avgScore || 0}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/education/quizzes/results?quiz=${quiz.id}`}>
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg tooltip" title="Xem kết quả">
                                                <i className="fi flaticon-stats"></i>
                                            </button>
                                        </Link>
                                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg tooltip" title="Chỉnh sửa">
                                            <i className="fi flaticon-edit"></i>
                                        </button>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg tooltip" title="Xóa">
                                            <i className="fi flaticon-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    Chưa có bài trắc nghiệm nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
