"use client";
import React, { useState } from 'react';
import { EcosystemUser, getUserStatusColor, getUserStatusText } from '@/types/user';

const MOCK_USERS: EcosystemUser[] = [
    {
        Id: 'u1',
        UserName: 'nguyenvana',
        Email: 'nguyenvana@gmail.com',
        FullName: 'Nguyễn Văn A',
        Phone: '0901234567',
        Address: '123 Nguyễn Văn Linh, Q7, TP.HCM',
        Age: 34,
        BirthDay: '1990-01-01T00:00:00Z',
        Avatar: '', // Placeholder or URL
        IsDoctor: false,
        IsPartner: false,
        IsApproved: true,
        IsLockedOut: false,
        IsBanned: false,
        CreateDate: '2024-01-01T00:00:00Z',
        LastLoginDate: '2024-12-20T10:00:00Z',
        LastPasswordChangedDate: '2024-06-01T00:00:00Z',
        LastLockoutDate: '1970-01-01T00:00:00Z',
        FailedPasswordAnswerAttempt: 0,
        FailedPasswordAttemptCount: 0,
        Slug: 'nguyen-van-a',
        Chieucao: 170,
        Cannang: 65,
        Nhommau: 'A',
        SystemSource: 'Web',
        IsUploadAvatarWeb: true,
        Noisinh: 'TP.HCM'
    },
    {
        Id: 'u2',
        UserName: 'tranthib',
        Email: 'tranthib@gmail.com',
        FullName: 'Trần Thị B',
        Phone: '0987654321',
        Address: '456 Lê Văn Việt, Q9, TP.HCM',
        Age: 28,
        BirthDay: '1995-05-15T00:00:00Z',
        Avatar: '',
        IsDoctor: false,
        IsPartner: true,
        IsApproved: true,
        IsLockedOut: false,
        IsBanned: false,
        CreateDate: '2024-02-15T00:00:00Z',
        LastLoginDate: '2024-12-19T15:30:00Z',
        LastPasswordChangedDate: '2024-02-15T00:00:00Z',
        LastLockoutDate: '1970-01-01T00:00:00Z',
        FailedPasswordAnswerAttempt: 0,
        FailedPasswordAttemptCount: 0,
        Slug: 'tran-thi-b',
        Chieucao: 158,
        Cannang: 50,
        Nhommau: 'O',
        SystemSource: 'Mobile',
        IsUploadAvatarWeb: true,
        Noisinh: 'Đồng Nai'
    },
    {
        Id: 'u3',
        UserName: 'levanc',
        Email: 'levanc@yahoo.com',
        FullName: 'Lê Văn C',
        Phone: '0912345678',
        Address: '789 Võ Văn Ngân, Thủ Đức',
        Age: 45,
        BirthDay: '1978-08-20T00:00:00Z',
        Avatar: '',
        IsDoctor: false,
        IsPartner: false,
        IsApproved: false,
        IsLockedOut: false,
        IsBanned: false,
        CreateDate: '2024-12-01T00:00:00Z',
        LastLoginDate: '2024-12-01T10:00:00Z',
        LastPasswordChangedDate: '2024-12-01T00:00:00Z',
        LastLockoutDate: '1970-01-01T00:00:00Z',
        FailedPasswordAnswerAttempt: 0,
        FailedPasswordAttemptCount: 0,
        Slug: 'le-van-c',
        SystemSource: 'Web',
        IsUploadAvatarWeb: false
    }
];

export default function PatientsPage() {
    const [selectedUser, setSelectedUser] = useState<EcosystemUser | null>(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Bệnh nhân</h1>
                    <p className="text-gray-500 text-sm mt-1">Danh sách người dùng và hồ sơ sức khỏe trong hệ sinh thái</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm">
                    Thêm bệnh nhân
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                <input
                    type="text"
                    placeholder="Tìm tên, username, SĐT..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="banned">Đã cấm</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="p-4">Họ tên / Username</th>
                                <th className="p-4">Liên hệ</th>
                                <th className="p-4">Thông tin cá nhân</th>
                                <th className="p-4">Chỉ số sức khỏe</th>
                                <th className="p-4">Trạng thái</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {MOCK_USERS.map((user) => (
                                <tr key={user.Id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                                                {user.FullName ? user.FullName.charAt(0) : user.UserName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{user.FullName || 'Chưa cập nhật'}</div>
                                                <div className="text-xs text-gray-500">@{user.UserName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-gray-900">{user.Phone || '---'}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[150px]">{user.Email}</div>
                                    </td>
                                    <td className="p-4">
                                        <div>{user.BirthDay ? new Date(user.BirthDay).toLocaleDateString('vi-VN') : '---'}</div>
                                        <div className="text-xs text-gray-500">Tuổi: {user.Age || '--'}</div>
                                    </td>
                                    <td className="p-4">
                                        <div>Cao: {user.Chieucao ? `${user.Chieucao} cm` : '--'}</div>
                                        <div className="text-xs text-gray-500">Nặng: {user.Cannang ? `${user.Cannang} kg` : '--'}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getUserStatusColor(user)}`}>
                                            {getUserStatusText(user)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-xs transition-colors"
                                        >
                                            Hồ sơ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-gray-900">Hồ sơ người dùng</h3>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-8">
                            {/* Header Info */}
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center text-4xl text-gray-400">
                                    {selectedUser.Avatar ? (
                                        <img src={selectedUser.Avatar} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                                    ) : (
                                        <i className="fi flaticon-user"></i>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.FullName}</h2>
                                    <p className="text-gray-500">@{selectedUser.UserName}</p>
                                    <div className="flex gap-3 mt-3">
                                        <div className="px-3 py-1 bg-gray-50 rounded-lg text-sm text-gray-600">
                                            ID: <span className="font-mono text-xs">{selectedUser.Id}</span>
                                        </div>
                                        <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getUserStatusColor(selectedUser)}`}>
                                            {getUserStatusText(selectedUser)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <div className="col-span-2 border-b border-gray-100 pb-2 mb-2">
                                    <h4 className="font-bold text-green-700 uppercase text-xs tracking-wider">Thông tin cá nhân</h4>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Email</label>
                                    <p className="font-medium text-gray-900">{selectedUser.Email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Số điện thoại</label>
                                    <p className="font-medium text-gray-900">{selectedUser.Phone || '---'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Ngày sinh</label>
                                    <p className="font-medium text-gray-900">
                                        {selectedUser.BirthDay ? new Date(selectedUser.BirthDay).toLocaleDateString('vi-VN') : '---'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Nơi sinh</label>
                                    <p className="font-medium text-gray-900">{selectedUser.Noisinh || '---'}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Địa chỉ</label>
                                    <p className="font-medium text-gray-900">{selectedUser.Address || '---'}</p>
                                </div>

                                <div className="col-span-2 border-b border-gray-100 pb-2 mb-2 mt-4">
                                    <h4 className="font-bold text-green-700 uppercase text-xs tracking-wider">Chỉ số cơ thể & Y tế</h4>
                                </div>
                                <div className="grid grid-cols-3 gap-4 col-span-2">
                                    <div className="p-4 bg-blue-50 rounded-xl text-center">
                                        <div className="text-xs text-blue-500 font-bold uppercase mb-1">Chiều cao</div>
                                        <div className="text-xl font-bold text-blue-700">{selectedUser.Chieucao || '--'} <span className="text-sm font-normal text-blue-500">cm</span></div>
                                    </div>
                                    <div className="p-4 bg-orange-50 rounded-xl text-center">
                                        <div className="text-xs text-orange-500 font-bold uppercase mb-1">Cân nặng</div>
                                        <div className="text-xl font-bold text-orange-700">{selectedUser.Cannang || '--'} <span className="text-sm font-normal text-orange-500">kg</span></div>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-xl text-center">
                                        <div className="text-xs text-red-500 font-bold uppercase mb-1">Nhóm máu</div>
                                        <div className="text-xl font-bold text-red-700">{selectedUser.Nhommau || '--'}</div>
                                    </div>
                                </div>

                                <div className="col-span-2 border-b border-gray-100 pb-2 mb-2 mt-4">
                                    <h4 className="font-bold text-green-700 uppercase text-xs tracking-wider">Thông tin hệ thống</h4>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Ngày tạo</label>
                                    <p className="text-sm text-gray-900">{new Date(selectedUser.CreateDate).toLocaleString('vi-VN')}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Đăng nhập lần cuối</label>
                                    <p className="text-sm text-gray-900">{new Date(selectedUser.LastLoginDate).toLocaleString('vi-VN')}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Nguồn đăng ký</label>
                                    <p className="text-sm text-gray-900">{selectedUser.SystemSource || 'System'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Vai trò</label>
                                    <div className="flex gap-2">
                                        {selectedUser.IsDoctor && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">Bác sĩ</span>}
                                        {selectedUser.IsPartner && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold">Đối tác</span>}
                                        {!selectedUser.IsDoctor && !selectedUser.IsPartner && <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-bold">Người dùng</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-xl transition-colors"
                            >
                                Đóng
                            </button>
                            <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg ring ring-green-100 transition-all">
                                Chỉnh sửa hồ sơ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
