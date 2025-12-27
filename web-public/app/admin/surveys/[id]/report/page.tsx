"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SurveyReportPage() {
    const params = useParams<{ id: string }>();
    const surveyId = params.id;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <Link href="/admin/surveys" className="text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2">
                        <i className="fi flaticon-left-arrow-1 text-xs"></i> Quay lại danh sách
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Báo cáo: Khảo sát chất lượng khóa học CME 2024</h1>
                    <p className="text-gray-500 text-sm mt-1">Trạng thái: <span className="text-green-600 font-bold">Đang chạy</span> • 145 phản hồi</p>
                </div>
                <button className="btn btn-outline border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                    <i className="fi flaticon-download"></i> Xuất Excel
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Tổng lượt xem</p>
                    <p className="text-3xl font-bold text-gray-900">328</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Hoàn thành</p>
                    <p className="text-3xl font-bold text-blue-600">145</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Tỷ lệ chuyển đổi</p>
                    <p className="text-3xl font-bold text-gray-900">44.2%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Thời gian TB</p>
                    <p className="text-3xl font-bold text-gray-900">3m 12s</p>
                </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-6">
                {/* Question 1: Rating */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">1. Bạn đánh giá thế nào về nội dung khóa học?</h3>
                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold uppercase">Rating Scale</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex-1 space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="w-4 font-bold text-gray-600 text-sm">{rating}</span>
                                    <i className="fi flaticon-star text-xs text-yellow-400"></i>
                                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${rating === 5 ? 65 : rating === 4 ? 20 : 5}%` }}></div>
                                    </div>
                                    <span className="text-xs text-gray-500 w-10 text-right">{rating === 5 ? '65%' : rating === 4 ? '20%' : '5%'}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl min-w-[150px]">
                            <p className="text-sm text-gray-500 mb-1">Điểm trung bình</p>
                            <p className="text-4xl font-bold text-gray-900">4.5<span className="text-lg text-gray-400">/5</span></p>
                            <div className="flex justify-center mt-2">
                                <i className="fi flaticon-star text-yellow-400"></i>
                                <i className="fi flaticon-star text-yellow-400"></i>
                                <i className="fi flaticon-star text-yellow-400"></i>
                                <i className="fi flaticon-star text-yellow-400"></i>
                                <i className="fi flaticon-star-half text-yellow-400"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Question 2: Multiple Choice */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">2. Giảng viên có truyền đạt dễ hiểu không?</h3>
                        <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-lg text-xs font-bold uppercase">Multiple Choice</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: 'Rất dễ hiểu, lôi cuốn', pct: 70, count: 102 },
                            { label: 'Bình thường', pct: 25, count: 36 },
                            { label: 'Khó hiểu, nói nhanh', pct: 5, count: 7 }
                        ].map((opt, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{opt.label}</span>
                                    <span className="text-gray-500">{opt.count} phiếu ({opt.pct}%)</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${opt.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
