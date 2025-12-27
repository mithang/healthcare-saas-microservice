"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

export default function ImageAnalysisPage() {
    const [uploaded, setUploaded] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Phân tích Hình ảnh AI</h1>
                <p className="text-gray-500 text-center mb-12">Upload ảnh da, mắt, vết thương... để AI sơ bộ đánh giá</p>

                <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
                    {!uploaded ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 hover:border-primary transition-colors cursor-pointer"
                            onClick={() => setUploaded(true)}>
                            <i className="fi flaticon-camera text-6xl text-gray-300 mb-6 inline-block"></i>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tải lên hình ảnh</h3>
                            <p className="text-gray-500">Click hoặc kéo thả ảnh vào đây</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fi flaticon-check text-4xl text-green-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Phân tích hoàn tất</h3>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6 text-left">
                                <h4 className="font-bold text-gray-900 mb-2">Kết quả sơ bộ:</h4>
                                <p className="text-gray-700">Có dấu hiệu viêm da nhẹ. Khuyến nghị gặp bác sĩ Da liễu để kiểm tra chính xác.</p>
                            </div>
                            <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark">
                                Tìm bác sĩ Da liễu
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
