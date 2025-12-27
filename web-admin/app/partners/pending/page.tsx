"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import partnerService from '@/services/partner.service';

export default function PendingPartnersManagement() {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    const fetchPendingPartners = async () => {
        try {
            setLoading(true);
            const data = await partnerService.getPendingPartners();
            setPartners(data);
        } catch (error) {
            console.error('Failed to fetch pending partners', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingPartners();
    }, []);

    const filteredData = partners.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const columns = [
        { key: 'name', label: 'Tên đối tác', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        {
            key: 'type', label: 'Loại hình', render: (val: string) => (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200 uppercase">
                    {val}
                </span>
            )
        },
        { key: 'email', label: 'Email', render: (val: string) => val || 'N/A' },
        { key: 'phone', label: 'Điện thoại' },
        { key: 'createdAt', label: 'Ngày gửi', render: (val: string) => new Date(val).toLocaleDateString() },
        { key: 'status', label: 'Trạng thái', render: () => <StatusBadge status="pending" /> },
    ];

    const actions = (row: any) => (
        <div className="flex gap-2">
            <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors" title="Duyệt">
                <i className="fi flaticon-check"></i>
            </button>
            <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Từ chối">
                <i className="fi flaticon-close"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Đối tác Chờ duyệt</h1>
                <p className="text-gray-500 mt-1">Tổng: {filteredData.length} đối tác</p>
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
                    onPageChange: setCurrentPage,
                }}
            />
        </div>
    );
}
