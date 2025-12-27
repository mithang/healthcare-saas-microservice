"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import communityService, { ModerationReport } from '@/services/community.service';

export default function ModerationManagement() {
    const [reports, setReports] = useState<ModerationReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchReports = async () => {
        try {
            setLoading(true);
            const data = await communityService.getModerationReports();
            setReports(data);
        } catch (error) {
            console.error('Failed to fetch moderation reports', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const filteredData = reports.filter(item =>
        item.contentPreview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reportedByName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'contentPreview', label: 'Nội dung', render: (val: string) => <span className="font-medium text-gray-900">{val || 'N/A'}</span> },
        { key: 'contentType', label: 'Loại' },
        { key: 'authorName', label: 'Tác giả' },
        { key: 'reportedByName', label: 'Người báo cáo' },
        { key: 'reason', label: 'Lý do' },
        { key: 'createdAt', label: 'Ngày báo cáo', render: (val: string) => new Date(val).toLocaleDateString() },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: ModerationReport) => (
        <div className="flex gap-2">
            <button
                className="text-green-600 hover:text-green-800"
                title="Giải quyết"
                onClick={async () => {
                    await communityService.updateModerationReport(row.id, { status: 'resolved' });
                    fetchReports();
                }}
            >
                <i className="fi flaticon-check"></i>
            </button>
            <button
                className="text-red-600 hover:text-red-800"
                title="Xóa nội dung"
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa nội dung bị báo cáo này?')) {
                        await communityService.deleteModerationReport(row.id);
                        fetchReports();
                    }
                }}
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Kiểm duyệt Nội dung</h1>
            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                searchable
                onSearch={setSearchQuery}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage
                }}
            />
        </div>
    );
}
