"use client";
import React from 'react';

const CERTIFICATES = [
    { id: 1, name: 'Chứng chỉ hành nghề Khám chữa bệnh', issuer: 'Bộ Y tế', date: '2015-06-20', exp: 'Vĩnh viễn', file: 'cchn.pdf' },
    { id: 2, name: 'Chứng chỉ Siêu âm tổng quát', issuer: 'BV Chợ Rẫy', date: '2019-01-10', exp: 'Vĩnh viễn', file: 'sieuam.pdf' },
    { id: 3, name: 'Chứng nhận tiêm chủng an toàn', issuer: 'CDC TP.HCM', date: '2021-05-05', exp: '2026-05-05', file: 'tiemchung.pdf' },
];

export default function CertificationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Chứng chỉ & Giấy phép</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-sm hover:bg-blue-700">
                    + Upload chứng chỉ
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CERTIFICATES.map(cert => (
                    <div key={cert.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-2xl">
                            <i className="fi flaticon-diploma"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{cert.name}</h3>
                            <div className="text-sm text-gray-500">{cert.issuer} • Cấp: {new Date(cert.date).toLocaleDateString('vi-VN')}</div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                            <i className="fi flaticon-download"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
