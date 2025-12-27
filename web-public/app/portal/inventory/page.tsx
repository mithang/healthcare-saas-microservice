"use client";
import React, { useState } from 'react';
import { Product, Batch, getStockStatus, isExpired, isNearExpiry } from '@/types/inventory';

export default function InventoryPage() {
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Mock data
    const products: Product[] = [
        {
            id: 'p001',
            name: 'Panadol Extra',
            sku: 'PAN-EXT-500',
            category: 'Thuốc giảm đau',
            manufacturer: 'GSK',
            price: 150000,
            unit: 'Hộp',
            minThreshold: 50,
            totalQuantity: 120,
            status: 'active',
            image: '/img/medicines/panadol.jpg'
        },
        {
            id: 'p002',
            name: 'Berberin',
            sku: 'BER-100',
            category: 'Tiêu hóa',
            manufacturer: 'Dược phẩm TW1',
            price: 25000,
            unit: 'Lọ',
            minThreshold: 30,
            totalQuantity: 15, // Low stock
            status: 'active',
            image: '/img/medicines/berberin.jpg'
        },
        {
            id: 'p003',
            name: 'Vitamin C 500mg',
            sku: 'VIT-C-500',
            category: 'Vitamin & Khoáng',
            manufacturer: 'DHG Pharma',
            price: 60000,
            unit: 'Hộp',
            minThreshold: 20,
            totalQuantity: 0, // Out of stock
            status: 'active',
            image: '/img/medicines/vitaminc.jpg'
        },
        {
            id: 'p004',
            name: 'Khẩu trang Y tế',
            sku: 'MASK-4L',
            category: 'Vật tư y tế',
            manufacturer: 'Famapro',
            price: 35000,
            unit: 'Hộp',
            minThreshold: 100,
            totalQuantity: 500,
            status: 'active'
        }
    ];

    // Mock batches for selected product details
    const mockBatches: Batch[] = [
        {
            id: 'b001',
            productId: 'p001',
            batchNumber: 'LOT12345',
            manufactureDate: '2023-01-01',
            expiryDate: '2025-01-01', // Near expiry
            quantity: 50,
            importPrice: 120000,
            supplier: 'Công ty DP Minh Long'
        },
        {
            id: 'b002',
            productId: 'p001',
            batchNumber: 'LOT67890',
            manufactureDate: '2023-06-01',
            expiryDate: '2026-06-01',
            quantity: 70,
            importPrice: 125000,
            supplier: 'Công ty DP Minh Long'
        }
    ];

    const stats = {
        total: products.length,
        lowStock: products.filter(p => getStockStatus(p).status === 'low').length,
        outOfStock: products.filter(p => getStockStatus(p).status === 'out').length,
        nearExpiry: 2 // Mock value based on batches
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kho thuốc</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý tồn kho và lô hạn dùng</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">
                        <i className="fi flaticon-upload mr-2"></i> Nhập kho
                    </button>
                    <button
                        onClick={() => setShowAddProductModal(true)}
                        className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark"
                    >
                        <i className="fi flaticon-add mr-2"></i> Thêm sản phẩm
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng sản phẩm', value: stats.total.toString(), icon: 'flaticon-medicine', color: 'bg-blue-500' },
                    { label: 'Sắp hết hàng', value: stats.lowStock.toString(), icon: 'flaticon-warning', color: 'bg-orange-500' },
                    { label: 'Hết hàng', value: stats.outOfStock.toString(), icon: 'flaticon-box', color: 'bg-red-500' },
                    { label: 'Sắp hết hạn', value: stats.nearExpiry.toString(), icon: 'flaticon-calendar', color: 'bg-yellow-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả danh mục</option>
                        <option>Thuốc giảm đau</option>
                        <option>Tiêu hóa</option>
                        <option>Vitamin</option>
                        <option>Vật tư y tế</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả trạng thái</option>
                        <option>Còn hàng</option>
                        <option>Sắp hết</option>
                        <option>Hết hàng</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Còn hạn dùng</option>
                        <option>Sắp hết hạn (90 ngày)</option>
                        <option>Đã hết hạn</option>
                    </select>
                    <input type="text" placeholder="Tìm kiếm tên, SKU..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Sản phẩm</th>
                            <th className="px-6 py-4 font-bold text-gray-700">SKU</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Danh mục</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Giá bán</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Tồn kho</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => {
                            const stockStatus = getStockStatus(product);
                            return (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                {product.image ? (
                                                    <span className="text-xs">IMG</span> // Placeholder
                                                ) : (
                                                    <span className="text-xl">💊</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-600">{product.manufacturer}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">{product.sku}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                        <span className="text-xs text-gray-500 font-normal">/{product.unit}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-900">{product.totalQuantity}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${stockStatus.color}`}>
                                            {stockStatus.text}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold"
                                            >
                                                Chi tiết
                                            </button>
                                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">
                                                Sửa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Product Detail Modal (with Batches) */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                                <p className="text-gray-500">{selectedProduct.sku} • {selectedProduct.manufacturer}</p>
                            </div>
                            <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        {/* Batch List */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-gray-900">Danh sách lô hàng</h4>
                                <button className="text-sm text-primary font-bold">+ Nhập lô mới</button>
                            </div>
                            <div className="bg-gray-50 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 font-bold text-gray-700">Số lô</th>
                                            <th className="px-4 py-3 font-bold text-gray-700">Hạn dùng</th>
                                            <th className="px-4 py-3 font-bold text-gray-700">Số lượng</th>
                                            <th className="px-4 py-3 font-bold text-gray-700">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {mockBatches.map(batch => {
                                            const expired = isExpired(batch.expiryDate);
                                            const nearExpiry = isNearExpiry(batch.expiryDate);
                                            return (
                                                <tr key={batch.id}>
                                                    <td className="px-4 py-3 font-mono">{batch.batchNumber}</td>
                                                    <td className="px-4 py-3">{new Date(batch.expiryDate).toLocaleDateString('vi-VN')}</td>
                                                    <td className="px-4 py-3 font-bold">{batch.quantity}</td>
                                                    <td className="px-4 py-3">
                                                        {expired ? (
                                                            <span className="text-red-600 font-bold text-xs uppercase">Hết hạn</span>
                                                        ) : nearExpiry ? (
                                                            <span className="text-orange-600 font-bold text-xs uppercase">Sắp hết hạn</span>
                                                        ) : (
                                                            <span className="text-green-600 font-bold text-xs uppercase">Còn hạn</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Product Modal (Simple) */}
            {showAddProductModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Thêm sản phẩm mới</h3>
                        {/* Form placeholders */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên thuốc *</label>
                                <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mã SKU</label>
                                <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Danh mục</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option>Thuốc không kê đơn</option>
                                    <option>Thuốc kê đơn</option>
                                    <option>Thực phẩm chức năng</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAddProductModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl"
                            >
                                Hủy
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">
                                Lưu sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
