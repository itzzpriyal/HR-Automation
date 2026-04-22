import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { FormField } from './shared/FormField';
import { KeyValueEditor } from './shared/KeyValueEditor';
import { Input } from '../ui/Input';

interface TaskNodeFormProps {
  nodeId: string;
}

export const TaskNodeForm: React.FC<TaskNodeFormProps> = ({ nodeId }) => {
  const { register, control, formState: { errors } } = useNodeForm(nodeId, 'task');

  return (
    <div className="space-y-6">
      <FormField label="Task Title" error={errors.title?.message as string}>
        <Input placeholder="e.g. Background Check" {...register('title')} />
      </FormField>

      <FormField label="Description">
        <textarea
          className="w-full bg-panel border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-blue min-h-[80px]"
          placeholder="What needs to be done?"
          {...register('description')}
        />
      </FormField>

      <FormField label="Assignee" error={errors.assignee?.message as string}>
        <Input placeholder="e.g. hr@company.com" {...register('assignee')} />
      </FormField>

      <FormField label="Due Date">
        <Input type="date" {...register('dueDate')} />
      </FormField>

      <div className="pt-4 border-t border-border">
        <KeyValueEditor name="customFields" control={control} />
      </div>
    </div>
  );
};
