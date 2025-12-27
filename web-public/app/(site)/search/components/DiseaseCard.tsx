import React from 'react';
import Link from 'next/link';

interface DiseaseItem {
    id: string;
    title: string;
    image: string;
    description: string;
    symptoms: string[];
    specialty: string;
}

interface DiseaseCardProps {
    item: DiseaseItem;
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({ item }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 mb-4 group">
            <div className="flex md:flex-row flex-col p-4 gap-4">
                {/* Image - Fixed width/ratio */}
                <div className="w-full md:w-48 lg:w-56 flex-shrink-0">
                    <Link href={`/disease/${item.id}`} className="block relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden">
                        <img
                            src={item.image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={item.title}
                        />
                    </Link>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <div className="mb-2">
                        <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full mb-2">
                            {item.specialty}
                        </span>
                        <Link href={`/disease/${item.id}`} className="block">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                                {item.title}
                            </h3>
                        </Link>
                        <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3 mb-3">
                            {item.description}
                        </p>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center">
                                <i className="fi flaticon-eye mr-1"></i> 1.2k
                            </span>
                            <span className="flex items-center">
                                <i className="fi flaticon-share mr-1"></i> 45
                            </span>
                        </div>

                        <Link
                            href={`/disease/${item.id}`}
                            className="text-sm font-semibold text-primary hover:underline flex items-center"
                        >
                            Xem chi tiết <i className="fi flaticon-right-arrow text-xs ml-1"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseCard;
