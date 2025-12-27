'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

    const shippingFee = 30000;
    const subtotal = getTotalPrice();
    const total = subtotal + shippingFee;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="border-b border-gray-200 pb-2">
                        <h1 className="text-2xl font-bold uppercase text-text-main inline-block relative after:content-[''] after:absolute after:bottom-[-9px] after:left-0 after:w-full after:h-[3px] after:bg-primary">
                            Giỏ hàng của bạn
                        </h1>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                            <i className="fi flaticon-shopping-cart text-4xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-text-main mb-2">Giỏ hàng trống</h2>
                        <p className="text-text-light mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                        <Link href="/shop" className="inline-block px-8 py-3 bg-primary text-white rounded font-medium hover:bg-teal transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-2/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                        <div className="relative w-24 h-24 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden bg-white">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>

                                        <div className="flex-grow min-w-0">
                                            <Link href={`/shop/products/${item.id}`} className="block font-medium text-text-main line-clamp-2 hover:text-primary transition-colors mb-1">
                                                {item.title}
                                            </Link>
                                            <div className="text-primary font-bold">
                                                {formatPrice(item.price)}<sup className="text-xs underline">đ</sup>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3 ml-4">
                                            <div className="flex items-center border border-gray-200 rounded bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 text-gray-500 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                    className="w-10 h-8 text-center text-sm border-x border-gray-200 focus:outline-none focus:bg-gray-50 appearance-none m-0"
                                                    min="1"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 text-gray-500 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-sm text-gray-400 hover:text-danger flex items-center gap-1 transition-colors"
                                            >
                                                <i className="fi flaticon-garbage"></i> Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/3 px-4">
                            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                                <h2 className="text-lg font-bold mb-4 uppercase border-b border-gray-100 pb-3">Tổng đơn hàng</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm text-text-light">
                                        <span>Tạm tính</span>
                                        <span className="font-medium text-text-main">{formatPrice(subtotal)}<sup>đ</sup></span>
                                    </div>

                                    <div className="flex justify-between text-sm text-text-light">
                                        <span>Phí vận chuyển</span>
                                        <span className="font-medium text-text-main">{formatPrice(shippingFee)}<sup>đ</sup></span>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 border-t border-gray-200 mb-6">
                                    <span className="font-bold text-text-main">Tổng cộng</span>
                                    <span className="text-xl font-bold text-primary">{formatPrice(total)}<sup className="text-sm underline">đ</sup></span>
                                </div>

                                <Link href="/shop/checkout" className="block w-full text-center py-3 bg-primary text-white rounded font-bold hover:bg-teal transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mb-3 uppercase tracking-wide">
                                    Tiến hành thanh toán
                                </Link>

                                <Link href="/shop" className="block w-full text-center py-3 bg-gray-100 text-text-main rounded font-medium hover:bg-gray-200 transition-colors">
                                    Tiếp tục mua sắm
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
