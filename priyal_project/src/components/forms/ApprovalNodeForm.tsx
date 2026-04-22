import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { FormField } from './shared/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface ApprovalNodeFormProps {
  nodeId: string;
}

export const ApprovalNodeForm: React.FC<ApprovalNodeFormProps> = ({ nodeId }) => {
  const { register, formState: { errors } } = useNodeForm(nodeId, 'approval');

  const roles = [
    { label: 'Manager', value: 'Manager' },
    { label: 'HRBP', value: 'HRBP' },
    { label: 'Director', value: 'Director' },
    { label: 'CEO', value: 'CEO' },
  ];

  return (
    <div className="space-y-6">
      <FormField label="Approval Title" error={errors.title?.message as string}>
        <Input placeholder="e.g. Budget Approval" {...register('title')} />
      </FormField>

      <FormField label="Approver Role">
        <Select options={roles} {...register('approverRole')} />
      </FormField>

      <FormField label="Auto-approve Threshold (Days)" error={errors.autoApproveThreshold?.message as string}>
        <Input 
          type="number" 
          min={1} 
          max={30} 
          {...register('autoApproveThreshold', { valueAsNumber: true })} 
        />
      </FormField>
    </div>
  );
};
