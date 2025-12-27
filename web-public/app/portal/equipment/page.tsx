"use client";
import React from 'react';

const MOCK_EQUIPMENT = [
    { id: 'E01', name: 'Máy X-Quang KTS', code: 'XRAY-01', location: 'P. Chụp 1', status: 'operational', nextService: '2024-06-01' },
    { id: 'E02', name: 'Máy Siêu âm 4D', code: 'US-02', location: 'P. Siêu âm', status: 'maintenance', nextService: '2024-01-15' },
    { id: 'E03', name: 'Máy thở MV2000', code: 'VENT-05', location: 'Hồi sức tích cực', status: 'operational', nextService: '2024-03-20' },
];

export default function EquipmentPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Vật tư & Thiết bị Y tế</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_EQUIPMENT.map(eq => (
                    <div key={eq.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${eq.status === 'operational' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                }`}>
                                <i className="fi flaticon-injection text-xl"></i>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${eq.status === 'operational' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                                }`}>{eq.status === 'operational' ? 'Hoạt động tốt' : 'Đang bảo trì'}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{eq.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">Mã TS: {eq.code}</p>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Vị trí:</span>
                                <span className="font-medium text-gray-900">{eq.location}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Bảo trì kế tiếp:</span>
                                <span className="font-medium text-gray-900">{eq.nextService}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
