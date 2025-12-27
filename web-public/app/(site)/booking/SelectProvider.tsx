'use client';

import React, { useState } from 'react';
import { Provider } from '@/types/booking.types';

interface SelectProviderProps {
    doctors: Provider[];
    hospitals: Provider[];
    selectedProvider?: Provider;
    onSelect: (provider: Provider) => void;
    loading?: boolean;
}

const SelectProvider: React.FC<SelectProviderProps> = ({
    doctors,
    hospitals,
    selectedProvider,
    onSelect,
    loading
}) => {
    const [viewType, setViewType] = useState<'doctor' | 'hospital'>('doctor');
    const providers = viewType === 'doctor' ? doctors : hospitals;

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-32"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Chọn {viewType === 'doctor' ? 'Bác sĩ' : 'Bệnh viện'}
                </h2>
                <p className="text-gray-500">Chọn nơi bạn muốn đặt lịch khám</p>
            </div>

            {/* Toggle between Doctor and Hospital */}
            <div className="flex justify-center">
                <div className="inline-flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setViewType('doctor')}
                        className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${viewType === 'doctor'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <i className="fi flaticon-doctor mr-2"></i>
                        Bác sĩ
                    </button>
                    <button
                        onClick={() => setViewType('hospital')}
                        className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${viewType === 'hospital'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <i className="fi flaticon-hospital mr-2"></i>
                        Bệnh viện
                    </button>
                </div>
            </div>

            {/* Provider List */}
            <div className="space-y-4">
                {providers.map((provider) => (
                    <button
                        key={provider.id}
                        onClick={() => onSelect(provider)}
                        className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${selectedProvider?.id === provider.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    src={provider.avatar || '/styles/img/user/default-avatar.jpg'}
                                    alt={provider.name}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{provider.name}</h3>
                                {provider.specialty && (
                                    <p className="text-sm text-primary font-medium mb-2">{provider.specialty}</p>
                                )}
                                <p className="text-sm text-gray-600 mb-2">
                                    <i className="fi flaticon-location mr-1"></i>
                                    {provider.address}
                                </p>
                                {provider.experience && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        <i className="fi flaticon-briefcase mr-1"></i>
                                        {provider.experience}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center text-yellow-500">
                                        <i className="fi flaticon-star mr-1"></i>
                                        <span className="font-medium">{provider.rating}</span>
                                        <span className="text-gray-400 ml-1">({provider.reviewCount} đánh giá)</span>
                                    </div>
                                    {provider.price && (
                                        <div className="text-primary font-medium">{provider.price}</div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <i className="fi flaticon-clock mr-1"></i>
                                    {provider.availability}
                                </p>
                            </div>

                            {/* Checkmark */}
                            {selectedProvider?.id === provider.id && (
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <i className="fi flaticon-check text-white text-sm"></i>
                                    </div>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {providers.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fi flaticon-search text-2xl text-gray-400"></i>
                    </div>
                    <p className="text-gray-500">Không tìm thấy {viewType === 'doctor' ? 'bác sĩ' : 'bệnh viện'} nào</p>
                </div>
            )}
        </div>
    );
};

export default SelectProvider;
