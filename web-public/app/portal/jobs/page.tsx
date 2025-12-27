"use client";
import React, { useState } from 'react';
import { JobPosting } from '@/types/job-application';

const MOCK_JOBS: JobPosting[] = [
    {
        id: '1',
        pharmacyId: 'p1',
        pharmacyName: 'Nhà thuốc An Khang',
        position: 'Dược sĩ trưởng bán thời gian',
        description: 'Quản lý quầy thuốc, tư vấn khách hàng, kiểm soát nhập xuất tồn.',
        requirements: ['Chứng chỉ hành nghề', 'Kinh nghiệm 2 năm', 'Giao tiếp tốt'],
        salary: '10.000.000 - 15.000.000 đ',
        location: 'Q. Bình Thạnh, TP.HCM',
        type: 'part-time',
        status: 'open',
        postedDate: '2024-12-15T10:00:00Z',
        applicationCount: 5
    },
    {
        id: '2',
        pharmacyId: 'p2',
        pharmacyName: 'Nhà thuốc Long Châu',
        position: 'Dược sĩ bán hàng',
        description: 'Tư vấn bán hàng, sắp xếp quầy kệ, vệ sinh cửa hàng.',
        requirements: ['Tốt nghiệp Trung cấp Dược trở lên', 'Nhanh nhẹn', 'Trung thực'],
        salary: '8.000.000 - 12.000.000 đ',
        location: 'Q. 1, TP.HCM',
        type: 'full-time',
        status: 'open',
        postedDate: '2024-12-18T09:00:00Z',
        applicationCount: 12
    },
    {
        id: '3',
        pharmacyId: 'p3',
        pharmacyName: 'Pharmacity',
        position: 'Quản lý cửa hàng',
        description: 'Chịu trách nhiệm doanh số, quản lý nhân sự, làm việc với cơ quan chức năng.',
        requirements: ['Đại học Dược', 'Kinh nghiệm quản lý', 'Tiếng Anh giao tiếp'],
        salary: 'Thỏa thuận',
        location: 'Q. 3, TP.HCM',
        type: 'full-time',
        status: 'open',
        postedDate: '2024-12-20T08:00:00Z',
        applicationCount: 2
    }
];

export default function JobsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Việc làm & Tuyển dụng</h1>
                    <p className="text-gray-500 text-sm mt-1">Tìm kiếm cơ hội nghề nghiệp phù hợp với bạn</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm">
                    Đăng tin tuyển dụng
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm vị trí, nhà thuốc..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                    <option value="">Tất cả địa điểm</option>
                    <option value="hcm">TP.HCM</option>
                    <option value="hn">Hà Nội</option>
                </select>
                <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                    <option value="">Loại hình</option>
                    <option value="full-time">Toàn thời gian</option>
                    <option value="part-time">Bán thời gian</option>
                </select>
                <button className="px-6 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    Tìm kiếm
                </button>
            </div>

            {/* Job List */}
            <div className="grid gap-4">
                {MOCK_JOBS.map((job) => (
                    <div key={job.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-xl font-bold">
                                    {job.pharmacyName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{job.position}</h3>
                                    <p className="text-gray-500 font-medium">{job.pharmacyName}</p>
                                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <i className="fi flaticon-pin text-gray-400"></i>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <i className="fi flaticon-money text-gray-400"></i>
                                            {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <i className="fi flaticon-clock text-gray-400"></i>
                                            {job.type === 'full-time' ? 'Toàn thời gian' : 'Bán thời gian'}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        {job.requirements.map((req, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                                {req}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-xs text-gray-400">Đăng ngày {new Date(job.postedDate).toLocaleDateString('vi-VN')}</span>
                                <button className="px-4 py-2 border border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors">
                                    Ứng tuyển ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
