'use client';

import React, { useState, useEffect } from 'react';
import { BookingData, Service, Provider, TimeSlot, PatientInfo } from '@/types/booking.types';
import { bookingService } from '@/services/bookingService';
import SelectService from './SelectService';
import SelectProvider from './SelectProvider';
import SelectDateTime from './SelectDateTime';
import PatientInfoForm from './PatientInfo';
import Confirmation from './Confirmation';

const BookingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({});
    const [services, setServices] = useState<Service[]>([]);
    const [doctors, setDoctors] = useState<Provider[]>([]);
    const [hospitals, setHospitals] = useState<Provider[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [bookingId, setBookingId] = useState<string>();
    const [success, setSuccess] = useState(false);

    const totalSteps = 5;

    // Load services on mount
    useEffect(() => {
        loadServices();
    }, []);

    // Load providers when service is selected
    useEffect(() => {
        if (bookingData.service) {
            loadProviders();
        }
    }, [bookingData.service]);

    // Load time slots when provider and date are selected
    useEffect(() => {
        if (bookingData.provider && bookingData.date) {
            loadTimeSlots();
        }
    }, [bookingData.provider, bookingData.date]);

    const loadServices = async () => {
        setLoading(true);
        try {
            const data = await bookingService.getServices();
            setServices(data);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadProviders = async () => {
        setLoading(true);
        try {
            const [doctorsData, hospitalsData] = await Promise.all([
                bookingService.getDoctors(bookingData.service?.id),
                bookingService.getHospitals(bookingData.service?.id)
            ]);
            setDoctors(doctorsData);
            setHospitals(hospitalsData);
        } catch (error) {
            console.error('Error loading providers:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadTimeSlots = async () => {
        if (!bookingData.provider || !bookingData.date) return;

        setLoading(true);
        try {
            const slots = await bookingService.getAvailableSlots(
                bookingData.provider.id,
                bookingData.date
            );
            setTimeSlots(slots);
        } catch (error) {
            console.error('Error loading time slots:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleServiceSelect = (service: Service) => {
        setBookingData({ ...bookingData, service });
    };

    const handleProviderSelect = (provider: Provider) => {
        setBookingData({ ...bookingData, provider });
    };

    const handleDateSelect = (date: Date) => {
        setBookingData({ ...bookingData, date, timeSlot: undefined });
    };

    const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
        setBookingData({ ...bookingData, timeSlot });
    };

    const handlePatientInfoSubmit = (patientInfo: PatientInfo) => {
        setBookingData({ ...bookingData, patientInfo });
        setCurrentStep(5);
    };

    const handleSubmitBooking = async () => {
        setSubmitting(true);
        try {
            const response = await bookingService.createBooking(bookingData);
            if (response.success) {
                setBookingId(response.bookingId);
                setSuccess(true);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditStep = (step: number) => {
        setCurrentStep(step);
        setSuccess(false);
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return !!bookingData.service;
            case 2:
                return !!bookingData.provider;
            case 3:
                return !!bookingData.date && !!bookingData.timeSlot;
            case 4:
                return !!bookingData.patientInfo;
            case 5:
                return true;
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (canProceed() && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <SelectService
                        services={services}
                        selectedService={bookingData.service}
                        onSelect={handleServiceSelect}
                        loading={loading}
                    />
                );
            case 2:
                return (
                    <SelectProvider
                        doctors={doctors}
                        hospitals={hospitals}
                        selectedProvider={bookingData.provider}
                        onSelect={handleProviderSelect}
                        loading={loading}
                    />
                );
            case 3:
                return (
                    <SelectDateTime
                        selectedDate={bookingData.date}
                        selectedTimeSlot={bookingData.timeSlot}
                        timeSlots={timeSlots}
                        onDateSelect={handleDateSelect}
                        onTimeSlotSelect={handleTimeSlotSelect}
                        loading={loading}
                    />
                );
            case 4:
                return (
                    <PatientInfoForm
                        patientInfo={bookingData.patientInfo}
                        onSubmit={handlePatientInfoSubmit}
                    />
                );
            case 5:
                return (
                    <Confirmation
                        bookingData={bookingData}
                        onEdit={handleEditStep}
                        bookingId={bookingId}
                        success={success}
                    />
                );
            default:
                return null;
        }
    };

    const stepLabels = [
        'Chọn dịch vụ',
        'Chọn bác sĩ/BV',
        'Chọn ngày giờ',
        'Thông tin BN',
        'Xác nhận'
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch khám bệnh</h1>
                    <p className="text-gray-500">Đặt lịch nhanh chóng và tiện lợi</p>
                </div>

                {/* Progress Steps */}
                {!success && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between max-w-3xl mx-auto">
                            {stepLabels.map((label, index) => {
                                const stepNumber = index + 1;
                                const isActive = stepNumber === currentStep;
                                const isCompleted = stepNumber < currentStep;

                                return (
                                    <React.Fragment key={stepNumber}>
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${isCompleted
                                                    ? 'bg-green-500 text-white'
                                                    : isActive
                                                        ? 'bg-primary text-white ring-4 ring-primary/20'
                                                        : 'bg-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <i className="fi flaticon-check text-xs"></i>
                                                ) : (
                                                    stepNumber
                                                )}
                                            </div>
                                            <span
                                                className={`text-xs mt-2 font-medium ${isActive ? 'text-primary' : 'text-gray-500'
                                                    }`}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                        {stepNumber < totalSteps && (
                                            <div
                                                className={`flex-1 h-1 mx-2 rounded transition-all ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                                    }`}
                                            ></div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step Content */}
                <div className="mb-8">{renderStep()}</div>

                {/* Navigation Buttons */}
                {!success && (
                    <div className="flex justify-between max-w-2xl mx-auto">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            <i className="fi flaticon-left-arrow mr-2"></i>
                            Quay lại
                        </button>

                        {currentStep === 5 ? (
                            <button
                                onClick={handleSubmitBooking}
                                disabled={submitting}
                                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <i className="fi flaticon-loading animate-spin mr-2"></i>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <i className="fi flaticon-check mr-2"></i>
                                        Hoàn tất đặt lịch
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={nextStep}
                                disabled={!canProceed()}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${canProceed()
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Tiếp tục
                                <i className="fi flaticon-right-arrow ml-2"></i>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
