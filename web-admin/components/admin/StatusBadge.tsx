"use client";

interface StatusBadgeProps {
    status: 'active' | 'inactive' | 'pending' | 'published' | 'draft' | 'approved' | 'rejected';
    label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
    const configs: Record<string, { bg: string; text: string; label: string }> = {
        active: { bg: 'bg-green-100', text: 'text-green-700', label: label || 'Hoạt động' },
        inactive: { bg: 'bg-gray-100', text: 'text-gray-700', label: label || 'Tạm ngưng' },
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: label || 'Chờ duyệt' },
        processing: { bg: 'bg-blue-100', text: 'text-blue-700', label: label || 'Đang xử lý' },
        shipping: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: label || 'Đang giao' },
        published: { bg: 'bg-blue-100', text: 'text-blue-700', label: label || 'Đã xuất bản' },
        draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: label || 'Nháp' },
        approved: { bg: 'bg-green-100', text: 'text-green-700', label: label || 'Đã duyệt' },
        confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: label || 'Đã xác nhận' },
        completed: { bg: 'bg-green-100', text: 'text-green-700', label: label || 'Hoàn thành' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: label || 'Đã hủy' },
        rejected: { bg: 'bg-red-100', text: 'text-red-700', label: label || 'Từ chối' },
    };

    const config = configs[status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: label || status };

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
}
