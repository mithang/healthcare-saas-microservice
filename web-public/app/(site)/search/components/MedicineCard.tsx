import React from 'react';
import Link from 'next/link';

interface MedicineItem {
    id: string;
    name: string;
    image: string;
    ingredients: string;
    price: number;
    packing: string;
    isPrescription: boolean;
}

interface MedicineCardProps {
    item: MedicineItem;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ item }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 mb-4 group">
            <div className="flex md:flex-row flex-col p-4 gap-4">
                {/* Image */}
                <div className="w-full md:w-32 lg:w-40 flex-shrink-0">
                    <Link href={`/medicine/${item.id}`} className="block relative aspect-square rounded-lg overflow-hidden border border-gray-100">
                        <img
                            src={item.image}
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            alt={item.name}
                        />
                    </Link>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <div className="mb-2">
                        <div className="flex items-start justify-between">
                            {item.isPrescription && (
                                <span className="inline-block text-[10px] font-bold text-red-600 border border-red-600 px-1.5 py-0.5 rounded mr-2 mb-1">
                                    RX - Thuốc kê đơn
                                </span>
                            )}
                        </div>

                        <Link href={`/medicine/${item.id}`} className="block">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                                {item.name}
                            </h3>
                        </Link>

                        <p className="text-sm text-gray-500 mb-1">
                            <span className="font-semibold text-gray-700">Hoạt chất:</span> {item.ingredients}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                            <span className="font-semibold text-gray-700">Quy cách:</span> {item.packing}
                        </p>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div className="text-lg font-bold text-blue-600">
                            {item.price.toLocaleString('vi-VN')}đ <span className="text-xs font-normal text-gray-400">/ Hộp</span>
                        </div>

                        <button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-semibold transition-all duration-200">
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineCard;
