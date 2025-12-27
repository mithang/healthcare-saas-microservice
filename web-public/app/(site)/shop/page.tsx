import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroBanner from '@/components/shop/HeroBanner';
import SearchBar from '@/components/shop/SearchBar';
import CategoryList from '@/components/shop/CategoryList';
import ProductCard from '@/components/shop/ProductCard';

const slides = [
    {
        id: 1,
        image: '/shop/banners/banner1.jpg',
        title: 'Chăm sóc sức khỏe toàn diện',
        description: 'Các sản phẩm chất lượng cao từ các thương hiệu uy tín',
        link: '/shop/products'
    },
    {
        id: 2,
        image: '/shop/banners/banner2.jpg',
        title: 'Thực phẩm chức năng',
        description: 'Bổ sung dinh dưỡng cho cả gia đình',
        link: '/shop/categories/thuc-pham-chuc-nang'
    },
];

const categories = [
    {
        id: 'thuc-pham-chuc-nang',
        title: 'Thực phẩm chức năng',
        image: '/shop/categories/thuc-pham-chuc-nang.jpg',
        products: [
            {
                id: 'sp1',
                title: 'Viên uống bổ sung Vitamin D3 hỗ trợ xương khớp',
                image: '/shop/products/vitamin-d3.jpg',
                price: 450000,
                originalPrice: 500000,
                isNew: true,
                discount: 10,
            },
            {
                id: 'sp2',
                title: 'Viên uống Omega 3 tốt cho tim mạch',
                image: '/shop/products/omega3.jpg',
                price: 350000,
                originalPrice: 400000,
                discount: 12,
            },
        ]
    },
    {
        id: 'cham-soc-suc-khoe',
        title: 'Chăm sóc sức khỏe',
        image: '/shop/categories/cham-soc-suc-khoe.jpg',
        products: [
            {
                id: 'sp3',
                title: 'Máy đo huyết áp Omron chính hãng',
                image: '/shop/products/omron.jpg',
                price: 1200000,
                originalPrice: 1500000,
                discount: 20,
            },
            {
                id: 'sp4',
                title: 'Nhiệt kế điện tử đo trán không tiếp xúc',
                image: '/shop/products/thermometer.jpg',
                price: 380000,
                isNew: true,
            },
        ]
    },
];

export default function ShopPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-wrap -mx-2">
                    {/* Main Content */}
                    <div className="w-full px-2">
                        {/* Hero Banner */}
                        <div className="mb-8">
                            <HeroBanner slides={slides} />
                        </div>

                        {/* Search Bar - Optional placement */}
                        <div className="mb-8 hidden md:block">
                            <SearchBar />
                        </div>

                        {/* Featured Categories */}
                        <div className="mb-12">
                            <div className="mb-6 border-b border-gray-200 pb-2">
                                <h1 className="text-2xl font-bold uppercase text-text-main inline-block relative after:content-[''] after:absolute after:bottom-[-9px] after:left-0 after:w-full after:h-[3px] after:bg-primary">
                                    Danh mục nổi bật
                                </h1>
                            </div>
                            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                                {[
                                    { icon: 'flaticon-functional-food', title: 'Thực phẩm chức năng', link: '/shop/categories/thuc-pham-chuc-nang' },
                                    { icon: 'flaticon-medical-equipment', title: 'Chăm sóc sức khỏe', link: '/shop/categories/cham-soc-suc-khoe' },
                                    { icon: 'flaticon-beauty-product', title: 'Làm đẹp', link: '/shop/categories/lam-dep' },
                                    { icon: 'flaticon-mom-and-baby', title: 'Mẹ và bé', link: '/shop/categories/me-va-be' },
                                ].map((category, index) => (
                                    <Link
                                        key={index}
                                        href={category.link}
                                        className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all gap-4 border border-transparent hover:border-primary group"
                                    >
                                        <i className={`fi ${category.icon} text-4xl text-gray-400 group-hover:text-primary transition-colors`} />
                                        <span className="font-semibold text-text-main group-hover:text-primary transition-colors">{category.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Hot Products */}
                        <div className="mb-12">
                            <div className="mb-6 border-b border-gray-200 pb-2">
                                <h1 className="text-2xl font-bold uppercase text-text-main inline-block relative after:content-[''] after:absolute after:bottom-[-9px] after:left-0 after:w-full after:h-[3px] after:bg-primary">
                                    <Link href="/shop/products/hot" className="hover:text-primary transition-colors">Sản phẩm Hot</Link>
                                </h1>
                            </div>
                            <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                                {[
                                    {
                                        id: 'hot1',
                                        title: 'Viên uống Omega 3 tốt cho tim mạch',
                                        image: '/shop/products/omega3.jpg',
                                        price: 350000,
                                        originalPrice: 400000,
                                        discount: 12,
                                    },
                                    {
                                        id: 'hot2',
                                        title: 'Collagen dạng nước chống lão hóa',
                                        image: '/shop/products/collagen.jpg',
                                        price: 580000,
                                        isNew: true,
                                    },
                                ].map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        </div>

                        {/* Best Selling Products */}
                        <div className="mb-12">
                            <div className="mb-6 border-b border-gray-200 pb-2">
                                <h1 className="text-2xl font-bold uppercase text-text-main inline-block relative after:content-[''] after:absolute after:bottom-[-9px] after:left-0 after:w-full after:h-[3px] after:bg-primary">
                                    <Link href="/shop/products/best-selling" className="hover:text-primary transition-colors">Sản phẩm Bán chạy</Link>
                                </h1>
                            </div>
                            <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                                {[
                                    {
                                        id: 'best1',
                                        title: 'Máy đo huyết áp Omron chính hãng',
                                        image: '/shop/products/omron.jpg',
                                        price: 1200000,
                                        originalPrice: 1500000,
                                        discount: 20,
                                    },
                                    {
                                        id: 'best2',
                                        title: 'Máy đo đường huyết Accu-Chek',
                                        image: '/shop/products/accu-chek.jpg',
                                        price: 850000,
                                    },
                                ].map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        </div>

                        {/* Category Lists with Products */}
                        <CategoryList categories={categories} />

                        {/* Top Brands */}
                        <div className="mb-12 mt-12">
                            <div className="mb-6 border-b border-gray-200 pb-2">
                                <h1 className="text-2xl font-bold uppercase text-text-main inline-block relative after:content-[''] after:absolute after:bottom-[-9px] after:left-0 after:w-full after:h-[3px] after:bg-primary">
                                    Thương hiệu hàng đầu
                                </h1>
                            </div>
                            <div className="grid grid-cols-6 gap-6 items-center max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
                                {[
                                    { name: 'Sanofi', image: '/shop/brands/sanofi.png' },
                                    { name: 'Nestle', image: '/shop/brands/nestle.png' },
                                    { name: 'Roche', image: '/shop/brands/roche.png' },
                                    { name: 'Abbott', image: '/shop/brands/abbott.png' },
                                    { name: 'Bayer', image: '/shop/brands/bayer.png' },
                                    { name: 'Omron', image: '/shop/brands/omron.png' },
                                ].map((brand, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center aspect-[3/2]">
                                        <img
                                            src={brand.image}
                                            alt={brand.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Floating Quick Order Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <Link href="/shop/quick-order" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal transition-all hover:-translate-y-1 font-semibold animate-bounce">
                    <i className="fi flaticon-shopping-cart"></i>
                    <span>Mua nhanh</span>
                </Link>
            </div>
        </div>
    );
}
