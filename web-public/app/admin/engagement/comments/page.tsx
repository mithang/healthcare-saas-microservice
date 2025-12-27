"use client";
import React, { useState } from 'react';

export default function CommentManagementPage() {
    const [comments, setComments] = useState([
        { id: 1, user: 'Nguyen Van A', content: 'Bài viết rất hay, cảm ơn bác sĩ.', post: 'Cập nhật điều trị...', date: '2024-12-20', status: 'Pending' },
        { id: 2, user: 'Tran Thi B', content: 'Quảng cáo bán thuốc trá hình...', post: 'Dinh dưỡng cho bé', date: '2024-12-19', status: 'Spam' },
        { id: 3, user: 'Le Van C', content: 'Cho mình xin tài liệu với ạ.', post: 'Hội thảo Tim mạch', date: '2024-12-18', status: 'Approved' },
    ]);

    const handleAction = (id: number, action: 'Approve' | 'Delete') => {
        setComments(comments.map(c =>
            c.id === id ? { ...c, status: action === 'Approve' ? 'Approved' : 'Deleted' } : c
        ));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Bình luận & Tương tác</h1>

            <div className="flex gap-4 mb-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <p className="text-gray-500 text-xs uppercase font-bold">Chờ duyệt</p>
                    <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <p className="text-gray-500 text-xs uppercase font-bold">Báo cáo Spam</p>
                    <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <p className="text-gray-500 text-xs uppercase font-bold">Tổng bình luận</p>
                    <p className="text-2xl font-bold text-blue-600">1,240</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Người dùng</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Nội dung</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {comments.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-900">{item.user}</p>
                                    <p className="text-xs text-gray-500">{item.date}</p>
                                </td>
                                <td className="px-6 py-4 max-w-md">
                                    <p className="text-gray-800 text-sm mb-1">{item.content}</p>
                                    <p className="text-xs text-blue-500 font-medium truncate">Trên: {item.post}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold 
                                        ${item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                item.status === 'Spam' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {item.status !== 'Approved' && (
                                            <button onClick={() => handleAction(item.id, 'Approve')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg tooltip" title="Duyệt">
                                                <i className="fi flaticon-checked"></i>
                                            </button>
                                        )}
                                        <button onClick={() => handleAction(item.id, 'Delete')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg tooltip" title="Xóa/Spam">
                                            <i className="fi flaticon-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
