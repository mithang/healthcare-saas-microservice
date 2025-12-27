"use client";
import React from 'react';

export default function InsuranceCheckPage() {
    const [cardNumber, setCardNumber] = React.useState('');
    const [result, setResult] = React.useState<any>(null);

    const checkCard = () => {
        // Mock verification
        setResult({
            valid: true,
            name: 'Nguyễn Văn A',
            dob: '01/01/1990',
            address: 'TP. Hồ Chí Minh',
            validFrom: '01/01/2024',
            validTo: '31/12/2024',
            hospital: 'BV Chợ Rẫy',
            coverage: '100%'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Kiểm tra Thẻ BHYT</h1>

                {/* Input Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Số thẻ BHYT (15 số)</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 15))}
                            placeholder="Nhập 15 số trên thẻ BHYT"
                            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-primary focus:outline-none"
                            maxLength={15}
                        />
                        <p className="text-sm text-gray-500 mt-2">Ví dụ: 123456789012345</p>
                    </div>
                    <button
                        onClick={checkCard}
                        disabled={cardNumber.length !== 15}
                        className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                        Kiểm tra
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">✓</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-green-600">Thẻ hợp lệ</h3>
                                <p className="text-sm text-gray-600">Thông tin thẻ BHYT của bạn</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                                <p className="font-bold text-gray-900">{result.name}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">Ngày sinh</p>
                                <p className="font-bold text-gray-900">{result.dob}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                                <p className="font-bold text-gray-900">{result.address}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">BV đăng ký</p>
                                <p className="font-bold text-gray-900">{result.hospital}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">Hiệu lực từ</p>
                                <p className="font-bold text-gray-900">{result.validFrom}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">Hiệu lực đến</p>
                                <p className="font-bold text-gray-900">{result.validTo}</p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-gray-600 mb-1">Mức hưởng</p>
                            <p className="text-3xl font-bold text-blue-600">{result.coverage}</p>
                            <p className="text-sm text-gray-600 mt-2">Chi phí khám chữa bệnh được BHYT chi trả</p>
                        </div>
                    </div>
                )}

                {/* Guide */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-900 mb-3">📌 Lưu ý khi sử dụng BHYT</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Mang theo thẻ BHYT khi đi khám bệnh</li>
                        <li>• Khám đúng tuyến để được hưởng 100%</li>
                        <li>• Thẻ hết hạn cần gia hạn kịp thời</li>
                        <li>• Liên hệ BHXH nếu có thắc mắc</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
