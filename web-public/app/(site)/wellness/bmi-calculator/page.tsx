"use client";
import React from 'react';

export default function WellnessBMIPage() {
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [bmi, setBmi] = React.useState(0);
    const [category, setCategory] = React.useState('');

    const calculateBMI = () => {
        const h = parseFloat(height) / 100; // convert to meters
        const w = parseFloat(weight);
        if (h > 0 && w > 0) {
            const result = w / (h * h);
            setBmi(result);

            if (result < 18.5) setCategory('Thiếu cân');
            else if (result < 25) setCategory('Bình thường');
            else if (result < 30) setCategory('Thừa cân');
            else setCategory('Béo phì');
        }
    };

    const getBMIColor = () => {
        if (bmi < 18.5) return 'text-blue-600';
        if (bmi < 25) return 'text-green-600';
        if (bmi < 30) return 'text-orange-600';
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Tính chỉ số BMI</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Calculator */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Nhập thông tin</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chiều cao (cm)</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="170"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Cân nặng (kg)</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="65"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <button
                                onClick={calculateBMI}
                                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark"
                            >
                                Tính BMI
                            </button>
                        </div>

                        {bmi > 0 && (
                            <div className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
                                <p className="text-sm text-gray-600 mb-2">Chỉ số BMI của bạn</p>
                                <p className={`text-5xl font-bold ${getBMIColor()}`}>{bmi.toFixed(1)}</p>
                                <p className={`text-xl font-bold mt-2 ${getBMIColor()}`}>{category}</p>
                            </div>
                        )}
                    </div>

                    {/* BMI Chart */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Bảng phân loại BMI</h3>
                        <div className="space-y-3">
                            {[
                                { range: '< 18.5', label: 'Thiếu cân', color: 'bg-blue-100 text-blue-700' },
                                { range: '18.5 - 24.9', label: 'Bình thường', color: 'bg-green-100 text-green-700' },
                                { range: '25 - 29.9', label: 'Thừa cân', color: 'bg-orange-100 text-orange-700' },
                                { range: '≥ 30', label: 'Béo phì', color: 'bg-red-100 text-red-700' },
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl ${item.color}`}>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{item.label}</span>
                                        <span className="text-sm">{item.range}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <p className="text-sm text-gray-700">
                                <strong>Lưu ý:</strong> BMI chỉ là chỉ số tham khảo. Nên tham khảo ý kiến bác sĩ để có đánh giá chính xác hơn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                {bmi > 0 && (
                    <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Khuyến nghị</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-100 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-2">🥗 Chế độ ăn</h4>
                                <p className="text-sm text-gray-600">
                                    {bmi < 18.5 ? 'Tăng cường dinh dưỡng, ăn nhiều bữa nhỏ trong ngày' :
                                        bmi < 25 ? 'Duy trì chế độ ăn cân bằng, đa dạng' :
                                            bmi < 30 ? 'Giảm calo, tăng rau xanh, hạn chế đường và chất béo' :
                                                'Cần chế độ ăn kiêng nghiêm ngặt, tham khảo chuyên gia dinh dưỡng'}
                                </p>
                            </div>
                            <div className="p-4 border border-gray-100 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-2">🏃 Vận động</h4>
                                <p className="text-sm text-gray-600">
                                    {bmi < 18.5 ? 'Tập luyện nhẹ nhàng, tập tạ để tăng cơ' :
                                        bmi < 25 ? 'Duy trì 30 phút vận động mỗi ngày' :
                                            bmi < 30 ? 'Tăng cường cardio, 45-60 phút/ngày' :
                                                'Kết hợp cardio và tập luyện sức bền, tham khảo huấn luyện viên'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
