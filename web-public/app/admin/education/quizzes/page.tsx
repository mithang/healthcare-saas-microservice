"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function QuizManagerPage() {
    const [quizzes] = useState([
        { id: 1, title: 'Trắc nghiệm: Dược lâm sàng cơ bản', course: 'CPE 2024', questions: 20, attempts: 145, avgScore: 75 },
        { id: 2, title: 'Kiểm tra: Cập nhật điều trị ĐTĐ', course: 'CME Tim mạch', questions: 15, attempts: 98, avgScore: 82 },
        { id: 3, title: 'Bài thi cuối khóa: Nhi khoa', course: 'CME Nhi', questions: 30, attempts: 67, avgScore: 68 },
    ]);

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
                        {quizzes.map((quiz) => (
                            <tr key={quiz.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-bold text-gray-900">{quiz.title}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{quiz.course}</td>
                                <td className="px-6 py-4 text-gray-700">{quiz.questions}</td>
                                <td className="px-6 py-4 text-blue-600 font-medium">{quiz.attempts}</td>
                                <td className="px-6 py-4">
                                    <span className={`font-bold ${quiz.avgScore >= 80 ? 'text-green-600' : quiz.avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {quiz.avgScore}%
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
