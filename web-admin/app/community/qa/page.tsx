"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import communityService, { QAQuestion } from '@/services/community.service';

export default function QAManagement() {
    const [questions, setQuestions] = useState<QAQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const data = await communityService.getQAQuestions();
            setQuestions(data);
        } catch (error) {
            console.error('Failed to fetch QA questions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const filteredData = questions.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'question', label: 'Câu hỏi', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'askedByName', label: 'Người hỏi' },
        { key: 'category', label: 'Danh mục' },
        { key: '_count', label: 'Trả lời', render: (val: any) => val?.answers || 0 },
        { key: 'views', label: 'Lượt xem' },
        { key: 'createdAt', label: 'Ngày hỏi', render: (val: string) => new Date(val).toLocaleDateString() },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: QAQuestion) => (
        <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800" title="Xem chi tiết">
                <i className="fi flaticon-eye"></i>
            </button>
            <button
                className="text-green-600 hover:text-green-800"
                title="Duyệt"
                onClick={async () => {
                    await communityService.updateQAQuestion(row.id, { status: 'approved' });
                    fetchQuestions();
                }}
            >
                <i className="fi flaticon-check"></i>
            </button>
            <button
                className="text-red-600 hover:text-red-800"
                title="Xóa"
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
                        await communityService.deleteQAQuestion(row.id);
                        fetchQuestions();
                    }
                }}
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Hỏi đáp</h1>
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
