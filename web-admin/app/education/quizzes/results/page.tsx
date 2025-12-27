"use client";
import React from 'react';

export default function QuizResultsPage() {
    const results = [
        { id: 1, student: 'Nguyen Van A', quiz: 'Dược lâm sàng cơ bản', score: 85, time: '12 phút', date: '2024-12-20', status: 'Passed' },
        { id: 2, student: 'Tran Thi B', quiz: 'Cập nhật điều trị ĐTĐ', score: 92, time: '10 phút', date: '2024-12-19', status: 'Passed' },
        { id: 3, student: 'Le Van C', quiz: 'Dược lâm sàng cơ bản', score: 58, time: '15 phút', date: '2024-12-18', status: 'Failed' },
        { id: 4, student: 'Pham Thi D', quiz: 'Bài thi cuối khóa: Nhi khoa', score: 78, time: '25 phút', date: '2024-12-17', status: 'Passed' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Kết quả Trắc nghiệm</h1>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-blue-600">245</p>
                    <p className="text-sm text-gray-500 mt-1">Tổng lượt làm bài</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-green-600">78%</p>
                    <p className="text-sm text-gray-500 mt-1">Tỷ lệ đạt</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-yellow-600">75</p>
                    <p className="text-sm text-gray-500 mt-1">Điểm trung bình</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                        <option>Tất cả bài trắc nghiệm</option>
                        <option>Dược lâm sàng cơ bản</option>
                        <option>Cập nhật điều trị ĐTĐ</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                        <option>Tất cả trạng thái</option>
                        <option>Passed</option>
                        <option>Failed</option>
                    </select>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Học viên</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Bài trắc nghiệm</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Điểm</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thời gian</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày làm</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {results.map((result) => (
                            <tr key={result.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{result.student}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{result.quiz}</td>
                                <td className="px-6 py-4">
                                    <span className={`font-bold text-lg ${result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {result.score}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{result.time}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{result.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${result.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {result.status === 'Passed' ? 'Đạt' : 'Không đạt'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
