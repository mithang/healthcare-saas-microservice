"use client";
import React, { useState } from 'react';
import { Prescription, getPrescriptionStatusText, getPrescriptionStatusColor } from '@/types/prescription';

export default function PrescriptionPage() {
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Mock data
    const prescriptions: Prescription[] = [
        {
            id: 'rx001',
            code: 'RX-2024-1234',
            patientName: 'Nguyễn Thanh Tùng',
            patientPhone: '0901234567',
            diagnosis: 'Viêm họng cấp',
            createdDate: '2024-12-20',
            status: 'new',
            doctorName: 'BS. Lê Văn Minh',
            hospitalName: 'BV Đa khoa Tâm Anh',
            medicines: [
                { id: 'm1', medicineName: 'Augmentin 1g', quantity: 14, unit: 'Viên', usage: 'Sáng 1, Chiều 1 (sau ăn)' },
                { id: 'm2', medicineName: 'Panadol Extra', quantity: 10, unit: 'Viên', usage: 'Uống khi sốt > 38.5 độ' },
                { id: 'm3', medicineName: 'Alpha Choay', quantity: 20, unit: 'Viên', usage: 'Ngậm dưới lưỡi, 2 viên/lần x 2 lần/ngày' }
            ]
        },
        {
            id: 'rx002',
            code: 'RX-2024-1235',
            patientName: 'Trần Thị Mai',
            patientPhone: '0987654321',
            diagnosis: 'Rối loạn tiền đình',
            createdDate: '2024-12-19',
            status: 'dispensed',
            dispensedDate: '2024-12-19 14:30',
            pharmacistName: 'DS. Nguyễn Thị B',
            doctorName: 'BS. Phạm Thu Hường',
            hospitalName: 'Phòng khám Đa khoa Quốc tế',
            medicines: [
                { id: 'm4', medicineName: 'Tanganil 500mg', quantity: 30, unit: 'Viên', usage: 'Sáng 1, Chiều 1' },
                { id: 'm5', medicineName: 'Ginkgo Biloba', quantity: 60, unit: 'Viên', usage: 'Sáng 1, trưa 1' }
            ]
        }
    ];

    const handleViewDetail = (rx: Prescription) => {
        setSelectedPrescription(rx);
        setShowDetailModal(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn thuốc</h1>
                    <p className="text-gray-500 text-sm mt-1">Tiếp nhận và xử lý đơn thuốc điện tử</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-add mr-2"></i> Tạo đơn mới
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả trạng thái</option>
                        <option>Đơn mới</option>
                        <option>Đã cấp thuốc</option>
                        <option>Đã hủy</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="text" placeholder="Tìm tên bệnh nhân, mã đơn..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Prescription List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Mã đơn</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Bệnh nhân</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Chẩn đoán</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Bác sĩ/Nơi kê</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày tạo</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {prescriptions.map((rx) => (
                            <tr key={rx.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-mono font-bold text-blue-600">{rx.code}</td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-900">{rx.patientName}</p>
                                    <p className="text-xs text-gray-500">{rx.patientPhone}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-700">{rx.diagnosis}</td>
                                <td className="px-6 py-4">
                                    <p className="text-gray-900">{rx.doctorName}</p>
                                    <p className="text-xs text-gray-500">{rx.hospitalName}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                                    {new Date(rx.createdDate).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getPrescriptionStatusColor(rx.status)}`}>
                                        {getPrescriptionStatusText(rx.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleViewDetail(rx)}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200"
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedPrescription && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">Chi tiết Đơn thuốc</h3>
                                <p className="text-blue-600 font-mono font-bold">{selectedPrescription.code}</p>
                            </div>
                            <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Patient Info */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Thông tin bệnh nhân</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Họ tên:</span>
                                        <span className="font-bold text-gray-900">{selectedPrescription.patientName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Số điện thoại:</span>
                                        <span className="font-bold text-gray-900">{selectedPrescription.patientPhone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Chẩn đoán:</span>
                                        <span className="font-bold text-gray-900">{selectedPrescription.diagnosis}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Thông tin kê đơn</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Bác sĩ:</span>
                                        <span className="font-bold text-gray-900">{selectedPrescription.doctorName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Nơi làm việc:</span>
                                        <span className="font-bold text-gray-900">{selectedPrescription.hospitalName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ngày kê:</span>
                                        <span className="font-bold text-gray-900">{new Date(selectedPrescription.createdDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medicine List */}
                        <div className="mb-8">
                            <h4 className="font-bold text-gray-900 mb-4">Danh sách thuốc</h4>
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 font-bold text-gray-700">Tên thuốc</th>
                                            <th className="px-4 py-3 font-bold text-gray-700">Số lượng</th>
                                            <th className="px-4 py-3 font-bold text-gray-700">Cách dùng</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedPrescription.medicines.map((med) => (
                                            <tr key={med.id}>
                                                <td className="px-4 py-3 font-bold text-gray-900">{med.medicineName}</td>
                                                <td className="px-4 py-3 font-mono">
                                                    {med.quantity} {med.unit}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 italic">{med.usage}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                            <div className="text-sm">
                                <span className="text-gray-600">Trạng thái: </span>
                                <span className={`font-bold ${selectedPrescription.status === 'new' ? 'text-blue-600' :
                                        selectedPrescription.status === 'dispensed' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {getPrescriptionStatusText(selectedPrescription.status)}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300"
                                >
                                    Đóng
                                </button>
                                {selectedPrescription.status === 'new' && (
                                    <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark">
                                        ✅ Cấp thuốc (Dispense)
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
