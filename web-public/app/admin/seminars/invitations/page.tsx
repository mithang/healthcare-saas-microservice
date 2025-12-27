"use client";

import React, { useState, useEffect } from 'react';
import seminarService, { SeminarInvitation, Seminar } from '@/services/seminar.service';

export default function SeminarInvitationsPage() {
    const [selectedSeminarId, setSelectedSeminarId] = useState('');
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [invitations, setInvitations] = useState<SeminarInvitation[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [invitationData, seminarData] = await Promise.all([
                seminarService.getInvitations(),
                seminarService.getSeminars()
            ]);
            setInvitations(invitationData);
            setSeminars(seminarData);
        } catch (error) {
            console.error('Failed to fetch invitation data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSendInvitation = async () => {
        if (!selectedSeminarId) return alert('Vui lòng chọn hội thảo');
        try {
            await seminarService.createInvitation({
                seminarId: parseInt(selectedSeminarId),
                sent: 500, // Mock count
                opened: 0,
                registered: 0,
                date: new Date().toISOString().split('T')[0]
            });
            alert('Đã gửi lời mời thành công!');
            fetchData();
        } catch (error) {
            console.error('Failed to send invitation', error);
        }
    };

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
                            value={selectedSeminarId}
                            onChange={(e) => setSelectedSeminarId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white"
                        >
                            <option value="">-- Chọn hội thảo --</option>
                            {seminars.map(s => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
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
                            defaultValue="Mời tham dự Hội thảo"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung Email</label>
                        <textarea
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
                            defaultValue="Kính gửi {name},\n\nChúng tôi trân trọng kính mời Quý Anh/Chị tham dự Hội thảo.\n\nThời gian: {date}\nĐịa điểm: {location}\n\nVui lòng đăng ký tại: {link}\n\nTrân trọng!"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">
                            Variables: {'{'}name{'}'}, {'{'}date{'}'}, {'{'}location{'}'}, {'{'}link{'}'}
                        </p>
                    </div>
                    <button
                        onClick={handleSendInvitation}
                        className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
                    >
                        Gửi Lời mời
                    </button>
                </div>
            </div>

            {/* Invitation History */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Lịch sử Gửi mời</h2>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Đang tải...</div>
                ) : (
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
                                <tr key={inv.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{inv.seminar?.title}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{inv.sent}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-blue-600 font-bold">{inv.opened}</span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            ({inv.sent > 0 ? ((inv.opened / inv.sent) * 100).toFixed(1) : '0'}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-green-600 font-bold">{inv.registered}</span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            ({inv.sent > 0 ? ((inv.registered / inv.sent) * 100).toFixed(1) : '0'}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-purple-600">
                                            {inv.opened > 0 ? ((inv.registered / inv.opened) * 100).toFixed(1) : '0'}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                                </tr>
                            ))}
                            {invitations.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Chưa có lịch sử gửi mời
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
