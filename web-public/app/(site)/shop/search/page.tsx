'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/shop/ProductCard';
import SearchBar from '@/components/shop/SearchBar';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const products = [
        {
            id: 'sp1',
            title: 'Viên uống bổ sung Vitamin D3',
            image: '/shop/products/vitamin-d3.jpg',
            price: 450000,
            originalPrice: 500000,
            discount: 10,
        },
    ];

    return (
        <div className="search-page">
            <div className="container">
                <div className="section">
                    <div className="section-title">
                        <h1>Kết quả tìm kiếm cho: "{query}"</h1>
                    </div>

                    <div className="search-page__search-bar">
                        <SearchBar />
                    </div>

                    {products.length > 0 ? (
                        <>
                            <p className="search-page__count">Tìm thấy {products.length} sản phẩm</p>
                            <div className="shop-page__products">
                                {products.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="search-page__no-results">
                            <h2>Không tìm thấy sản phẩm nào</h2>
                            <p>Vui lòng thử lại với từ khóa khác</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
