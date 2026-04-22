import React, { useState, useEffect } from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { FormField } from './shared/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { fetchAutomations } from '../../api/services/automationsApi';
import { AutomationAction } from '../../api/types/api.types';

interface AutomatedStepFormProps {
  nodeId: string;
}

export const AutomatedStepForm: React.FC<AutomatedStepFormProps> = ({ nodeId }) => {
  const { register, watch, setValue, formState: { errors } } = useNodeForm(nodeId, 'automated');
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedActionId = watch('actionId');
  const selectedAction = actions.find(a => a.id === selectedActionId);

  useEffect(() => {
    fetchAutomations().then(data => {
      setActions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedAction) {
      setValue('actionLabel', selectedAction.label);
    }
  }, [selectedAction, setValue]);

  return (
    <div className="space-y-6">
      <FormField label="Step Title" error={errors.title?.message as string}>
        <Input placeholder="e.g. Send Email" {...register('title')} />
      </FormField>

      <FormField label="Automation Action">
        <Select 
          options={[
            { label: 'Select an action...', value: '' },
            ...actions.map(a => ({ label: a.label, value: a.id }))
          ]} 
          {...register('actionId')}
          disabled={loading}
        />
      </FormField>

      {selectedAction && (
        <div className="pt-4 border-t border-border space-y-4">
          <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            Parameters
          </h4>
          {selectedAction.params.map(param => (
            <FormField key={param} label={param}>
              <Input 
                placeholder={`Enter ${param}...`}
                {...register(`parameters.${param}`)} 
              />
            </FormField>
          ))}
        </div>
      )}
    </div>
  );
};
