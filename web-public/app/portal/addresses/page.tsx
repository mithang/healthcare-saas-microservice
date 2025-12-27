"use client";
import React, { useState } from 'react';

export default function AddressManagementPage() {
    const [addresses, setAddresses] = useState([
        { id: 1, name: 'Nhà riêng', recipient: 'Nguyen Van A', phone: '0909123456', address: '123 Nguyen Trai, P.Ben Thanh, Q.1, TP.HCM', isDefault: true },
        { id: 2, name: 'Văn phòng', recipient: 'Nguyen Van A', phone: '0909123456', address: '456 Le Loi, P.Ben Nghe, Q.1, TP.HCM', isDefault: false },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);

    const handleAdd = () => {
        setEditingAddress(null);
        setShowModal(true);
    };

    const handleEdit = (address: any) => {
        setEditingAddress(address);
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
            setAddresses(addresses.filter(a => a.id !== id));
        }
    };

    const handleSetDefault = (id: number) => {
        setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sổ địa chỉ</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý địa chỉ nhận hàng của bạn</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-dark transition flex items-center gap-2"
                >
                    <i className="fi flaticon-add"></i> Thêm địa chỉ
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                    <div key={address.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative">
                        {address.isDefault && (
                            <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                Mặc định
                            </span>
                        )}
                        <h3 className="font-bold text-gray-900 mb-2">{address.name}</h3>
                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <p className="font-medium text-gray-900">{address.recipient}</p>
                            <p>{address.phone}</p>
                            <p>{address.address}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(address)}
                                className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 text-sm"
                            >
                                Sửa
                            </button>
                            {!address.isDefault && (
                                <>
                                    <button
                                        onClick={() => handleSetDefault(address.id)}
                                        className="flex-1 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 text-sm"
                                    >
                                        Đặt mặc định
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <i className="fi flaticon-trash"></i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            {editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên địa chỉ</label>
                                <input
                                    type="text"
                                    placeholder="VD: Nhà riêng, Văn phòng"
                                    defaultValue={editingAddress?.name}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Người nhận</label>
                                    <input
                                        type="text"
                                        defaultValue={editingAddress?.recipient}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        defaultValue={editingAddress?.phone}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ cụ thể</label>
                                <input
                                    type="text"
                                    placeholder="Số nhà, tên đường"
                                    defaultValue={editingAddress?.address}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tỉnh/Thành</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none">
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>Hà Nội</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Quận/Huyện</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none">
                                        <option>Quận 1</option>
                                        <option>Quận 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phường/Xã</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none">
                                        <option>Phường Bến Thành</option>
                                        <option>Phường Bến Nghé</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark"
                            >
                                Lưu địa chỉ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
