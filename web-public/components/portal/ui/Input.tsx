import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: string;
    rightIcon?: string;
    onRightIconClick?: () => void;
    containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, rightIcon, onRightIconClick, className = '', containerClassName = '', ...props }, ref) => {
        return (
            <div className={`mb-4 ${containerClassName}`}>
                {label && (
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <i className={`fi flaticon-${icon} text-lg`}></i>
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            w-full 
                            ${icon ? 'pl-11' : 'pl-5'} 
                            ${rightIcon ? 'pr-11' : 'pr-5'} 
                            py-3.5 
                            rounded-2xl 
                            border 
                            ${error ? 'border-red-500 bg-red-50/10 focus:ring-red-100' : 'border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-primary/20'} 
                            focus:outline-none focus:ring-4 
                            disabled:bg-gray-100 disabled:text-gray-500
                            transition-all duration-300 ease-in-out
                            placeholder:text-gray-400 text-gray-900 font-medium text-sm
                            shadow-sm
                            ${className}
                        `}
                        {...props}
                    />
                    {rightIcon && (
                        <button
                            type="button"
                            onClick={onRightIconClick}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${onRightIconClick ? 'cursor-pointer' : ''}`}
                        >
                            <i className={`fi flaticon-${rightIcon} text-lg`}></i>
                        </button>
                    )}
                </div>
                {error && (
                    <div className="flex items-center gap-1 mt-1.5 ml-1 text-red-500">
                        <i className="fi flaticon-info text-xs"></i>
                        <span className="text-xs font-medium">{error}</span>
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
