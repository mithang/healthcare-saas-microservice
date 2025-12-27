"use client";
import React from 'react';
import StatsCard from '@/components/admin/StatsCard';

export default function FinanceReportsManagement() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Báo cáo Tài chính</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard title="Tổng doanh thu" value="525.5M" icon="flaticon-money" color="green" trend={{ value: "+15.2%", isPositive: true }} />
                <StatsCard title="Tổng chi phí" value="125.5M" icon="flaticon-chart-line" color="orange" trend={{ value: "+5.3%", isPositive: false }} />
                <StatsCard title="Lợi nhuận" value="400M" icon="flaticon-wallet" color="blue" trend={{ value: "+18.7%", isPositive: true }} />
                <StatsCard title="Hoa hồng" value="52.5M" icon="flaticon-percentage" color="purple" trend={{ value: "+12.1%", isPositive: true }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Doanh thu theo nguồn</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Đặt khám', value: '250M', percent: '48%', color: 'bg-blue-500' },
                            { name: 'Mua thuốc', value: '175M', percent: '33%', color: 'bg-green-500' },
                            { name: 'Xét nghiệm', value: '100.5M', percent: '19%', color: 'bg-purple-500' },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-700">{item.name}</span>
                                    <span className="text-sm font-bold text-gray-900">{item.value} ({item.percent})</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`${item.color} h-2 rounded-full`} style={{ width: item.percent }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Chi phí theo loại</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Hoa hồng đối tác', value: '52.5M', percent: '42%', color: 'bg-orange-500' },
                            { name: 'Vận hành hệ thống', value: '40M', percent: '32%', color: 'bg-red-500' },
                            { name: 'Marketing', value: '33M', percent: '26%', color: 'bg-yellow-500' },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-700">{item.name}</span>
                                    <span className="text-sm font-bold text-gray-900">{item.value} ({item.percent})</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`${item.color} h-2 rounded-full`} style={{ width: item.percent }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
