"use client";
import React, { useState } from 'react';
import { PharmacyData, MEMBER_RANKS, getMemberRankByPoints } from '@/types/pharmacy';

export default function PharmaciesManagementPage() {
    const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyData | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Mock data
    const pharmacies: PharmacyData[] = [
        {
            id: '1',
            drugName: 'Nhà thuốc Long Châu',
            address: '123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM',
            status: 'active',
            createDate: '2024-01-15',
            phoneNumber: '0909123456',
            installer: 'Admin System',
            outletOwner: 'Nguyễn Văn A',
            provinceCode: 'HCM',
            districtCode: 'Q7',
            wardCode: 'TP',
            streetName: '123 Nguyễn Văn Linh',
            os: 'Android',
            token: 'abc123xyz',
            scName: 'SC_LONGCHAU',
            gppNumber: 'GPP-2024-001',
            gppImage: '/img/gpp/longchau.jpg',
            pointsCMEOnline: 15500,
            memberRank: 'platinum',
            dynamicLink: 'https://app.healthcare.vn/pharmacy/longchau',
            bannerLandingPage: '/img/banners/longchau.jpg',
            verified: true,
            rating: 4.8,
            reviewCount: 1234
        },
        {
            id: '2',
            drugName: 'Nhà thuốc Pharmacity',
            address: '456 Lê Văn Việt, Phường Tăng Nhơn Phú A, Quận 9, TP.HCM',
            status: 'active',
            createDate: '2024-02-20',
            phoneNumber: '0909234567',
            installer: 'Admin System',
            outletOwner: 'Trần Thị B',
            provinceCode: 'HCM',
            districtCode: 'Q9',
            wardCode: 'TNPA',
            streetName: '456 Lê Văn Việt',
            os: 'iOS',
            token: 'def456uvw',
            scName: 'SC_PHARMACITY',
            gppNumber: 'GPP-2024-002',
            gppImage: '/img/gpp/pharmacity.jpg',
            pointsCMEOnline: 8200,
            memberRank: 'gold',
            dynamicLink: 'https://app.healthcare.vn/pharmacy/pharmacity',
            bannerLandingPage: '/img/banners/pharmacity.jpg',
            verified: true,
            rating: 4.6,
            reviewCount: 856
        }
    ];

    const handleEdit = (pharmacy: PharmacyData) => {
        setSelectedPharmacy(pharmacy);
        setShowEditModal(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Nhà thuốc</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý thông tin và xác minh nhà thuốc</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-add mr-2"></i> Thêm nhà thuốc
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng nhà thuốc', value: '1,234', icon: 'flaticon-pharmacy', color: 'bg-blue-500' },
                    { label: 'Đang hoạt động', value: '1,156', icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Chờ xác minh', value: '45', icon: 'flaticon-pending', color: 'bg-orange-500' },
                    { label: 'Có GPP', value: '892', icon: 'flaticon-certificate', color: 'bg-purple-500' },
                    { label: 'Platinum+', value: '234', icon: 'flaticon-star', color: 'bg-yellow-500' },
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
                        <option>Tất cả hạng</option>
                        <option>Diamond</option>
                        <option>Platinum</option>
                        <option>Gold</option>
                        <option>Silver</option>
                        <option>Bronze</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả tỉnh/thành</option>
                        <option>TP. Hồ Chí Minh</option>
                        <option>Hà Nội</option>
                        <option>Đà Nẵng</option>
                    </select>
                    <input type="text" placeholder="Tìm kiếm..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Pharmacies List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Nhà thuốc</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Chủ sở hữu</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Địa chỉ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">GPP</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Điểm CME</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Hạng</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pharmacies.map((pharmacy) => {
                            const rankInfo = MEMBER_RANKS[pharmacy.memberRank];
                            return (
                                <tr key={pharmacy.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-xl">💊</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{pharmacy.drugName}</p>
                                                <p className="text-xs text-gray-500">{pharmacy.phoneNumber}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{pharmacy.outletOwner}</td>
                                    <td className="px-6 py-4 text-gray-600 text-xs max-w-xs truncate">
                                        {pharmacy.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pharmacy.gppNumber ? (
                                            <div>
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                                                    ✓ Có GPP
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">{pharmacy.gppNumber}</p>
                                            </div>
                                        ) : (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">
                                                Chưa có
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-blue-600">{pharmacy.pointsCMEOnline.toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{rankInfo.icon}</span>
                                            <span className="font-bold" style={{ color: rankInfo.color }}>
                                                {pharmacy.memberRank.toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${pharmacy.status === 'active' ? 'bg-green-100 text-green-700' :
                                                pharmacy.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {pharmacy.status === 'active' ? 'Hoạt động' :
                                                pharmacy.status === 'pending' ? 'Chờ duyệt' : 'Tạm dừng'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(pharmacy)}
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
            {showEditModal && selectedPharmacy && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Chi tiết Nhà thuốc</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên nhà thuốc</label>
                                <input type="text" value={selectedPharmacy.drugName} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chủ sở hữu</label>
                                <input type="text" value={selectedPharmacy.outletOwner} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                <input type="text" value={selectedPharmacy.phoneNumber} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày tạo</label>
                                <input type="text" value={selectedPharmacy.createDate} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>

                            {/* Location */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ đầy đủ</label>
                                <input type="text" value={selectedPharmacy.address} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tỉnh/Thành</label>
                                <input type="text" value={selectedPharmacy.provinceCode} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Quận/Huyện</label>
                                <input type="text" value={selectedPharmacy.districtCode} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>

                            {/* GPP */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số GPP</label>
                                <input type="text" value={selectedPharmacy.gppNumber} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh GPP</label>
                                <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <span className="text-gray-500">Xem ảnh GPP</span>
                                </div>
                            </div>

                            {/* Gamification */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Điểm CME Online</label>
                                <input type="number" value={selectedPharmacy.pointsCMEOnline} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hạng thành viên</label>
                                <select value={selectedPharmacy.memberRank} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
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
                                <input type="text" value={selectedPharmacy.os} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">SC Name</label>
                                <input type="text" value={selectedPharmacy.scName} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>

                            {/* Status */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select value={selectedPharmacy.status} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
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
