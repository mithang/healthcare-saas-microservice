"use client";
import React from 'react';

const surveys = [
    {
        id: 1,
        title: "Khảo sát chất lượng khóa học CME",
        desc: "Đánh giá khóa học 'Cập nhật Kiến thức Dược lâm sàng 2024'",
        time: "5 phút",
        points: "10 điểm thưởng",
        status: "New"
    },
    {
        id: 2,
        title: "Nhu cầu đào tạo 2025",
        desc: "Giúp chúng tôi xây dựng chương trình đào tạo phù hợp với bạn",
        time: "3 phút",
        points: "5 điểm thưởng",
        status: "Completed"
    }
];

export default function PortalSurveyPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Khảo sát & Đóng góp ý kiến</h1>
                <p className="text-gray-500 text-sm mt-1">Ý kiến của bạn giúp chúng tôi cải thiện chất lượng dịch vụ</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {surveys.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition">
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                <i className={`fi ${item.status === 'Completed' ? 'flaticon-checked' : 'flaticon-edit'}`}></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-2">{item.desc}</p>
                                <div className="flex items-center gap-4 text-xs font-medium">
                                    <span className="flex items-center gap-1 text-gray-400">
                                        <i className="fi flaticon-clock"></i> {item.time}
                                    </span>
                                    <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">
                                        <i className="fi flaticon-star"></i> {item.points}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {item.status === 'Completed' ? (
                            <button disabled className="px-6 py-2 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed min-w-[140px]">
                                Đã hoàn thành
                            </button>
                        ) : (
                            <button className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition shadow-lg shadow-primary/30 min-w-[140px]">
                                Làm khảo sát
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
