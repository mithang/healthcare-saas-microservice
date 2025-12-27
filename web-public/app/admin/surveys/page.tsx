"use client";
import React, { useState } from 'react';
import Link from 'next/link';

interface Survey {
    id: number;
    title: string;
    description: string;
    status: 'Active' | 'Draft' | 'Closed';
    responses: number;
    createdAt: string;
}

export default function SurveyListPage() {
    const [surveys, setSurveys] = useState<Survey[]>([
        { id: 1, title: 'Khảo sát chất lượng khóa học CME 2024', description: 'Đánh giá mức độ hài lòng về nội dung và giảng viên', status: 'Active', responses: 145, createdAt: '2024-10-15' },
        { id: 2, title: 'Nhu cầu đào tạo Dược lâm sàng 2025', description: 'Thu thập ý kiến để xây dựng chương trình năm tới', status: 'Draft', responses: 0, createdAt: '2024-11-20' },
        { id: 3, title: 'Đánh giá sự kiện Hội nghị Tim mạch', description: 'Feedback sau sự kiện', status: 'Closed', responses: 350, createdAt: '2024-09-01' },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Draft': return 'bg-gray-100 text-gray-700';
            case 'Closed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Khảo sát</h1>
                    <p className="text-gray-500 text-sm mt-1">Tạo và quản lý các bài khảo sát, thu thập ý kiến người dùng.</p>
                </div>
                <Link href="/admin/surveys/builder" className="btn btn-primary bg-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition">
                    <i className="fi flaticon-add"></i> Tạo khảo sát
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Tên khảo sát</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Phản hồi</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày tạo</th>
                            <th className="px-6 py-4 font-bold text-gray-700 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {surveys.map((survey) => (
                            <tr key={survey.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-900">{survey.title}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-xs">{survey.description}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(survey.status)}`}>
                                        {survey.status === 'Active' ? 'Đang chạy' : survey.status === 'Draft' ? 'Bản nháp' : 'Đã đóng'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700">{survey.responses}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{survey.createdAt}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/surveys/${survey.id}/report`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg tooltip" title="Xem báo cáo">
                                            <i className="fi flaticon-stats"></i>
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
