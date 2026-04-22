import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>}
        <select
          ref={ref}
          className={`w-full bg-panel border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all ${error ? 'border-node-end' : ''} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-panel">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-node-end">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
