"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const product = {
        id: params.id,
        name: 'Paracetamol 500mg',
        brand: 'Pymepharco',
        price: 45000,
        originalPrice: 60000,
        stock: 150,
        images: ['/img/medicine-1.jpg', '/img/medicine-2.jpg'],
        description: 'Thuốc giảm đau, hạ sốt hiệu quả. Thành phần chính: Paracetamol 500mg.',
        usage: 'Uống 1-2 viên mỗi lần, ngày 3-4 lần. Không quá 8 viên/ngày.',
        ingredients: 'Paracetamol 500mg, tá dược vừa đủ 1 viên.',
        storage: 'Bảo quản nơi khô ráo, tránh ánh sáng.',
    };

    const relatedProducts = [
        { id: 2, name: 'Vitamin C 1000mg', price: 120000, image: '/img/vitamin-c.jpg' },
        { id: 3, name: 'Aspirin 100mg', price: 35000, image: '/img/aspirin.jpg' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-6">
                    <Link href="/shop/products" className="text-primary font-bold hover:underline">
                        ← Quay lại danh sách
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Images */}
                    <div>
                        <div className="bg-white rounded-2xl p-8 mb-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-96 object-contain"
                                onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                            />
                        </div>
                        <div className="flex gap-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-gray-200'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Thương hiệu: {product.brand}</p>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-3xl font-bold text-primary">{product.price.toLocaleString()}đ</span>
                                <span className="text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString()}đ</span>
                                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
                                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                </span>
                            </div>
                            <p className="text-gray-600">{product.description}</p>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-sm text-gray-600 mb-4">
                                Tình trạng: <span className="font-bold text-green-600">Còn {product.stock} sản phẩm</span>
                            </p>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-bold text-gray-700">Số lượng:</span>
                                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="font-bold w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/cart" className="flex-1">
                                    <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition shadow-lg">
                                        Thêm vào giỏ hàng
                                    </button>
                                </Link>
                                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:text-primary transition">
                                    <i className="fi flaticon-heart text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Tabs */}
                <div className="bg-white rounded-2xl p-8 mb-12">
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Công dụng</h3>
                            <p className="text-gray-600">{product.usage}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Thành phần</h3>
                            <p className="text-gray-600">{product.ingredients}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Bảo quản</h3>
                            <p className="text-gray-600">{product.storage}</p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map((item) => (
                            <Link key={item.id} href={`/shop/products/${item.id}`}>
                                <div className="bg-white rounded-2xl p-4 hover:shadow-lg transition border border-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-3" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'} />
                                    <h4 className="font-bold text-gray-900 text-sm mb-2">{item.name}</h4>
                                    <p className="text-primary font-bold">{item.price.toLocaleString()}đ</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
