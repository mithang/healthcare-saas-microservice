"use client";
import React, { useState } from 'react';
import { JobApplication, PharmacyJobStats, getApplicationStatusText, getApplicationStatusColor, formatTimeSince } from '@/types/job-application';

export default function PharmacyApplicantsPage() {
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Mock data
    const stats: PharmacyJobStats = {
        totalApplicants: 45,
        newApplications: 12,
        reviewing: 8,
        shortlisted: 5,
        hired: 3
    };

    const applicants: JobApplication[] = [
        {
            id: '1',
            pharmacistId: 'ps001',
            pharmacistName: 'Dược sĩ Nguyễn Văn A',
            pharmacistAvatar: '/img/pharmacist1.jpg',
            pharmacyId: 'ph001',
            pharmacyName: 'Nhà thuốc Long Châu',
            position: 'Dược sĩ chính',
            cvUrl: '/cv/cv1.pdf',
            coverLetter: 'Tôi có 5 năm kinh nghiệm làm việc tại các nhà thuốc lớn...',
            status: 'pending',
            appliedDate: '2024-12-19'
        },
        {
            id: '2',
            pharmacistId: 'ps002',
            pharmacistName: 'Dược sĩ Trần Thị B',
            pharmacistAvatar: '/img/pharmacist2.jpg',
            pharmacyId: 'ph001',
            pharmacyName: 'Nhà thuốc Long Châu',
            position: 'Dược sĩ tư vấn',
            cvUrl: '/cv/cv2.pdf',
            coverLetter: 'Tôi tốt nghiệp loại giỏi và có chứng chỉ hành nghề...',
            status: 'reviewed',
            appliedDate: '2024-12-18',
            reviewedDate: '2024-12-19'
        },
        {
            id: '3',
            pharmacistId: 'ps003',
            pharmacistName: 'Dược sĩ Lê Văn C',
            pharmacistAvatar: '/img/pharmacist3.jpg',
            pharmacyId: 'ph001',
            pharmacyName: 'Nhà thuốc Long Châu',
            position: 'Dược sĩ',
            cvUrl: '/cv/cv3.pdf',
            status: 'interviewed',
            appliedDate: '2024-12-15',
            reviewedDate: '2024-12-16',
            notes: 'Ứng viên có kinh nghiệm tốt, cần phỏng vấn thêm'
        }
    ];

    const handleViewDetail = (app: JobApplication) => {
        setSelectedApp(app);
        setShowDetailModal(true);
    };

    const handleUpdateStatus = (appId: string, newStatus: JobApplication['status']) => {
        // API call to update status
        console.log('Update status:', appId, newStatus);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ứng viên tìm việc</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý CV và hồ sơ ứng tuyển</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-add mr-2"></i> Đăng tin tuyển dụng
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng ứng viên', value: stats.totalApplicants.toString(), icon: 'flaticon-users', color: 'bg-blue-500' },
                    { label: 'CV mới', value: stats.newApplications.toString(), icon: 'flaticon-new', color: 'bg-orange-500' },
                    { label: 'Đang xem xét', value: stats.reviewing.toString(), icon: 'flaticon-eye', color: 'bg-purple-500' },
                    { label: 'Danh sách ngắn', value: stats.shortlisted.toString(), icon: 'flaticon-star', color: 'bg-yellow-500' },
                    { label: 'Đã tuyển', value: stats.hired.toString(), icon: 'flaticon-checked', color: 'bg-green-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả vị trí</option>
                        <option>Dược sĩ chính</option>
                        <option>Dược sĩ tư vấn</option>
                        <option>Dược sĩ</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả trạng thái</option>
                        <option>Chờ xem xét</option>
                        <option>Đã xem</option>
                        <option>Đã phỏng vấn</option>
                        <option>Được nhận</option>
                        <option>Từ chối</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="text" placeholder="Tìm kiếm ứng viên..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Applicants List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Ứng viên</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Vị trí</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày nộp</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {applicants.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">👨‍⚕️</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{app.pharmacistName}</p>
                                            <p className="text-xs text-gray-500">ID: {app.pharmacistId}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-700 font-medium">{app.position}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {formatTimeSince(app.appliedDate)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getApplicationStatusColor(app.status)}`}>
                                        {getApplicationStatusText(app.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewDetail(app)}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200"
                                        >
                                            Xem CV
                                        </button>
                                        {app.status === 'pending' && (
                                            <button
                                                onClick={() => handleUpdateStatus(app.id, 'reviewed')}
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-bold hover:bg-green-200"
                                            >
                                                Đánh dấu đã xem
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedApp && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Chi tiết ứng viên</h3>
                            <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Applicant Info */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-4xl">👨‍⚕️</span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{selectedApp.pharmacistName}</h4>
                                    <p className="text-gray-600">Ứng tuyển: <strong>{selectedApp.position}</strong></p>
                                    <p className="text-sm text-gray-500">Nộp CV: {formatTimeSince(selectedApp.appliedDate)}</p>
                                </div>
                            </div>

                            {/* Cover Letter */}
                            {selectedApp.coverLetter && (
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">Thư xin việc</h4>
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                        <p className="text-gray-700">{selectedApp.coverLetter}</p>
                                    </div>
                                </div>
                            )}

                            {/* CV */}
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">CV đính kèm</h4>
                                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                                    <div className="text-6xl mb-3">📄</div>
                                    <p className="text-gray-700 font-bold mb-2">CV_NguyenVanA.pdf</p>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700">
                                        Tải xuống CV
                                    </button>
                                </div>
                            </div>

                            {/* Status Update */}
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Cập nhật trạng thái</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleUpdateStatus(selectedApp.id, 'reviewed')}
                                        className="px-4 py-3 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200"
                                    >
                                        Đã xem
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedApp.id, 'interviewed')}
                                        className="px-4 py-3 bg-purple-100 text-purple-700 rounded-xl font-bold hover:bg-purple-200"
                                    >
                                        Mời phỏng vấn
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedApp.id, 'accepted')}
                                        className="px-4 py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200"
                                    >
                                        Chấp nhận
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                                        className="px-4 py-3 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200"
                                    >
                                        Từ chối
                                    </button>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Ghi chú</h4>
                                <textarea
                                    placeholder="Nhập ghi chú về ứng viên..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl h-24"
                                    defaultValue={selectedApp.notes}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                            >
                                Đóng
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark">
                                Lưu ghi chú
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
