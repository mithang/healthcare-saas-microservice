import React from 'react';

export type StatusType = 'Active' | 'Inactive' | 'Pending' | 'OutOfStock' | 'Completed' | 'InProgress';

interface StatusBadgeProps {
    status: string;
    label?: string;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
    const getStyle = (s: string) => {
        switch (s) {
            case 'Active':
            case 'Completed':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'Inactive':
                return 'bg-gray-50 text-gray-700 border-gray-200';
            case 'Pending':
            case 'InProgress':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'OutOfStock':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getDefaultLabel = (s: string) => {
        switch (s) {
            case 'Active': return 'Hoạt động';
            case 'Inactive': return 'Ngừng hoạt động';
            case 'Pending': return 'Chờ duyệt';
            case 'OutOfStock': return 'Hết hàng';
            case 'Completed': return 'Hoàn thành';
            case 'InProgress': return 'Đang học';
            default: return s;
        }
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle(status)} ${className}`}>
            {label || getDefaultLabel(status)}
        </span>
    );
};
