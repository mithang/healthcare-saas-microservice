"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

// Mock Data for Logic
const SYMPTOM_DATA = {
    head: [
        { id: 'headache', label: 'Đau đầu, chóng mặt', disease: 'Rối loạn tiền đình / Thiếu máu não', specialist: 'Thần kinh', url: '/search?speciality=than-kinh' },
        { id: 'migraine', label: 'Đau nửa đầu', disease: 'Đau nửa đầu Migraine', specialist: 'Thần kinh', url: '/search?speciality=than-kinh' },
        { id: 'fever', label: 'Sốt cao, đau đầu', disease: 'Sốt xuất huyết / Viêm màng não', specialist: 'Truyền nhiễm', url: '/search?speciality=truyen-nhiem' }
    ],
    chest: [
        { id: 'chest_pain', label: 'Đau tức ngực trái', disease: 'Bệnh mạch vành / Nhồi máu cơ tim', specialist: 'Tim mạch', url: '/search?speciality=tim-mach' },
        { id: 'cough', label: 'Ho kéo dài, khó thở', disease: 'Viêm phổi / Hen suyễn', specialist: 'Hô hấp', url: '/search?speciality=ho-hap' },
        { id: 'palpitations', label: 'Tim đập nhanh, hồi hộp', disease: 'Rối loạn nhịp tim', specialist: 'Tim mạch', url: '/search?speciality=tim-mach' }
    ],
    stomach: [
        { id: 'stomach_ache', label: 'Đau vùng thượng vị', disease: 'Viêm loét dạ dày', specialist: 'Tiêu hóa', url: '/search?speciality=tieu-hoa' },
        { id: 'diarrhea', label: 'Tiêu chảy, nôn mửa', disease: 'Ngộ độc thực phẩm / Rối loạn tiêu hóa', specialist: 'Tiêu hóa', url: '/search?speciality=tieu-hoa' },
        { id: 'appendicitis', label: 'Đau hố chậu phải', disease: 'Viêm ruột thừa', specialist: 'Ngoại tiêu hóa', url: '/search?speciality=ngoai-khoa' }
    ],
    limb: [
        { id: 'joint_pain', label: 'Sưng đau khớp', disease: 'Viêm khớp / Gout', specialist: 'Cơ xương khớp', url: '/search?speciality=co-xuong-khop' },
        { id: 'numbness', label: 'Tê bì chân tay', disease: 'Thoái hóa cột sống / Chèn ép thần kinh', specialist: 'Thần kinh', url: '/search?speciality=than-kinh' }
    ]
};

const BODY_PARTS = [
    { id: 'head', label: 'Đầu & Cổ', icon: 'flaticon-thinking' },
    { id: 'chest', label: 'Ngực & Phổi', icon: 'flaticon-lungs' },
    { id: 'stomach', label: 'Bụng & Tiêu hóa', icon: 'flaticon-stomach' },
    { id: 'limb', label: 'Tay & Chân', icon: 'flaticon-bone' }
];

export default function SymptomChecker() {
    const [selectedPart, setSelectedPart] = useState<string | null>(null);
    const [selectedSymptom, setSelectedSymptom] = useState<any | null>(null);
    const [step, setStep] = useState(1); // 1: Select Part, 2: Select Symptom, 3: Result

    const handleSelectPart = (partId: string) => {
        setSelectedPart(partId);
        setStep(2);
        setSelectedSymptom(null);
    };

    const handleSelectSymptom = (symptom: any) => {
        setSelectedSymptom(symptom);
        setStep(3);
    };

    const reset = () => {
        setStep(1);
        setSelectedPart(null);
        setSelectedSymptom(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tra cứu triệu chứng</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Chọn vị trí đau trên cơ thể hoặc triệu chứng bạn đang gặp phải để nhận chẩn đoán sơ bộ và lời khuyên từ chuyên gia.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">

                    {/* Progress Bar */}
                    <div className="flex border-b border-gray-100 bg-gray-50/50">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-colors ${step >= s ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}>
                                Bước {s}: {s === 1 ? 'Chọn vị trí' : s === 2 ? 'Triệu chứng' : 'Kết quả'}
                            </div>
                        ))}
                    </div>

                    <div className="p-8 md:p-12 flex-1 flex flex-col items-center justify-center">

                        {/* STEP 1: Body Part Selection */}
                        {step === 1 && (
                            <div className="w-full animate-fade-in-up">
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Bạn cảm thấy khó chịu ở đâu?</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {BODY_PARTS.map(part => (
                                        <button
                                            key={part.id}
                                            onClick={() => handleSelectPart(part.id)}
                                            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary hover:bg-blue-50 transition-all group aspect-square"
                                        >
                                            <i className={`fi ${part.icon} text-4xl text-gray-400 group-hover:text-primary mb-4 transition-colors`}></i>
                                            <span className="font-bold text-gray-700 group-hover:text-primary">{part.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Symptom Selection */}
                        {step === 2 && selectedPart && (
                            <div className="w-full animate-fade-in-up max-w-2xl">
                                <button onClick={reset} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm">
                                    <i className="fi flaticon-left-arrow"></i> Quay lại
                                </button>

                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                    Triệu chứng cụ thể là gì?
                                </h2>

                                <div className="space-y-4">
                                    {/* @ts-ignore */}
                                    {SYMPTOM_DATA[selectedPart]?.map((sym: any) => (
                                        <button
                                            key={sym.id}
                                            onClick={() => handleSelectSymptom(sym)}
                                            className="w-full text-left p-4 px-6 rounded-xl border border-gray-200 hover:border-primary hover:bg-blue-50 hover:shadow-md transition-all font-medium text-lg text-gray-700 flex items-center justify-between group"
                                        >
                                            {sym.label}
                                            <i className="fi flaticon-right-arrow text-gray-300 group-hover:text-primary text-sm"></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Result */}
                        {step === 3 && selectedSymptom && (
                            <div className="w-full animate-fade-in-up text-center max-w-2xl">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fi flaticon-diagnosis text-4xl text-green-600"></i>
                                </div>

                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Chẩn đoán sơ bộ</h2>
                                <p className="text-red-500 font-bold text-xl mb-6">{selectedSymptom.disease}</p>

                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8 text-left">
                                    <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                        <i className="fi flaticon-information"></i> Lời khuyên
                                    </h4>
                                    <p className="text-blue-900 leading-relaxed">
                                        Dựa trên triệu chứng <strong>"{selectedSymptom.label}"</strong>, bạn nên đi khám chuyên khoa <strong>{selectedSymptom.specialist}</strong> để được chẩn đoán chính xác và điều trị kịp thời.
                                    </p>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <button onClick={reset} className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                                        Tra cứu lại
                                    </button>
                                    <Link
                                        href={selectedSymptom.url}
                                        className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                                    >
                                        <i className="fi flaticon-doctor"></i>
                                        Tìm bác sĩ {selectedSymptom.specialist}
                                    </Link>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    *Lưu ý: Kết quả chỉ mang tính chất tham khảo, không thay thế việc thăm khám trực tiếp với bác sĩ.
                </div>
            </div>
        </div>
    );
}
