"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import communityService, { SupportGroup } from '@/services/community.service';

export default function SupportGroupsManagement() {
    const [groups, setGroups] = useState<SupportGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const data = await communityService.getSupportGroups();
            setGroups(data);
        } catch (error) {
            console.error('Failed to fetch support groups', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const filteredData = groups.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'name', label: 'Tên nhóm', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'membersCount', label: 'Thành viên' },
        { key: 'postsCount', label: 'Bài viết' },
        { key: 'moderatorName', label: 'Người quản lý' },
        { key: 'createdAt', label: 'Ngày tạo', render: (val: string) => new Date(val).toLocaleDateString() },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: SupportGroup) => (
        <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800" title="Xem chi tiết">
                <i className="fi flaticon-eye"></i>
            </button>
            <button className="text-green-600 hover:text-green-800" title="Chỉnh sửa">
                <i className="fi flaticon-edit"></i>
            </button>
            <button
                className="text-red-600 hover:text-red-800"
                title="Xóa"
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa nhóm này?')) {
                        await communityService.deleteSupportGroup(row.id);
                        fetchGroups();
                    }
                }}
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Nhóm hỗ trợ</h1>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
                    + Tạo nhóm
                </button>
            </div>
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
