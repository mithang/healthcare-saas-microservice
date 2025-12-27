"use client";
import React from 'react';
import DataTable from '@/components/admin/DataTable';

export default function AuditLogs() {
    const columns = [
        { header: 'Thời gian', accessor: 'timestamp', width: '180px' },
        { header: 'Người dùng', accessor: 'user', width: '200px' },
        {
            header: 'Hành động', accessor: 'action', width: '200px', render: (val: string) => (
                <span className={`font-medium ${val.includes('Delete') ? 'text-red-600' : val.includes('Create') ? 'text-green-600' : 'text-blue-600'}`}>
                    {val}
                </span>
            )
        },
        { header: 'Đối tượng', accessor: 'target', width: '250px' },
        { header: 'IP', accessor: 'ip', width: '150px' },
        { header: 'Chi tiết', accessor: 'details' },
    ];

    const data = [
        { id: 1, timestamp: '19/12/2024 10:30:45', user: 'admin (Super Admin)', action: 'Create Assessment', target: 'Form: Đánh giá sức khỏe', ip: '192.168.1.1', details: 'Created new health assessment form' },
        { id: 2, timestamp: '19/12/2024 10:25:12', user: 'mod_huy (Moderator)', action: 'Approve Post', target: 'Post #1234', ip: '113.161.x.x', details: 'Approved pending post' },
        { id: 3, timestamp: '19/12/2024 10:15:00', user: 'admin (Super Admin)', action: 'Update Settings', target: 'System Settings', ip: '192.168.1.1', details: 'Changed payment gateway config' },
        { id: 4, timestamp: '19/12/2024 09:45:22', user: 'dr_minh (Doctor)', action: 'Update Record', target: 'Patient #5678', ip: '14.161.x.x', details: 'Updated medical record' },
        { id: 5, timestamp: '19/12/2024 09:30:10', user: 'admin (Super Admin)', action: 'Delete User', target: 'User #999', ip: '192.168.1.1', details: 'Deleted spam user account' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Nhật ký hoạt động</h1>
                <p className="text-gray-500 mt-1">Theo dõi mọi hoạt động trong hệ thống</p>
            </div>

            <DataTable
                columns={columns}
                data={data}
                searchPlaceholder="Tìm kiếm nhật ký..."
            />
        </div>
    );
}
