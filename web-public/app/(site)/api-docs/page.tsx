"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function APIDocsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
                <p className="text-gray-500 mb-12">Tích hợp nền tảng vào hệ thống của bạn</p>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4">Endpoints</h3>
                        <ul className="space-y-2 text-sm">
                            {['Authentication', 'Appointments', 'Patients', 'Doctors', 'Payments'].map((item, idx) => (
                                <li key={idx}><a href="#" className="text-primary hover:underline">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
                            <p className="text-gray-600 mb-6">Sử dụng API Key để xác thực các request.</p>
                            <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                                <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                                <div className="ml-4">https://api.healthcare.vn/v1/appointments</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Appointments</h2>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <code className="text-blue-800 font-bold">GET /v1/appointments</code>
                            </div>
                            <p className="text-gray-600 mb-4">Lấy danh sách lịch hẹn</p>
                            <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                                {`{
  "data": [
    {
      "id": "apt_123",
      "patient_id": "pat_456",
      "doctor_id": "doc_789",
      "date": "2024-12-20",
      "time": "09:00"
    }
  ]
}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
