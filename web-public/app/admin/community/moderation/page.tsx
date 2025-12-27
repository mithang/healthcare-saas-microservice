"use client";
import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const MOCK_DATA = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    content: `Nội dung cần kiểm duyệt ${i + 1}`,
    type: ['Bài viết', 'Bình luận', 'Câu hỏi', 'Trả lời'][i % 4],
    author: `User ${String.fromCharCode(65 + (i % 26))}`,
    reportedBy: `User ${String.fromCharCode(90 - (i % 26))}`,
    reason: ['Spam', 'Nội dung không phù hợp', 'Ngôn từ thô tục'][i % 3],
    reportedDate: `${15 + (i % 15)}/12/2024`,
    status: 'pending',
}));

export default function ModerationManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
    const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'content', label: 'Nội dung', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'type', label: 'Loại' },
        { key: 'author', label: 'Tác giả' },
        { key: 'reportedBy', label: 'Người báo cáo' },
        { key: 'reason', label: 'Lý do' },
        { key: 'reportedDate', label: 'Ngày báo cáo' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: any) => (
        <>
            <button className="text-green-600 hover:text-green-800" title="Duyệt"><i className="fi flaticon-check"></i></button>
            <button className="text-red-600 hover:text-red-800" title="Xóa"><i className="fi flaticon-delete"></i></button>
        </>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Kiểm duyệt Nội dung</h1>
            <DataTable columns={columns} data={paginatedData} actions={actions} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
        </div>
    );
}
