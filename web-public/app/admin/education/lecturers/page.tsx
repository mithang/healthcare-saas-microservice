"use client";
import React, { useEffect, useState } from 'react';
import { educationService, Lecturer } from '@/services/education.service';

export default function LecturerListPage() {
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const data = await educationService.getLecturers();
                setLecturers(data);
            } catch (error) {
                console.error('Failed to fetch lecturers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLecturers();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải danh sách giảng viên...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Giảng viên</h1>
                    <p className="text-gray-500 text-sm mt-1">Danh sách chuyên gia và giảng viên trên hệ thống.</p>
                </div>
                <button className="btn btn-primary bg-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition">
                    <i className="fi flaticon-add"></i> Thêm giảng viên
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lecturers.length > 0 ? lecturers.map((lecturer) => (
                    <div key={lecturer.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition group">
                        <div className="relative w-24 h-24 mb-4">
                            {/* Avatar */}
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition overflow-hidden">
                                {lecturer.avatar ? <img src={lecturer.avatar} alt={lecturer.name} className="w-full h-full object-cover" /> : lecturer.name[0]}
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white border border-gray-200 p-1.5 rounded-full shadow-sm hover:text-primary">
                                <i className="fi flaticon-edit text-xs"></i>
                            </button>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">{lecturer.name}</h3>
                        <p className="text-primary text-sm font-medium mb-1">{lecturer.title} • {lecturer.specialty}</p>
                        {/* <p className="text-gray-400 text-xs">{lecturer.courses?.length || 0} khóa học đã dạy</p> */}

                        <div className="flex gap-2 mt-6 w-full">
                            <button className="flex-1 py-2 bg-gray-50 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-100">Hồ sơ</button>
                            <button className="flex-1 py-2 bg-primary/10 text-primary font-bold rounded-xl text-sm hover:bg-primary hover:text-white transition">Gán khóa học</button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                        Chưa có giảng viên nào.
                    </div>
                )}
            </div>
        </div>
    );
}
