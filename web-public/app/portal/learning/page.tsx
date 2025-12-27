"use client";
import React from 'react';

const COURSES = [
    { id: 1, title: 'Cập nhật Chẩn đoán và Điều trị Tăng huyết áp 2024', provider: 'Hội Tim mạch học VN', credits: '2.0 CME', progress: 100, status: 'completed' },
    { id: 2, title: 'An toàn người bệnh trong phẫu thuật', provider: 'BV Đại học Y Dược', credits: '4.0 CME', progress: 45, status: 'in-progress' },
    { id: 3, title: 'Kiểm soát nhiễm khuẩn bệnh viện', provider: 'Sở Y tế TP.HCM', credits: '8.0 CME', progress: 0, status: 'not-started' },
];

export default function LearningPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Đào tạo liên tục (CME/CPE)</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COURSES.map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                        <div className="mb-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase mb-2 ${course.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    course.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-600'
                                }`}>
                                {course.status === 'completed' ? 'Đã hoàn thành' :
                                    course.status === 'in-progress' ? 'Đang học' : 'Chưa học'}
                            </span>
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{course.title}</h3>
                            <p className="text-sm text-gray-500 mt-2">{course.provider}</p>
                        </div>

                        <div className="mt-auto">
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-bold text-orange-600">{course.credits}</span>
                                <span className="text-xs text-gray-500">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                            <button className="w-full mt-4 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                                {course.status === 'completed' ? 'Xem chứng chỉ' : 'Tiếp tục học'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
