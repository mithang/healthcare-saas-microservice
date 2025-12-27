"use client";
import React, { useState } from 'react';
import { PharmacistData, MEMBER_RANKS } from '@/types/pharmacy';

export default function PharmacistsManagementPage() {
    const [selectedPharmacist, setSelectedPharmacist] = useState<PharmacistData | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Mock data
    const pharmacists: PharmacistData[] = [
        {
            id: '1',
            fullName: 'Dược sĩ Nguyễn Văn A',
            address: '123 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM',
            status: 'active',
            createDate: '2024-01-10',
            phoneNumber: '0909111222',
            installer: 'Admin System',
            provinceCode: 'HCM',
            districtCode: 'Q1',
            wardCode: 'BT',
            streetName: '123 Lê Lợi',
            os: 'Android',
            token: 'token123',
            scName: 'SC_DS_NGUYENVANA',
            specialistly: 'Dược lâm sàng',
            career: 'Dược sĩ chính',
            pointsCMEOnline: 12000,
            memberRank: 'gold',
            dynamicLink: 'https://app.healthcare.vn/pharmacist/nguyenvana',
            bannerLandingPage: '/img/banners/pharmacist1.jpg',
            verified: true,
            rating: 4.9,
            reviewCount: 567
        },
        {
            id: '2',
            fullName: 'Dược sĩ Trần Thị B',
            address: '456 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
            status: 'active',
            createDate: '2024-02-15',
            phoneNumber: '0909333444',
            installer: 'Admin System',
            provinceCode: 'HCM',
            districtCode: 'Q1',
            wardCode: 'BN',
            streetName: '456 Nguyễn Huệ',
            os: 'iOS',
            token: 'token456',
            scName: 'SC_DS_TRANTHIB',
            specialistly: 'Dược học cổ truyền',
            career: 'Dược sĩ tư vấn',
            pointsCMEOnline: 18500,
            memberRank: 'platinum',
            dynamicLink: 'https://app.healthcare.vn/pharmacist/tranthib',
            bannerLandingPage: '/img/banners/pharmacist2.jpg',
            verified: true,
            rating: 4.8,
            reviewCount: 423
        }
    ];

    const handleEdit = (pharmacist: PharmacistData) => {
        setSelectedPharmacist(pharmacist);
        setShowEditModal(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Dược sĩ</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý thông tin và xác minh dược sĩ</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-add mr-2"></i> Thêm dược sĩ
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng dược sĩ', value: '2,456', icon: 'flaticon-user', color: 'bg-blue-500' },
                    { label: 'Đang hoạt động', value: '2,234', icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Chờ xác minh', value: '78', icon: 'flaticon-pending', color: 'bg-orange-500' },
                    { label: 'Đã xác minh', value: '2,156', icon: 'flaticon-verified', color: 'bg-purple-500' },
                    { label: 'Platinum+', value: '345', icon: 'flaticon-star', color: 'bg-yellow-500' },
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
                        <option>Tất cả trạng thái</option>
                        <option>Hoạt động</option>
                        <option>Tạm dừng</option>
                        <option>Chờ xác minh</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả chuyên môn</option>
                        <option>Dược lâm sàng</option>
                        <option>Dược học cổ truyền</option>
                        <option>Dược công nghiệp</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả hạng</option>
                        <option>Diamond</option>
                        <option>Platinum</option>
                        <option>Gold</option>
                        <option>Silver</option>
                        <option>Bronze</option>
                    </select>
                    <input type="text" placeholder="Tìm kiếm..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Pharmacists List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Dược sĩ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Chuyên môn</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Vị trí</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Địa chỉ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Điểm CME</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Hạng</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pharmacists.map((pharmacist) => {
                            const rankInfo = MEMBER_RANKS[pharmacist.memberRank];
                            return (
                                <tr key={pharmacist.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-xl">👨‍⚕️</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{pharmacist.fullName}</p>
                                                <p className="text-xs text-gray-500">{pharmacist.phoneNumber}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                            {pharmacist.specialistly}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{pharmacist.career}</td>
                                    <td className="px-6 py-4 text-gray-600 text-xs max-w-xs truncate">
                                        {pharmacist.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-blue-600">{pharmacist.pointsCMEOnline.toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{rankInfo.icon}</span>
                                            <span className="font-bold" style={{ color: rankInfo.color }}>
                                                {pharmacist.memberRank.toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${pharmacist.status === 'active' ? 'bg-green-100 text-green-700' :
                                                pharmacist.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {pharmacist.status === 'active' ? 'Hoạt động' :
                                                pharmacist.status === 'pending' ? 'Chờ duyệt' : 'Tạm dừng'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(pharmacist)}
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold"
                                            >
                                                Xem
                                            </button>
                                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                                                Duyệt
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showEditModal && selectedPharmacist && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Chi tiết Dược sĩ</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                <input type="text" value={selectedPharmacist.fullName} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                <input type="text" value={selectedPharmacist.phoneNumber} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chuyên môn</label>
                                <input type="text" value={selectedPharmacist.specialistly} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Vị trí/Nghề nghiệp</label>
                                <input type="text" value={selectedPharmacist.career} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>

                            {/* Location */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ đầy đủ</label>
                                <input type="text" value={selectedPharmacist.address} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tỉnh/Thành</label>
                                <input type="text" value={selectedPharmacist.provinceCode} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Quận/Huyện</label>
                                <input type="text" value={selectedPharmacist.districtCode} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>

                            {/* Gamification */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Điểm CME Online</label>
                                <input type="number" value={selectedPharmacist.pointsCMEOnline} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hạng thành viên</label>
                                <select value={selectedPharmacist.memberRank} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option value="bronze">Bronze</option>
                                    <option value="silver">Silver</option>
                                    <option value="gold">Gold</option>
                                    <option value="platinum">Platinum</option>
                                    <option value="diamond">Diamond</option>
                                </select>
                            </div>

                            {/* System */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">OS</label>
                                <input type="text" value={selectedPharmacist.os} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">SC Name</label>
                                <input type="text" value={selectedPharmacist.scName} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày tạo</label>
                                <input type="text" value={selectedPharmacist.createDate} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Người cài đặt</label>
                                <input type="text" value={selectedPharmacist.installer} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>

                            {/* Marketing */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Dynamic Link</label>
                                <input type="text" value={selectedPharmacist.dynamicLink} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>

                            {/* Status */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select value={selectedPharmacist.status} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Tạm dừng</option>
                                    <option value="pending">Chờ duyệt</option>
                                    <option value="suspended">Đình chỉ</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
                                Đóng
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
