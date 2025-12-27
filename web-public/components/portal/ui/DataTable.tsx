"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from './Button';
import { Input } from './Input';

// SSR Safe React Select
const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
    width?: string;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    title?: string;
    actions?: (row: any) => React.ReactNode;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
    searchable?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    loading?: boolean;
}

export const DataTable = ({
    columns,
    data,
    title,
    actions,
    pagination,
    searchable,
    searchPlaceholder = "Tìm kiếm...",
    onSearch,
    loading
}: DataTableProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            {(title || searchable) && (
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}

                    {searchable && (
                        <div className="w-full md:w-72">
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={handleSearch}
                                icon="search"
                                containerClassName="!mb-0"
                                className="!py-2.5 !text-sm"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50/50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`
                                        px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                                        ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                                    `}
                                    style={{ width: col.width }}
                                >
                                    {col.label}
                                </th>
                            ))}
                            {actions && <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Thao tác</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {columns.map((col, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                                        </td>
                                    ))}
                                    {actions && <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-8 ml-auto"></div></td>}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                            <i className="fi flaticon-search text-2xl text-gray-300"></i>
                                        </div>
                                        <p className="text-gray-500 font-medium">Không tìm thấy dữ liệu</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-blue-50/30 transition-colors duration-200 group">
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={`
                                                px-6 py-4 text-sm text-gray-700
                                                ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                                            `}
                                        >
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {actions(row)}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-gray-500">
                        Trang <span className="text-gray-900 font-bold">{pagination.currentPage}</span> / {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            rounded="lg"
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            icon="angle-left"
                            className="!px-3"
                        />
                        {/* Simple pages rendering - can be improved */}
                        <div className="hidden md:flex gap-1">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                let p = i + 1;
                                if (pagination.currentPage > 3) p = pagination.currentPage - 2 + i;
                                if (p > pagination.totalPages) return null;

                                return (
                                    <button
                                        key={p}
                                        onClick={() => pagination.onPageChange(p)}
                                        className={`
                                            w-8 h-8 rounded-lg text-sm font-bold transition-all
                                            ${pagination.currentPage === p
                                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
                                        `}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            rounded="lg"
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            icon="angle-right"
                            className="!px-3"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
