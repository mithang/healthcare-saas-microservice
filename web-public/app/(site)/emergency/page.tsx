"use client";
import React from 'react';

export default function EmergencyPage() {
    const emergencyNumbers = [
        { service: 'Cấp cứu 115', number: '115', icon: '🚑', color: 'bg-red-500' },
        { service: 'Cảnh sát 113', number: '113', icon: '🚓', color: 'bg-blue-500' },
        { service: 'Cứu hỏa 114', number: '114', icon: '🚒', color: 'bg-orange-500' },
        { service: 'Trung tâm chống độc', number: '1900 1919', icon: '☠️', color: 'bg-purple-500' },
    ];

    const firstAid = [
        { title: 'Sơ cứu ngừng tim', steps: ['Gọi 115', 'Ép tim', 'Thổi ngạt'], icon: '❤️' },
        { title: 'Sơ cứu chảy máu', steps: ['Rửa vết thương', 'Băng ép', 'Nâng cao'], icon: '🩹' },
        { title: 'Sơ cứu bỏng', steps: ['Làm mát', 'Băng vô trùng', 'Đến BV'], icon: '🔥' },
        { title: 'Sơ cứu gãy xương', steps: ['Cố định', 'Không di chuyển', 'Gọi 115'], icon: '🦴' },
    ];

    const nearbyHospitals = [
        { name: 'BV Chợ Rẫy', distance: '2.5 km', time: '8 phút', emergency: true },
        { name: 'BV 115', distance: '3.2 km', time: '10 phút', emergency: true },
        { name: 'BV Nhi Đồng 1', distance: '4.1 km', time: '12 phút', emergency: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* SOS Button */}
                <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-3xl p-12 mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Cấp cứu Khẩn cấp</h1>
                    <button className="w-64 h-64 bg-white text-red-600 rounded-full font-bold text-6xl hover:scale-110 transition-transform shadow-2xl mx-auto flex items-center justify-center">
                        SOS
                    </button>
                    <p className="mt-6 text-xl">Nhấn để gọi cấp cứu 115</p>
                </div>

                {/* Emergency Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {emergencyNumbers.map((em, i) => (
                        <a key={i} href={`tel:${em.number}`} className="block">
                            <div className={`${em.color} text-white rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer`}>
                                <div className="text-5xl mb-3">{em.icon}</div>
                                <p className="font-bold text-lg mb-1">{em.service}</p>
                                <p className="text-3xl font-bold">{em.number}</p>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* First Aid Guide */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hướng dẫn Sơ cứu</h2>
                        <div className="space-y-4">
                            {firstAid.map((aid, i) => (
                                <div key={i} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-3xl">{aid.icon}</span>
                                        <h3 className="font-bold text-gray-900 text-lg">{aid.title}</h3>
                                    </div>
                                    <ol className="list-decimal list-inside space-y-1">
                                        {aid.steps.map((step, j) => (
                                            <li key={j} className="text-gray-600">{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nearby Hospitals */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">BV Cấp cứu Gần nhất</h2>
                        <div className="space-y-4">
                            {nearbyHospitals.map((hospital, i) => (
                                <div key={i} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{hospital.name}</h3>
                                            {hospital.emergency && (
                                                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-bold">
                                                    Cấp cứu 24/7
                                                </span>
                                            )}
                                        </div>
                                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold">
                                            Chỉ đường
                                        </button>
                                    </div>
                                    <div className="flex gap-4 text-sm text-gray-600">
                                        <span>📍 {hospital.distance}</span>
                                        <span>⏱️ {hospital.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Emergency Contacts */}
                        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-3">Liên hệ Khẩn cấp</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Người thân:</span>
                                    <a href="tel:0909123456" className="font-bold text-blue-600">0909 123 456</a>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Bác sĩ gia đình:</span>
                                    <a href="tel:0909123457" className="font-bold text-blue-600">0909 123 457</a>
                                </div>
                            </div>
                            <button className="w-full mt-3 py-2 bg-yellow-600 text-white rounded-xl font-bold hover:bg-yellow-700">
                                Cập nhật liên hệ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
