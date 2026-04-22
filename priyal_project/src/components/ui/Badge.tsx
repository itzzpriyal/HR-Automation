import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'idle' | 'running' | 'success' | 'error' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-border text-text-secondary',
    idle: 'bg-border text-text-secondary',
    running: 'bg-accent-blue/20 text-accent-blue animate-pulse',
    success: 'bg-node-start/20 text-node-start',
    error: 'bg-node-end/20 text-node-end',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
