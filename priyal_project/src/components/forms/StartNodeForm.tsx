import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { FormField } from './shared/FormField';
import { KeyValueEditor } from './shared/KeyValueEditor';
import { Input } from '../ui/Input';

interface StartNodeFormProps {
  nodeId: string;
}

export const StartNodeForm: React.FC<StartNodeFormProps> = ({ nodeId }) => {
  const { register, control, formState: { errors } } = useNodeForm(nodeId, 'start');

  return (
    <div className="space-y-6">
      <FormField label="Workflow Title" error={errors.title?.message as string}>
        <Input 
          placeholder="e.g. Employee Onboarding" 
          {...register('title')} 
        />
      </FormField>

      <div className="pt-4 border-t border-border">
        <KeyValueEditor name="metadata" control={control} />
      </div>
    </div>
  );
};
