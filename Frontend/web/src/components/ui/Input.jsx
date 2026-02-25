import React from 'react';

const Input = ({
    label,
    error,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-semibold text-slate-700"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`
          w-full px-4 py-2 bg-white border rounded-lg text-slate-900 
          outline-none transition-all duration-200
          ${error
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 focus:border-rose-500'
                        : 'border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
                    }
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="text-sm text-rose-600 font-medium">{error}</p>
            )}
        </div>
    );
};

export default Input;
