"use client";
import React, { useState } from 'react';

export default function StudentImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [importing, setImporting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Mock preview data
            setPreview([
                { name: 'Nguyen Van A', email: 'nva@email.com', phone: '0909123456', course: 'CME 2024' },
                { name: 'Tran Thi B', email: 'ttb@email.com', phone: '0909123457', course: 'CPE 2024' },
                { name: 'Le Van C', email: 'lvc@email.com', phone: '0909123458', course: 'CME 2024' },
            ]);
            setErrors([]);
        }
    };

    const handleImport = () => {
        setImporting(true);
        setTimeout(() => {
            setImporting(false);
            alert('Import thành công 3 học viên!');
            setFile(null);
            setPreview([]);
        }, 2000);
    };

    const downloadTemplate = () => {
        alert('Đang tải template CSV...');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Import Học viên Hàng loạt</h1>
                <p className="text-gray-500 text-sm mt-1">Upload file CSV/Excel để thêm nhiều học viên cùng lúc</p>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">1. Tải lên File</h2>
                    <button
                        onClick={downloadTemplate}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition flex items-center gap-2"
                    >
                        <i className="fi flaticon-download"></i> Tải Template
                    </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary transition">
                    <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fi flaticon-upload text-3xl text-gray-400"></i>
                        </div>
                        <p className="font-bold text-gray-900 mb-2">Kéo thả file hoặc click để chọn</p>
                        <p className="text-sm text-gray-500">Hỗ trợ: CSV, Excel (.xlsx, .xls)</p>
                    </label>
                </div>

                {file && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <i className="fi flaticon-file text-blue-600 text-2xl"></i>
                            <div>
                                <p className="font-bold text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setFile(null); setPreview([]); }}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                        >
                            <i className="fi flaticon-trash"></i>
                        </button>
                    </div>
                )}
            </div>

            {/* Preview Section */}
            {preview.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">2. Xem trước Dữ liệu</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-bold text-gray-700">Tên</th>
                                    <th className="px-4 py-3 font-bold text-gray-700">Email</th>
                                    <th className="px-4 py-3 font-bold text-gray-700">Số điện thoại</th>
                                    <th className="px-4 py-3 font-bold text-gray-700">Khóa học</th>
                                    <th className="px-4 py-3 font-bold text-gray-700">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {preview.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.email}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.phone}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.course}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                                Hợp lệ
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Tổng: <span className="font-bold text-gray-900">{preview.length}</span> học viên hợp lệ
                        </p>
                        <button
                            onClick={handleImport}
                            disabled={importing}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition disabled:opacity-50"
                        >
                            {importing ? 'Đang import...' : 'Xác nhận Import'}
                        </button>
                    </div>
                </div>
            )}

            {/* Errors Section */}
            {errors.length > 0 && (
                <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                    <h3 className="font-bold text-red-900 mb-4">Lỗi Validation ({errors.length})</h3>
                    <ul className="space-y-2">
                        {errors.map((error, idx) => (
                            <li key={idx} className="text-sm text-red-700">• {error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
