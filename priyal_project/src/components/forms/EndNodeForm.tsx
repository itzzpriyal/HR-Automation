import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { FormField } from './shared/FormField';

interface EndNodeFormProps {
  nodeId: string;
}

export const EndNodeForm: React.FC<EndNodeFormProps> = ({ nodeId }) => {
  const { register, formState: { errors } } = useNodeForm(nodeId, 'end');

  return (
    <div className="space-y-6">
      <FormField label="End Message" error={errors.endMessage?.message as string}>
        <textarea
          className="w-full bg-panel border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-blue min-h-[80px]"
          placeholder="Message to show upon completion"
          {...register('endMessage')}
        />
      </FormField>

      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          id="generateSummary"
          className="w-4 h-4 rounded border-border bg-panel text-accent-blue focus:ring-accent-blue focus:ring-offset-canvas"
          {...register('generateSummary')} 
        />
        <label htmlFor="generateSummary" className="text-sm font-medium text-text-primary">
          Generate Summary Report
        </label>
      </div>
    </div>
  );
};
