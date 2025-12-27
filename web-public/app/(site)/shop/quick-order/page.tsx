'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';
import _ from 'lodash';

// Mock data items (should be shared or fetched)
const allProducts = [
    {
        id: 'sp1',
        title: 'Viên uống bổ sung Vitamin D3',
        image: '/shop/products/vitamin-d3.jpg',
        price: 450000,
        originalPrice: 550000,
        category: 'Thực phẩm chức năng',
    },
    {
        id: 'sp2',
        title: 'Vitamin C 1000mg tăng cường miễn dịch',
        image: '/shop/products/vitamin-c.jpg',
        price: 350000,
        originalPrice: 400000,
        category: 'Thực phẩm chức năng',
    },
    {
        id: 'sp3',
        title: 'Omega 3 Fish Oil',
        image: '/shop/products/omega3.jpg',
        price: 600000,
        originalPrice: 750000,
        category: 'Thực phẩm chức năng',
    },
    {
        id: 'sp4',
        title: 'Máy đo huyết áp Omron',
        image: '/shop/products/may-do-huyet-ap.jpg',
        price: 1200000,
        originalPrice: 1500000,
        category: 'Thiết bị y tế',
    },
    // Duplicate data to simulate pagination
    { id: 'sp5', title: 'Khẫu trang y tế 4 lớp', image: '/shop/products/khau-trang.jpg', price: 50000, originalPrice: 70000, category: 'Y tế' },
    { id: 'sp6', title: 'Dung dịch sát khuẩn tay', image: '/shop/products/sat-khuan.jpg', price: 80000, originalPrice: 100000, category: 'Y tế' },
    { id: 'sp7', title: 'Nước súc miệng trị liệu', image: '/shop/products/nuoc-suc-mieng.jpg', price: 120000, originalPrice: 150000, category: 'Chăm sóc cá nhân' },
    { id: 'sp8', title: 'Băng cá nhân Urgo', image: '/shop/products/urgo.jpg', price: 20000, originalPrice: 25000, category: 'Y tế' },
];

const ITEMS_PER_PAGE = 5;

export default function QuickOrderPage() {
    const { items, addToCart, removeFromCart, updateQuantity } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter logic
    const filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getQuantityInCart = (id: string) => {
        const item = items.find(i => i.id === id);
        return item ? item.quantity : 0;
    };

    const handleQuantityChange = (product: any, change: number) => {
        const currentQty = getQuantityInCart(product.id);
        const newQty = currentQty + change;

        if (newQty <= 0) {
            removeFromCart(product.id);
        } else {
            // If item not in cart, addToCart adds it. If in cart, we might need updateQuantity.
            // But addToCart usually adds to existing. Let's use specific logic.
            // If we use updateQuantity directly it's safer.
            if (currentQty === 0 && change > 0) {
                addToCart({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price
                }, 1);
            } else {
                updateQuantity(product.id, newQty);
            }
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold uppercase text-text-main mb-2">Đặt hàng nhanh</h1>
                    <p className="text-text-light">Tìm kiếm và thêm nhanh sản phẩm vào giỏ hàng</p>
                </div>

                <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                    <div className="relative flex-1 max-w-md">
                        <i className="fi flaticon-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset page on search
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="bg-gray-50 p-4 text-sm font-bold text-text-main uppercase border-b border-gray-100 whitespace-nowrap">Sản phẩm</th>
                                    <th className="bg-gray-50 p-4 text-sm font-bold text-text-main uppercase border-b border-gray-100 whitespace-nowrap">Đơn giá</th>
                                    <th className="bg-gray-50 p-4 text-sm font-bold text-text-main uppercase border-b border-gray-100 whitespace-nowrap">Số lượng</th>
                                    <th className="bg-gray-50 p-4 text-sm font-bold text-text-main uppercase border-b border-gray-100 whitespace-nowrap text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map(product => {
                                    const qty = getQuantityInCart(product.id);
                                    return (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 border-b border-gray-50 align-middle">
                                                <div className="flex items-center gap-4 min-w-[250px]">
                                                    <div className="relative w-16 h-16 rounded overflow-hidden border border-gray-200 flex-shrink-0 bg-white">
                                                        {/* Placeholder if image loads fail, or real image */}
                                                        <div className="w-full h-full bg-contain bg-center bg-no-repeat p-1" style={{ backgroundImage: `url(${product.image})` }}></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-text-main mb-1 line-clamp-1" title={product.title}>{product.title}</h4>
                                                        <span className="text-xs text-text-light bg-gray-100 px-2 py-0.5 rounded inline-block">Mã: {product.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 border-b border-gray-50 align-middle font-medium text-text-main whitespace-nowrap">
                                                {formatPrice(product.price)}<sup className="text-xs underline">đ</sup>
                                            </td>
                                            <td className="p-4 border-b border-gray-50 align-middle whitespace-nowrap">
                                                <div className="flex items-center border border-gray-200 rounded w-fit bg-white">
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        onClick={() => handleQuantityChange(product, -1)}
                                                        disabled={qty === 0}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-10 h-8 flex items-center justify-center font-medium border-x border-gray-200 text-text-main text-sm">{qty}</span>
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                                                        onClick={() => handleQuantityChange(product, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4 border-b border-gray-50 align-middle text-right whitespace-nowrap">
                                                {qty > 0 ? (
                                                    <span className="font-bold text-primary text-lg">{formatPrice(product.price * qty)}<sup className="text-sm underline">đ</sup></span>
                                                ) : (
                                                    <span className="text-gray-300">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {paginatedProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8 text-text-light">Không tìm thấy sản phẩm nào phù hợp</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mb-12">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-600"
                        >
                            &lt;
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`w-10 h-10 flex items-center justify-center rounded border transition-all font-medium ${currentPage === i + 1 ? 'bg-primary border-primary text-white shadow-md' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400'}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-600"
                        >
                            &gt;
                        </button>
                    </div>
                )}

                <div className="flex justify-end sticky bottom-4 z-10 lg:static">
                    <Link href="/shop/cart" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded shadow-lg hover:shadow-xl hover:bg-teal transition-all transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-wide">
                        Xem Giỏ Hàng & Thanh Toán
                    </Link>
                </div>
            </div>
        </div>
    );
}
