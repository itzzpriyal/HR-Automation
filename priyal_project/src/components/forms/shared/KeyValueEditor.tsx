import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface KeyValueEditorProps {
  name: string;
  control: Control<any>;
}

export const KeyValueEditor: React.FC<KeyValueEditorProps> = ({ name, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">Custom Data</span>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => append({ key: '', value: '' })}
          className="text-[10px] h-6"
        >
          <Plus size={12} className="mr-1" /> Add Field
        </Button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-4 border border-dashed border-border rounded-md text-xs text-text-secondary">
          No custom fields added
        </div>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start">
          <Input
            placeholder="Key"
            {...control.register(`${name}.${index}.key`)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            {...control.register(`${name}.${index}.value`)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
            className="text-node-end hover:bg-node-end/10"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
    </div>
  );
};
