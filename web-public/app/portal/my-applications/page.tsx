"use client";
import React from 'react';
import { JobApplication, PharmacistJobStats, getApplicationStatusText, getApplicationStatusColor, calculateApplicationSuccessRate, formatTimeSince } from '@/types/job-application';

export default function MyApplicationsPage() {
    // Mock data
    const stats: PharmacistJobStats = {
        totalApplications: 15,
        pending: 5,
        reviewed: 4,
        interviewed: 3,
        accepted: 2,
        rejected: 1
    };

    const applications: JobApplication[] = [
        {
            id: '1',
            pharmacistId: 'user123',
            pharmacistName: 'Dược sĩ Nguyễn Văn A',
            pharmacyId: 'ph001',
            pharmacyName: 'Nhà thuốc Long Châu',
            position: 'Dược sĩ chính',
            cvUrl: '/cv/cv1.pdf',
            coverLetter: 'Tôi rất quan tâm đến vị trí này...',
            status: 'interviewed',
            appliedDate: '2024-12-15',
            reviewedDate: '2024-12-16'
        },
        {
            id: '2',
            pharmacistId: 'user123',
            pharmacistName: 'Dược sĩ Nguyễn Văn A',
            pharmacyId: 'ph002',
            pharmacyName: 'Nhà thuốc Pharmacity',
            position: 'Dược sĩ tư vấn',
            cvUrl: '/cv/cv1.pdf',
            status: 'pending',
            appliedDate: '2024-12-18'
        },
        {
            id: '3',
            pharmacistId: 'user123',
            pharmacistName: 'Dược sĩ Nguyễn Văn A',
            pharmacyId: 'ph003',
            pharmacyName: 'Nhà thuốc An Khang',
            position: 'Dược sĩ',
            cvUrl: '/cv/cv1.pdf',
            status: 'accepted',
            appliedDate: '2024-12-10',
            reviewedDate: '2024-12-12',
            notes: 'Chúng tôi rất ấn tượng với hồ sơ của bạn'
        }
    ];

    const successRate = calculateApplicationSuccessRate(stats);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">CV đã gửi</h1>
                    <p className="text-gray-500 mt-1">Theo dõi trạng thái các đơn ứng tuyển của bạn</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">📄</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                        </div>
                        <p className="text-sm text-gray-600">Tổng CV đã gửi</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">⏳</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                        </div>
                        <p className="text-sm text-gray-600">Chờ xem xét</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">✓</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.accepted}</p>
                        </div>
                        <p className="text-sm text-gray-600">Được nhận</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">📊</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{successRate}%</p>
                        </div>
                        <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
                    </div>
                </div>

                {/* Applications List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Danh sách CV</h2>
                        <div className="flex gap-3">
                            <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm">
                                <option>Tất cả trạng thái</option>
                                <option>Chờ xem xét</option>
                                <option>Đã xem</option>
                                <option>Đã phỏng vấn</option>
                                <option>Được nhận</option>
                                <option>Từ chối</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div key={app.id} className="border border-gray-100 rounded-xl p-6 hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-3xl">🏥</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{app.pharmacyName}</h3>
                                            <p className="text-gray-700 font-medium">{app.position}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Gửi {formatTimeSince(app.appliedDate)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getApplicationStatusColor(app.status)}`}>
                                        {getApplicationStatusText(app.status)}
                                    </span>
                                </div>

                                {app.notes && (
                                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                        <p className="text-sm text-blue-900">
                                            <strong>Phản hồi:</strong> {app.notes}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-200">
                                        Xem CV
                                    </button>
                                    {app.status === 'pending' && (
                                        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-bold hover:bg-red-200">
                                            Rút CV
                                        </button>
                                    )}
                                    {app.status === 'accepted' && (
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700">
                                            Liên hệ nhà thuốc
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                    <h3 className="font-bold text-yellow-900 mb-3">💡 Mẹo tìm việc hiệu quả</h3>
                    <ul className="space-y-2 text-sm text-yellow-800">
                        <li>• Cập nhật CV thường xuyên với thông tin mới nhất</li>
                        <li>• Viết thư xin việc cá nhân hóa cho từng nhà thuốc</li>
                        <li>• Theo dõi và phản hồi nhanh khi có thông báo</li>
                        <li>• Chuẩn bị kỹ trước khi phỏng vấn</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
