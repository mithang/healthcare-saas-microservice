"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function HealthRecordPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const healthMetrics = [
        { label: 'Huyết áp', value: '120/80', unit: 'mmHg', status: 'normal', icon: 'flaticon-heart' },
        { label: 'Đường huyết', value: '95', unit: 'mg/dL', status: 'normal', icon: 'flaticon-blood' },
        { label: 'BMI', value: '23.5', unit: 'kg/m²', status: 'normal', icon: 'flaticon-weight' },
        { label: 'Nhiệt độ', value: '36.8', unit: '°C', status: 'normal', icon: 'flaticon-thermometer' },
    ];

    const recentRecords = [
        { date: '2024-12-15', type: 'Khám bệnh', doctor: 'BS. Nguyễn Văn A', hospital: 'BV Chợ Rẫy', diagnosis: 'Viêm họng cấp' },
        { date: '2024-12-10', type: 'Xét nghiệm', doctor: 'BS. Trần Thị B', hospital: 'PK Đa khoa', diagnosis: 'Xét nghiệm máu tổng quát' },
        { date: '2024-12-05', type: 'Đơn thuốc', doctor: 'BS. Lê Văn C', hospital: 'BV 115', diagnosis: 'Kê đơn thuốc điều trị' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ Sức khỏe Điện tử</h1>
                    <p className="text-gray-600">Quản lý toàn bộ thông tin sức khỏe của bạn</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {healthMetrics.map((metric, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <i className={`fi ${metric.icon} text-2xl text-blue-600`}></i>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">Bình thường</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{metric.value} <span className="text-sm text-gray-500">{metric.unit}</span></p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Quick Links */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục</h3>
                            <div className="space-y-2">
                                {[
                                    { icon: 'flaticon-medical-history', label: 'Lịch sử khám bệnh', link: '/health-record/medical-history', count: 12 },
                                    { icon: 'flaticon-prescription', label: 'Đơn thuốc', link: '/health-record/prescriptions', count: 8 },
                                    { icon: 'flaticon-test-tube', label: 'Kết quả xét nghiệm', link: '/health-record/lab-results', count: 5 },
                                    { icon: 'flaticon-vaccine', label: 'Tiêm chủng', link: '/health-record/vaccinations', count: 15 },
                                    { icon: 'flaticon-heart-rate', label: 'Chỉ số sức khỏe', link: '/health-record/vitals', count: 45 },
                                    { icon: 'flaticon-share', label: 'Chia sẻ hồ sơ', link: '/health-record/share', count: 0 },
                                ].map((item, i) => (
                                    <Link key={i} href={item.link}>
                                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <i className={`fi ${item.icon} text-xl text-gray-600 group-hover:text-primary`}></i>
                                                <span className="font-medium text-gray-700 group-hover:text-primary">{item.label}</span>
                                            </div>
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-bold">{item.count}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {/* Recent Records */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Hồ sơ gần đây</h3>
                                <Link href="/health-record/medical-history" className="text-primary font-bold text-sm hover:underline">
                                    Xem tất cả →
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recentRecords.map((record, i) => (
                                    <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold">{record.type}</span>
                                                <p className="font-bold text-gray-900 mt-2">{record.diagnosis}</p>
                                            </div>
                                            <span className="text-sm text-gray-500">{record.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Bác sĩ: {record.doctor}</p>
                                        <p className="text-sm text-gray-600">{record.hospital}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Health Timeline */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Dòng thời gian Sức khỏe</h3>
                            <div className="relative">
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                                {[
                                    { date: '15/12/2024', event: 'Khám bệnh tại BV Chợ Rẫy', type: 'visit' },
                                    { date: '10/12/2024', event: 'Xét nghiệm máu tổng quát', type: 'test' },
                                    { date: '05/12/2024', event: 'Nhận đơn thuốc điều trị', type: 'prescription' },
                                    { date: '01/12/2024', event: 'Tiêm vaccine cúm', type: 'vaccine' },
                                ].map((item, i) => (
                                    <div key={i} className="relative pl-12 pb-8 last:pb-0">
                                        <div className="absolute left-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white"></div>
                                        <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                                        <p className="font-medium text-gray-900">{item.event}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4 justify-center">
                    <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition">
                        Tải lên tài liệu
                    </button>
                    <button className="px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-blue-50 transition">
                        Xuất PDF
                    </button>
                    <Link href="/health-record/share">
                        <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition">
                            Chia sẻ với bác sĩ
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
