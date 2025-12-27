import React from 'react';

export default function PharmacyInfoPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Thông tin Nhà thuốc</h1>

                <div className="space-y-8">
                    {/* About */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Giới thiệu</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Nhà thuốc Long Châu là hệ thống nhà thuốc uy tín hàng đầu Việt Nam, với hơn 500 chi nhánh trên toàn quốc.
                            Chúng tôi cam kết cung cấp các sản phẩm dược phẩm chính hãng, chất lượng cao với giá cả hợp lý.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Đội ngũ dược sĩ chuyên nghiệp, tận tâm luôn sẵn sàng tư vấn và hỗ trợ khách hàng 24/7.
                        </p>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Chứng nhận & Giấy phép</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['GPP', 'ISO 9001', 'Bộ Y Tế', 'FDA'].map((cert, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <i className="fi flaticon-certificate text-2xl text-primary"></i>
                                    </div>
                                    <p className="font-bold text-gray-900">{cert}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-location text-blue-600 text-xl"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">Địa chỉ</p>
                                    <p className="text-gray-600">123 Nguyễn Trãi, P.Bến Thành, Q.1, TP.HCM</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-phone text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">Hotline</p>
                                    <p className="text-gray-600">1900 xxxx (24/7)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-email text-purple-600 text-xl"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">Email</p>
                                    <p className="text-gray-600">support@pharmacy.vn</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-clock text-yellow-600 text-xl"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">Giờ làm việc</p>
                                    <p className="text-gray-600">8:00 - 22:00 (Hàng ngày)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bản đồ</h2>
                        <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                            <p className="text-gray-500">[Google Maps Embed]</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
