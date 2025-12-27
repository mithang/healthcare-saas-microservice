"use client";
import React, { useState } from 'react';

export default function SeminarInvitationsPage() {
    const [selectedSeminar, setSelectedSeminar] = useState('');

    const invitations = [
        { id: 1, seminar: 'Hội thảo Dược lâm sàng 2024', sent: 450, opened: 320, registered: 245, date: '2024-12-10' },
        { id: 2, seminar: 'Cập nhật Điều trị Tim mạch', sent: 300, opened: 210, registered: 180, date: '2024-12-15' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mời tham dự Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Gửi email mời và theo dõi phản hồi</p>
                </div>
            </div>

            {/* Send Invitation Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Gửi Lời mời</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Chọn Hội thảo</label>
                        <select
                            value={selectedSeminar}
                            onChange={(e) => setSelectedSeminar(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white"
                        >
                            <option value="">-- Chọn hội thảo --</option>
                            <option value="1">Hội thảo Dược lâm sàng 2024</option>
                            <option value="2">Cập nhật Điều trị Tim mạch</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Người nhận</label>
                        <div className="grid grid-cols-2 gap-4">
                            <select className="px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                <option>Tất cả học viên</option>
                                <option>Theo khóa học</option>
                                <option>Theo địa bàn</option>
                            </select>
                            <select className="px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                <option>TP.HCM</option>
                                <option>Hà Nội</option>
                                <option>Đà Nẵng</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề Email</label>
                        <input
                            type="text"
                            defaultValue="Mời tham dự Hội thảo Dược lâm sàng 2024"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung Email</label>
                        <textarea
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
                            defaultValue="Kính gửi {name},\n\nChúng tôi trân trọng kính mời Quý Anh/Chị tham dự Hội thảo Dược lâm sàng 2024.\n\nThời gian: {date}\nĐịa điểm: {location}\n\nVui lòng đăng ký tại: {link}\n\nTrân trọng!"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">
                            Variables: {'{'}name{'}'}, {'{'}date{'}'}, {'{'}location{'}'}, {'{'}link{'}'}
                        </p>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark">
                        Gửi Lời mời
                    </button>
                </div>
            </div>

            {/* Invitation History */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Lịch sử Gửi mời</h2>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Hội thảo</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Đã gửi</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Đã mở</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Đã đăng ký</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Tỷ lệ chuyển đổi</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày gửi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {invitations.map((inv) => (
                            <tr key={inv.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{inv.seminar}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{inv.sent}</td>
                                <td className="px-6 py-4">
                                    <span className="text-blue-600 font-bold">{inv.opened}</span>
                                    <span className="text-xs text-gray-500 ml-1">
                                        ({((inv.opened / inv.sent) * 100).toFixed(1)}%)
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-green-600 font-bold">{inv.registered}</span>
                                    <span className="text-xs text-gray-500 ml-1">
                                        ({((inv.registered / inv.sent) * 100).toFixed(1)}%)
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-purple-600">
                                        {((inv.registered / inv.opened) * 100).toFixed(1)}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
