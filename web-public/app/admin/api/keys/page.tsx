"use client";
import React, { useState } from 'react';

export default function APIKeysPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const apiKeys = [
        { id: 1, name: 'Mobile App Production', key: 'pk_live_abc123...', created: '15/12/2024', lastUsed: '20/12/2024', requests: 125000, status: 'active' },
        { id: 2, name: 'Partner Integration', key: 'pk_live_def456...', created: '10/12/2024', lastUsed: '19/12/2024', requests: 45000, status: 'active' },
        { id: 3, name: 'Development Test', key: 'pk_test_ghi789...', created: '05/12/2024', lastUsed: '18/12/2024', requests: 8500, status: 'inactive' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý khóa API và quyền truy cập</p>
                </div>
                <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-add mr-2"></i> Tạo API Key
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng API Keys', value: '12', icon: 'flaticon-key', color: 'bg-blue-500' },
                    { label: 'Đang hoạt động', value: '8', icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Requests hôm nay', value: '45.2K', icon: 'flaticon-chart', color: 'bg-purple-500' },
                    { label: 'Rate limit', value: '95%', icon: 'flaticon-gauge', color: 'bg-orange-500' },
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

            {/* API Keys List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Tên</th>
                            <th className="px-6 py-4 font-bold text-gray-700">API Key</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày tạo</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Lần dùng cuối</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Requests</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {apiKeys.map((key) => (
                            <tr key={key.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{key.name}</td>
                                <td className="px-6 py-4">
                                    <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-mono text-xs">
                                        {key.key}
                                    </code>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{key.created}</td>
                                <td className="px-6 py-4 text-gray-600">{key.lastUsed}</td>
                                <td className="px-6 py-4 font-bold text-blue-600">{key.requests.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${key.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {key.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                            Sao chép
                                        </button>
                                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* API Documentation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Endpoints phổ biến</h3>
                    <div className="space-y-2">
                        {[
                            { method: 'GET', endpoint: '/api/patients', desc: 'Lấy danh sách bệnh nhân' },
                            { method: 'POST', endpoint: '/api/appointments', desc: 'Tạo lịch hẹn' },
                            { method: 'GET', endpoint: '/api/prescriptions/:id', desc: 'Xem đơn thuốc' },
                            { method: 'PUT', endpoint: '/api/patients/:id', desc: 'Cập nhật thông tin' },
                        ].map((ep, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${ep.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                                        ep.method === 'POST' ? 'bg-green-100 text-green-700' :
                                            'bg-orange-100 text-orange-700'
                                    }`}>
                                    {ep.method}
                                </span>
                                <code className="flex-1 text-xs font-mono text-gray-700">{ep.endpoint}</code>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold">
                        Xem tài liệu đầy đủ
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Rate Limits</h3>
                    <div className="space-y-4">
                        {[
                            { tier: 'Free', limit: '1,000', current: 850 },
                            { tier: 'Basic', limit: '10,000', current: 7200 },
                            { tier: 'Pro', limit: '100,000', current: 45000 },
                        ].map((tier, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-gray-700">{tier.tier}</span>
                                    <span className="text-sm text-gray-600">{tier.current.toLocaleString()} / {tier.limit} requests/day</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${(tier.current / parseInt(tier.limit.replace(',', ''))) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Tạo API Key mới</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên API Key</label>
                                <input type="text" placeholder="Production API" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Môi trường</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option>Production</option>
                                    <option>Development</option>
                                    <option>Testing</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Rate Limit</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option>1,000 requests/day</option>
                                    <option>10,000 requests/day</option>
                                    <option>100,000 requests/day</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
                                Hủy
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">
                                Tạo Key
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
