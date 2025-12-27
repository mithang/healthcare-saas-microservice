"use client";
import React from 'react';

export default function ExportReportsPage() {
    const reports = [
        {
            title: 'Đã đăng ký - Chưa bắt đầu',
            description: 'Danh sách học viên đã đăng ký nhưng chưa xem bài học nào',
            count: 140,
            icon: 'flaticon-user',
            color: 'bg-yellow-500',
        },
        {
            title: 'Đã bắt đầu - Chưa hoàn thành',
            description: 'Học viên đã xem bài học nhưng chưa hoàn thành khóa',
            count: 680,
            icon: 'flaticon-book',
            color: 'bg-blue-500',
        },
        {
            title: 'Đã học - Chưa làm Trắc nghiệm',
            description: 'Học viên đã xem video nhưng chưa làm quiz',
            count: 320,
            icon: 'flaticon-list',
            color: 'bg-orange-500',
        },
        {
            title: 'Đã hoàn thành Toàn khóa',
            description: 'Học viên đạt tiêu chuẩn (video + quiz)',
            count: 420,
            icon: 'flaticon-checked',
            color: 'bg-green-500',
        },
        {
            title: 'Kết quả Pre-test/Post-test',
            description: 'Chi tiết điểm số từng bài học của học viên',
            count: 1240,
            icon: 'flaticon-stats',
            color: 'bg-purple-500',
        },
        {
            title: 'Báo cáo Tổng hợp KPI',
            description: 'Tất cả chỉ số: Pre-test, Xem video, Post-test, Pass/Fail',
            count: 1240,
            icon: 'flaticon-diploma',
            color: 'bg-red-500',
        },
    ];

    const handleExport = (reportTitle: string) => {
        alert(`Đang xuất báo cáo: ${reportTitle}\nFile CSV sẽ được tải xuống...`);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Xuất Báo cáo</h1>
                <p className="text-gray-500 text-sm mt-1">Tải xuống báo cáo chi tiết dưới dạng CSV/Excel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 ${report.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                                <i className={`fi ${report.icon} text-xl`}></i>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-1">{report.title}</h3>
                                <p className="text-sm text-gray-600">{report.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-2xl font-bold text-gray-900">{report.count} <span className="text-sm text-gray-500 font-normal">học viên</span></span>
                            <button
                                onClick={() => handleExport(report.title)}
                                className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition flex items-center gap-2"
                            >
                                <i className="fi flaticon-download"></i> Xuất CSV
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sample Data Preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Xem trước Dữ liệu (Mẫu)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3 font-bold text-gray-700">Tên</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Email</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Nơi làm việc</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Pre-test</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Video</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Post-test</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { name: 'Nguyen Van A', email: 'nva@email.com', workplace: 'BV Chợ Rẫy', pretest: 'Đạt', video: '100%', posttest: 'Đạt', status: 'Hoàn thành' },
                                { name: 'Tran Thi B', email: 'ttb@email.com', workplace: 'BV 115', pretest: 'Đạt', video: '85%', posttest: 'Đạt', status: 'Hoàn thành' },
                                { name: 'Le Van C', email: 'lvc@email.com', workplace: 'BV Đại học Y', pretest: 'Không đạt', video: '45%', posttest: '-', status: 'Chưa hoàn thành' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{row.email}</td>
                                    <td className="px-4 py-3 text-gray-600">{row.workplace}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${row.pretest === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {row.pretest}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-blue-600">{row.video}</td>
                                    <td className="px-4 py-3">
                                        {row.posttest === '-' ? (
                                            <span className="text-gray-400">-</span>
                                        ) : (
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${row.posttest === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {row.posttest}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
