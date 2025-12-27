"use client";
import React from 'react';
import { Button, DataTable, StatusBadge } from '@/components/portal/ui';

export default function PharmacyProductsPage() {
    const products = [
        { id: '1', name: 'Panadol Extra', category: 'Thuốc giảm đau', price: 150000, stock: 100, status: 'Active', sku: 'PND-001' },
        { id: '2', name: 'Vitamin C 500mg', category: 'Vitamin & Khoáng chất', price: 80000, stock: 50, status: 'Active', sku: 'VIT-002' },
        { id: '3', name: 'Khẩu trang Y tế 4 lớp', category: 'Thiết bị y tế', price: 35000, stock: 200, status: 'Active', sku: 'MASK-003' },
        { id: '4', name: 'Nước muối sinh lý', category: 'Vệ sinh cá nhân', price: 10000, stock: 0, status: 'OutOfStock', sku: 'NaCl-004' },
    ];

    const columns = [
        { label: 'Mã SKU', key: 'sku' },
        { label: 'Tên sản phẩm', key: 'name', render: (val: any) => <span className="font-bold">{val}</span> },
        { label: 'Danh mục', key: 'category' },
        { label: 'Giá bán', key: 'price', render: (val: number) => val ? val.toLocaleString() + ' đ' : '0 đ' },
        { label: 'Tồn kho', key: 'stock', render: (val: number) => val === 0 ? <span className="text-red-500 font-bold">Hết hàng</span> : val },
        { label: 'Trạng thái', key: 'status', render: (val: string) => <StatusBadge status={val} /> },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kho thuốc & Sản phẩm</h1>
                    <p className="text-gray-500">Quản lý danh mục sản phẩm đang bán tại nhà thuốc</p>
                </div>
                <Button icon="plus">Thêm sản phẩm mới</Button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <DataTable
                    data={products}
                    columns={columns}
                    actions={(row) => (
                        <div className="flex gap-2">
                            <Button size="sm" variant="ghost" icon="edit">Sửa</Button>
                            <Button size="sm" variant="ghost" className="text-red-500" icon="trash">Xóa</Button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
