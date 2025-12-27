import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="mb-4">
                <label className={`flex items-start cursor-pointer group select-none ${className}`}>
                    <div className="relative flex items-center h-5 mt-0.5">
                        <input
                            ref={ref}
                            type="checkbox"
                            className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-lg bg-white checked:bg-primary checked:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200 cursor-pointer"
                            {...props}
                        />
                        <i className="fi flaticon-check absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none font-bold"></i>
                    </div>
                    {label && (
                        <div className="ml-3 text-sm">
                            <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                                {label}
                            </span>
                        </div>
                    )}
                </label>
                {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
