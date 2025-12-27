'use client';

import React from 'react';
import { Service } from '@/types/booking.types';

interface SelectServiceProps {
    services: Service[];
    selectedService?: Service;
    onSelect: (service: Service) => void;
    loading?: boolean;
}

const SelectService: React.FC<SelectServiceProps> = ({ services, selectedService, onSelect, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-40"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chọn dịch vụ khám</h2>
                <p className="text-gray-500">Vui lòng chọn dịch vụ bạn muốn đặt lịch</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => onSelect(service)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${selectedService?.id === service.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                    >
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${selectedService?.id === service.id ? 'bg-primary text-white' : 'bg-gray-100 text-primary'
                                }`}>
                                <i className={`fi ${service.icon} text-2xl`}></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                                <p className="text-xs text-gray-500 mb-2">{service.description}</p>
                                {service.price && (
                                    <p className="text-sm font-medium text-primary">{service.price}</p>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelectService;
