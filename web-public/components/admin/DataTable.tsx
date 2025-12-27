"use client";

import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
    width?: string;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    actions?: (row: any) => React.ReactNode;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
    searchable?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    filters?: {
        key: string;
        label: string;
        options: { value: string; label: string }[];
        value: string;
        onChange: (val: string) => void;
    }[];
    loading?: boolean;
}

export default function DataTable({ columns, data, actions, pagination, searchable, searchPlaceholder = "Tìm kiếm dữ liệu...", onSearch, filters, loading }: DataTableProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

    return (
        <div className="space-y-6">
            {(searchable || filters) && (
                <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    {searchable && (
                        <div className="flex-1">
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={handleSearch}
                                icon="search"
                                className="!mb-0" // Remove default margin
                                fullWidth
                            />
                        </div>
                    )}
                    {filters?.map((filter) => (
                        <div key={filter.key} className="w-full md:w-64">
                            <Select
                                placeholder={filter.label}
                                options={filter.options}
                                value={filter.value}
                                onChange={(val) => filter.onChange(val as string)}
                            />
                        </div>
                    ))}
                    <div className="flex items-center">
                        <Button variant="secondary" icon="filter" className="w-full md:w-auto">Bộ lọc</Button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" style={{ width: col.width }}>
                                        {col.label}
                                    </th>
                                ))}
                                {actions && (
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hành động</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-4">
                                                <div className="h-4 bg-gray-100 rounded w-full"></div>
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-6 py-4">
                                                <div className="h-4 bg-gray-100 rounded w-16"></div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : data.length > 0 ? (
                                data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors duration-150">
                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                                                {col.render ? col.render(row[col.key], row) : row[col.key]}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {actions(row)}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                                        Không có dữ liệu hiển thị.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {pagination && (
                    <div className="px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm font-medium text-gray-500">
                            Hiển thị trang <span className="text-gray-900 font-bold">{pagination.currentPage}</span> trên <span className="text-gray-900 font-bold">{pagination.totalPages}</span>
                        </p>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                icon="angle-left"
                            >
                                Trước
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="flex-row-reverse" // Flip icon to right
                            >
                                Sau <i className="fi flaticon-angle-right ml-2"></i>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
