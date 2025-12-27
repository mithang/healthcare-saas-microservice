'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';

interface Address {
    id: string;
    fullName: string;
    phone: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

const initialPaymentMethods = [
    {
        id: 'cod',
        name: 'Thanh toán khi nhận hàng',
        description: 'Thanh toán bằng tiền mặt khi nhận hàng',
        icon: '💵'
    },
    {
        id: 'bank-transfer',
        name: 'Chuyển khoản ngân hàng',
        description: 'Chuyển khoản qua tài khoản ngân hàng',
        icon: '🏦'
    },
    {
        id: 'momo',
        name: 'Ví MoMo',
        description: 'Thanh toán qua ví điện tử MoMo',
        icon: '📱'
    },
];

export default function CheckoutPage() {
    const { items, getTotalPrice } = useCart();
    const [selectedPayment, setSelectedPayment] = useState(initialPaymentMethods[0].id);
    const [cartItems, setCartItems] = useState(items);

    // Sync with cart context
    useEffect(() => {
        setCartItems(items);
    }, [items]);

    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 'addr1',
            fullName: 'Nguyễn Văn A',
            phone: '0901234567',
            address: '123 Đường Láng',
            province: 'Hà Nội',
            district: 'Đống Đa',
            ward: 'Láng Thượng',
            isDefault: true
        }
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState<string>('addr1');
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        note: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const newAddress: Address = {
            id: `addr${Date.now()}`,
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            province: formData.province,
            district: formData.district,
            ward: formData.ward,
            isDefault: addresses.length === 0
        };

        setAddresses([...addresses, newAddress]);
        setSelectedAddressId(newAddress.id);
        setIsAddingAddress(false);
        // Reset form
        setFormData(prev => ({
            ...prev,
            fullName: '',
            phone: '',
            address: '',
            province: '',
            district: '',
            ward: ''
        }));
    };

    const subtotal = getTotalPrice();
    const shippingFee = 30000;
    const total = subtotal + shippingFee;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedAddr = addresses.find(a => a.id === selectedAddressId);
        console.log('Order submitted:', {
            shippingAddress: selectedAddr,
            paymentMethod: selectedPayment,
            items: cartItems,
            note: formData.note
        });
        alert('Đặt hàng thành công!');
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="border-b border-gray-200 pb-2">
                        <h1 className="text-2xl font-bold uppercase text-text-main inline-block relative after:content-[''] after:absolute after:bottom-[-9px] after:left-0 after:w-full after:h-[3px] after:bg-primary">
                            Thanh toán
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-2/3 px-4">
                        {/* Shipping Information */}
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold uppercase text-text-main">Thông tin giao hàng</h2>
                                {!isAddingAddress && (
                                    <button
                                        type="button"
                                        className="px-3 py-1.5 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                                        onClick={() => setIsAddingAddress(true)}
                                    >
                                        + Thêm địa chỉ mới
                                    </button>
                                )}
                            </div>

                            {!isAddingAddress ? (
                                <div className="space-y-3">
                                    {addresses.map(addr => (
                                        <label key={addr.id} className={`flex gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                                            <div className="pt-1">
                                                <input
                                                    type="radio"
                                                    name="shippingAddress"
                                                    value={addr.id}
                                                    checked={selectedAddressId === addr.id}
                                                    onChange={() => setSelectedAddressId(addr.id)}
                                                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                                />
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-bold text-text-main mb-1">
                                                    {addr.fullName} <span className="font-normal text-text-light mx-2">|</span> {addr.phone}
                                                    {addr.isDefault && <span className="ml-3 px-2 py-0.5 bg-gray-100 text-xs text-gray-500 rounded border border-gray-200">Mặc định</span>}
                                                </p>
                                                <p className="text-text-light">
                                                    {addr.address}, {addr.ward}, {addr.district}, {addr.province}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h3 className="font-bold text-text-main mb-4">Thêm địa chỉ mới</h3>
                                    <div className="flex flex-wrap -mx-2">
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="fullName" className="text-sm font-medium text-text-main">Họ và tên *</label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="phone" className="text-sm font-medium text-text-main">Số điện thoại *</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full px-2 mb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="address" className="text-sm font-medium text-text-main">Địa chỉ *</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="province" className="text-sm font-medium text-text-main">Tỉnh/Thành phố *</label>
                                                <select
                                                    id="province"
                                                    name="province"
                                                    value={formData.province}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                                >
                                                    <option value="">Chọn Tỉnh/Thành phố</option>
                                                    <option value="Hà Nội">Hà Nội</option>
                                                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="district" className="text-sm font-medium text-text-main">Quận/Huyện *</label>
                                                <select
                                                    id="district"
                                                    name="district"
                                                    value={formData.district}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                                >
                                                    <option value="">Chọn Quận/Huyện</option>
                                                    <option value="Quận 1">Quận 1</option>
                                                    <option value="Ba Đình">Ba Đình</option>
                                                    <option value="Cầu Giấy">Cầu Giấy</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="ward" className="text-sm font-medium text-text-main">Phường/Xã *</label>
                                                <select
                                                    id="ward"
                                                    name="ward"
                                                    value={formData.ward}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                                >
                                                    <option value="">Chọn Phường/Xã</option>
                                                    <option value="Phường 1">Phường 1</option>
                                                    <option value="Láng Thượng">Láng Thượng</option>
                                                    <option value="Dịch Vọng">Dịch Vọng</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full px-2 flex justify-end gap-3 mt-2">
                                            <button type="button" className="px-4 py-2 bg-gray-100 text-text-main rounded hover:bg-gray-200 transition-colors" onClick={() => setIsAddingAddress(false)}>Hủy</button>
                                            <button type="button" className="px-4 py-2 bg-primary text-white rounded hover:bg-teal transition-colors shadow-sm" onClick={handleAddAddress}>Lưu địa chỉ</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="note" className="text-sm font-medium text-text-main">Ghi chú đơn hàng</label>
                                    <textarea
                                        id="note"
                                        name="note"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <h2 className="text-lg font-bold uppercase text-text-main mb-4">Phương thức thanh toán</h2>
                            <div className="space-y-3">
                                {initialPaymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${selectedPayment === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.id}
                                            checked={selectedPayment === method.id}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl">{method.icon}</span>
                                                <span className="font-semibold text-text-main">{method.name}</span>
                                            </div>
                                            <p className="text-sm text-text-light">{method.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 px-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold uppercase text-text-main mb-4 pb-3 border-b border-gray-100">Đơn hàng của bạn</h2>

                            <div className="max-h-[300px] overflow-y-auto pr-1 mb-4 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3 mb-4 last:mb-0">
                                        <div className="relative w-16 h-16 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-text-main line-clamp-2 mb-1">{item.title}</h3>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-light">SL: {item.quantity}</span>
                                                <span className="font-bold text-primary">
                                                    {formatPrice(item.price * item.quantity)}<sup>đ</sup>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-gray-100 mb-6">
                                <div className="flex justify-between text-sm mb-2 text-text-light">
                                    <span>Tạm tính</span>
                                    <span className="font-medium text-text-main">{formatPrice(subtotal)}<sup>đ</sup></span>
                                </div>

                                <div className="flex justify-between text-sm mb-2 text-text-light">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-medium text-text-main">{formatPrice(shippingFee)}<sup>đ</sup></span>
                                </div>

                                <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
                                    <span className="font-bold text-text-main">Tổng cộng</span>
                                    <span className="text-xl font-bold text-primary">{formatPrice(total)}<sup className="text-sm">đ</sup></span>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded hover:bg-teal transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mb-3 uppercase tracking-wide">
                                Đặt hàng
                            </button>

                            <Link href="/shop/cart" className="block w-full text-center py-3 bg-gray-100 text-text-main font-medium rounded hover:bg-gray-200 transition-colors">
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
