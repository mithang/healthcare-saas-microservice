"use client";

import React from 'react';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { DatePicker } from './ui/DatePicker';
import { Button } from './ui/Button';

interface Field {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'date' | 'file';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    rows?: number;
    disabled?: boolean;
    isMulti?: boolean;
}

interface FormBuilderProps {
    fields: Field[];
    onSubmit: (data: any) => void;
    submitLabel?: string;
    initialValues?: any;
    columns?: 1 | 2 | 3;
    loading?: boolean;
}

export default function FormBuilder({ fields, onSubmit, submitLabel = 'Lưu thay đổi', initialValues = {}, columns = 2 }: FormBuilderProps) {
    const [formData, setFormData] = React.useState(initialValues);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate async delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 500));
        onSubmit(formData);
        setIsSubmitting(false);
    };

    const gridCols = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
            <div className={`grid ${gridCols} gap-6`}>
                {fields.map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        {field.type === 'select' ? (
                            <Select
                                label={field.label}
                                options={field.options || []}
                                value={formData[field.name]}
                                onChange={(val) => handleChange(field.name, val)}
                                placeholder={field.placeholder}
                                required={field.required}
                                isDisabled={field.disabled}
                                isMulti={field.isMulti}
                            />
                        ) : field.type === 'date' ? (
                            <DatePicker
                                label={field.label}
                                value={formData[field.name]}
                                onChange={(val) => handleChange(field.name, val)}
                                required={field.required}
                            />
                        ) : field.type === 'textarea' ? (
                            <Textarea
                                label={field.label}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                required={field.required}
                                rows={field.rows}
                                disabled={field.disabled}
                            />
                        ) : (
                            <Input
                                type={field.type}
                                label={field.label}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                required={field.required}
                                disabled={field.disabled}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100">
                <Button type="submit" loading={isSubmitting} size="lg" icon="check">
                    {submitLabel}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => window.history.back()}
                >
                    Hủy bỏ
                </Button>
            </div>
        </form>
    );
}
