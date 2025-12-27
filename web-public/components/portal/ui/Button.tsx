import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    loading?: boolean;
    fullWidth?: boolean;
    rounded?: 'full' | 'xl' | 'lg';
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    loading,
    fullWidth,
    rounded = 'full', // Portal usually clearer with rounded buttons
    className = '',
    disabled,
    ...props
}: ButtonProps) => {

    const baseStyles = "font-bold transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-sm";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 hover:shadow-primary/30 hover:shadow-lg focus:ring-primary/20",
        secondary: "bg-blue-50 text-primary hover:bg-blue-100 focus:ring-blue-100",
        outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-50",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-100"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    };

    const roundedStyles = {
        full: "rounded-full",
        xl: "rounded-xl",
        lg: "rounded-lg"
    };

    return (
        <button
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${sizes[size]} 
                ${roundedStyles[rounded]} 
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <i className="fi flaticon-spinner animate-spin"></i>
            ) : icon ? (
                <i className={`fi flaticon-${icon}`}></i>
            ) : null}
            {children}
        </button>
    );
};
