import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-node-end">{error}</p>}
    </div>
  );
};
