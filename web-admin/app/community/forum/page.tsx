"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import communityService, { ForumTopic } from '@/services/community.service';

export default function ForumManagement() {
    const [topics, setTopics] = useState<ForumTopic[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const data = await communityService.getForumTopics();
            setTopics(data);
        } catch (error) {
            console.error('Failed to fetch forum topics', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const filteredData = topics.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'title', label: 'Tiêu đề', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'authorName', label: 'Tác giả' },
        { key: 'category', label: 'Danh mục' },
        { key: '_count', label: 'Trả lời', render: (val: any) => val?.replies || 0 },
        { key: 'views', label: 'Lượt xem' },
        { key: 'createdAt', label: 'Ngày tạo', render: (val: string) => new Date(val).toLocaleDateString() },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: ForumTopic) => (
        <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800" title="Xem chi tiết">
                <i className="fi flaticon-eye"></i>
            </button>
            <button
                className="text-red-600 hover:text-red-800"
                title="Xóa"
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa chủ đề này?')) {
                        await communityService.deleteForumTopic(row.id);
                        fetchTopics();
                    }
                }}
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Diễn đàn</h1>
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
