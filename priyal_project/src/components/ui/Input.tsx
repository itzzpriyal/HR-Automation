import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>}
        <input
          ref={ref}
          className={`w-full bg-panel border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all ${error ? 'border-node-end' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-node-end">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
