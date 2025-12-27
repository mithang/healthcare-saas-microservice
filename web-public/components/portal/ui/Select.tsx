"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Props as SelectProps } from 'react-select';

const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

interface Option {
    value: string;
    label: string;
}

interface SelectPropsCustom extends Omit<SelectProps, 'onChange'> {
    label?: string;
    error?: string;
    options: Option[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    placeholder?: string;
    isMulti?: boolean;
    containerClassName?: string;
}

export const Select = ({ label, error, options, value, onChange, placeholder = "Chọn...", isMulti = false, containerClassName = '', ...props }: SelectPropsCustom) => {

    const getValue = () => {
        if (!value) return isMulti ? [] : null;
        if (isMulti && Array.isArray(value)) {
            return options.filter(opt => value.includes(opt.value));
        }
        return options.find(opt => opt.value === value) || null;
    };

    const handleChange = (selected: any) => {
        if (!selected) {
            onChange?.(isMulti ? [] : '');
            return;
        }
        if (isMulti) {
            onChange?.(selected.map((opt: any) => opt.value));
        } else {
            onChange?.(selected.value);
        }
    };

    return (
        <div className={`mb-4 ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    {label} {props.required && <span className="text-red-500">*</span>}
                </label>
            )}
            <ReactSelect
                {...props}
                value={getValue()}
                onChange={handleChange}
                options={options}
                isMulti={isMulti}
                placeholder={placeholder}
                classNamePrefix="portal-select"
                styles={{
                    control: (base, state) => ({
                        ...base,
                        padding: '6px',
                        borderRadius: '1rem', // rounded-2xl
                        backgroundColor: state.isFocused ? 'white' : 'rgba(249, 250, 251, 0.5)', // gray-50/50
                        borderWidth: '1px',
                        borderColor: error ? '#ef4444' : '#e5e7eb', // gray-200
                        boxShadow: state.isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none',
                        '&:hover': {
                            borderColor: '#3b82f6'
                        }
                    }),
                    menu: (base) => ({
                        ...base,
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        padding: '4px',
                        marginTop: '8px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        zIndex: 9999,
                    }),
                    option: (base, state) => ({
                        ...base,
                        borderRadius: '0.5rem',
                        backgroundColor: state.isSelected ? '#eff6ff' : state.isFocused ? '#f9fafb' : 'transparent',
                        color: state.isSelected ? '#3b82f6' : '#374151',
                        fontWeight: state.isSelected ? 600 : 500,
                        cursor: 'pointer',
                        padding: '10px 16px',
                        margin: '2px 0',
                        fontSize: '14px',
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: '#111827',
                        fontWeight: 500,
                    })
                }}
            />
            {error && (
                <div className="flex items-center gap-1 mt-1.5 ml-1 text-red-500">
                    <i className="fi flaticon-info text-xs"></i>
                    <span className="text-xs font-medium">{error}</span>
                </div>
            )}
        </div>
    );
};
