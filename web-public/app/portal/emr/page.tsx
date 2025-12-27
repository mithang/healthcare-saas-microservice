"use client";
import React, { useState } from 'react';
import { MOCK_RECORDS } from '@/types/emr';

export default function EMRPage() {
    const [selectedRecord, setSelectedRecord] = useState(MOCK_RECORDS[0]);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6">
            {/* List Sidebar */}
            <div className="w-1/3 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900 mb-2">Hồ sơ bệnh án</h2>
                    <input
                        type="text"
                        placeholder="Tìm bệnh nhân..."
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                    {MOCK_RECORDS.map((record) => (
                        <div
                            key={record.id}
                            onClick={() => setSelectedRecord(record)}
                            className={`p-4 cursor-pointer hover:bg-green-50 transition-colors ${selectedRecord.id === record.id ? 'bg-green-50' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-gray-900">{record.patientName}</span>
                                <span className="text-xs text-gray-400">{new Date(record.visitDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="text-sm text-gray-600 truncate">{record.diagnosis}</div>
                            <div className="text-xs text-green-600 mt-1">{record.id}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{selectedRecord.patientName} - {selectedRecord.id}</h1>
                        <p className="text-sm text-gray-500">Khám ngày: {new Date(selectedRecord.visitDate).toLocaleDateString('vi-VN')} • BS. {selectedRecord.doctorName}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50">
                            <i className="fi flaticon-print mr-2"></i> In hồ sơ
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700">
                            <i className="fi flaticon-edit mr-2"></i> Chỉnh sửa
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Section 1: Hành chính & Lý do */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Lý do khám</label>
                            <p className="text-lg font-medium text-gray-900 border-l-4 border-green-500 pl-4">{selectedRecord.reason}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Tiền sử bệnh</label>
                            <p className="text-gray-700">{selectedRecord.history}</p>
                        </div>
                    </div>

                    {/* Section 2: Khám lâm sàng */}
                    <div className="bg-blue-50 p-6 rounded-2xl">
                        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                            <i className="fi flaticon-stethoscope"></i> Khám lâm sàng
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-blue-700 block mb-1">Triệu chứng cơ năng</label>
                                <p className="text-gray-800">{selectedRecord.symptoms}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Chẩn đoán & Điều trị */}
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Chẩn đoán xác định</label>
                            <div className="text-xl font-bold text-red-600">{selectedRecord.diagnosis}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Hướng điều trị</label>
                            <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
                                {selectedRecord.treatment}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
