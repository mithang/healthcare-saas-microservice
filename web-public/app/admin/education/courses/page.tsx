"use client";
import React from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { useRouter } from 'next/navigation';

export default function EducationCoursesPage() {
    const router = useRouter();

    const courses = [
        { id: 'CME001', name: 'Cập nhật Chẩn đoán & Điều trị Đái tháo đường 2024', type: 'CME', provider: 'Bệnh viện ĐH Y Dược', credits: 4, price: 500000, students: 120, status: 'active' },
        { id: 'CPE202', name: 'Quản lý sử dụng kháng sinh trong bệnh viện', type: 'CPE', provider: 'Hội Dược học TP.HCM', credits: 2, price: 300000, students: 85, status: 'active' },
        { id: 'CME003', name: 'Siêu âm tim mạch nâng cao', type: 'CME', provider: 'Viện Tim', credits: 8, price: 2000000, students: 45, status: 'upcoming' },
        { id: 'CME004', name: 'An toàn người bệnh và Kiểm soát nhiễm khuẩn', type: 'CME', provider: 'Sở Y Tế', credits: 4, price: 0, students: 300, status: 'completed' },
    ];

    const columns = [
        { key: 'id', label: 'Mã khóa học', render: (val: string) => <span className="font-mono font-bold text-gray-600">{val}</span> },
        {
            key: 'name', label: 'Tên khóa học', render: (val: string, row: any) => (
                <div>
                    <p className="font-bold text-gray-900">{val}</p>
                    <p className="text-xs text-gray-500">{row.provider}</p>
                </div>
            )
        },
        {
            key: 'type', label: 'Loại hình', render: (val: string) => (
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${val === 'CME' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {val}
                </span>
            )
        },
        { key: 'credits', label: 'Tín chỉ', render: (val: number) => <span className="font-medium">{val} giờ</span> },
        {
            key: 'price', label: 'Học phí', render: (val: number) => (
                <span className={`font-bold ${val === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {val === 0 ? 'Miễn phí' : val.toLocaleString() + ' đ'}
                </span>
            )
        },
        { key: 'students', label: 'Học viên', render: (val: number) => <span>{val} / 200</span> },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Đào tạo & Tập huấn (CME/CPE)</h1>
                    <p className="text-gray-500 mt-1">Quản lý khóa học giáo dục y khoa liên tục</p>
                </div>
                <Button onClick={() => router.push('/admin/education/courses/create')} icon="plus">
                    Tạo khóa học mới
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={courses}
                searchable
                searchPlaceholder="Tìm tên khóa học, đơn vị tổ chức..."
                actions={(row) => (
                    <>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><i className="fi flaticon-eye"></i></button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><i className="fi flaticon-edit"></i></button>
                    </>
                )}
            />
        </div>
    );
}
