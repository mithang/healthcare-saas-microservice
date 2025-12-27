"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type QuestionType = 'choice' | 'rating' | 'text';

interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: string[];
    required: boolean;
}

export default function SurveyBuilderPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([
        { id: '1', text: 'Bạn đánh giá thế nào về nội dung khóa học?', type: 'rating', required: true },
        { id: '2', text: 'Giảng viên có truyền đạt dễ hiểu không?', type: 'choice', options: ['Rất dễ hiểu', 'Bình thường', 'Khó hiểu'], required: true }
    ]);

    const addQuestion = (type: QuestionType) => {
        const newQ: Question = {
            id: Date.now().toString(),
            text: '',
            type,
            required: true,
            options: type === 'choice' ? ['Tùy chọn 1', 'Tùy chọn 2'] : undefined
        };
        setQuestions([...questions, newQ]);
    };

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId: string, optIndex: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId && q.options) {
                const newOptions = [...q.options];
                newOptions[optIndex] = value;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2">
                        <i className="fi flaticon-left-arrow-1 text-xs"></i> Quay lại
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Tạo khảo sát mới</h1>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-bold">Lưu nháp</button>
                    <button className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg">Xuất bản</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Survey Metadata */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Thông tin chung</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề khảo sát</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="VD: Khảo sát mức độ hài lòng..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Mô tả mục đích khảo sát..."
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
                        <h3 className="font-bold text-gray-800 mb-4">Thêm câu hỏi</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <button onClick={() => addQuestion('choice')} className="p-3 border border-gray-200 rounded-xl text-left hover:border-primary hover:text-primary hover:bg-primary/5 transition flex items-center gap-3">
                                <i className="fi flaticon-list text-lg"></i> Trắc nghiệm (Lựa chọn)
                            </button>
                            <button onClick={() => addQuestion('rating')} className="p-3 border border-gray-200 rounded-xl text-left hover:border-primary hover:text-primary hover:bg-primary/5 transition flex items-center gap-3">
                                <i className="fi flaticon-star text-lg"></i> Thang điểm (Rating)
                            </button>
                            <button onClick={() => addQuestion('text')} className="p-3 border border-gray-200 rounded-xl text-left hover:border-primary hover:text-primary hover:bg-primary/5 transition flex items-center gap-3">
                                <i className="fi flaticon-edit text-lg"></i> Văn bản (Tự luận)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Question Builder */}
                <div className="lg:col-span-2 space-y-6">
                    {questions.map((q, index) => (
                        <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Câu hỏi {index + 1} • {q.type === 'choice' ? 'Trắc nghiệm' : q.type === 'rating' ? 'Đánh giá' : 'Tự luận'}</span>
                                <div className="flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition">
                                    <button className="text-gray-400 hover:text-primary"><i className="fi flaticon-copy"></i></button>
                                    <button onClick={() => removeQuestion(q.id)} className="text-gray-400 hover:text-red-500"><i className="fi flaticon-trash"></i></button>
                                </div>
                            </div>

                            <input
                                type="text"
                                value={q.text}
                                onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                placeholder="Nhập nội dung câu hỏi..."
                                className="w-full text-lg font-bold placeholder-gray-300 border-none focus:ring-0 p-0 mb-4"
                            />

                            {/* Question Type Specific Inputs */}
                            {q.type === 'rating' && (
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <i key={star} className="fi flaticon-star text-2xl text-gray-200"></i>
                                    ))}
                                </div>
                            )}

                            {q.type === 'text' && (
                                <div className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                                    Khu vực cho người dùng nhập câu trả lời...
                                </div>
                            )}

                            {q.type === 'choice' && q.options && (
                                <div className="space-y-3">
                                    {q.options.map((opt, optIndex) => (
                                        <div key={optIndex} className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                                            <input
                                                type="text"
                                                value={opt}
                                                onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                                                className="flex-1 px-3 py-2 bg-gray-50 border border-transparent hover:border-gray-200 focus:bg-white focus:border-primary rounded-lg transition outline-none text-sm"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newOpts = q.options!.filter((_, i) => i !== optIndex);
                                                    updateQuestion(q.id, 'options', newOpts);
                                                }}
                                                className="text-gray-300 hover:text-red-500"
                                            >
                                                <i className="fi flaticon-close text-xs"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => updateQuestion(q.id, 'options', [...q.options!, `Tùy chọn ${q.options!.length + 1}`])}
                                        className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                                    >
                                        <i className="fi flaticon-add"></i> Thêm tùy chọn
                                    </button>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={q.required}
                                        onChange={(e) => updateQuestion(q.id, 'required', e.target.checked)}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-600">Bắt buộc trả lời</span>
                                </label>
                            </div>
                        </div>
                    ))}

                    {questions.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 mb-2">Chưa có câu hỏi nào</p>
                            <p className="text-sm text-gray-500">Chọn loại câu hỏi từ menu bên trái để bắt đầu</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
