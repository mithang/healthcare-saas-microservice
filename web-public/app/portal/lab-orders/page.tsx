"use client";
import React, { useState } from 'react';

const SERVICE_GROUPS = [
    { id: 'g1', name: 'Huyết học', items: ['Công thức máu (CBC)', 'Nhóm máu ABO', 'Đông máu cơ bản'] },
    { id: 'g2', name: 'Sinh hóa', items: ['Glucose', 'HbA1c', 'Ure', 'Creatinine', 'AST/ALT', 'Lipid máu'] },
    { id: 'g3', name: 'Chẩn đoán hình ảnh', items: ['X-Quang Ngực thẳng', 'Siêu âm bụng tổng quát', 'CT Sọ não'] },
];

export default function LabOrdersPage() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggleItem = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Chỉ định Cận lâm sàng</h1>

            <div className="flex gap-6">
                {/* Catalog */}
                <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <input
                        type="text"
                        placeholder="Tìm nhanh dịch vụ (vd: ct, mau...)"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <div className="space-y-6">
                        {SERVICE_GROUPS.map(group => (
                            <div key={group.id}>
                                <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-3">{group.name}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {group.items.map(item => (
                                        <button
                                            key={item}
                                            onClick={() => toggleItem(item)}
                                            className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${selectedItems.includes(item)
                                                    ? 'bg-green-600 text-white shadow-md'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Cart */}
                <div className="w-80 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex justify-between items-center">
                        Phiếu chỉ định
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{selectedItems.length}</span>
                    </h3>

                    {selectedItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 text-sm">Chưa chọn dịch vụ nào</div>
                    ) : (
                        <ul className="space-y-2 mb-6 text-sm">
                            {selectedItems.map(item => (
                                <li key={item} className="flex justify-between items-center">
                                    <span className="text-gray-700">{item}</span>
                                    <button onClick={() => toggleItem(item)} className="text-red-400 hover:text-red-600">×</button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                        <button className="w-full py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            Phát hành phiếu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
